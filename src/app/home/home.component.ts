import { Encadrant } from './../Entities/Encadrant.Entities';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userDetails: any;
  totalAdmin: number = 0;
  totalEtudiant: number = 0;
  totalEncadrant: number = 0;
  chart: any = [];
  Encadrant: Encadrant[] = [];
  myGroup: FormGroup; // Define FormGroup

  constructor(private router: Router, private service: CrudService) {
    this.userDetails = this.service.userDetails();
    this.myGroup = new FormGroup({
      firstName: new FormControl() // Initialize FormControl
    });
    Chart.register(...registerables); // Register Chart.js components
  }

  ngOnInit(): void {

    this.service.getAdmin().subscribe(admin => {
      this.totalAdmin = admin.length
    });

    this.service.getEtudiant().subscribe(Etudiant => {
      this.totalEtudiant = Etudiant.length
    });
    // Fetch data and initialize charts
    this.service.getEncadrants().subscribe(encadrant => {
      this.totalEncadrant = encadrant.length;
      this.Encadrant = encadrant;
      const encadrantsActives = this.Encadrant.filter(encadrant => encadrant.etat === true);
      const nombreencadrantsActives = encadrantsActives.length;
      const nombreTotalencadrants = this.Encadrant.length;
      this.updateChart(nombreencadrantsActives, nombreTotalencadrants);
      this.updatePercentageChart();
    });
  }

  updateChart(nombreencadrantsActives: number, nombreTotalencadrants: number) {
    const circleChart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: ["encadrants actives", "encadrants inactives"],
        datasets: [{
          label: 'Statistiques des encadrants de sport',
          data: [nombreencadrantsActives, nombreTotalencadrants - nombreencadrantsActives],
          backgroundColor: ['#ff8a65', '#8B65D2'],
          borderColor: ['#ff8a65', '#8B65D2'],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: {
                family: 'Arial',
                size: 14
              }
            }
          },
          title: {
            display: true,
            text: 'Statistiques des encadrants de sport',
            font: {
              family: 'Arial',
              size: 18,
              weight: 'bold'
            }
          }
        },
        layout: {
          padding: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20
          }
        }
      }
    });
  }

  updatePercentageChart() {
    const totalUsers =  this.totalEtudiant + this.totalEncadrant;
    const percentageEtudiants = (this.totalEtudiant / totalUsers) * 100;
    const percentageencadrants = (this.totalEncadrant / totalUsers) * 100;
    const percentageChart = new Chart('percentageCanvas', {
      type: 'pie',
      data: {
        labels: [ "Etudiants", "Encadrant"],
        datasets: [{
          label: 'Pourcentage des utilisateurs',
          data: [ percentageEtudiants, percentageencadrants],
          backgroundColor: ['#4bc0c0', '#8B65D2'],
          borderColor: ['#4bc0c0', '#8B65D2'],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: {
                family: 'Arial',
                size: 14
              }
            }
          },
          title: {
            display: true,
            text: 'Pourcentage des utilisateurs sur la plateforme',
            font: {
              family: 'Arial',
              size: 18,
              weight: 'bold'
            }
          }
        },
        layout: {
          padding: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20
          }
        }
      }
    });
  }
}

