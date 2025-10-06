//https://stackoverflow.com/questions/123559/a-comprehensive-regex-for-phone-number-validation
function isValidPhoneNumber(input) {
    if (typeof input !== 'string') return false;
    const trimmed = input.replace(/\s+/g, '');
    return trimmed.length >= 10 && trimmed.length <= 20 && /^\d+$/.test(trimmed);
}

module.exports = isValidPhoneNumber;