import { Component, OnInit, ViewChild } from '@angular/core';
import { ParentComponent } from 'src/app/shared/components/parent.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DocumentenService, DocumentItem } from 'src/app/services/documenten.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SnackbarTexts } from 'src/app/shared/error-handling/SnackbarTexts';
import { NotFoundError } from 'src/app/shared/error-handling/not-found-error';
import { AppError } from 'src/app/shared/error-handling/app-error';
import { NoChangesMadeError } from 'src/app/shared/error-handling/no-changes-made-error';
import { DuplicateKeyError } from 'src/app/shared/error-handling/duplicate-key-error';
import { DocumentAddDialogComponent } from './add.dialog';
import { DocumentDeleteDialogComponent } from './delete.dialog';

@Component({
  selector: 'app-onderhoud-docs',
  templateUrl: './onderhoud-docs.component.html',
  styleUrls: ['./onderhoud-docs.component.scss']
})
export class OnderhoudDocsComponent extends ParentComponent implements OnInit {

  constructor(
    protected snackBar: MatSnackBar,
    public dialog: MatDialog,
    protected documentsService: DocumentenService) {
    super(snackBar)
  }

  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  public dataSource = new MatTableDataSource<DocumentItem>();
  public columnsToDisplay: string[] = ['KorteNaam', 'WeergaveNaam', 'actions'];

  ngOnInit(): void {
    let sub = this.documentsService.getManagementDocuments$()
      .subscribe((data: Array<DocumentItem>) => {
        this.dataSource.data = data;
      });
    this.registerSubscription(sub);
  }


  onAdd(): void {

    const toBeAdded = new DocumentItem();
    let tmp;

    const dialogRef = this.dialog.open(DocumentAddDialogComponent, {
      panelClass: 'custom-dialog-container', width: '500px',
      data: { 'method': 'Toevoegen', 'data': toBeAdded }
    });

    dialogRef.afterClosed()  // returns an observable
      .subscribe(result => {
        if (result) {  // in case of cancel the result will be false
          let sub = this.documentsService.create$(result)
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
  onEdit(index: number, shortname: string): void {

    const toBeEdited: DocumentItem = this.dataSource.filteredData[index];

    const dialogRef = this.dialog.open(DocumentAddDialogComponent, {
      panelClass: 'custom-dialog-container', width: '500px',
      data: { 'method': 'Wijzigen', 'data': toBeEdited }
    });

    dialogRef.afterClosed().subscribe((result: DocumentItem) => {
      if (result) {  // in case of cancel the result will be false
        let sub = this.documentsService.update$(result)
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
  onDelete(index: number, shortname: string): void {
    const toBeDeleted: DocumentItem = this.dataSource.filteredData[index];

    const dialogRef = this.dialog.open(DocumentDeleteDialogComponent, {
      panelClass: 'custom-dialog-container', width: '400px',
      data: { 'method': 'Verwijder', 'data': toBeDeleted }
    });

    dialogRef.afterClosed().subscribe((result: DocumentItem) => {
      if (result) {  // in case of cancel the result will be false
        let sub = this.documentsService.delete$(shortname)
          .subscribe(data => {
            this.dataSource.data.splice(index, 1);
            this.refreshTableLayout();
            this.showSnackBar('Document ' + shortname + ' verwijderd');
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
      return (item1.shortname.toString().localeCompare(item2.shortname.toString(), undefined, { numeric: false }));
    });
    this.table.renderRows();
  }
}
//https://github.com/marinantonio/angular-mat-table-crud