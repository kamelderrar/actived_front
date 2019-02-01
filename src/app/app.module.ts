import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FactureListComponent } from './facture-list/facture-list.component';
import {HttpClientModule} from "@angular/common/http";
import {FactureService} from "./facture.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatRadioModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatSliderModule,
    MatExpansionModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatCommonModule, MatTabsModule
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    FactureListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    NgxDatatableModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatRadioModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatSliderModule,
    MatExpansionModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatCommonModule,
    MatTabsModule
  ],
  providers: [FactureService],
  bootstrap: [AppComponent]
})
export class AppModule { }
