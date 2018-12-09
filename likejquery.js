function a(el) {
    var asd = function (el) {
        var element;
        if (typeof el === 'string') {
            element = document.querySelectorAll(el)
        } else {
            element = el
        }

        function loop(cb) {
            element.forEach(function (el, indx) {
                if (cb) {
                    cb(el, indx)
                }
            })
        }

        this.addClass = function (className, eq) {
            loop(function (el, indx) {
                if (indx !== eq) return
                el.classList.add(className)
            })
        }

        this.removeClass = function (className, eq) {
            loop(function (el, indx) {
                if (indx !== eq) return
                el.classList.remove(className)
            })
        }

        this.each = function (cb) {
            loop(function (el, index) {
                cb(el, index)
            })
        }
    }
    return new asd(el)
}

a('.box').addClass('z', 1)
a('.box').each(function (el, indx) {
    el.style.width = '300px'
    if (indx === 0) {
        el.style.backgroundColor = 'red'
    }
})