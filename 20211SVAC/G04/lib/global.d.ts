interface JSONInputFile {
	grado?: number
	animacion?: number
	repeticion?: boolean
	categoria: string
	nombre: string
	valores: (number | string)[]
}

type LinearStructure = ListaSimple | PriorityQueue
type LinearNode = NodoSimple | NodoSimpleQ

type TreeStructure = ArbolBinario | ArbolAvl
type TreeNode = NodoBinario | NodoAvl

interface NodePosition extends PointPosition {
	value: string
}

interface GraphoInputValues {
	vertice: number
	aristas: {
		arista: number
		distancia: number
	}[]
}

interface PointPosition {
	x: number
	y: number
}

interface EdgePosition extends NodePosition {
	color: string
	isDouble: boolean
	randPhase: number
}

interface EdgeJoin {
	origin: EdgePosition
	dest: EdgePosition | null
	distance: number
}

interface BTreeData {
	values: NodoB[]
	level: number
}

interface IndexSearchItem {
	name: string
	url: string
}

interface CanvasRenderingContext2D {
	arrow(
		x: number,
		y: number,
		distance: number,
		width?: number,
		down?: boolean,
		left?: boolean,
		double?: boolean,
	): void
	roundRect(
		x: number,
		y: number,
		width: number,
		height: number,
		radius: number,
	): void
	arrowTo(x0: number, y0: number, x1: number, y1: number, radius?: number): void
	quadraticArrowCurveTo(
		x0: number,
		y0: number,
		x1: number,
		y1: number,
		cpx: number,
		cpy: number,
		radius?: number,
	): void
}

interface PointPosition {
	x: number
	y: number
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
