// This component show a list of checkboxes. The number and text of the boxes are dependend on
// the input checkboxDictionary. (See interface below).
// The id's in the csString input will be checkbox.checked. Has to be a comma separated string.
//
// use as: <app-checkbox-list [checkboxDictionary]='myDictionary' (click)="onRoleClicked($event)"></app-checkbox-list>
//
import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-checkbox-list',
  template:
    '<form>' +
    '<div *ngFor="let item of myDictionary;let i = index">' +
    '<mat-checkbox #cb [checked]="item.isChecked" (change)="onCheckBoxChanged($event)" [name]="item.Id"  [id]="i" color="primary">' +
    '{{item.Value}}' +
    '</mat-checkbox>' +
    '</div>' +
    '</form>'
})
export class CheckboxListComponent {

  @Input('checkboxDictionary') myDictionary: CheckboxDictionary[];
  @Output('click') clicked = new EventEmitter<any>();

  // ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.
  // Als ik de waardes van de checkboxes via een aparte @Input lees en vervolgens wijzig in ngAfterViewChecked dan
  // krijg ik bovenstaande fout. 
  // Totdat ik erachter ben hoe dit op te lossen, geef ik de waarde maar direct mee in de array. Ik had de code van het 
  // splitsen van de string e.d. liever in deze module gehad.

  onCheckBoxChanged($event) {
      this.myDictionary[$event.source.id].isChecked = !this.myDictionary[$event.source.id].isChecked;

      let returnString = '';
      for (let i = 0; i < this.myDictionary.length; i++) {
        if (this.myDictionary[i].isChecked) {
          if (returnString != '') {
            returnString = returnString + ',';
          }
          returnString = returnString + this.myDictionary[i].Id;
        }
      }
      this.clicked.emit(returnString); // mystring is dus output van deze component
   }
}
export interface CheckboxDictionary {
  Id: String;
  Value: string;
  isChecked: boolean;
}
