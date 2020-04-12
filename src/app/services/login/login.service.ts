import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

export interface Login{
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginsCollection: AngularFirestoreCollection<Login>;
  private logins: Observable<Login[]>;

  constructor(private db: AngularFirestore) { 
  this.loginsCollection = db.collection<Login>('logins');

  this.logins = this.loginsCollection.snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })
  );

  }
  getlogins() {
  return this.logins;
  }

  getLogin(id) {
  return this.loginsCollection.doc<Login>(id).valueChanges();
  }

  updateLogin(login: Login, id: string) {
  return this.loginsCollection.doc(id).update(login);
  }

  addLogin(login: Login) {
  return this.loginsCollection.add(login);
  }

  removeLogin(id){
  return this.loginsCollection.doc(id).delete();
  }

}
