
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import{LayoutRoutingModule} from "./layout-routing.module"

/* Angular Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '../angular-material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
/* FormsModule */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Angular Flex Layout */
import { FlexLayoutModule } from "@angular/flex-layout";

// import {MomentListComponent} from "../components/moment-list/moment-list.component"

@NgModule({
  
  imports: [
    CommonModule,  
    LayoutRoutingModule,  
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatSidenavModule
  ],
  declarations: [
    // MomentListComponent,
  ]
  // providers: [],
//   bootstrap: [AppComponent],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class LayoutModule { }