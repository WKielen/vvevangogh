import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-delete-dialog',
    templateUrl: './delete.dialog.html',
})
export class GebruikerDeleteDialogComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<GebruikerDeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        ) {}

    ngOnInit(): void {
    }

    confirmDelete(): void {
        this.dialogRef.close(this.data.data);
    }
}
