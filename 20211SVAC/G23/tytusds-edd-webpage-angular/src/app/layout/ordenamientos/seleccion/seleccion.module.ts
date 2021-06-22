import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from '../../../shared';
import { RouterModule, Routes } from '@angular/router';
import { SeleccionRoutingModule } from './seleccion-routing.module';
import { SeleccionComponent } from './seleccion.component';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [MatRadioModule,CommonModule, SeleccionRoutingModule, PageHeaderModule,FormsModule],
    declarations: [SeleccionComponent]
})
export class SeleccionModule {}