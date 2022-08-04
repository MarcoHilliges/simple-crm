import { Component, OnInit } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  allUser:any = [];

  users$!:Observable<any>;

  constructor(private firestore: Firestore) { }

  ngOnInit(): void {
    const coll = collection(this.firestore, 'Users');
    this.users$ = collectionData(coll);

    this.users$.subscribe((usersFromServer:any)=>{
      // console.log(usersFromServer);
      this.allUser = usersFromServer;
      console.log(this.allUser);
      
    })
  }

}
