import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LineComponent } from 'projects/charts/line/line';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    LineComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
