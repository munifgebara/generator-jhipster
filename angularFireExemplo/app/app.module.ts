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
import { AutorizadorService} from './comum/autorizador.service';
import { LoginComponent } from './comum/login.component';
import { DashboardComponent } from './comum/dashboard.component';
import { PietraGuard } from './comum/pietra.guard';
import { UserModule } from './users/users.module';
import { MenuModule,MenuItem } from 'primeng/primeng';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase,'site'),
    AngularFireDatabaseModule, 
    AngularFireAuthModule, 
    HttpModule,
    BrowserAnimationsModule,
    AccordionModule, GrowlModule, DataListModule, ToolbarModule, ButtonModule, SplitButtonModule, PanelModule, MenuModule,
    UserModule,

   /* jhipster-needle-add-entity-module - JHipster will add entity modules here */

    AppRoutingModule
  ],
  providers: [AutorizadorService,PietraGuard],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private http: Http) {
  }

}