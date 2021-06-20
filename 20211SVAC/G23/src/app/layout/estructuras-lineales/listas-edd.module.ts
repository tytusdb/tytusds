import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from '../../shared';
import { RouterModule, Routes } from '@angular/router';
import { ListasEddRoutingModule } from './listas-edd-routing.module';
import { ListasEddComponent } from './listas-edd.component';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [MatRadioModule,CommonModule, ListasEddRoutingModule, PageHeaderModule,FormsModule],
    declarations: [ListasEddComponent]
})
export class ListasEddModule {}
