import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewComponent } from './components/new/new.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'new/48ec3192-5f04-466b-b7cd-7134f3ea4d67', 
    pathMatch: 'full'
  },
  {
    path: 'new/:id',
    component: NewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
