import { Component, OnInit } from '@angular/core';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {

  user!: User;
  birthDate: any = '';
  loading = false;

  jobRoles: string[] = ['Sales Manager', 'Quali Call', 'Coach', 'Technician', 'Guest'];
  avatarImg: string[] = ['avatar1', 'avatar2', 'avatar3'];

  firstName = new FormControl('', [Validators.required, Validators.minLength(2)]);
  lastName = new FormControl('', [Validators.required, Validators.minLength(2)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  datepicker = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>, private firestore: Firestore) { }

  ngOnInit(): void {
    if(this.user.birthDate !== null){
      let date = new Date(this.user.birthDate);
      this.birthDate = date;
    }
    
  }

  async saveUser(){
    this.loading = true;

    if (this.birthDate !== null) {this.user.birthDate = this.birthDate.getTime();}
    else this.user.birthDate = null;

    // console.log(this.user.birthDate)
    await setDoc(doc(this.firestore, "Users", this.user.id), this.user.toJSON());
    this.loading = false;
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
