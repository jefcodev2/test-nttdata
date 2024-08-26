import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PagesRoutingModule } from './pages/pages.routing';

const routes : Routes = [
  /* { path: 'products', component:ProductsComponent}, */
  { path: '', redirectTo :'/products', pathMatch:'full'},
  { path: '**', component:NopagefoundComponent}
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule]
})
export class AppRoutingModule { }
