# Backdrop modals
Lightweight plugin for modals.

### Installation

Just add a link to the css file in your `<head>`:

```html
<link rel="stylesheet" type="text/css" href="bdmodal.css"/>
```

Then, before your closing ```<body>``` tag add:

```html
<script type="text/javascript" src="bdmodal.js"></script>
```

Then, need to add html to ```<body>```:

```html
<div class="backdropContainer"></div>
```

### Initialize:

```js
var bd = bdModal();
```

### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
openBtn | string (selector) | '.bdOpen' | Set button for open modal
closeBtn | string (selector) | '.bdClose' | Set button for close modal
changeBtn | string (selector) | '.bdChange' | Set button for change modal
speed | number | 300 | Set speed animation modal

### Events

Event callback:

```javascript
document.addEventListener('state', function(e) {

   console.log(e.detail.state) // On open event: opened

   console.log(e.detail.state) // On close event: closed

   console.log(e.detail.state) // On change event: changed

   console.log(e.detail.state) // On reinit event: reinited

})
```

### Methods

Event | Argument | Description
------ | -------- | -----------
open | string (selector) | Open modal with selector
change | string (selector) | Change current modal to target modal
close | string (selector) | Close modal with selector
reinit | | Reinit modal

### Example methods:

```js
var bd = bdModal();

// Open modal
bd.open('#modal');

// Change modal
bd.change('#modal2');

// Close modal
bd.close('#modal');

// Reinit modal
bd.reinit();
```

#### Browser support

Bdmodal works in browsers where classlist is supported.

Add polifil https://www.npmjs.com/package/classlist-polyfill if you need browser support where there is no classlist.