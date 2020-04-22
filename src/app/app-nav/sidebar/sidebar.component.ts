import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ROUTE, PAGEROLES } from 'src/app/shared/classes/Page-Role-Variables';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {

  // We gebruiken de 'isHandset' om te bepalen of het een mobiel is. Als het een mobiel is dan
  // sluiten we het menu direct nadat er een menu-item is gekozen.
  @Input('isHandset') isHandset: boolean;

  // Deze output wordt gebruikt om in de default component het menu te sluiten.
  @Output() displaySideBar: EventEmitter<any> = new EventEmitter();

  // Mag de optie in het menu worden getoond?
  showRouteHome: boolean = false;
  showRouteGebruikers: boolean = false;
  showRouteBewoners: boolean = false;
  showRouteDownload: boolean = false;

  // De routes naar de pagina's 
  routeHome = ROUTE.homePageRoute;
  routeGebruikers = ROUTE.gebruikersPageRoute;
  routeBewoners = ROUTE.bewonersPageRoute;
  routeDownload = ROUTE.downloadPageRoute;
  // Wordt gebruikt om de naam te tonen bovenaan het menu
  name = this.authService.fullName;

  constructor(
    private authService: AuthService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.showRouteHome = this.authService.showRoute(PAGEROLES.homePageRoles);
    this.showRouteGebruikers = this.authService.showRoute(PAGEROLES.gebruikersPageRoles);
    this.showRouteBewoners = this.authService.showRoute(PAGEROLES.bewonersPageRoles);
    this.showRouteDownload = this.authService.showRoute(PAGEROLES.downloadPageRoles);
  }
  // Op de mobiel wordt het menu automatisch gesloten wanneer en een keuze is gemaakt.
  route(myRoute: string): void {
    this.router.navigate([myRoute as any]);
    if (this.isHandset) {
      this.displaySideBar.emit(false);
    }
  }

}
