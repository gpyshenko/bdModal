var bd = bdModal({
    openBtn: '.qwe'
});

document.querySelector('.openWith').addEventListener('click', function () {
    bd.open('#modal')
})

var modal2 = `<div id="modal2" class="backdropItem">
            <div class="modal">
                <h3>Modal 2</h3>
                <button class="bdClose">x</button>
                <button class="bdChange" data-target="#modal">Change to modal1</button>
                <button class="bdChange" data-target="#modal3">Change to modal3</button>
            </div>
        </div>`
var modal3 = `<div id="modal3" class="backdropItem">
            <div class="modal">
                <h3>Modal 3</h3>
                <button class="bdClose">x</button>
                <button class="bdChange" data-target="#modal">Change to modal1</button>
                <button class="bdChange" data-target="#modal2">Change to modal1</button>
            </div>
        </div>`

document.querySelector('.add').addEventListener('click', function () {
    bd.open('#modal2', modal2)
})

document.querySelector('.add2').addEventListener('click', function () {
    bd.open('#modal3', modal3)
})

document.addEventListener('state', function(e) {
   console.log(e.detail.state)
})