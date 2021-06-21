import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from '../../../shared';
import { RouterModule, Routes } from '@angular/router';
import { QuickRoutingModule } from './quick-routing.module';
import { QuickComponent } from './quick.component';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [MatRadioModule,CommonModule, QuickRoutingModule, PageHeaderModule,FormsModule],
    declarations: [QuickComponent]
})
export class QuickModule {}
