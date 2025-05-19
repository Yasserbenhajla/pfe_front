import { Component } from '@angular/core';
import { Department } from '../Entities/Department';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-liste-department',
  templateUrl: './liste-department.component.html',
  styleUrls: ['./liste-department.component.css']
})
export class ListeDepartmentComponent {
listDepartment: Department[];

  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.service.getDepartment().subscribe(department => {
      this.listDepartment = department;
    });
  }

}


