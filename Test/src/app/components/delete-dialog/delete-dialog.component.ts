import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/models/student.model';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit {
  students: Student[] = [];
  private studentsCollection: AngularFirestoreCollection<Student>;
  constructor(private readonly afs: AngularFirestore,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.studentsCollection = this.afs.collection<Student>('students');
    // this.studentsCollection.valueChanges({ idField: 'docID' }).subscribe(data => {
    //   this.students = data;
    // });
  }

  ngOnInit(): void {
  }

  public async deleteStu() {
    await (
      this.studentsCollection.doc(this.data.docID).delete()
    )
    this.dialog.closeAll();
  }

  closeDialog(){
    this.dialog.closeAll();
  }
}
