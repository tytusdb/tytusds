import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartsModule as Ng2Charts } from 'ng2-charts'; 
import { PageHeaderModule } from '../../shared';
import {MatRadioModule} from '@angular/material/radio';
import { OrdenamientosRoutingModule } from './ordenamientos-routing.module';
import { OrdenamientosComponent } from './ordenamientos.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [MatRadioModule,CommonModule, Ng2Charts, OrdenamientosRoutingModule, PageHeaderModule,FormsModule],
    declarations: [OrdenamientosComponent]
})
export class OrdenamientosModule {}
