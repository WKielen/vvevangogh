import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DocumentenService, DocumentItem } from 'src/app/services/documenten.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ParentComponent } from 'src/app/shared/components/parent.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { async } from 'rxjs/internal/scheduler/async';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';

@Component({
  selector: 'app-documenten',
  templateUrl: './documenten.component.html',
  styleUrls: ['./documenten.component.scss']
})
export class DocumentenComponent extends ParentComponent implements OnInit {

  constructor(
    protected snackBar: MatSnackBar,
    protected route: ActivatedRoute,
    protected documentsService: DocumentenService) {
    super(snackBar)
  }

  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  public dataSource = new MatTableDataSource<DocumentItem>();
  public columnsToDisplay: string[] = ['WeergaveNaam'];
  public nameFilter = new FormControl('');
  public filterValues = { WeergaveNaam: '' };
  private roles: string = '';

  ngOnInit(): void {
    let sub1 = this.route
      .queryParams
      .subscribe(param => {
        this.getDocumentsBasedonRole(param.role)
      })
    this.registerSubscription(sub1);
   
    /***************************************************************************************************
    / Er is een key ingetypt op de naam categorie filter: aboneer op de filter
    /***************************************************************************************************/
    let sub2 = this.nameFilter.valueChanges
      .subscribe(
        name => {
          this.filterValues.WeergaveNaam = name;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.registerSubscription(sub2);
  }

  private getDocumentsBasedonRole(roles:string) {
    let myObservable = new Observable<object>();
    if (roles.includes('BS')) {
      myObservable = this.documentsService.getManagementDocuments$()
    } else {
      myObservable = this.documentsService.getAll$()
    }
    let sub = myObservable
      .subscribe((data: Array<DocumentItem>) => {
        this.dataSource.data = data;
        this.dataSource.filterPredicate = this.createFilter();
      });
    this.registerSubscription(sub);
  }


  /***************************************************************************************************
  / Deze filter wordt bij initialisatie geinitieerd
  /***************************************************************************************************/
  private createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      console.log('data', this.data, filter);
      let searchTerms = JSON.parse(filter);
      return data.longname.toLowerCase().indexOf(searchTerms.WeergaveNaam.toLowerCase()) !== -1
    }
    return filterFunction;
  }

}
// https://medium.com/@balramchavan/using-async-await-feature-in-angular-587dd56fdc77