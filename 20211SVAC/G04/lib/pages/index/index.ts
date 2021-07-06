// ELEMENTOS
const localInitDarkValue: boolean =
	window.localStorage.getItem('darkmode') === '1'
const darkBtn: HTMLElement | null = document.querySelector(
	'#darkmode-btn > .icon-moon',
)
const indexSearchUL = document.getElementById('index-search-list')

// GLOBALES
const indexLinksList: IndexSearchItem[] = [
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
]

// CAMBIAR DARKMODE
const toggleDarkBtn = (): void => {
	// DARKMODE LOCAL
	const darkValue: boolean = window.localStorage.getItem('darkmode') === '1'

	// CAMBIAR
	setIconDark(!darkValue)
	toggleDarkMode()
}

// INICIAR CON DARKMODE
const setIconDark = (darkValue: boolean): void => {
	if (darkBtn) darkBtn.className = darkValue ? 'icon-sun' : 'icon-moon'
}
setIconDark(localInitDarkValue)

// MOSTRAR RESULTADOS DE BÚSQUEDA
const ndf = (str: string): string =>
	str
		// @ts-ignore
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.trim()
const onSearchInputChange = (ev: Event) => {
	// INPUT
	const target = ev.target as HTMLInputElement
	const value: string = ndf(target.value)
	const length: number = indexLinksList.length
	const findValues: IndexSearchItem[] = []

	// BUSCAR
	for (let linksIndex: number = 0; linksIndex < length; linksIndex++)
		if (ndf(indexLinksList[linksIndex].name).indexOf(value) !== -1)
			findValues.push(indexLinksList[linksIndex])

	// ASIGNAR EN LISTA HTML
	if (indexSearchUL) {
		indexSearchUL.innerHTML = ''
		findValues.forEach(
			(searchItem: IndexSearchItem) =>
				(indexSearchUL.innerHTML += `<li><a href='${searchItem.url}' target='_blank' title='${searchItem.name}'>${searchItem.name}</a></li>`),
		)
	}
}
