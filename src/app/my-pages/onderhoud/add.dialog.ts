import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidator } from '../../shared/modules/Customvalidators';


@Component({
    selector: 'app-addbewoner-dialog',
    templateUrl: './add.dialog.html',
})
export class BewonerAddDialogComponent implements OnInit {
    AddBewonerForm = new FormGroup({

        huisnummer: new FormControl(
            '',
            [Validators.required, CustomValidator.numeric]
        ),
        naam: new FormControl(),
        telefoon1: new FormControl(),
        telefoon2: new FormControl(),
        email: new FormControl('', [Validators.email]),
        email2: new FormControl('', [Validators.email]),
        opm: new FormControl(),
        type: new FormControl(),
        bouwnummer: new FormControl('',[CustomValidator.numeric]),
        verdieping: new FormControl('',[CustomValidator.numeric]),
        breukdeel: new FormControl('',[CustomValidator.numeric]),
        edocs: new FormControl(),
        contact: new FormControl(),
        halcode: new FormControl('',[CustomValidator.numeric]),
    });

     constructor(
        public dialogRef: MatDialogRef<BewonerAddDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        ) {}

    ngOnInit(): void {
        this.huisnummer.setValue(this.data.data.huisnummer);
        this.naam.setValue(this.data.data.naam);
        this.telefoon1.setValue(this.data.data.telefoon1);
        this.telefoon2.setValue(this.data.data.telefoon2);
        this.email.setValue(this.data.data.email);
        this.email2.setValue(this.data.data.email2);
        this.opm.setValue(this.data.data.opm);
        this.type.setValue(this.data.data.type);
        this.bouwnummer.setValue(this.data.data.bouwnummer);
        this.verdieping.setValue(this.data.data.verdieping);
        this.breukdeel.setValue(this.data.data.breukdeel);
        this.edocs.setValue(this.data.data.edocs=='0'?true:false);
        this.contact.setValue(this.data.data.contact);
        this.halcode.setValue(this.data.data.halcode);
    }

    /***************************************************************************************************
    / 
    /***************************************************************************************************/
    onSubmit(): void {
        this.data.data.huisnummer = this.huisnummer.value;
        this.data.data.naam = this.naam.value;
        this.data.data.telefoon1 = this.telefoon1.value;
        this.data.data.telefoon2 = this.telefoon2.value;
        this.data.data.email = this.email.value;
        this.data.data.email2 = this.email2.value;
        this.data.data.opm = this.opm.value;
        this.data.data.type = this.type.value;
        this.data.data.bouwnummer = this.bouwnummer.value;
        this.data.data.verdieping = this.verdieping.value;
        this.data.data.breukdeel = this.breukdeel.value;
        this.data.data.edocs = this.edocs.value?'0':'1';
        this.data.data.contact = this.contact.value;
        this.data.data.halcode = this.halcode.value;
        this.dialogRef.close(this.data.data);
    }

    /***************************************************************************************************
     / Properties
    /***************************************************************************************************/
    get huisnummer() {
        return this.AddBewonerForm.get('huisnummer');
    }
    get naam() {
        return this.AddBewonerForm.get('naam');
    }
    get telefoon1() {
        return this.AddBewonerForm.get('telefoon1');
    }
    get telefoon2() {
        return this.AddBewonerForm.get('telefoon2');
    }
    get email() {
        return this.AddBewonerForm.get('email');
    }
    get email2() {
        return this.AddBewonerForm.get('email2');
    }
    get opm() {
        return this.AddBewonerForm.get('opm');
    }
    get type() {
        return this.AddBewonerForm.get('type');
    }
    get bouwnummer() {
        return this.AddBewonerForm.get('bouwnummer');
    }
    get verdieping() {
        return this.AddBewonerForm.get('verdieping');
    }
    get breukdeel() {
        return this.AddBewonerForm.get('breukdeel');
    }
    get edocs() {
        return this.AddBewonerForm.get('edocs');
    }
    get contact() {
        return this.AddBewonerForm.get('contact');
    }
    get halcode() {
        return this.AddBewonerForm.get('halcode');
    }
}
