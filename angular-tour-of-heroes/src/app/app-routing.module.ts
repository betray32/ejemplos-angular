import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';

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

    // This route redirects a URL that fully matches the empty path to the route whose path is '/dashboard'.
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },

  // The colon (:) in the path indicates that :id is a placeholder for a specific hero id.
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }