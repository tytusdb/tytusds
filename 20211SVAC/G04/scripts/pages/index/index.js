"use strict";
var localInitDarkValue = window.localStorage.getItem('darkmode') === '1';
var darkBtn = document.querySelector('#darkmode-btn > .icon-moon');
var indexSearchUL = document.getElementById('index-search-list');
var indexLinksList = [
    { name: 'Lista simple', url: 'public/pages/simplelist' },
    { name: 'Lista doble', url: 'public/pages/doublelist' },
    { name: 'Lista circular', url: 'public/pages/circularsimplelist' },
    { name: 'Lista circular doble', url: 'public/pages/circulardoublelist' },
    { name: 'Pila', url: 'public/pages/stack' },
    { name: 'Cola', url: 'public/pages/queue' },
    { name: 'Cola de prioridad', url: 'public/pages/priorityqueue' },
    { name: 'Ordenamiento burbuja', url: 'public/pages/bubblesort' },
    { name: 'Ordenamiento por selección', url: 'public/pages/selectionsort' },
    { name: 'Ordenamiento por inserción', url: 'public/pages/insertionsort' },
    { name: 'Ordenamiento rápido', url: 'public/pages/quicksort' },
    { name: 'Árbol BST', url: 'public/pages/binarytree' },
    { name: 'Árbol AVL', url: 'public/pages/avltree' },
    { name: 'Árbol B', url: 'public/pages/btree' },
    { name: 'Árbol B+', url: 'public/pages/bplustree' },
    { name: 'Árbol de Merkle', url: 'public/pages/merkletree' },
];
var toggleDarkBtn = function () {
    var darkValue = window.localStorage.getItem('darkmode') === '1';
    setIconDark(!darkValue);
    toggleDarkMode();
};
var setIconDark = function (darkValue) {
    if (darkBtn)
        darkBtn.className = darkValue ? 'icon-sun' : 'icon-moon';
};
setIconDark(localInitDarkValue);
var ndf = function (str) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
};
var onSearchInputChange = function (ev) {
    var target = ev.target;
    var value = ndf(target.value);
    var length = indexLinksList.length;
    var findValues = [];
    for (var linksIndex = 0; linksIndex < length; linksIndex++)
        if (ndf(indexLinksList[linksIndex].name).indexOf(value) !== -1)
            findValues.push(indexLinksList[linksIndex]);
    if (indexSearchUL) {
        indexSearchUL.innerHTML = '';
        findValues.forEach(function (searchItem) {
            return (indexSearchUL.innerHTML += "<li><a href='" + searchItem.url + "' target='_blank' title='" + searchItem.name + "'>" + searchItem.name + "</a></li>");
        });
    }
};
