import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { CustomMaterialModule } from './custom-material/custom-material.module';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { SubjectsPageComponent } from './subjects-page/subjects-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { GradesListComponent } from './grades-list/grades-list.component';


@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    SubjectsPageComponent,
    LoginPageComponent,
    GradesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CustomMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
