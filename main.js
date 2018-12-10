var bd = bdModal({
    openBtn: '.qwe',
    closeBtn: '.bdClose'
});

document.querySelector('.openWith').addEventListener('click', function () {
    bd.open('#modal')
    bd.close(current, asdModal)
})