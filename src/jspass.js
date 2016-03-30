(function(CryptoJS, Alphabet) {
    function generateWordArray(text, key, length) {
        length = length || 20;

        if (text && key && CryptoJS) {
            return CryptoJS.PBKDF2(text, key, {
                keySize: length,
                iterations: 8
            });
        }
    }

    function getLetter(sum, dic) {
        if (sum > 0 && dic.length > 0) {
            return dic[sum % dic.length];
        }
    }

    function matchWordArrayWithLetters(wordsArray, alphabetSettings) {
        if (wordsArray && Alphabet) {
            var alph = new Alphabet(alphabetSettings);

            var mas = wordsArray.toString().split(''),
                buf = 0,
                res = '';

            for (var i = 1; i <= mas.length; i++) {
                buf += mas[i - 1].charCodeAt(0);
                if (i % 8 === 0) {
                    res += getLetter(buf, alph.next());
                    buf = 0;
                }
            }
        }
        return res;
    }

    function generatePassword(service, key, length, alphabetSettings) {
        return matchWordArrayWithLetters(generateWordArray(service, key, length), alphabetSettings);
    }

    window.JSpass = {
        generatePassword: generatePassword
    };
})(CryptoJS, Alphabet);
