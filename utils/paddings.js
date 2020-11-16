module.exports = {
    zeroPad: (num, places) => String(num).padStart(places, '0'),
    spacePad: (num, places) => String(num).padStart(places, ' '),
    underscorePad: (num, places) => String(num).padStart(places, '_'),
    dotPad: (num, places) => String(num).padStart(places, '.')
};