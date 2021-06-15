import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from './../../../shared';
import { RouterModule, Routes } from '@angular/router';
import { ListaSimpleEnlazRoutingModule } from './lista-simple-enlaz-routing.module';
import { ListaSimpleEnlazComponent } from './lista-simple-enlaz.component';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [MatRadioModule,CommonModule, ListaSimpleEnlazRoutingModule, PageHeaderModule,FormsModule],
    declarations: [ListaSimpleEnlazComponent]
})
export class ListaSimpleEnlazModule {}
