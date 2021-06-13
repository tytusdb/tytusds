import { Pipe, PipeTransform } from "@angular/core";
import { Tienda } from "./models/tienda/tienda";


@Pipe({
    name: "ObjToArray"
})

export class ObjToArrayPipe implements PipeTransform{
    transform(object:any = []): any{
        return Object.values(object);
    }
}