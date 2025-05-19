import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Rapport } from '../Entities/Rapport';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-liste-rapport',
  templateUrl: './liste-rapport.component.html',
  styleUrls: ['./liste-rapport.component.css']
})
export class ListeRapportComponent {
  listerapport: Rapport[] = [];

  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.service.getRapport().subscribe(rapport => {
      this.listerapport = rapport;
    });
  }


  downloadpdf(base64String: string) {
    const fileName = "rapport.pdf";

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
        let fileName:any="rapport";
        const source =`${base64String}`; // représente les données du fichier PDF encodées en base64
       const link = document.createElement("a");
       link.href = source;
       link.download =`${fileName}.docx`
        link.click();
      }
  }

