import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddComponent } from '../dialog-add/dialog-add.component';
import { DialogDetailComponent } from '../dialog-detail/dialog-detail.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { Student } from 'src/models/student.model';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent implements OnInit {
  //tooltip
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

  constructor(
    private readonly afs: AngularFirestore,
    public dialog: MatDialog) {

    this.studentsCollection = this.afs.collection<Student>('students');
    //this.items = this.itemsCollection.valueChanges();

    // .valueChanges() is simple. It just returns the 
    // JSON data without metadata. If you need the 
    // doc.id() in the value you must persist it your self
    // or use .snapshotChanges() instead. Only using for versions 7 and earlier

    // this.students = this.studentsCollection.valueChanges({ idField: 'docID' }); //chỉ sử dụng cho Angular 8,9
    this.studentsCollection.valueChanges({ idField: 'docID' }).subscribe(data => {
      this.students = data;
      console.log(this.students)
      console.log("count of item: " + this.students.length);

    });//docID: ten field đại diện cho documnent id, lưu ý không 
    //được đặt trùng với tên field khai báo trong dữ liệu

    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.students.length
    };



  }//end constructor
  pageChanged(event: any) {
    this.config.currentPage = event;
  }


  private studentsCollection: AngularFirestoreCollection<Student>;
  // students: Observable<Student[]>;

  ngOnInit(): void {

  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(DialogAddComponent, {
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  public openDetailDialog(stu: any): void {
    const dialogRef = this.dialog.open(DialogDetailComponent, {
      data: stu
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  openDeleteDialog(stu: Student): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: stu
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }



  sortData(sort: Sort) {
    console.log("lol")
    const data = this.students.slice();
    if (!sort.active || sort.direction === '') {
      this.students = data;
      return;
    }

    this.students = data.sort((a, b) => {
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
}

function compare(a: Number | String, b: Number | String, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}