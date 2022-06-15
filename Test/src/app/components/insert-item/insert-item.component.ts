import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Student } from 'src/models/student.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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

@Component({
  selector: 'app-insert-item',
  templateUrl: './insert-item.component.html',
  styleUrls: ['./insert-item.component.scss']
})
export class InsertItemComponent implements OnInit {
  selectedGend: string | undefined;
  gends: Gend[] = [
    { value: 'Male', viewValue: 'Male' },
    { value: 'Female', viewValue: 'Female' },
    { value: 'Others', viewValue: 'Others' },
  ];

  selectedRole: string | undefined;
  roles: Role[] = [
    { value: 'Vice Monitor', viewValue: 'Vice Monitor' },
    { value: 'Monitor', viewValue: 'Monitor' },
    { value: 'Normal', viewValue: 'Normal' },
    { value: 'Beauty', viewValue: 'Beauty' },
    { value: 'Secretary', viewValue: 'Secretary' },
    { value: 'Ugly', viewValue: 'Ugly' }
  ];

  public idCount = 0;
  form !: FormGroup;
  students: Student[] = [];
  private studentsCollection: AngularFirestoreCollection<Student>;

  constructor(public formBuilder: FormBuilder,
    private readonly afs: AngularFirestore,
    public dialogRef: MatDialogRef<InsertItemComponent>,
    private SupportService: SupportService,
    private data_service: DataService) {
    this.studentsCollection = this.afs.collection<Student>('students');
  }

  ngOnInit(): void {
    (async () => {
      this.idCount = await this.getId();
      // console.log(this.form.value)
    })();

    this.form = this.formBuilder.group({
      Name: ['', Validators.required],
      Class: ['', Validators.required],
      Gender: ['', Validators.required],
      Role: ['', Validators.required],
      Phone: ['', [Validators.required, Validators.pattern('[0-9]{9,10}')]],
      Address: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
    });
  }


  getId(): Promise<number> {
    return new Promise((resolve, rejects) => {
      this.studentsCollection.valueChanges().subscribe((values: Student[]) => {

        let count = values.length + 1;
        resolve(count);
        // console.log(typeof (this.idCount));
        // console.log(this.idCount);
        // console.log(`i have a feeling that ${this.idCount} is not a number`);
      });
    })

  }

  public Path!: string;
  onChangeImage(event: any) {
    this.Path = event.target.files[0]
  }

  public async pushData() {
    if (this.form.invalid) {
      return;
    }
    let docid = this.afs.createId();
    if (this.idCount == 0) return;
    let url = await this.SupportService.uploadImage(this.Path, 'student', docid);
    let newFormStudent = {
      ...this.form.value,
      storage: docid,
      Id: this.idCount,
      url
    }
    // await (
    //   await this.data_service.postStudent(newForm, url)
    //   ).subscribe((value: any) => {
    //   alert(value['message']);
    // });   
    this.data_service.postStudent(newFormStudent,).subscribe(
      res => {
        alert('them thanh cong')
        this.dialogRef.close();
        // window.location.reload();
      }
    )
  }

}
