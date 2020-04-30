import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './../my-pages/home/home.component';
import { DownloadComponent } from './../my-pages/download/download.component';
import { BewonerDeleteDialogComponent } from './onderhoud/delete.dialog';
import { GebruikerDeleteDialogComponent } from './gebruikers/delete.dialog';
import { SignInDialogComponent } from './../my-pages/sign-in/sign-in.dialog';
import { RolesDialogComponent } from './gebruikers/roles.dialog';
import { CheckboxListComponent } from '../shared/components/checkbox.list.component';
import { ParentComponent } from '../shared/components/parent.component';
import { CustomMaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { BewonersComponent } from './bewoners/bewoners.component';
import { GebruikersComponent } from './gebruikers/gebruikers.component';
import { OnderhoudComponent } from './onderhoud/onderhoud.component';
import { BewonerAddDialogComponent } from './onderhoud/add.dialog';
import { GebruikerAddDialogComponent } from './gebruikers/add.dialog';
import { DocumentenComponent } from './documenten/documenten.component';
import { OnderhoudDocsComponent } from './onderhoud-docs/onderhoud-docs.component';
import { DocumentAddDialogComponent } from './onderhoud-docs/add.dialog';
import { DocumentDeleteDialogComponent } from './onderhoud-docs/delete.dialog';


@NgModule({
  declarations: [
    HomeComponent,
    BewonersComponent,
    GebruikersComponent,
    DownloadComponent,
    BewonerAddDialogComponent,
    GebruikerAddDialogComponent,
    DocumentAddDialogComponent,
    BewonerDeleteDialogComponent,
    GebruikerDeleteDialogComponent,
    DocumentDeleteDialogComponent,
    SignInDialogComponent,
    CheckboxListComponent,
    ParentComponent,
    OnderhoudComponent,
    DocumentenComponent,
    OnderhoudDocsComponent,
    RolesDialogComponent,
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    FlexLayoutModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    SharedModule,
  ],

})
export class MyPagesModule { }
