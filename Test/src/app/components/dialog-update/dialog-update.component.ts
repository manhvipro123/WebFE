import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from 'src/models/student.model';
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
  selector: 'app-dialog-update',
  templateUrl: './dialog-update.component.html',
  styleUrls: ['./dialog-update.component.scss']
})
export class DialogUpdateComponent implements OnInit {

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

  private studentsCollection: AngularFirestoreCollection<Student>;
  form !: FormGroup;
  constructor(
    private SupportService: SupportService,
    public formBuilder: FormBuilder,
    private readonly afs: AngularFirestore,
    public dialogRef: MatDialogRef<DialogUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.studentsCollection = this.afs.collection<Student>('students');
    this.form = this.formBuilder.group({
      Id: [`${this.data.Id}`, Validators.required],
      Name: [`${this.data.Name}`, Validators.required],
      Class: [`${this.data.Class}`, Validators.required],
      Gender: [`${this.data.Gender}`, Validators.required],
      Role: [`${this.data.Role}`, Validators.required],
      Phone: [`${this.data.Phone}`, [Validators.required, Validators.pattern('[0-9]{9,10}')]],
      Address: [`${this.data.Address}`, Validators.required],
      Email: [`${this.data.Email}`, [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    console.log(this.data)
  }

  public async update() {
    let form = this.form.value;
    if (this.form.valid) {
      console.log(this.form.valid);
      alert(
        `collectionName: Student\n docID: ${this.data.docID}\n 
        Id: ${form.Id}
        Name: ${form.Name}      
        Class: ${form.Class} 
        Gender: ${form.Gender}
        Role: ${form.Role}
        Phone: ${form.Phone}
        Address: ${form.Address}
        Email: ${form.Email}
        `
      );
      this.dialogRef.close();
    }

    let url = await this.SupportService.uploadImage(this.Path, 'student', this.data.storage);
    let newForm = {
      ...this.form.value,
      url: url
    }
    this.studentsCollection.doc(this.data.docID).update(newForm);
  
  }

  public Path!: string;
  onChangeImage(event: any) {
    this.Path = event.target.files[0]
  }
}
