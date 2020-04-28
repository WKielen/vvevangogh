import { Component, Inject, OnInit, Input } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValueToDutchDateString } from 'src/app/shared/modules/DateRoutines';


@Component({
    selector: 'app-delete-dialog',
    templateUrl: './delete.dialog.html',
})
export class BewonerDeleteDialogComponent implements OnInit {
    ledenItemForm = new FormGroup({
        opzegDatum: new FormControl ('', [Validators.required]),
    });

    constructor(
        public dialogRef: MatDialogRef<BewonerDeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        ) {}

    ngOnInit(): void {
    }

    /***************************************************************************************************
    / 
    /***************************************************************************************************/
    confirmDelete(): void {
        this.dialogRef.close(this.data.data);
    }


}
