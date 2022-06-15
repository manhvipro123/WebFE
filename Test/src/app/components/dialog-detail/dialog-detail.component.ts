import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/models/student.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { DialogUpdateComponent } from '../dialog-update/dialog-update.component';
import { UpdateItemComponent } from '../update-item/update-item.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-detail',
  templateUrl: './dialog-detail.component.html',
  styleUrls: ['./dialog-detail.component.scss']
})
export class DialogDetailComponent implements OnInit {
  public studentsCollection: AngularFirestoreCollection<Student>;
  constructor(
    public dialog: MatDialog,
    private readonly afs: AngularFirestore,
    public dialogRef: MatDialogRef<DialogDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
      this.studentsCollection = this.afs.collection<Student>('students');
  }

  ngOnInit(): void {
    console.log(this.data)
  }
  public openUpdateDialog(stu: any): void {
    const dialogRef = this.dialog.open(DialogUpdateComponent, {
      data: stu
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
  public openUpdateItem(stu: any): void {
    const dialogRef = this.dialog.open(UpdateItemComponent, {
      data: stu
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

}
