import { Observable, of } from "rxjs";

/***************************************************************************************************
/ Dient om een bestand te maken en dan op te slaan in de Download Directory
/***************************************************************************************************/
export class DynamicDownload {
    name = 'Angular';
  
    fakeValidateUserData() {
      return of({
        userDate1: 1,
        userData2: 2
      });
    }
  
    private setting = {
      element: {
        dynamicDownload: null as HTMLElement
      }
    }
  
    public dynamicDownloadTxt(data:string, filename:string, extensie:string) {
      this.fakeValidateUserData().subscribe((res) => {
        this.dyanmicDownloadByHtmlTag({
          fileName: filename + '.' + extensie,
          text: data
        });
      });
    }
    
    public dynamicDownloadJson(data:object, filename:string) {
      this.fakeValidateUserData().subscribe((res) => {
        this.dyanmicDownloadByHtmlTag({
            fileName: filename + '.txt',
            text: JSON.stringify(data)
        });
      });
    }
  
    private dyanmicDownloadByHtmlTag(arg: {
      fileName: string,
      text: string
    }) {
      if (!this.setting.element.dynamicDownload) {
        this.setting.element.dynamicDownload = document.createElement('a');
      }
      const element = this.setting.element.dynamicDownload;
      const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
      element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
      element.setAttribute('download', arg.fileName);
  
      var event = new MouseEvent("click");
      element.dispatchEvent(event);
    }
}