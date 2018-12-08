// Modals and backdrop
function backdropModal(options) {
    var body = document.querySelector('body');
    var backdrop;
    var container = document.querySelector('.backdropContainer');
    var itemClass = '.backdropItem';
    var item = document.querySelectorAll(itemClass);
    var closeBtn = document.querySelectorAll('.backdrop-close');
    var settings;
    var defaultSettings = {
        className: '.bd',
        speed: 300
    }

    function hasProp(prop) {
        if (!options.hasOwnProperty(prop)) {
            settings[prop] = defaultSettings[prop];
        } else {
            settings[prop] = options[prop];
        }
    }

    if (!options && typeof options !== 'object') {
        settings = defaultSettings
    } else {
        settings = options;
        hasProp('className');
        hasProp('speed');
    }

    function createBackdrop() {
        var el = document.createElement('div');
        el.className = 'backdrop';
        body.insertBefore(el, container);
        backdrop = el;
    }
    
    // Utils
    function s(el, cb) {
        if (el.length === undefined) {
            if (!el) return;
            cb(el)
        } else {
            if (!el) return;
            el.forEach(function (el, indx) {
                cb(el, indx)
            })
        }
    }
    function removeClass(el, state) {
        s(el, function (el) {
            el.classList.remove(state);
        })
    }

    function addClass(el, state) {
        s(el, function (el) {
            el.classList.add(state);
        })
    }

    function toggleDisplay(el, value) {
        s(el, function(el) {
            el.style.display = value
        })
    }

    function fadeIn(el, display, style) {
        toggleDisplay(el, display);
        setTimeout(addClass, 100, el, style)
    }

    function fadeOut(el, style, time) {
        removeClass(el, style);
        setTimeout(toggleDisplay, time, el, 'none')
    }

    // Methods
    function openBackdrop() {
        fadeIn(backdrop, 'block', 'active')
    }

    function open(thatModal, style) {
        var display;
        addClass(body, 'overflow');
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
        fadeOut(backdrop, 'active', settings.speed);
    }

    function close() {
        closeBackdrop();
        fadeOut(item, 'active', settings.speed);
        setTimeout(function () {
            toggleDisplay(container, 'none');
            removeClass(body, 'overflow');
        }, 400)
    }
    
    function change(thatModal, style) {
        if (thatModal.classList.contains('active')) {
            fadeOut(item, 'active', settings.speed);
        }

        setTimeout(function () {
            fadeIn(thatModal, style, 'active');
        }, settings.speed + 100)
    }

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
    s(closeBtn,function (el) {
        el.addEventListener('click', close);
    })

    outsideClick()

    console.log(settings);
    s(document.querySelectorAll(settings.className), function(el) {
        el.addEventListener('click', function() {
            var data = this.dataset.modal;
            open(document.querySelector('#' + data));
        })
    })

    // Api
    this.open = function(thatModal, style) {
        open(thatModal, style);
    }
}

var bd1 = new backdropModal({
    className: '.qwe'
});

var bd2 = new backdropModal({
    className: '.zxc',
    speed: 2600
});