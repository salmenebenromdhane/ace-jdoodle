import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AceCodeComponent } from './ace-code/ace-code.component';

const routes: Routes = [
  {
    path: 'test',
    component: AceCodeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
