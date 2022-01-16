import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ParentComponent } from 'src/app/shared/components/parent.component';
import { GebruikersService, GebruikerItem } from 'src/app/services/gebruikers.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { GebruikerAddDialogComponent } from './add.dialog';
import { SnackbarTexts } from 'src/app/shared/error-handling/SnackbarTexts';
import { AppError } from 'src/app/shared/error-handling/app-error';
import { DuplicateKeyError } from 'src/app/shared/error-handling/duplicate-key-error';
import { NoChangesMadeError } from 'src/app/shared/error-handling/no-changes-made-error';
import { GebruikerDeleteDialogComponent } from './delete.dialog';
import { NotFoundError } from 'src/app/shared/error-handling/not-found-error';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-gebruikers',
  templateUrl: './gebruikers.component.html',
  styleUrls: ['./gebruikers.component.scss']
})
export class GebruikersComponent extends ParentComponent implements OnInit {

  constructor(
    protected snackBar: MatSnackBar,
    public dialog: MatDialog,
    protected gebruikersService: GebruikersService) {
    super(snackBar)
  }

  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  public dataSource = new MatTableDataSource<GebruikerItem>();
  public columnsToDisplay: string[] = ['Inlogcode', 'Naam', 'actions'];

  ngOnInit(): void {
    let sub = this.gebruikersService.getAll$()
      .subscribe((data: Array<GebruikerItem>) => {
        this.dataSource.data = data;
      });
    this.registerSubscription(sub);
  }


  onAdd(): void {

    const toBeAdded = new GebruikerItem();
    let tmp;

    const dialogRef = this.dialog.open(GebruikerAddDialogComponent, {
      panelClass: 'custom-dialog-container', width: '400px',
      data: { 'method': 'Toevoegen', 'data': toBeAdded }
    });

    dialogRef.afterClosed()  // returns an observable
      .subscribe((result: GebruikerItem) => {
        if (result) {  // in case of cancel the result will be false
          result.Password = <string>Md5.hashStr(result.Password);
          let sub = this.gebruikersService.create$(result)
            .subscribe(addResult => {
              this.dataSource.data.unshift(result); // voeg de regel vooraan in de tabel toe.
              this.refreshTableLayout();
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
  / 
  /***************************************************************************************************/
  onEdit(index: number, huisnummer: number): void {

    const toBeEdited: GebruikerItem = this.dataSource.filteredData[index];

    const dialogRef = this.dialog.open(GebruikerAddDialogComponent, {
      panelClass: 'custom-dialog-container', width: '400px',
      data: { 'method': 'Wijzigen', 'data': toBeEdited }
    });

    dialogRef.afterClosed().subscribe((result: GebruikerItem) => {
      if (result) {  // in case of cancel the result will be false
        let sub = this.gebruikersService.update$(result)
          .subscribe(data => {
            this.showSnackBar(SnackbarTexts.SuccessFulSaved);
          },
            (error: AppError) => {
              if (error instanceof NoChangesMadeError) {
                this.showSnackBar(SnackbarTexts.NoChanges);
              } else { throw error; }
            });
        this.registerSubscription(sub);
      }
    });
  }

  /***************************************************************************************************
  / 
  /***************************************************************************************************/
  onDelete(index: number, Userid: number): void {
    const toBeDeleted: GebruikerItem = this.dataSource.filteredData[index];

    const dialogRef = this.dialog.open(GebruikerDeleteDialogComponent, {
      panelClass: 'custom-dialog-container', width: '300px',
      data: { 'method': 'Verwijder', 'data': toBeDeleted }
    });

    dialogRef.afterClosed().subscribe((result: GebruikerItem) => {
      if (result) {  // in case of cancel the result will be false
        let sub = this.gebruikersService.delete$(Userid)
          .subscribe(data => {
            this.dataSource.data.splice(index, 1);
            this.refreshTableLayout();
            this.showSnackBar('Gebruiker met logincode ' + Userid + ' verwijderd');
          },
            (error: AppError) => {
              if (error instanceof NotFoundError) {
                this.showSnackBar(SnackbarTexts.NotFound);
              }
              this.showSnackBar(SnackbarTexts.NoChanges);
            });
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
      return (item1.Name.toString().localeCompare(item2.Name.toString(), undefined, { numeric: true }));

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