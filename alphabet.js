(function() {
    function Alphabet(restricted) {
        var dic = {},
            position = {},
            firstRequest = true;

        if (typeof restricted === 'undefined' || typeof restricted.pop !== 'function') {
            restricted = [];
        }

        configAlphabet();

        if (countDics() === 0) {
            restricted = [];
            configAlphabet();
        }

        position = {
            current: getDicNameByNumber(0),
            total: countDics()
        };

        function configAlphabet() {
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
                dic.symbols = '!\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'.split('');
            }
        }

        function countDics() {
            return Object.keys(dic).length;
        }

        function getDicNameByNumber(number) {
            return Object.keys(dic)[number];
        }

        function getDicNumberByName(name) {
            return Object.keys(dic).indexOf(name);
        }

        function next() {
            if (firstRequest) {
                firstRequest = false;
                return getCurrent();
            } else {
                var currName = position.current,
                    currIndex = getDicNumberByName(currName),
                    nextIndex = currIndex + 1,
                    realNextIndex = nextIndex > position.total - 1 ? 0 : nextIndex,
                    realNextName = getDicNameByNumber(realNextIndex),
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
            position.current = getDicNameByNumber(0);
            position.total = countDics();
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
