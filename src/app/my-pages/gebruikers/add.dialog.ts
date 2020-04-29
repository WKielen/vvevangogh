import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RolesDialogComponent } from '../users/roles.dialog';
import { CheckboxDictionary } from 'src/app/shared/components/checkbox.list.component';
import { ROLES } from 'src/app/shared/classes/Page-Role-Variables';


@Component({
    selector: 'app-addgebruiker-dialog',
    templateUrl: './add.dialog.html',
})
export class GebruikerAddDialogComponent implements OnInit {
    AddGebruikerForm = new FormGroup({
        Userid: new FormControl(
            '',
            [Validators.required]
        ),
        Password: new FormControl(
            '',
            [Validators.required, Validators.minLength(6)]
        ),
        Name: new FormControl(),
        Role: new FormControl(),
    });

    showPw: boolean = false;
    isUpdate: boolean = false;
    rolArray: Array<string> = []

    myCheckboxDictionary: CheckboxDictionary[] = [
        { 'Id': ROLES.BESTUUR, 'Value': 'Bestuur', 'isChecked': false },
        { 'Id': ROLES.BEWONER, 'Value': 'Bewoner', 'isChecked': false },
        { 'Id': ROLES.BEHEER, 'Value': 'Beheer', 'isChecked': false },
        { 'Id': ROLES.ADMIN, 'Value': 'Admin', 'isChecked': false },
    ];

    constructor(
        public dialogRef: MatDialogRef<GebruikerAddDialogComponent>,
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data,
    ) { }

    ngOnInit(): void {
        this.Userid.setValue(this.data.data.Userid);
        this.Password.setValue(this.data.data.Password);
        this.Name.setValue(this.data.data.Name);
        this.setRoles(this.data.data.Role);
        if (this.data.method =='Wijzigen')
            this.AddGebruikerForm.get('Userid').disable();
    }

    setRoles(rollenString:string) {
        if (rollenString !== '') {
            this.rolArray = rollenString.split(',');
        } else {
            this.rolArray = new Array<string>();
        }

        for (let i = 0; i < this.myCheckboxDictionary.length; i++) {
            this.myCheckboxDictionary[i].isChecked = false;
            for (let j = 0; j < this.rolArray.length; j++) {
                if (this.rolArray[j] == this.myCheckboxDictionary[i].Id) {
                    this.myCheckboxDictionary[i].isChecked = true;
                    break;
                }
            }
        }
    }

    /***************************************************************************************************
    / 
    /***************************************************************************************************/
    onSubmit(): void {
        this.data.data.Userid = this.Userid.value;
        this.data.data.Password = this.Password.value;
        this.data.data.Name = this.Name.value;
        // Roles is already set by onRoleClicked
        this.dialogRef.close(this.data.data);
    }

    onShowRoles(): void {
        this.dialog.open(RolesDialogComponent, {
            panelClass: 'custom-dialog-container', width: '800px',
            data: this.myCheckboxDictionary
        })
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
    get Userid() {
        return this.AddGebruikerForm.get('Userid');
    }
    get Password() {
        return this.AddGebruikerForm.get('Password');
    }
    get Name() {
        return this.AddGebruikerForm.get('Name');
    }
}
