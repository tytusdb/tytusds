import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { AbbComponent } from './estructuras-arboreas/abb/abb.component';
import { AvlComponent } from './estructuras-arboreas/avl/avl.component';
import { BComponent } from './estructuras-arboreas/b/b.component';
import { BplusComponent } from './estructuras-arboreas/bplus/bplus.component';
import { MerkleComponent } from './estructuras-arboreas/merkle/merkle.component';
import { GraficarComponent } from './estructuras-arboreas/graficar/graficar.component';

@NgModule({
    imports: [CommonModule,  
        LayoutRoutingModule, 
        TranslateModule, 
        NgbDropdownModule,
        FormsModule,
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent, GraficarComponent/*, MerkleComponent, AbbComponent, AvlComponent, BComponent, BplusComponent/*, OrdenamientosComponent, ListaSimpleEnlazComponent*/]
})
export class LayoutModule {}
