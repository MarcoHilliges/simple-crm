import { Component, OnInit } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  allUser:any = [];
  
  jobRoles!: { jobRole: string; amount: number; }[];
    
  
  users$!:Observable<any>;

  constructor(private firestore: Firestore, service: DataService) { 
    const coll = collection(this.firestore, 'Users');
    this.users$ = collectionData(coll);

    this.users$.subscribe((usersFromServer:any)=>{
      this.allUser = usersFromServer;
      // console.log(this.allUser);
      this.filterJobRoles(service);

      let filterCity
    })

  }

  ngOnInit(): void {
    
  }

  filterJobRoles(service: { jobRoles: { jobRole: string; amount: number; }[]; }){
    let filterSalesManager = this.allUser.filter((d: { jobRole: string; }) => 
          d.jobRole == 'Sales Manager'
        )
      service.jobRoles[0].amount = filterSalesManager.length;
      this.jobRoles = service.jobRoles;
      
      let filterQualiCall = this.allUser.filter((d: { jobRole: string; }) => 
          d.jobRole == 'Quali Call'
        )
      service.jobRoles[1].amount = filterQualiCall.length;
      this.jobRoles = service.jobRoles;

      let filterCoach = this.allUser.filter((d: { jobRole: string; }) => 
          d.jobRole == 'Coach'
        )
      service.jobRoles[2].amount = filterCoach.length;
      this.jobRoles = service.jobRoles;

      let filterTechnician = this.allUser.filter((d: { jobRole: string; }) => 
          d.jobRole == 'Technician'
        )
      service.jobRoles[3].amount = filterTechnician.length;
      this.jobRoles = service.jobRoles;

      let filterGuest = this.allUser.filter((d: { jobRole: string; }) => 
          d.jobRole == 'Guest'
        )
      service.jobRoles[4].amount = filterGuest.length;
      this.jobRoles = service.jobRoles;
  }

}
