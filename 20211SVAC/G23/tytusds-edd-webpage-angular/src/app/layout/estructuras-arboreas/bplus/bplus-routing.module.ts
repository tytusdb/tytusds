import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BplusComponent } from './bplus.component';

const routes: Routes = [
    {
        path: '',
        component: BplusComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BplusRoutingModule {}
