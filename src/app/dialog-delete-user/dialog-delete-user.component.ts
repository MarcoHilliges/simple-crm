import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { deleteDoc, doc } from '@firebase/firestore';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-delete-user',
  templateUrl: './dialog-delete-user.component.html',
  styleUrls: ['./dialog-delete-user.component.scss']
})
export class DialogDeleteUserComponent implements OnInit {

  user! : User;

  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogDeleteUserComponent>, private firestore : Firestore) { }

  ngOnInit(): void {

  }

  async deleteUser(){
    this.loading = true;
    await deleteDoc(doc(this.firestore, 'Users', this.user.id));
    this.loading = false;
    window.location.href = '/user';
  }
}
