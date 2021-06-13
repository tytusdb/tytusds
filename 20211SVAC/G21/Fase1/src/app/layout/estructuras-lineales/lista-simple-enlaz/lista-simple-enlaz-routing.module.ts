import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaSimpleEnlazComponent } from './lista-simple-enlaz.component';

const routes: Routes = [
    {
        path: '',
        component: ListaSimpleEnlazComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListaSimpleEnlazRoutingModule {}
