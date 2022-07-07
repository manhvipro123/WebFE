import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from 'src/models/student.model';
import { SupportService } from '../../services/support.service';
import { DataService } from 'src/app/services/data.service';
interface Gend {
  value: string;
  viewValue: string;
}

interface Role {
  value: string;
  viewValue: string;
}

interface Stat {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss']
})
export class UpdateItemComponent implements OnInit {
  selectedGend: string | undefined = this.data.Gender;
  gends: Gend[] = [
    { value: 'Male', viewValue: 'Male' },
    { value: 'Female', viewValue: 'Female' },
    { value: 'Others', viewValue: 'Others' },
  ];

  selectedRole: string | undefined = this.data.Role;
  roles: Role[] = [
    { value: 'Vice Monitor', viewValue: 'Vice Monitor' },
    { value: 'Monitor', viewValue: 'Monitor' },
    { value: 'Normal', viewValue: 'Normal' },
    { value: 'Beauty', viewValue: 'Beauty' },
    { value: 'Secretary', viewValue: 'Secretary' },
    { value: 'Ugly', viewValue: 'Ugly' }
  ];

  selectedStat: string | undefined = this.data.Status;
  stats: Stat[] = [
    { value: 'Graduate', viewValue: 'Graduate' },
    { value: 'Studying', viewValue: 'Studying' },
    { value: 'Reserve', viewValue: 'Reserve' },
  ];

  studentsCollection: AngularFirestoreCollection<Student>;
  form !: FormGroup;
  constructor(
    private data_service: DataService,
    private SupportService: SupportService,
    public formBuilder: FormBuilder,
    private readonly afs: AngularFirestore,
    public dialogRef: MatDialogRef<UpdateItemComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.studentsCollection = this.afs.collection<Student>('students');
    this.form = this.formBuilder.group({
      Id: [`${this.data.Id}`, Validators.required],
      Name: [`${this.data.Name}`, Validators.required],
      Class: [`${this.data.Class}`, Validators.required],
      Gender: [`${this.data.Gender}`, Validators.required],
      Role: [`${this.data.Role}`, Validators.required],
      Status: [`${this.data.Status}`, Validators.required],
      Phone: [`${this.data.Phone}`, [Validators.required, Validators.pattern('[0-9]{9,10}')]],
      Address: [`${this.data.Address}`, Validators.required],
      Email: [`${this.data.Email}`, [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    console.log(this.data)
  }

  public async update() {
    if(this.Path != null){
      let url = await this.SupportService.uploadImage(this.Path, 'student', this.data.storage);   
      let newFormStudent = {
       ...this.form.value,
       storage: this.data.storage,
       url: url,
     }
      this.data_service.putStudent(newFormStudent,this.data.docID).subscribe(
       res=> {
         alert('cap nhat thanh cong')
         this.dialogRef.close();
         window.location.reload();
       }
     )
    }
    else{
      let newFormStudent = {
        ...this.form.value,
        storage: this.data.storage,
        url: this.data.url
      }
       this.data_service.putStudent(newFormStudent,this.data.docID).subscribe(
        res=> {
          alert('cap nhat thanh cong')
          this.dialogRef.close();
          window.location.reload();
        }
      )
    }

 
  }
  public Path!: string;
  onChangeImage(event: any) {
    this.Path = event.target.files[0]
  }


}
