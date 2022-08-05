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
  citys!: { city: string; amount: number; }[];

  users$!:Observable<any>;

  constructor(private firestore: Firestore, service: DataService) { 
    const coll = collection(this.firestore, 'Users');
    this.users$ = collectionData(coll);

    this.users$.subscribe((usersFromServer:any)=>{
      this.allUser = usersFromServer;
      // console.log(this.allUser);
      this.filterJobRoles(service);
      this.filterCitys(service);  
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

  filterCitys(service: DataService){
    let unfilteredCitys: string[] = [];

      for (let number = 0; number < this.allUser.length; number++) {
        const user = this.allUser[number];
        unfilteredCitys.push(user.city)
      }
      // console.log('first Step', unfilteredCitys);

      let filteredCitys: string[] = unfilteredCitys.filter((x, i) => unfilteredCitys.indexOf(x) === i);
      console.log('second Step', filteredCitys);
      
      for (let number = 0; number < filteredCitys.length; number++) {
        const city = filteredCitys[number];
        // console.log(city); 
        let city3 = unfilteredCitys.filter( a => 
          a == city
        )
        service.cityArray.push({'city': city,'amount': city3.length});

      }
      // console.log(service.jobRoles)
      // console.log(service.cityArray)
      this.citys = service.cityArray;
      // console.log(this.citys)
  }

}
