import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from '../../../shared';
import { RouterModule, Routes } from '@angular/router';
import { BRoutingModule } from './b-routing.module';
import { BComponent } from './b.component';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [MatRadioModule,CommonModule, BRoutingModule, PageHeaderModule,FormsModule],
    declarations: [BComponent]
})
export class BModule {}
