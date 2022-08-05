import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
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
  jobRoleColor = 'rgb(155, 106, 43)';

  constructor(private route: ActivatedRoute, 
              private firestore: Firestore, 
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
    })

    onSnapshot(doc(this.firestore, 'Users', this.userId), (doc) => {
      this.activeUser = new User(doc.data());

      if (this.activeUser.jobRole == 'Sales Manager') this.jobRoleColor = 'rgb(147, 148, 229)';
      if (this.activeUser.jobRole == 'Quali Call') this.jobRoleColor = 'rgb(215, 147, 229)';
      if (this.activeUser.jobRole == 'Coach') this.jobRoleColor = 'rgb(129, 187, 117)';
      if (this.activeUser.jobRole == 'Technician') this.jobRoleColor = 'rgb(134, 134, 134)';
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
