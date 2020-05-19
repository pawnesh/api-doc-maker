import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiDocComponent } from './api-doc/api-doc.component';
import { FormUploadComponent } from './form-upload/form-upload.component';


const routes: Routes = [
  { path: '', component: FormUploadComponent },
  { path: 'docs', component: ApiDocComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
