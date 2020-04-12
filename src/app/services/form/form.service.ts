import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

export interface Form {
  article: string;
  quantity: number;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private formsCollection: AngularFirestoreCollection<Form>;
  private forms: Observable<Form[]>;

  constructor(private db: AngularFirestore) {
    this.formsCollection = db.collection<Form>('forms');

    this.forms = this.formsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

  }


  getForms() {
  return this.forms;
  }

  getForm(id) {
  return this.formsCollection.doc<Form>(id).valueChanges();
  }

  updateForm(form: Form, id: string) {
  return this.formsCollection.doc(id).update(form);
  }

  addForm(form: Form) {
  return this.formsCollection.add(form);
  }

  removeForm(id){
  return this.formsCollection.doc(id).delete();
  }

}
