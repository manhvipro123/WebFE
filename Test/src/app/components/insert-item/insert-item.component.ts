import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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

interface Stat {
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

  selectedStat: string | undefined;
  stats: Stat[] = [
    { value: 'Graduate', viewValue: 'Graduate' },
    { value: 'Studying', viewValue: 'Studying' },
    { value: 'Reserve', viewValue: 'Reserve' },
  ];

  public id = 0;
  form !: FormGroup;
  students: Student[] = [];
  // studentsCollection: AngularFirestoreCollection<Student>;

  constructor(public formBuilder: FormBuilder,
    private readonly afs: AngularFirestore,
    public dialogRef: MatDialogRef<InsertItemComponent>,
    private SupportService: SupportService,
    private data_service: DataService) {
    // this.studentsCollection = this.afs.collection<Student>('students');

  }

  ngOnInit(): void {
    this.id = this.getId();
    this.form = this.formBuilder.group({
      Name: ['', Validators.required],
      Class: ['', Validators.required],
      Gender: ['', Validators.required],
      Role: ['', Validators.required],
      Status: ['', Validators.required],
      Phone: ['', [Validators.required, Validators.pattern('[0-9]{9,10}')]],
      Address: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
    });
  }


  // getId(): Promise<number> {
  //   return new Promise((resolve, rejects) => {
  //     this.studentsCollection.valueChanges().subscribe((values: Student[]) => {

  //       let count = values.length + 1;
  //       resolve(count);
  //       // console.log(typeof (this.idCount));
  //       // console.log(this.idCount);
  //       // console.log(`i have a feeling that ${this.idCount} is not a number`);
  //     });
  //   })

  // }
  getId() {
    let tempDay = new Date();
    let day = tempDay.toLocaleDateString();
    let time = tempDay.toLocaleTimeString();
    let currentTimestamp = Date.parse(day + " " + time) / 1000;
    return currentTimestamp;
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
    if (this.Path != null) {
      let url = await this.SupportService.uploadImage(this.Path, 'student', docid);
      let newFormStudent = {
        ...this.form.value,
        storage: docid,
        Id: this.id,
        url: url
      }
      this.data_service.postStudent(newFormStudent).subscribe(
        res => {
          alert('them thanh cong')
          this.dialogRef.close();
          window.location.reload();
        }
      )
    } else {
      let newFormStudent = {
        ...this.form.value,
        storage: docid,
        Id: this.id,
      }
      this.data_service.postStudent(newFormStudent).subscribe(
        res => {
          alert('them thanh cong')
          this.dialogRef.close();
          window.location.reload();
        }
      )
    }

  }
}
