// Modals and backdrop
function backdropModal(options) {
    function Init(options) {
        var body = document.querySelector('body');
        var bodyOverflow = 'overflow';
        var backdrop;
        var container = document.querySelector('.backdropContainer');
        var itemClass = '.backdropItem';
        var item = document.querySelectorAll(itemClass);
        var settings;
        var defaultSettings = {
            openBtn: '.bdOpen',
            closeBtn: '.bdClose',
            changeBtn: '.bdChange',
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
            ['openBtn', 'closeBtn', 'speed','changeBtn'].forEach(function(el) {
                hasProp(el);
            })
        }

        function createBackdrop() {
            var el = document.createElement('div');
            el.className = 'backdrop';
            body.insertBefore(el, container);
            backdrop = el;
        }

        // Utils
        function typeSelector(selector) {
            var element;
            if (typeof selector === 'string') {
                element = document.querySelectorAll(selector)
            } else {
                element = selector
            }
            return element
        }

        function s(el, cb) {
            if(typeof el === 'string') {
                document.querySelectorAll(el).forEach(function (el, indx) {
                    cb(el, indx)
                })
            } else {
                if (!el) return;
                if (el.length === undefined) {
                    cb(el)
                } else {
                    el.forEach(function (el, indx) {
                        cb(el, indx)
                    })
                }
            }
        }

        function hasClass(el,className) {
            var element;
            if (!el) return;
            if (typeof el === 'string') {
                element = document.querySelector(el);
            } else {
                element = el;
            }
            return element.classList.contains(className)
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
            s(el, function (el) {
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

        function setHeightModal() {
            var height = document.documentElement.clientHeight;
            container.style.height = height + 'px'
        }

        // Methods
        function openBackdrop() {
            fadeIn(backdrop, 'block', 'active')
        }

        function open(thatModal, style) {
            var display;
            addClass(body, bodyOverflow);
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

        function close(modal) {
            var el;
            if (modal && modal === false) {
                el = typeSelector(modal);
            } else {
                el = item
            }
            closeBackdrop();
            fadeOut(el, 'active', settings.speed);
            setTimeout(function () {
                toggleDisplay(container, 'none');
                removeClass(body, bodyOverflow);
            }, settings.speed + 100)
        }

        function change(current,next) {
            if (!hasClass(current, 'active')) return;
            fadeOut(current, 'active', settings.speed);
            setTimeout(function () {
                fadeIn(next, 'flex', 'active');
            }, settings.speed + 100)
        }

        function outsideClick() {
            document.addEventListener("click", function (e) {
                var target = e.target;
                if (target.closest(itemClass)) return;
                s(item, function (el) {
                    if (hasClass(el,'active')) {
                        close();
                    }
                })
            });
        }

        function resize() {
            var timer;
            window.addEventListener('resize', function () {
                clearInterval(timer);
                timer = setTimeout(setHeightModal, 300)
            })
        }

        // Init
        createBackdrop();
        setHeightModal();
        resize()

        s(settings.closeBtn, function (el) {
            el.addEventListener('click', function() {
                close()
            });
        })

        outsideClick();

        console.log(settings);
        s(settings.openBtn, function (el) {
            el.addEventListener('click', function () {
                var data = this.dataset.modal;
                open('#' + data);
            })
        })

        s(settings.changeBtn, function(el) {
            el.addEventListener('click', function() {
                var data = this.dataset.target;
                var parent = el.closest(itemClass);
                change(parent, data);
            })
        })

        // Api
        this.open = function (thatModal, style) {
            open(thatModal, style);
        }

        this.change = function (current, next) {
            change(current, next)
        }

        this.close = function (thatModal) {
            close(thatModal)
        }
    }
    return new Init(options)
}

var bd = backdropModal({
    openBtn: '.qwe',
    closeBtn: '.bdClose'
});

var asd = '#modal';
var asdModal = document.querySelector(asd)

document.querySelector('.openWith').addEventListener('click', function () {
    bd.open(asdModal)
})