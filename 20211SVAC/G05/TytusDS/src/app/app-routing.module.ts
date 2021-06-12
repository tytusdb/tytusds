import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { ConfigComponent } from './components/config/config.component';


const routes: Routes = [
  {path: 'menu', component: MenuComponent},
  {path: 'configuracion', component: ConfigComponent},
  {path: '**', redirectTo: 'menu'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
