import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  constructor(
    private af:AngularFireStorage
  ) { }


  selectedFile : any = null;
  public fb:any;
  downloadURL!: Observable<string>;

  public async uploadImage(path: any, collection: any, docID: any){
    return new Promise((resolve, rejects)=>{
      // const n = Date.now().toString();
      const n = docID;
      const filePath = `${collection}/${n}`;
      const fileRef = this.af.ref(filePath);
      const task = this.af.upload(`${collection}/${n}`, path);
      task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(async url => {
            if (url) {
              resolve(url)
            }
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url)
        }
      });
    })
  }
}