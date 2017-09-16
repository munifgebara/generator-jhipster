import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AccordionModule, GrowlModule, DataListModule } from 'primeng/primeng';     //accordion and accordion tab
import { ToolbarModule, ButtonModule, SplitButtonModule } from 'primeng/primeng';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';

import { UserService } from './service';
import { RoutingModule } from './routing.module';
import { CrudComponent } from './crud/crud.component';
import { ListaComponent } from './lista/lista.component';
import { DetalhesComponent } from './detalhes/detalhes.component';

@NgModule({
  imports: [
    CommonModule, FormsModule, PanelModule,
    RoutingModule,
    BrowserAnimationsModule,
    AccordionModule, GrowlModule, DataListModule, ToolbarModule, ButtonModule, SplitButtonModule,DropdownModule,
    DataTableModule, SharedModule, InputTextModule, AutoCompleteModule

  ],
  providers: [UserService],
  declarations: [CrudComponent, ListaComponent, DetalhesComponent]
})
export class UserModule { }
