import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DocumentenService extends DataService {

  constructor(
    http: HttpClient) {
    super(environment.baseUrl + '/documents', http);
  }

  /***************************************************************************************************
  / Get documentens incl die het bestuur mag zien
  /***************************************************************************************************/
  getManagementDocuments$() {
    return this.http.get(environment.baseUrl + '/documents/get_inc_man')
      .pipe(
        retry(3),
        tap(
          data => console.log('Received: ', data),
          error => console.log('Oeps: ', error)
        ),
      );
  }
}


/***************************************************************************************************
/ Record for the database
/***************************************************************************************************/
export class DocumentItem {
  shortname: string = '';
  longname: string = '';
  url: string = '';
  //  frontpage: string = '';
  //  docpage: string = '';
  managementonly = '';
}