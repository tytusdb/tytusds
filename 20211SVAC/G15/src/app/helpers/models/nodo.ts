import { DataSet } from "vis-data";
import { EDGE } from "./edge";

export interface NODO {
  id: string;
  label: string;
  hijos: DataSet<EDGE>;
}
