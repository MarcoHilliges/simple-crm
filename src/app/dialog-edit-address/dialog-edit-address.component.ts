import { Component, OnInit } from '@angular/core';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent implements OnInit {
  user!: User;
  loading = false;


  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>, private firestore: Firestore) { }

  ngOnInit(): void {
  }

  async saveUser(){
    this.loading = true;
    
    await setDoc(doc(this.firestore, "Users", this.user.id), this.user.toJSON());
    this.loading = false;
  }
}
