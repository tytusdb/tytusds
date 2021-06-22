import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from '../../../shared';
import { RouterModule, Routes } from '@angular/router';
import { MerkleRoutingModule } from './merkle-routing.module';
import { MerkleComponent } from './merkle.component';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [MatRadioModule,CommonModule, MerkleRoutingModule, PageHeaderModule,FormsModule],
    declarations: [MerkleComponent]
})
export class MerkleModule {}
