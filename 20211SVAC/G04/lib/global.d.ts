interface JSONInputFile {
	categoria: string
	nombre: string
	valores: (number | string)[]
}

type LinearStructure = ListaSimple
type LinearNode = NodoSimple

type TreeStructure = ArbolBinario | ArbolAvl
type TreeNode = NodoBinario | NodoAvl

interface BTreeData {
	values: NodoB[]
	level: number
}

interface IndexSearchItem {
	name: string
	url: string
}

interface CanvasRenderingContext2D {
	arrow: (
		x: number,
		y: number,
		distance: number,
		width?: number,
		down?: boolean,
		left?: boolean,
		double?: boolean,
	) => void
	roundRect: (
		x: number,
		y: number,
		width: number,
		height: number,
		radius: number,
	) => void
}

interface Lista {
	raiz: NodoSimple
	tamaño: number
	nodoActual?: NodoSimple

	setActualRaiz?: () => void
	pasarSiguiente?: () => void
	getNodoActual?: () => NodoSimple

	insertar: (valor: string | number) => void
	eliminar: (valor: string | number) => void
	buscar: (valor: string | number) => NodoSimple | null
	obtener: (indice: number) => NodoSimple | null
	actualizar: (valor: string | number, nuevo: string | number) => void
	getTamaño: () => number
	push: (valor: string | number) => void
	pop: () => NodoSimple | null
	descolar: () => NodoSimple | null
}
