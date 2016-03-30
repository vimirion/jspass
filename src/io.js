(function() {
    function getInputVal(selector) {
        if (selector) {
            return document.querySelector(selector).value;
        } else {
            throw 'Selector is absent';
        }
    }

    function getCheckboxVal(selector) {
        if (selector) {
            return document.querySelector(selector).checked;
        }
    }

    function setInputVal(selector, val) {
        if (selector) {
            document.querySelector(selector).value = val;
        } else {
            throw 'Selector is absent';
        }
    }

    function genRestrictions() {
        var restricted = [];

        if (!getCheckboxVal('#uppercase')) {
            restricted.push('uppercase');
        }
        if (!getCheckboxVal('#lowercase')) {
            restricted.push('lowercase');
        }
        if (!getCheckboxVal('#digits')) {
            restricted.push('digits');
        }
        if (!getCheckboxVal('#symbols')) {
            restricted.push('symbols');
        }

        return restricted;
    }

    function exportToBuffer(result) {
        if (result) {
            if (document.execCommand) {
                document.getElementById('#result').select();
                document.execCommand('copy');
            } else {
                window.prompt('Нажмите для копирования: Ctrl+C, Enter', result);
            }
        }
    }

    document.querySelector('#generate').addEventListener(
        'click',
        function(e) {
            e.preventDefault();
            var key = getInputVal('#mainPass'),
                app = getInputVal('#domain'),
                length = getInputVal('#length'),
                result = JSpass.generatePassword(app, key, length, genRestrictions());

            setInputVal('#result', result);
            // exportToBuffer(result);
            // console.log(result);
        });
})();
