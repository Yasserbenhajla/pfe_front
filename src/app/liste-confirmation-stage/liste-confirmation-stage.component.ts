import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Rapport } from '../Entities/Rapport';
import { CrudService } from '../service/crud.service';
import { ConfirmationDemande } from '../Entities/ConfirmationDemande';

@Component({
  selector: 'app-liste-confirmation-stage',
  templateUrl: './liste-confirmation-stage.component.html',
  styleUrls: ['./liste-confirmation-stage.component.css']
})
export class ListeConfirmationStageComponent {
listerConfirmation: ConfirmationDemande[] = [];

  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.service.getConfirmation().subscribe(ConfirmationDemande => {
      this.listerConfirmation = ConfirmationDemande;
    });
  }


  downloadpdf(base64String: string) {
    const fileName = "Confirmation.pdf";

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
        let fileName:any="Confirmation";
        const source =`${base64String}`; // représente les données du fichier PDF encodées en base64
       const link = document.createElement("a");
       link.href = source;
       link.download =`${fileName}.pdf`
        link.click();
      }
  }

