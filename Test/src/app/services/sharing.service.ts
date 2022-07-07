import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharingService {
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  //https://stackoverflow.com/questions/39494058/behaviorsubject-vs-observable
			/*
				BehaviorSubject is a type of subject, a subject is a special type of observable so you can subscribe 
				to messages like any other observable. The unique features of BehaviorSubject are:

				It needs an initial value as it must always return a value on subscription even if it hasn't received a next()
				Upon subscription, it returns the last value of the subject. A regular observable only triggers when it receives an onnext
				at any point, you can retrieve the last value of the subject in a non-observable code using the getValue() method.
				Unique features of a subject compared to an observable are:

				It is an observer in addition to being an observable so you can also send values to a subject in addition to subscribing to it.
				In addition, you can get an observable from behavior subject using the asObservable() method on BehaviorSubject.
				
			*/
  constructor() { }
}
