import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ObservableInput, of, take, tap } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Student } from 'src/models/student.model';
import { MatDialog } from '@angular/material/dialog';
import { InsertItemComponent } from '../insert-item/insert-item.component';
import { DetailItemComponent } from '../detail-item/detail-item.component';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { DeleteItemComponent } from '../delete-item/delete-item.component';

@Component({
  selector: 'app-table-server',
  templateUrl: './table-server.component.html',
  styleUrls: ['./table-server.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TableServerComponent implements OnInit {

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[3]);

  searchText: any;
  students: Student[] = [];
  
  //page-slice
  config: any;
  
    //icon-status
    Studying : String = "Studying";
    Graduate : String = "Graduate";
    Reserve: String = "Reserve";

  constructor(private data_service: DataService,
    public dialog: MatDialog,
  ) {
    this.getData('api/students');
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.students.length
    };
  }//eng constructor
  pageChanged(event: any) {
    this.config.currentPage = event;
  }

  ngOnInit(): void {

  }

  public async getData(apiPath: string) {
    return (await this.data_service.getStudents(apiPath)).subscribe(value => {
      this.students = value;
      console.log(this.students);
      console.log("count of item: " + this.students.length);
    });
  }



  sortData(sort: Sort) {
    console.log("lol")
    const data = this.students.slice();
    if (!sort.active || sort.direction === '') {
      this.students = data;
      return;
    }

    this.students = data.sort((a: any, b: any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Id':
          return compare(a.Id, b.Id, isAsc);
        case 'Name':
          return compare(a.Name, b.Name, isAsc);
        case 'Class':
          return compare(a.Class, b.Class, isAsc);
        case 'Gender':
          return compare(a.Gender, b.Gender, isAsc);
        case 'Role':
          return compare(a.Role, b.Role, isAsc);
        case 'Status':
          return compare(a.Status, b.Status, isAsc);
        case 'Address':
          return compare(a.Address, b.Address, isAsc);
        case 'Phone':
          return compare(a.Phone, b.Phone, isAsc);
        case 'Email':
          return compare(a.Email, b.Email, isAsc);
        default:
          return 0;
      }
    });
  }

  public openDetailDialog(stu: any): void {
    const dialogRef = this.dialog.open(DetailItemComponent, {
      data: stu
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  public openDeleteDialog(stu: any): void {
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      data: stu
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(InsertItemComponent, {
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}

function compare(a: Number | String, b: Number | String, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
