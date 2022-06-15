import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Student } from 'src/models/student.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SupportService } from '../../services/support.service';

interface Gend {
  value: string;
  viewValue: string;
}

interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.scss']
})
export class DialogAddComponent implements OnInit {

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

  constructor(
    public formBuilder: FormBuilder,
    private readonly afs: AngularFirestore,
    public dialogRef: MatDialogRef<DialogAddComponent>,
    private SupportService: SupportService
  ) {
    this.studentsCollection = this.afs.collection<Student>('students');
  }

  ngOnInit(): void {
    (async () => {
      this.idCount = await this.getId();
      console.log(this.form.value)
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

  public async add() {

    let form = this.form.value;
    if (this.form.valid) {
      console.log(this.form.valid);
      alert(
        `collectionName: Student\n 
        Name: ${form.Name}
        Class: ${form.Class}
        Gender: ${form.Gender}
        Role: ${form.Role}
        Phone: ${form.Phone}
        Address: ${form.Address}
        Email: ${form.Email}`
      );
      this.dialogRef.close();
    }
    
    let docid = this.afs.createId();
    if (this.idCount == 0) return;
    let url = await this.SupportService.uploadImage(this.Path, 'student', docid);
    let newForm = {
      ...this.form.value,
      Id: this.idCount,
      url: url,
      storage: docid
    }
    //them vao itemsCollection với docid cụ thể
    this.studentsCollection.doc(docid).set(Object.assign({}, newForm));//Object.assign({} khong co lenh nay thi se khong them vao firebase duoc
 
    
  }


}


