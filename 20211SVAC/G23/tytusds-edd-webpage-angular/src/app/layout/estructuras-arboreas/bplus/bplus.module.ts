import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from '../../../shared';
import { RouterModule, Routes } from '@angular/router';
import { BplusRoutingModule } from './bplus-routing.module';
import { BplusComponent } from './bplus.component';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [MatRadioModule,CommonModule, BplusRoutingModule, PageHeaderModule,FormsModule],
    declarations: [BplusComponent]
})
export class BplusModule {}
