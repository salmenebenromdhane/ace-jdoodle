import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AceCodeComponent } from './ace-code/ace-code.component';
import { AceEditorModule } from 'ng2-ace-editor';
import { HttpClientModule } from '@angular/common/http';
import { AddCodeComponent } from './add-code/add-code.component';

@NgModule({
  declarations: [AppComponent, AceCodeComponent, AddCodeComponent],
  imports: [BrowserModule, AppRoutingModule, AceEditorModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
