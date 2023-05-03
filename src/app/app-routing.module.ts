import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewComponent } from './new/new.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'new/1', 
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
