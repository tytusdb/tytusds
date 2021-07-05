"use strict";
var toCamelCase = function (text) {
    return text.replace(text.charAt(0), text.charAt(0).toUpperCase());
};
var primaryColors = [
    { name: '--monoLight', value: '#fafafa' },
    { name: '--monoConst', value: '#299cbf' },
    { name: '--monoText', value: '#65645c' },
    { name: '--keyword', value: '#f9055d' },
    { name: '--monoClass', value: '#7f68a9' },
    { name: '--monoNumber', value: '#cf7102' },
    { name: '--monoFunc', value: '#0089b3' },
    { name: '--paper', value: '#f2f2f2' },
    { name: '--pale', value: '#e5e5e5' },
    { name: '--lightPale', value: '#f2f2f2' },
    { name: '--opal', value: '#adbac7' },
    { name: '--night', value: 'hsl(215, 15%, 12%)' },
    { name: '--dark', value: '#22272e' },
    { name: '--hole', value: '#2d333b' },
    { name: '--darkNight', value: 'hsl(215, 15%, 30%)' },
    { name: '--gray', value: '#768390' },
    { name: '--bone', value: '#f5f5fb' },
    { name: '--white', value: '#fff' },
    { name: '--lightOrange', value: '#ffd280' },
    { name: '--lightRose', value: '#ffb1a3' },
    { name: '--blue', value: '#5e81f4' },
    { name: '--oceanLight', value: '#8095ff' },
    { name: '--lightBlueGray', value: '#778dad' },
    { name: '--blueGray', value: '#768492' },
    { name: '--lightGray', value: '#8da1b5' },
    { name: '--darkGray', value: '#272829' },
    { name: '--oceanBright', value: '#8fc7ff' },
    { name: '--darkOcean', value: '#011f3b' },
    { name: '--moonOcean', value: '#011f3bcc' },
    { name: '--lightPurple', value: '#9ba0fc' },
    { name: '--lightOceanGray', value: '#83919e' },
    { name: '--lightTeal', value: '#eef2fd' },
    { name: '--brightTeal', value: '#dfe6fd' },
    { name: '--teal', value: '#5e81f4' },
    { name: '--ice', value: '#0cc3e7' },
    { name: '--lightIce', value: '#d5f5fb' },
    { name: '--cold', value: '#d3f4fb' },
    { name: '--soda', value: '#ffae33' },
    { name: '--green', value: '#77dd77' },
    { name: '--lightSoda', value: '#ffefd6' },
    { name: '--brightSoda', value: '#ffe6e8' },
];
var localDarkValue = window.localStorage.getItem('darkmode');
var isDarkMode = localDarkValue === '1';
var baseColors = [];
var colorPer = [];
primaryColors.forEach(function (pColor) {
    primaryColors.forEach(function (pSColor) {
        return colorPer.push({
            name: pColor.name === pSColor.name
                ? pColor.name
                : "" + pColor.name + toCamelCase(pSColor.name.substr(2)),
            value: pColor.value,
            darkValue: pSColor.value,
        });
    });
});
var colors = baseColors.concat(colorPer);
var changeColor = function (selectedColor, dark) {
    var body = document.body;
    body.style.setProperty(selectedColor.name, dark ? selectedColor.darkValue : selectedColor.value);
};
var setEachColors = function (darkValue) {
    return colors.forEach(function (color) { return changeColor(color, darkValue); });
};
var toggleDarkMode = function () {
    var darkValue = window.localStorage.getItem('darkmode') === '1';
    window.localStorage.setItem('darkmode', darkValue ? '0' : '1');
    setEachColors(!darkValue);
};
if (!localDarkValue) {
    window.localStorage.setItem('darkmode', '1');
    toggleDarkMode();
}
else
    setEachColors(localDarkValue === '1');
var getColor = function (name) {
    var style = getComputedStyle(document.body);
    return style.getPropertyValue(name);
};
