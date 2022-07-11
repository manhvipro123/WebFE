import { Component, OnInit, Inject, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/models/student.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { DialogUpdateComponent } from '../dialog-update/dialog-update.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-detail',
  templateUrl: './dialog-detail.component.html',
  styleUrls: ['./dialog-detail.component.scss'],
})
export class DialogDetailComponent implements OnInit, AfterViewInit {
  public studentsCollection: AngularFirestoreCollection<Student>;
  constructor(
    public dialog: MatDialog,
    private readonly afs: AngularFirestore,
    public dialogRef: MatDialogRef<DialogDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
      this.studentsCollection = this.afs.collection<Student>('students');
  }
  ngAfterViewInit(): void {
    // console.log(this.view)
    this.onClickToggle()
  }
  @ViewChild("view") view:any
  
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

  onClickToggle(){
    let isChecked = this.view.nativeElement.checked;
    let main= document.querySelector("main"); 
    let icon = document.querySelector(".icon");
    if(isChecked){
      if(!main || !icon) return;
        main.style.display = "block"
        icon.innerHTML = "X"
    }else{
      if(!main || !icon) return;
      main.style.display = "none"
      icon.innerHTML = "☰" 
    }
  }
}
