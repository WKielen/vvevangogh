import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})

export class DocumentenService extends DataService {

  constructor(
    http: HttpClient) {
    super(environment.baseUrl + '/documents', http);
  }
}

/***************************************************************************************************
/ Record for the database
/***************************************************************************************************/
export class DocumentItem {
   shortname: string = '';
   longname: string = '';
   url: string = '';
   frontpage: string = '';
   docpage: string = '';
   managementonly = '';
}