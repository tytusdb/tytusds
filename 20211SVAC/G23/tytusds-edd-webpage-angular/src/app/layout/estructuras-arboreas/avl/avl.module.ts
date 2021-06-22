import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from '../../../shared';
import { RouterModule, Routes } from '@angular/router';
import { AvlRoutingModule } from './avl-routing.module';
import { AvlComponent } from './avl.component';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [MatRadioModule,CommonModule, AvlRoutingModule, PageHeaderModule,FormsModule],
    declarations: [AvlComponent]
})
export class AvlModule {}
