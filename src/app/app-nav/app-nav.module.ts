import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { HeaderLandingComponent } from './headerlanding/header.landing.component';
import { FooterComponent } from './footer/footer.component';
import { FooterLandingComponent } from './footerlanding/footer.landing.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { DefaultComponent } from './default/default.component';


@NgModule({
  declarations: [
    DefaultComponent,
    HeaderComponent,
    HeaderLandingComponent,
    FooterComponent,
    FooterLandingComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,

    MatSidenavModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
  ],
  exports: [
    HeaderComponent,
    HeaderLandingComponent,
    FooterComponent,
    FooterLandingComponent,
    SidebarComponent,
  ]
})

export class AppNavModule { }
