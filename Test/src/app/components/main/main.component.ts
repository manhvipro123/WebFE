import { Component, OnInit } from '@angular/core';
// import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
// import { Observable } from 'rxjs';


// export interface Student {
//   Id: string;
//   Name: string;

//   Class: String;
//   Gender: String;
//   Role: String;
//   Address: String;
//   Phone: String;
//   Email: String;
// }

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  // students: Student[] = [];
  // constructor( private readonly afs: AngularFirestore) {
 
  constructor() {
    //   this.studentsCollection = this.afs.collection<Student>('students');
    //   //this.items = this.itemsCollection.valueChanges();

    //   // .valueChanges() is simple. It just returns the 
    //   // JSON data without metadata. If you need the 
    //   // doc.id() in the value you must persist it your self
    //   // or use .snapshotChanges() instead. Only using for versions 7 and earlier



    //   // this.students = this.studentsCollection.valueChanges({ idField: 'docID' }); //chỉ sử dụng cho Angular 8,9
    //   this.studentsCollection.valueChanges( { idField: 'docID' }).subscribe(data => { this.students = data; console.log(this.students)});
    // //docID: ten field đại diện cho documnent id, lưu ý không 
    // //được đặt trùng với tên field khai báo trong dữ liệu
  }
  // private studentsCollection: AngularFirestoreCollection<Student>;
  // students: Observable<Student[]>;
  ngOnInit(): void {
  }

}
