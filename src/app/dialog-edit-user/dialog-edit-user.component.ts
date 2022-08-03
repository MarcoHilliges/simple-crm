import { Component, OnInit } from '@angular/core';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {

  user!: User;
  birthDate = new Date;
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>, private firestore: Firestore) { }

  ngOnInit(): void {
    let date = new Date(this.user.birthDate);
    this.birthDate = date;
  }

  async saveUser(){
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();

    await setDoc(doc(this.firestore, "Users", this.user.id), this.user.toJSON());
    this.loading = false;
  }
}
