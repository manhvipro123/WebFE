import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.scss']
})
export class DeleteItemComponent implements OnInit {

  constructor(private data_service: DataService,
    public dialog: MatDialog,
    
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  public deleteStu() {
    this.data_service.deleteStudent(this.data.docID).subscribe(
      res => {
      console.log("Delete success");
      alert("Delete Success!");
      window.location.reload();
    })
  }
  closeDialog(){
    this.dialog.closeAll();
  }

}
