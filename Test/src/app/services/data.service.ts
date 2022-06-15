import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'inspector';
import { env } from 'process';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from 'src/models/student.model';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public  getStudents(apiPath: string): Observable<any> {
    let result = this.http.get(environment.endpoint + apiPath);
    return result;
  }

  public postStudent(student: Student) {
    
    return this.http.post(environment.endpoint + 'api/students', student);
  }
  
  public putStudent(student: Student) {
    return this.http.put(environment.endpoint + 'api/students', student);
  }

  public deleteStudent(docid: string) {
 
    return this.http.delete(environment.endpoint + 'api/students/' + docid,)
    .subscribe(() => console.log("Delete success"));
  }

}
