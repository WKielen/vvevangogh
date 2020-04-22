import { Component, OnInit } from '@angular/core';
import { ParentComponent } from 'src/app/shared/components/parent.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BewonersService, BewonerItem } from 'src/app/services/bewoners.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends ParentComponent implements OnInit {

  constructor( 
    protected snackBar: MatSnackBar,
    protected bewonersService: BewonersService) {
    super(snackBar) 
  }
  displayedColumns: string[] = ['Nr', 'Naam'];
  dataSource = new MatTableDataSource<BewonerItem>();

  ngOnInit(): void {
    let sub = this.bewonersService.getNrAndNaam$()
      .subscribe((data:Array<BewonerItem>) => {
        this.dataSource.data = data;
      });
    this.registerSubscription(sub);
  }

}
