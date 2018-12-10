# Rabbit-Label
## Dependence

JQuery 3.3.1
```html
<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
```
## Usage
 
include css file 
```html
<head>
  <link rel="stylesheet" href="rabbitlabel.css">
</head>
```

include js file 
```html
<script type="text/javascript" src="rabbitlabel.js"></script>
```

build html struct
```html
<div class="rabbit-wrapper">
    <input type="text" class="rabbit-field" data-label-text="Label Name">
</div>
```

create rabbit label 
```html
$(document).ready(function(){
    $(".rabbit-wrapper").rabbitLabel();
})
```

recheck label  
```html
$(".rabbit-wrapper").rabbitCheck();
```

remove label 
```html
$(".rabbit-wrapper").rabbitRemove();
```

if you have default value in input, you need recheck after create label
```html
$(document).ready(function(){
    $(".rabbit-wrapper").rabbitLabel();
    $(".rabbit-wrapper").rabbitCheck();
})
```

if you don't want it work failed when "prev page", you need add recheck in pageshow event 
```html
$(window).on('pageshow', function() {
    $(".rabbit-wrapper").rabbitCheck()
})
```




