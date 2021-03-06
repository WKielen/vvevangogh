import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})

export class GebruikersService extends DataService {

  constructor(
    http: HttpClient) {
    super(environment.baseUrl + '/gebruikers', http);
  }

}

/***************************************************************************************************
/ Record for the database
/***************************************************************************************************/
export class GebruikerItem {
  Userid: string = '';
  Password: string = '';	 
  Name: string = '';
  Role: string = ''; 
}