import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Message{
  userId: string,
  text: string,
  date: string,
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messagesCollection: AngularFirestoreCollection<Message>;
  private messages: Observable<Message[]>;

  constructor(private db: AngularFirestore) {
    this.messagesCollection = db.collection<Message>('messages');
    this.messages = this.messagesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

   }

  /*getMessages() {
    this.afDB.list('Messages/', ref => ref.orderByChild('date')).snapshotChanges(['child_added'])
    .subscribe(actions => {
      this.messages = [];
      actions.forEach(action => {
        this.messages.push({
          userId: action.payload.exportVal().userId,
          text: action.payload.exportVal().text,
          date: action.payload.exportVal().date
        });
      });
    });
  }*/

    getMessages() {
    return this.messages;
    }
  
    getMessage(id) {
    return this.messagesCollection.doc<Message>(id).valueChanges();
    }
  
    updateMessage(message: Message, id: string) {
    return this.messagesCollection.doc(id).update(message);
    }
  
    addMessage(message: Message) {
    return this.messagesCollection.add(message);
    }
  
    removeMessage(id){
    return this.messagesCollection.doc(id).delete();
    }
  
    }
    

    
