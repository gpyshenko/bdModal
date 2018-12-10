var bd = backdropModal({
    openBtn: '.qwe',
    closeBtn: '.bdClose'
});

// var asd = '#modal';
// var asdModal = document.querySelector(asd)

document.querySelector('.openWith').addEventListener('click', function () {
    bd.open(asdModal)
    bd.close(current, asdModal)
})