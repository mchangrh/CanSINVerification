"use strict";

function getRegion(sin) {
    // geographical mapping of SIN numbers
    var maps = {
        "1": "NB, NF, NS, PE",
        "2": "QC",
        "3": "QC",
        "4": "ON",
        "5": "ON",
        "6": "AB, MB, SK, NT, NU",
        "7": "BC, YU",
        "8": "NOT USED",
        "9": "Immigrants & Temp SIN",
        "0": "NOT USED"
    };
    // get first character of SIN
    return maps[sin.charAt(0)];
}

// https://gist.github.com/ShirtlessKirk/2134376
// Phil Green (ShirtlessKirk2)
function luhnChk2(arr) {
    return function (ccNum) {
        var
            len = ccNum.length,
            bit = 1,
            sum = 0,
            val;
        while (len) {
            val = parseInt(ccNum.charAt(--len), 10);
            sum += (bit ^= 1) ? arr[val] : val;
        }
        return sum && sum % 10 === 0;
    };
}

// Set Valid classes
function setValid(element, valid) {
    if (valid) {
        element.classList.remove('is-invalid');
        element.classList.add('is-valid');
    } else {
        element.classList.remove('is-valid');
        element.classList.add('is-invalid');
    }
}

// All Together
function verifySIN(sin, result) {
    // Reset province
    result.province = "None";
    if (sin.length !== 9) { // Fail if length is not 9
        // set validity
        result.valid = false;
        result.reason = "SIN Invalid: Incomplete";
    } else if (!luhnChk2(sin)) { // Fail if luhn check is invalid
        // set validity
        result.valid = false;
        result.reason = "SIN Invalid: Failed Check";
    } else { // has 9 numbers and passed luhn check
        // set validity
        result.valid = true;
        result.province = getRegion(sin);
    }
}