import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaveCardDetailsComponent } from './components/save-card-details/save-card-details.component';

const routes: Routes = [
  { path: 'save-card', component: SaveCardDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
