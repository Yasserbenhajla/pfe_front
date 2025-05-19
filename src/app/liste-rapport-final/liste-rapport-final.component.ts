import { Component } from '@angular/core';
import { RapportFinal } from '../Entities/RapportFinal';
import { CrudService } from '../service/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-rapport-final',
  templateUrl: './liste-rapport-final.component.html',
  styleUrls: ['./liste-rapport-final.component.css']
})
export class ListeRapportFinalComponent {
  listeRapportFinal:RapportFinal[]
    constructor(private service:CrudService,private router:Router){}
    ngOnInit():void{
      this.service.getRapportFinal().subscribe(rapportFinal=>{
        this.listeRapportFinal=rapportFinal
      })
    }


    downloadpdf(base64String: string) {
    const fileName = "rapportFinal.pdf";


    // Nettoyer la chaîne si elle commence par "data:*"
    const cleanedBase64 = base64String.includes("base64,")
      ? base64String.split("base64,")[1]
      : base64String;

    try {
      const byteCharacters = atob(cleanedBase64);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      });

      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      link.click();

      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Erreur lors du décodage base64 :", error);
    }
  }

    downloadPdf(base64String:any) {
        let fileName:any="RapportFinal";
        const source =`${base64String}`; // représente les données du fichier PDF encodées en base64
       const link = document.createElement("a");
       link.href = source;
       link.download =`${fileName}.pdf`

        link.click();
      }
          download1Pdf(base64String:any) {
        let fileName:any="autorisation";
        const source =`${base64String}`; // représente les données du fichier PDF encodées en base64
       const link = document.createElement("a");
       link.href = source;
       link.download =`${fileName}.pdf`

        link.click();
      }



  }





