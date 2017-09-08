import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AccordionModule, GrowlModule, DataListModule } from 'primeng/primeng';
import { ToolbarModule, ButtonModule, SplitButtonModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AccordionModule, GrowlModule, DataListModule, ToolbarModule, ButtonModule, SplitButtonModule, PanelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private http: Http) {
  }

}