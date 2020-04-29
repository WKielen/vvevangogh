import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-delete-dialog',
    templateUrl: './delete.dialog.html',
})
export class DocumentDeleteDialogComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DocumentDeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        ) {}

    ngOnInit(): void {
    }

    confirmDelete(): void {
        this.dialogRef.close(this.data.data);
    }
}
