import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-adddocument-dialog',
    templateUrl: './add.dialog.html',
})
export class DocumentAddDialogComponent implements OnInit {
    AddDocumentForm = new FormGroup({
        ShortName: new FormControl(
            '',
            [Validators.required]
        ),
        LongName: new FormControl(
            '',
            [Validators.required]
        ),
        Url: new FormControl(
            '',
            [Validators.required]
        ),
        FrontPage: new FormControl(''),
        DocPage: new FormControl(''),
        ManagementOnly: new FormControl('')
    });

    constructor(
        public dialogRef: MatDialogRef<DocumentAddDialogComponent>,
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data,
    ) { }

    ngOnInit(): void {
        this.ShortName.setValue(this.data.data.shortname);
        this.LongName.setValue(this.data.data.longname);
        this.Url.setValue(this.data.data.url);
        this.FrontPage.setValue(this.data.data.frontpage);
        this.DocPage.setValue(this.data.data.docpage);
        this.ManagementOnly.setValue(this.data.data.managementonly);

        if (this.data.method =='Wijzigen')
            this.AddDocumentForm.get('ShortName').disable();
    }


    /***************************************************************************************************
    / 
    /***************************************************************************************************/
    onSubmit(): void {
        this.data.data.shortname = this.ShortName.value;
        this.data.data.longname = this.LongName.value;
        this.data.data.url = this.Url.value;
        this.data.data.frontpage = this.FrontPage.value;
        this.data.data.docpage = this.DocPage.value;
        this.data.data.managementonly = this.ManagementOnly.value;
        // Roles is already set by onRoleClicked
        this.dialogRef.close(this.data.data);
    }

    /***************************************************************************************************
    / 
    /***************************************************************************************************/
    onRoleClicked($event): void {

        // I don't why but I also get a MouseEvent here. I just ignore it.
        if ($event instanceof MouseEvent) {
            return;
        }
        this.data.data.Role = $event;
    }

    /***************************************************************************************************
     / Properties
    /***************************************************************************************************/
    get ShortName() {
        return this.AddDocumentForm.get('ShortName');
    }
    get LongName() {
        return this.AddDocumentForm.get('LongName');
    }
    get Url() {
        return this.AddDocumentForm.get('Url');
    }
    get FrontPage() {
        return this.AddDocumentForm.get('FrontPage');
    }
    get DocPage() {
        return this.AddDocumentForm.get('DocPage');
    }
    get ManagementOnly() {
        return this.AddDocumentForm.get('ManagementOnly');
    }


}
