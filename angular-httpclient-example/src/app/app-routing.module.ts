import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Modulos */
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ListadoComponent } from './listado/listado.component';


const routes: Routes = [
  { path: '', redirectTo: 'listado', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'listado', component: ListadoComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
