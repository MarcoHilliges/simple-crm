import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user = new User();
  allUser:any = [];
  users$!:Observable<any>;

  constructor(public dialog: MatDialog, private firestore: Firestore) { 
    
  }

  ngOnInit(): void {
    const coll = collection(this.firestore, 'Users');
    this.users$ = collectionData(coll);
    this.users$.subscribe((usersFromServer:any)=>{
      this.allUser = usersFromServer;
    })
  }

  openDialog(){
    this.dialog.open(DialogAddUserComponent);
  }
}
