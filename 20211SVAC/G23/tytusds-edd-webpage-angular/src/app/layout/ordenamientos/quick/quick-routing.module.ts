import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuickComponent } from './quick.component';

const routes: Routes = [
    {
        path: '',
        component: QuickComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuickRoutingModule {}
