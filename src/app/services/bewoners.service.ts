import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { retry, tap, map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class BewonersService extends DataService {

  constructor(
    http: HttpClient) {
    super(environment.baseUrl + '/bewoners', http);
  }


  getNrAndNaam$() {
    return this.http.get(environment.baseUrl + '/bewoners/get_nr_naam')
      .pipe(
        retry(3),
        tap( // Log the result or error
          data => console.log('Received: ', data),
          error => console.log('Oeps: ', error)
        ),
        catchError(this.errorHandler)
      );
  }
  // /***************************************************************************************************
  // / Read the Parameter and CREATE one in the database if it doesn't exist. After this read only an 
  // / update statement is needed.
  // /***************************************************************************************************/
  // readParamData$(Id: string, Default?: string, Description?: string): Observable<String>{
  //   return this.http.get(environment.baseUrl + "/param/get?Id='" + Id + "'")
  //     .pipe(
  //       map(response => {
  //         return atob((response as ParamItem).Value);      // atob  = decrypt
  //       }),
  //       tap(
  //         data => console.log('Received: ', data),
  //         error => {
  //           console.log('Not found, create one our selves: ', error)
  //           // De parameter niet gevonden dus maken we hem zelf aan zodat deze gebruikt kan worden.
  //           this.registerSubscription(this.createParamData$(Id, Default, Description).subscribe());
  //         }
  //       ),

  //       catchError(this.errorHandler)
  //     );
  // }

  /***************************************************************************************************
  / Create a Parameter in the database
  /***************************************************************************************************/
  // createParamData$(Id: string, Value: any, Description: string): Observable<Object> {
  //   let paramItem = new ParamItem();
  //   paramItem.Id = Id;

  //   paramItem.Value = btoa(Value ? Value : '');     // btoa = encrypt
  //   paramItem.Description = Description ? Description : '';

  //   return this.create$(paramItem);
  // }

  /***************************************************************************************************
  / The Update statement of a param
  /***************************************************************************************************/
  // saveParamData$(Id: string, Value: any, Description: string): Observable<Object> {
  //   let paramItem = new ParamItem();
  //   paramItem.Id = Id;
  //   paramItem.Value = btoa(Value);
  //   paramItem.Description = Description ? Description : '';

  //   return this.update$(paramItem);
  // }
}

/***************************************************************************************************
/ Record for the database
/***************************************************************************************************/
export class BewonerItem {
  localeCompare(item2: BewonerItem, undefined: undefined, arg2: { numeric: boolean; }): number {
    throw new Error("Method not implemented.");
  }
  huisnummer: number = 0;
  naam?: string = '';
  telefoon1?: string = '';
  telefoon2?: string = '';
  email?: string = '';
  email2?: string = '';
  opm?: string = '';
  type?: string = '';
  bouwnummer?: number  = 0;
  verdieping?: string = '';
  breukdeel?: number = 0;
  edocs?: string = '';
  contact?: string = '';
  halcode?: number = 0;
}