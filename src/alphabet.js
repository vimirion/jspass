(function() {
    function Alphabet(restricted) {
        var dic = {},
            position = {},
            firstRequest = true;

        if (typeof restricted === 'undefined' || typeof restricted.pop !== 'function') {
            restricted = [];
        }

        _configAlphabet();

        if (_countDics() === 0) {
            restricted = [];
            _configAlphabet();
        }

        position = {
            current: _getDicNameByNumber(0),
            total: _countDics()
        };

        function _configAlphabet() {
            if (restricted.indexOf('uppercase') === -1) {
                dic.uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
            }
            if (restricted.indexOf('lowercase') === -1) {
                dic.lowercase = 'abcdefghijklmnopqrstuvwxyz'.split('');
            }
            if (restricted.indexOf('digits') === -1) {
                dic.digits = '1234567890'.split('');
            }
            if (restricted.indexOf('symbols') === -1) {
                dic.symbols = '!\"#$%&\'()*+,./:;<=>?@[\\]^{|}~'.split('');
            }
        }

        function _countDics() {
            return Object.keys(dic).length;
        }

        function _getDicNameByNumber(number) {
            return Object.keys(dic)[number];
        }

        function _getDicNumberByName(name) {
            return Object.keys(dic).indexOf(name);
        }

        function next() {
            if (firstRequest) {
                firstRequest = false;
                return getCurrent();
            } else {
                var currName = position.current,
                    currIndex = _getDicNumberByName(currName),
                    nextIndex = currIndex + 1,
                    realNextIndex = nextIndex > position.total - 1 ? 0 : nextIndex,
                    realNextName = _getDicNameByNumber(realNextIndex),
                    realNextDic = dic[realNextName];

                if (realNextDic) {
                    position.current = realNextName;
                    return realNextDic;
                }
            }
        }

        function getCurrent() {
            return dic[position.current];
        }

        function reset() {
            position.current = _getDicNameByNumber(0);
            position.total = _countDics();
            return dic[position.current];
        }

        return {
            next: next,
            current: getCurrent,
            reset: reset
        };
    }

    window.Alphabet = Alphabet;
})();
