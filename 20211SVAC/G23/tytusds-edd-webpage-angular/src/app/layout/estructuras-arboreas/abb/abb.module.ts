import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from '../../../shared';
import { RouterModule, Routes } from '@angular/router';
import { AbbRoutingModule } from './abb-routing.module';
import { AbbComponent } from './abb.component';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [MatRadioModule,CommonModule, AbbRoutingModule, PageHeaderModule,FormsModule],
    declarations: [AbbComponent]
})
export class AbbModule {}
