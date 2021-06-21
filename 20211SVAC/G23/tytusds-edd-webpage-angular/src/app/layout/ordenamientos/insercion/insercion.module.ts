import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from '../../../shared';
import { RouterModule, Routes } from '@angular/router';
import { InsercionRoutingModule } from './insercion-routing.module';
import { InsercionComponent } from './insercion.component';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [MatRadioModule,CommonModule, InsercionRoutingModule, PageHeaderModule,FormsModule],
    declarations: [InsercionComponent]
})
export class InsercionModule {}