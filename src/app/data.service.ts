import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  jobRoles = [{
    jobRole: 'Sales Manager',
    amount: 0,
  }, {
    jobRole: 'Quali Call',
    amount: 0,
  }, {
    jobRole: 'Coach',
    amount: 0,
  }, {
    jobRole: 'Technician',
    amount: 0,
  }, {
    jobRole: 'Guest',
    amount: 0,
  }];

  cityArray:any[] = []; 
}
