import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LogonData } from 'src/app/shared/classes/LogonData';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  @Output() logonStatusToSideBar: EventEmitter<any> = new EventEmitter();

  logonData: LogonData = new LogonData;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.logonData.Name = this.authService.fullName;
    this.logonData.UserId = this.authService.userId;
    this.logonData.IsLoggedOn = this.authService.isLoggedIn();
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  onSignOff(): void {
    this.authService.logOff();
    this.logonData.IsLoggedOn = false;
    this.logonData.ShouldDisplayMenu = false;
    this.logonStatusToSideBar.emit(this.logonData);
    this.router.navigate([environment.homePage]);
  }
}
