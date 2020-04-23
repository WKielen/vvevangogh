import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BewonersService, BewonerItem } from 'src/app/services/bewoners.service';
import { ParentComponent } from 'src/app/shared/components/parent.component';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarTexts } from 'src/app/shared/error-handling/SnackbarTexts';
import { AppError } from 'src/app/shared/error-handling/app-error';
import { DuplicateKeyError } from 'src/app/shared/error-handling/duplicate-key-error';
import { BewonerAddDialogComponent } from './add.dialog';

@Component({
  selector: 'app-onderhoud',
  templateUrl: './onderhoud.component.html',
  styleUrls: ['./onderhoud.component.scss']
})
export class OnderhoudComponent extends ParentComponent implements OnInit {

  constructor(
    protected snackBar: MatSnackBar,
    public dialog: MatDialog,
    protected bewonersService: BewonersService) {
    super(snackBar)
  }

  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  public dataSource = new MatTableDataSource<BewonerItem>();
  public columnsToDisplay: string[] = ['Nr', 'Naam', 'actions'];

  ngOnInit(): void {
    let sub = this.bewonersService.getAll$()
      .subscribe((data: Array<BewonerItem>) => {
        this.dataSource.data = data;
      });
    this.registerSubscription(sub);
  }

  onAdd(): void {

    const toBeAdded = new BewonerItem();
    let tmp;

    this.dialog.open(BewonerAddDialogComponent, {
      panelClass: 'custom-dialog-container', width: '1000px',
      data: { 'method': 'Toevoegen', 'data': toBeAdded }
    })
      .afterClosed()  // returns an observable
      .subscribe(result => {
        if (result) {  // in case of cancel the result will be false
          let sub = this.bewonersService.create$(result)
            .subscribe(addResult => {
              tmp = addResult;
              result.Id = tmp.Key;
              this.dataSource.data.unshift(result); // voeg de regel vooraan in de tabel toe.
              this.refreshTableLayout();
              this.showSnackBar(SnackbarTexts.SuccessNewRecord);
              this.showSnackBar(SnackbarTexts.SuccessNewRecord);
            },
              (error: AppError) => {
                if (error instanceof DuplicateKeyError) {
                  this.showSnackBar(SnackbarTexts.DuplicateKey);
                } else { throw error; }
              }
            );
          this.registerSubscription(sub);
        }
      });

  }
  /***************************************************************************************************
  / re-render de tabel
  /***************************************************************************************************/
  private refreshTableLayout(): void {
    this.table.dataSource = this.dataSource;
    this.dataSource.data.sort((item1, item2) => {
      return (item1.huisnummer.toString().localeCompare(item2.huisnummer.toString(), undefined, {numeric:true}));

      // Om de een of andere reden worden de twee numbers als string gesorteerd waardoor 9 groter is als 10.
      // De regel hierboven vond ik op het internet. Dit verhelpt het.
      // if (item1.huisnummer < item2.huisnummer) { return -1; }
      // if (item1.huisnummer > item2.huisnummer) { return 1; }
      // return 0;
    });
    this.table.renderRows();
  }


}
//https://github.com/marinantonio/angular-mat-table-crud