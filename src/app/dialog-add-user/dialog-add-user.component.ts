import { Component, OnInit } from '@angular/core';
import { addDoc, collection, collectionData, Firestore, onSnapshot } from '@angular/fire/firestore';
import { doc, setDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {

  user = new User();
  birthDate!: Date;

  users$!: Observable<any>;

  constructor(private firestore: Firestore) { 
    const coll = collection(this.firestore, 'Users')
    this.users$ = collectionData(coll)
    console.log(this.users$);

    this.users$.subscribe((user) => {
      console.log(user);
      
    })
    
    
  }

  ngOnInit(): void {
  }

  async saveUser(){
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current User ist', this.user.toJSON());

    const docRef = await addDoc(collection(this.firestore, "Users"), this.user.toJSON())
    console.log('ID', docRef.id)
  }
}
