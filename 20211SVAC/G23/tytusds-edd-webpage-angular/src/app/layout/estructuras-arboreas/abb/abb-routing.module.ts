import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbbComponent } from './abb.component';

const routes: Routes = [
    {
        path: '',
        component: AbbComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AbbRoutingModule {}
