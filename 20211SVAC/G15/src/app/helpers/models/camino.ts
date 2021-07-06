import { NODO } from "./nodo";

export interface CAMINO {
  nodos: CAMINO[];
  PADRE: CAMINO|null;
  valor: number;
  letra: string;
  id: string;
  nivel: number;
}
