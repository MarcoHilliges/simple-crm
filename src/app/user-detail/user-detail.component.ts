import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { doc, onSnapshot } from '@firebase/firestore';
import { User } from 'src/models/user.class';
import { DialogDeleteUserComponent } from '../dialog-delete-user/dialog-delete-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  userId:any = '';
  activeUser: User = new User();

  constructor(private route: ActivatedRoute, 
              private firestore: Firestore, 
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
      // console.log(this.userId);
    })

    onSnapshot(doc(this.firestore, 'Users', this.userId), (doc) => {
      this.activeUser = new User(doc.data());
      // console.log("Current data: ", this.activeUser);
    })
  }

  editMenu(){
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.activeUser.toJSON());
  }

  editUserDetail(){
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.activeUser.toJSON());
  }

  deleteUser(){
    const dialog = this.dialog.open(DialogDeleteUserComponent);
    dialog.componentInstance.user = new User(this.activeUser.toJSON());
  }
}
