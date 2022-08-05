import { Component, OnInit } from '@angular/core';
import { addDoc, collection, collectionData, Firestore} from '@angular/fire/firestore';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
  loading:boolean = false;

  jobRoles: string[] = ['Sales Manager', 'Quali Call', 'Coach', 'Technician', 'Guest'];
  avatarImg: string[] = ['avatar1', 'avatar2', 'avatar3'];

  firstName = new FormControl('', [Validators.required, Validators.minLength(2)]);
  lastName = new FormControl('', [Validators.required, Validators.minLength(2)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  datepicker = new FormControl('', [Validators.required]);


  constructor(private firestore: Firestore, public dialogRef: MatDialogRef<DialogAddUserComponent>) { 
    const coll = collection(this.firestore, 'Users');
    this.users$ = collectionData(coll); 
  }

  ngOnInit(): void {
  }

  async saveUser(){
    this.loading = true;
    if (this.user.birthDate) this.user.birthDate = this.birthDate.getTime();    

    const docRef = await addDoc(collection(this.firestore, "Users"), this.user.toJSON())
    this.user.id = docRef.id;
    await setDoc(doc(this.firestore, "Users", this.user.id), this.user.toJSON());
    this.loading = false;
    this.dialogRef.close();
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
