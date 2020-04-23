import { Component, OnInit } from '@angular/core';
import { ParentComponent } from 'src/app/shared/components/parent.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BewonersService, BewonerItem } from 'src/app/services/bewoners.service';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-bewoners',
  templateUrl: './bewoners.component.html',
  styleUrls: ['./bewoners.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BewonersComponent extends ParentComponent implements OnInit {

  constructor( 
    protected snackBar: MatSnackBar,
    protected bewonersService: BewonersService) {
    super(snackBar) 
  }
  
  public dataSource = new MatTableDataSource<BewonerItem>();
  public columnsToDisplay: string[] = ['Nr', 'Naam'];
  public expandedElement; // added on the angular 8 upgrade to suppres error message
  filterValues = {
    verdieping: '',
    type: '',
    edocs: ''
  };


  ngOnInit(): void {
    let sub = this.bewonersService.getAll$()
      .subscribe((data:Array<BewonerItem>) => {
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
      let searchTerms = JSON.parse(filter);
        return data.verdieping.toLowerCase().indexOf(searchTerms.verdieping.toLowerCase()) !== -1
        && data.type.toLowerCase().indexOf(searchTerms.type.toLowerCase()) !== -1
        && data.edocs.toLowerCase().indexOf(searchTerms.edocs.toLowerCase()) !== -1
    }
    return filterFunction;
  }

  public onClickNoFilter($event) {
    this.setFilter('', '', '');
  }
  public onClickFilterVerdieping($event, verdieping) {
    this.setFilter(verdieping, '', '');
  }
  public onClickFilterType($event, type) {
    this.setFilter('', '', type);
  }
  public onClickFilterEdocs($event, edocs) {
    this.setFilter('', edocs, '');
  }
  private setFilter(verdieping:string, edocs:string, type:string): void {
    this.filterValues.verdieping = verdieping;
    this.filterValues.edocs = edocs;
    this.filterValues.type = type;
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }


}
''