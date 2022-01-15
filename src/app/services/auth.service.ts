import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/internal/operators/map';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private tokenname:string = 'vvetoken';

  constructor(private http: HttpClient,
  ) {
    this.isLoggedIn();
  }

  jwtHelper: JwtHelperService = new JwtHelperService();

  login$(credentials) {
    let localData;

    credentials.password = <string>Md5.hashStr(credentials.password);
    return this.http.post<string>(environment.loginUrl, credentials)
      .pipe(
        map(response => {
          localData = response;
          console.log('auth', localData);
          if (localData && localData.Token) {
            localStorage.setItem(this.tokenname, localData.Token);
            return true;
          }
          return false;
        })
      );
  }

  logOff() {
    // localStorage.removeItem(environment.localStorageUserId);
    localStorage.removeItem(this.tokenname);
  }

  isLoggedIn() {
    const token = localStorage.getItem(this.tokenname);
    if (!token) {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(token);
  }

  get userId() {
    const token = localStorage.getItem(this.tokenname);
    if (!this.token) {
      return false;
    }
    const jsonToken = this.jwtHelper.decodeToken(token);
    return jsonToken.userid;
  }

  get fullName() {
    const token = localStorage.getItem(this.tokenname);
    if (!this.token) {
      return false;
    }
    const jsonToken = this.jwtHelper.decodeToken(token);

    return jsonToken.name;
  }

  get roles() {
    const token = localStorage.getItem(this.tokenname);
    if (!this.token) {
      return '';
    }
    const jsonToken = this.jwtHelper.decodeToken(token);
    return jsonToken.role;
  }

  get token() {
    return localStorage.getItem(this.tokenname);
  }

  /***************************************************************************************************
  / Mag de pagina in het menu worden getoond voor deze gebruiker.
  /***************************************************************************************************/
  showRoute(allowRoles: string[]): boolean {
    for (let i = 0; i <= allowRoles.length; i++) {
      if (this.roles.indexOf(allowRoles[i]) !== -1) {
        return true;
      }
    }
    return false;
  }

}
