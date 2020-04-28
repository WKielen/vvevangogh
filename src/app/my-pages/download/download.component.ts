import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExportToCsv } from 'export-to-csv';
import { DynamicDownload } from 'src/app/shared/modules/DynamicDownload';
import { SnackbarTexts } from 'src/app/shared/error-handling/SnackbarTexts';
import { ParentComponent } from 'src/app/shared/components/parent.component';
import { BewonersService, BewonerItem } from 'src/app/services/bewoners.service';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-download-page',
    templateUrl: './download.component.html',
    styleUrls: ['./download.component.scss']
})

export class DownloadComponent extends ParentComponent implements OnInit {

    private bewonersArray: Array<BewonerItem> = [];
    public myText: string = '';
    public myHeaderText1: string = '';
    public myHeaderText2: string = '';
    public csvExtractHeader: string = '"HUISNUMMER","NAAM","TELEFOON1","TELEFOON2","EMAIL1","EMAIL2","OPMERKING","EDOCS","HALCODE","CONTACT"';
    private csvExtractText1: string = ' bewoners voor csv extract';
    private csvExtractText2: string = ' Kopieer (cntrl-c) en plak (cntrl-v) onderstaande bewonersgegevens' +
        'in bijv een bestand 20200423_vgogh.csv voor gebruik als Excel spreadsheet';

    public edocsExtractHeader: string = '"email","huisnummer","naam"';
    private edocsExtractText1: string = ' nieuwsbrief gegadigden voor edocs per email via LaPosta';
    private edocsExtractText2: string = 'Kopieer (cntrl-c) en plak (cntrl-v) onderstaande bewonersgegevens' +
        ' in bijv een bestand 20200423_vgogh_nieuwsbrief.csv\n' +
        'Voor import in relatietabel in LaPosta';

    constructor(
        protected snackBar: MatSnackBar,
        protected bewonersService: BewonersService) {
        super(snackBar)
    }

    ngOnInit(): void {
        let sub = this.bewonersService.getAll$()
            .subscribe((data: Array<BewonerItem>) => {
                this.bewonersArray = data;
            });
        this.registerSubscription(sub);
        this.myHeaderText1 = '0' + this.csvExtractText1;
        this.myHeaderText2 = this.csvExtractText2;
            }

    onClickCSV(): void {
        let tmpText = this.csvExtractHeader;
        let nbr = 0;
        this.bewonersArray.forEach(element => {
            if (!element.naam) return;
            tmpText += '\n';
            tmpText += '"' + element.huisnummer + '",';
            tmpText += '"' + element.naam + '",';
            tmpText += '"' + element.telefoon1 + '",';
            tmpText += '"' + element.telefoon2 + '",';
            tmpText += '"' + element.email + '",';
            tmpText += '"' + element.email2 + '",';
            tmpText += '"' + element.opm + '",';
            tmpText += '"' + element.edocs.toDutchTextString() + '",';
            if (element.halcode != 0) {
                tmpText += '"' + element.halcode + '",';
            } else {
                tmpText += '"",';
            }
            tmpText += '"' + element.contact + '"';
            nbr++;
        });
        this.myHeaderText1 = nbr.toString() + this.csvExtractText1;
        this.myHeaderText2 = this.csvExtractText2;
        this.myText = tmpText;
    }

    onClickLaPosta(): void {
        let tmpText = this.edocsExtractHeader;
        let nbr = 0;
        this.bewonersArray.forEach(element => {
            if (element.edocs == '0') return;
            if (element.email) {
                tmpText += '\n';
                tmpText += '"' + element.naam + '",';
                tmpText += '"' + element.huisnummer + '",';
                tmpText += '"' + element.email;
                nbr++;
            }
            if (element.email2) {
                tmpText += '\n';
                tmpText += '"' + element.naam + '",';
                tmpText += '"' + element.huisnummer + '",';
                tmpText += '"' + element.email2 + '",';
                nbr++;
            }
        });
        this.myHeaderText1 = nbr.toString() + this.edocsExtractText1;
        this.myHeaderText2 = this.edocsExtractText2;
        this.myText = tmpText;
    }

    onCopy(inputElement): void {
        inputElement.select();
        document.execCommand('copy');
        inputElement.setSelectionRange(0, 0);
    }
}
