// Modals and backdrop
function backdropModal() {
    var body = document.querySelector('body');
    var backdrop;
    var container = document.querySelector('.backdropContainer');
    var itemClass = '.backdropItem';
    var item = document.querySelectorAll(itemClass);
    var closeBtn = document.querySelectorAll('.backdrop-close');
    var duration = 300;
    
    function createBackdrop() {
        var el = document.createElement('div');
        el.className = 'backdrop';
        body.insertBefore(el, container);
        backdrop = el;
    }
    
    // Utils
    function s(el, cb) {
        if (el.length === undefined) {
            cb(el)
        } else {
            el.forEach(function (el, indx) {
                cb(el, indx)
            })
        }
    }
    function resetClass(el, state) {
        s(el, function (el) {
            el.classList.remove(state);
        })
    }

    function toggleDisplay(el, value) {
        s(el, function(el) {
            el.style.display = value
        })
    }

    function fadeIn(el, display, style) {
        toggleDisplay(el, display);
        setTimeout(function () {
            s(el, function (el) {
                el.classList.add(style);
            })
        }, 100)
    }

    function fadeOut(el, style, time) {
        s(el, function (el) {
            el.classList.remove(style);
        })
        setTimeout(function () {
            toggleDisplay(el, 'none');
        }, time)
    }

    // Methods
    function openBackdrop() {
        fadeIn(backdrop, 'block', 'active')
    }

    function open(thatModal, style) {
        var display;
        body.classList.add('overflow');
        openBackdrop();
        toggleDisplay(container, 'flex');
        if (!style) {
            display = 'flex'
        } else {
            display = style
        }
        fadeIn(thatModal, display, 'active');
    }

    function closeBackdrop() {
        fadeOut(backdrop, 'active', duration);
    }

    function close() {
        closeBackdrop();
        fadeOut(item, 'active', duration);
        setTimeout(function () {
            toggleDisplay(container, 'none');
            body.classList.remove('overflow');
        }, 400)
    }
    
    // function change(thatModal, style) {
    //     if (item.hasClass('active')) {
    //         fadeOut(item, 'active', 300);
    //     }

    //     setTimeout(function () {
    //         fadeIn(thatModal, style, 'active');
    //     }, duration + 100)
    // }

    function outsideClick() {
        document.addEventListener("click", function (e) {
            var target = e.target;
            if (target.closest(itemClass)) return;
            s(item, function (el) {
                if (el.classList.contains('active')) {
                    close();
                }
            })
        });
    }

    // Init
    createBackdrop();
    closeBtn.forEach(function (el) {
        el.addEventListener('click', close);
    })

    outsideClick()

    // Api
    this.open = function(thatModal, style) {
        console.log('Opened');
        open(thatModal, style);
    }
}

var bd = new backdropModal();

document.querySelector('.asd').addEventListener('click', function() {
    bd.open(document.querySelector('#modal'))
})
document.querySelector('.asd2').addEventListener('click', function () {
    bd.open(document.querySelector('#modal2'))
})