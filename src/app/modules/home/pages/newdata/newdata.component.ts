import {Component, OnInit} from '@angular/core';
import {DepartmentService} from '../../../../services/department.service';
import {DepartmentModel} from '../../../../models/department.model';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-newdata',
  templateUrl: './newdata.component.html',
  styleUrls: ['./newdata.component.css'],
})

export class NewdataComponent implements OnInit {
  departments: DepartmentModel[];
  departmentControl: FormControl;

  constructor(
    private departmentService: DepartmentService
  ) {
  }

  ngOnInit(): void {
    this.getDepartment();
  }

  getDepartment(): DepartmentModel[] {
    this.departmentService.getDepartments().subscribe(value => {
      this.departments = value;
    });
    return this.departments;
  }
}
