import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';

/**
 * First, AppRoutingModule imports RouterModule and Routes so the app can have routing functionality. 
 * The next import, HeroesComponent, will give the Router somewhere to go once you configure the routes.
 * 
 * Notice that the CommonModule references (there was in the initial class) and declarations array are unnecessary, 
 * so are no longer part of AppRoutingModule. The following sections explain the rest of the AppRoutingModule in 
 * more detail.
 * 
 * https://angular.io/tutorial/toh-pt5
 * 
 */

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }