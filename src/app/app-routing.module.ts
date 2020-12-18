import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuscaComponent } from './components/busca/busca.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/busca', pathMatch: 'full'
  },
  {
    path: 'busca', component: BuscaComponent
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
