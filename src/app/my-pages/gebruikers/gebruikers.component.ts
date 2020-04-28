import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ParentComponent } from 'src/app/shared/components/parent.component';
import { GebruikersService, GebruikersItem } from 'src/app/services/gebruikers.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';

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
  public dataSource = new MatTableDataSource<GebruikersItem>();
  public columnsToDisplay: string[] = ['Nr', 'Naam', 'actions'];

  ngOnInit(): void {
    let sub = this.gebruikersService.getAll$()
      .subscribe((data: Array<GebruikersItem>) => {
        this.dataSource.data = data;
      });
    this.registerSubscription(sub);
  }


}
