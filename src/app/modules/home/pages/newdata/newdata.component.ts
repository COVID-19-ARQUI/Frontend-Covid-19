import {Component, Input, OnInit} from '@angular/core';
import {DepartmentService} from '../../../../services/department.service';
import {DepartmentModel} from '../../../../models/department.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse, HttpEventType} from '@angular/common/http';
import {FilesService} from '../../../../services/files.service';
import {Subscription} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {dataupload} from '../../../../models/dataupload.model';

@Component({
  selector: 'app-newdata',
  templateUrl: './newdata.component.html',
  styleUrls: ['./newdata.component.css'],
})

export class NewdataComponent implements OnInit {
  form: FormGroup;
  departments: DepartmentModel[];
  depselect:string;
  muniselect:string;
  fecha:string;
  departmentControl: FormControl;
  dep:boolean;
  mun:boolean;
  csvFile: File;
  @Input() requiredFileType: string;
  fileName = '';
  uploadProgress: number;
  selected :string;
  uploadSub: Subscription;

  constructor(
    private departmentService: DepartmentService,
    private filesService: FilesService
  ) {
  }

  ngOnInit(): void {
    this.getDepartment();
  }

  prepareUploading(): void {
    console.log(this.csvFile);
  }

  signup(): void {

    const data: dataupload={
      idData:0,
      data: 0,
      inDate: this.fecha,
      dataType: parseInt(this.selected),
      idcountry: 29,
      iddepartment: parseInt(this.depselect),
      idmunicipality: this.muniselect,
    }
    console.log(data);
    alert("llego ")
  }


  getDepartment(): DepartmentModel[] {
    this.departmentService.getDepartments().subscribe(value => {
      this.departments = value;
    });
    return this.departments;
  }

  // // upload files
  // uploadFile(files: File[]): void {
  //   const formData = new FormData();
  //   for (const file of files) {
  //     formData.append('file', file, file.name);
  //   }
  //   this.filesService.upload(formData).subscribe(
  //     event => {
  //       console.log(event);
  //       // this.reportProgress(event);
  //     },
  //     // rsp => {
  //     //     console.log(rsp.type);
  //     // },
  //     (error: HttpErrorResponse) => {
  //       console.log(error);
  //     }
  //   );
  // }

  onFileSelected(event): void {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('file', file);
      this.filesService.upload(formData).subscribe(
        event => {
          console.log(event);
          // this.reportProgress(event);
        },
        // rsp => {
        //     console.log(rsp.type);
        // },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    }
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }
}
