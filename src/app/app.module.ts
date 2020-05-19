import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiDocComponent } from './api-doc/api-doc.component';
import { FormUploadComponent } from './form-upload/form-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    ApiDocComponent,
    FormUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
