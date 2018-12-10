const RABBIT_WRAPPER = "rabbit-wrapper"
const RABBIT_FIELD = "rabbit-field"
const RABBIT_LABEL = "rabbit-label"
const RABBIT_REQUIRED = "rabbit-required"
const RABBIT_LABEL_TEXT = "label-text"
const RABBIT_LABEL_STATUS = "active"
var rabbitManager = {
    active: function(label) {
        $(label).addClass(RABBIT_LABEL_STATUS)
    },
    inactive: function(label) {
        $(label).removeClass(RABBIT_LABEL_STATUS)
    },
    createComponent: function(type, text, id = null) {
        var component
        switch (type) {
            case "label":
                component = $('<label></label>')
                $(component).addClass(RABBIT_LABEL)
                break
            case "span":
                component = $('<span></span>')
                $(component).addClass(RABBIT_REQUIRED)
                $(component).text(text)
                break;
        }
        if (id != null) {
            $(component).attr("for", id)
        }
        $(component).text(text)
        return component
    },
    remove: function(label) {
        id = $(label).attr("for")
        $("#" + id).removeAttr("id")
        $(label).remove()
    },
    checkInactive: function(target, label) {
        if ($(target).val() !== '') {
            return false
        }
        if ($(target).data(RABBIT_LABEL_STATUS) == "active") {
            return false
        }
        rabbitManager.inactive(label)
        return true
    },
    count: 0
};
(function($) {
    $.fn.rabbitLabel = function() {
        $(this).each(function() {
            if ($(this).children("." + RABBIT_LABEL).length > 0) {
                return
            }
            var target = $(this).find("." + RABBIT_FIELD)
            var text = $(target).data(RABBIT_LABEL_TEXT)
            var status = $(target).data(RABBIT_LABEL_STATUS)
            var type = $(target).attr('type')
            var targetRequired = $(target).attr('required')
            var targetName = $(target).attr('name')
            var targetId = $(target).attr('id') ? $(target).attr('id') : RABBIT_LABEL + "-" + rabbitManager.count++
            var label = rabbitManager.createComponent("label", text, targetId)
            $(target).attr("id", targetId)
            $(this).append(label)
            if (targetRequired) {
                span = rabbitManager.createComponent("span", " *")
                $(label).append(span)
            }
            if (status !== "active") {
                $(target).focusout(function() {
                    rabbitManager.checkInactive(this, label)
                });
            } else {
                $(label).addClass(RABBIT_LABEL_STATUS);
            }
            $(target).focus(function() {
                if ($(this).attr("readonly") || $(this).attr("disable")) {
                    return false;
                }
                rabbitManager.active(label)
            })
        })
    },
    $.fn.rabbitCheck = function() {
        $(this).each(function() {
            target = $(this).find("." + RABBIT_FIELD)
            label = $(this).find("." + RABBIT_LABEL)
            rabbitManager.active(label)
            rabbitManager.checkInactive(target, label)
        })
    },
    $.fn.rabbitRemove = function() {
        $(this).find("." + RABBIT_LABEL).each(function() {
            rabbitManager.remove(this)
        })
    }
}(jQuery))