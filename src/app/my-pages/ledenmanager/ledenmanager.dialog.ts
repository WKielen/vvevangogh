import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BetaalWijzeValues, LidTypeValues } from 'src/app/services/leden.service';
//import { ValidatorService } from 'angular-iban';
import { FormValueToDutchDateString } from 'src/app/shared/modules/DateRoutines';

// import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';


@Component({
    selector: 'app-ledenmanager-dialog',
    templateUrl: './ledenmanager.dialog.html',
    styleUrls: ['./ledenmanager.dialog.scss'],
})
export class LedenDialogComponent implements OnInit {
    ledenItemForm = new FormGroup({
        voornaam: new FormControl('', [Validators.required]),
        achternaam: new FormControl('', [Validators.required]),
        tussenvoegsel: new FormControl(),
        adres: new FormControl('', [Validators.required]),
        woonplaats: new FormControl('', [Validators.required]),
        postcode: new FormControl('', [Validators.required]),
        mobiel: new FormControl(),
        telefoon: new FormControl(),
        geslacht: new FormControl('', [Validators.required]),
        geboorteDatum: new FormControl('', [Validators.required]),
        email1: new FormControl('', [Validators.email]),
        email2: new FormControl('', [Validators.email]),
        medisch: new FormControl(),
        magnietopfoto: new FormControl(),
        //-------------------------------------------------------
        iban: new FormControl(/*'',  [ValidatorService.validateIban] */),
        bic: new FormControl(),
        u_pasNr: new FormControl(),
        vrijwillgersToelichting: new FormControl(),
        lidvanaf: new FormControl('', [Validators.required]),
        betaalwijze: new FormControl('', [Validators.required]),
        lidnr: new FormControl(),
        lidtype: new FormControl('', [Validators.required]),
        korting: new FormControl(),
        vrijwilligerskorting: new FormControl(),
        vastbedrag: new FormControl(),
        //-------------------------------------------------------
        bondsnr: new FormControl(),
        lidbond: new FormControl(),
        compgerechtigd: new FormControl(),
        rating: new FormControl(),
        licentiejun: new FormControl(),
        licentiesen: new FormControl(),
        //-------------------------------------------------------
        ouder1_naam: new FormControl(),
        ouder1_email1: new FormControl(),
        ouder1_email2: new FormControl(),
        ouder1_mobiel: new FormControl(),
        ouder1_telefoon: new FormControl(),
    });

    betaalWijzeValues = BetaalWijzeValues.table;
    lidtypeValues = LidTypeValues.table;
    newlid = false;

    constructor(
        public dialogRef: MatDialogRef<LedenDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        // private adapter: DateAdapter<any>
    ) {
        // this.adapter.setLocale('nl');
        if (data.method === 'Toevoegen') {
            this.newlid = true;
        }
    }

    ngOnInit(): void {
        this.voornaam.setValue(this.data.data.Voornaam);
        this.achternaam.setValue(this.data.data.Achternaam);
        this.tussenvoegsel.setValue(this.data.data.Tussenvoegsel);
        this.adres.setValue(this.data.data.Adres);
        this.woonplaats.setValue(this.data.data.Woonplaats);
        this.postcode.setValue(this.data.data.Postcode);
        this.mobiel.setValue(this.data.data.Mobiel);
        this.telefoon.setValue(this.data.data.Telefoon);
        this.geslacht.setValue(this.data.data.Geslacht);
        this.geboorteDatum.setValue(this.data.data.GeboorteDatum);
        this.email1.setValue(this.data.data.Email1);
        this.email2.setValue(this.data.data.Email2);
        this.medisch.setValue(this.data.data.Medisch);
        this.magnietopfoto.setValue(String(this.data.data.MagNietOpFoto).toBoolean());
        this.iban.setValue(this.data.data.IBAN);
        this.bic.setValue(this.data.data.BIC);
        this.u_pasNr.setValue(this.data.data.U_PasNr);
        this.vrijwillgersToelichting.setValue(this.data.data.VrijwillgersToelichting);
        this.lidvanaf.setValue(this.data.data.LidVanaf);
        this.betaalwijze.setValue(this.data.data.BetaalWijze);
        this.lidnr.setValue(this.data.data.LidNr);
        this.lidtype.setValue(this.data.data.LidType);
        this.korting.setValue(this.data.data.Korting);
        this.vrijwilligerskorting.setValue(String(this.data.data.VrijwilligersKorting).toBoolean());
        this.vastbedrag.setValue(this.data.data.VastBedrag);
        this.bondsnr.setValue(this.data.data.BondsNr);
        this.lidbond.setValue(String(this.data.data.LidBond).toBoolean());
        this.compgerechtigd.setValue(String(this.data.data.CompGerechtigd).toBoolean());
        this.rating.setValue(this.data.data.Rating);
        this.licentiejun.setValue(this.data.data.LicentieJun);
        this.licentiesen.setValue(this.data.data.LicentieSen);
        this.ouder1_naam.setValue(this.data.data.Ouder1_Naam);
        this.ouder1_email1.setValue(this.data.data.Ouder1_Email1);
        this.ouder1_email2.setValue(this.data.data.Ouder1_Email2);
        this.ouder1_mobiel.setValue(this.data.data.Ouder1_Mobiel);
        this.ouder1_telefoon.setValue(this.data.data.Ouder1_Telefoon);
        console.log('received by dialog', this.data.data);
    }

    onSubmit(): void {
        this.data.data.Voornaam = this.voornaam.value;
        this.data.data.Achternaam = this.achternaam.value;
        this.data.data.Tussenvoegsel = this.tussenvoegsel.value;
        this.data.data.Adres = this.adres.value;
        this.data.data.Woonplaats = this.woonplaats.value;
        this.data.data.Postcode = this.postcode.value;
        this.data.data.Mobiel = this.mobiel.value;
        this.data.data.Telefoon = this.telefoon.value;
        this.data.data.Geslacht = this.geslacht.value;
        this.data.data.GeboorteDatum = FormValueToDutchDateString(this.geboorteDatum.value);
        this.data.data.Email1 = this.email1.value;
        this.data.data.Email2 = this.email2.value;
        this.data.data.Medisch = this.medisch.value;
        this.data.data.MagNietOpFoto = Boolean(this.magnietopfoto.value).ToNumberString();
        this.data.data.IBAN = this.iban.value;
        this.data.data.BIC = this.bic.value;
        this.data.data.U_PasNr = this.u_pasNr.value;
        this.data.data.VrijwillgersToelichting = this.vrijwillgersToelichting.value;
        this.data.data.LidVanaf = FormValueToDutchDateString(this.lidvanaf.value);
        this.data.data.BetaalWijze = this.betaalwijze.value;
        this.data.data.LidNr = this.lidnr.value;
        this.data.data.LidType = this.lidtype.value;
        this.data.data.Korting = this.korting.value;
        this.data.data.VrijwilligersKorting = Boolean(this.vrijwilligerskorting.value).ToNumberString();
        this.data.data.VastBedrag = this.vastbedrag.value;
        this.data.data.BondsNr = this.bondsnr.value;
        this.data.data.LidBond = Boolean(this.lidbond.value).ToNumberString();
        this.data.data.CompGerechtigd = Boolean(this.compgerechtigd.value).ToNumberString();
        this.data.data.Rating = this.rating.value;
        this.data.data.LicentieJun = this.licentiejun.value;
        this.data.data.LicentieSen = this.licentiesen.value;
        this.data.data.Ouder1_Naam = this.ouder1_naam.value;
        this.data.data.Ouder1_Email1 = this.ouder1_email1.value;
        this.data.data.Ouder1_Email2 = this.ouder1_email2.value;
        this.data.data.Ouder1_Mobiel = this.ouder1_mobiel.value;
        this.data.data.Ouder1_Telefoon = this.ouder1_telefoon.value;
        console.log('submitted by dialog', this.data.data);
        this.dialogRef.close(this.data.data);
    }

    /***************************************************************************************************
    / Properties
    /***************************************************************************************************/
    get voornaam() {
        return this.ledenItemForm.get('voornaam');
    }
    get achternaam() {
        return this.ledenItemForm.get('achternaam');
    }
    get tussenvoegsel() {
        return this.ledenItemForm.get('tussenvoegsel');
    }
    get adres() {
        return this.ledenItemForm.get('adres');
    }
    get woonplaats() {
        return this.ledenItemForm.get('woonplaats');
    }
    get postcode() {
        return this.ledenItemForm.get('postcode');
    }
    get mobiel() {
        return this.ledenItemForm.get('mobiel');
    }
    get telefoon() {
        return this.ledenItemForm.get('telefoon');
    }
    get geslacht() {
        return this.ledenItemForm.get('geslacht');
    }
    get geboorteDatum() {
        return this.ledenItemForm.get('geboorteDatum');
    }
    get email1() {
        return this.ledenItemForm.get('email1');
    }
    get email2() {
        return this.ledenItemForm.get('email2');
    }
    get medisch() {
        return this.ledenItemForm.get('medisch');
    }
    get magnietopfoto() {
        return this.ledenItemForm.get('magnietopfoto');
    }
    //-------------------------------------------------------
    get iban() {
        return this.ledenItemForm.get('iban');
    }
    get bic() {
        return this.ledenItemForm.get('bic');
    }
    get u_pasNr() {
        return this.ledenItemForm.get('u_pasNr');
    }
    get vrijwillgersToelichting() {
        return this.ledenItemForm.get('vrijwillgersToelichting');
    }
    get lidvanaf() {
        return this.ledenItemForm.get('lidvanaf');
    }
    get betaalwijze() {
        return this.ledenItemForm.get('betaalwijze');
    }
    get lidnr() {
        return this.ledenItemForm.get('lidnr');
    }
    get lidtype() {
        return this.ledenItemForm.get('lidtype');
    }
    get korting() {
        return this.ledenItemForm.get('korting');
    }
    get vrijwilligerskorting() {
        return this.ledenItemForm.get('vrijwilligerskorting');
    }
    get vastbedrag() {
        return this.ledenItemForm.get('vastbedrag');
    }
    //-------------------------------------------------------
    get bondsnr() {
        return this.ledenItemForm.get('bondsnr');
    }
    get lidbond() {
        return this.ledenItemForm.get('lidbond');
    }
    get compgerechtigd() {
        return this.ledenItemForm.get('compgerechtigd');
    }
    get rating() {
        return this.ledenItemForm.get('rating');
    }
    get licentiejun() {
        return this.ledenItemForm.get('licentiejun');
    }
    get licentiesen() {
        return this.ledenItemForm.get('licentiesen');
    }
    //-------------------------------------------------------
    get ouder1_naam() {
        return this.ledenItemForm.get('ouder1_naam');
    }
    get ouder1_email1() {
        return this.ledenItemForm.get('ouder1_email1');
    }
    get ouder1_email2() {
        return this.ledenItemForm.get('ouder1_email2');
    }
    get ouder1_mobiel() {
        return this.ledenItemForm.get('ouder1_mobiel');
    }
    get ouder1_telefoon() {
        return this.ledenItemForm.get('ouder1_telefoon');
    }
}
