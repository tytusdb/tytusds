import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerkleComponent } from './merkle.component';

const routes: Routes = [
    {
        path: '',
        component: MerkleComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MerkleRoutingModule {}
