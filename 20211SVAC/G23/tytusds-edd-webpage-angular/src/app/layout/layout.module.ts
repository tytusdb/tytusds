import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { AbbComponent } from './estructuras-arboreas/abb/abb.component';
import { AvlComponent } from './estructuras-arboreas/avl/avl.component';
import { BComponent } from './estructuras-arboreas/b/b.component';
import { BplusComponent } from './estructuras-arboreas/bplus/bplus.component';

@NgModule({
    imports: [CommonModule, LayoutRoutingModule, TranslateModule, NgbDropdownModule],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent, AbbComponent, AvlComponent, BComponent, BplusComponent/*, OrdenamientosComponent, ListaSimpleEnlazComponent*/]
})
export class LayoutModule {}
