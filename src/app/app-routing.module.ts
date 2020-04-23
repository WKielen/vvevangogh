import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { HomeComponent } from './my-pages/home/home.component';
import { OfflineComponent } from './my-pages/offline/offline.component';
import { PAGEROLES, ROUTE } from 'src/app/shared/classes/Page-Role-Variables';
import { DefaultComponent } from './app-nav/default/default.component';
import { GebruikersComponent } from './my-pages/gebruikers/gebruikers.component';
import { BewonersComponent } from './my-pages/bewoners/bewoners.component';
import { DownloadComponent } from './my-pages/download/download.component';
import { OnderhoudComponent } from './my-pages/onderhoud/onderhoud.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: ROUTE.homePageRoute, component: HomeComponent },
      { path: ROUTE.bewonersPageRoute  , component: BewonersComponent, canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.bewonersPageRoles } },
      { path: ROUTE.downloadPageRoute  , component: DownloadComponent, canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.downloadPageRoles } },
      { path: ROUTE.onderhoudPageRoute, component: OnderhoudComponent, canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.onderhoudPageRoles } },
      { path: ROUTE.gebruikersPageRoute, component: GebruikersComponent, canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.gebruikersPageRoles } },
      { path: ROUTE.offlinePageRoute, component: OfflineComponent },
      { path: '**', component: HomeComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [OfflineComponent],
})

export class AppRoutingModule { }
