import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../providers/accountService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  userDetails;

  constructor(private router: Router, private accountService: AccountService) { }

  ngOnInit() {


    //this.accountService.getuserprofile().subscribe(
    //  res => {
    //    this.userDetails = res;
    //  },
    //  err => {
    //    console.log(err);
    //  }
    //)
  }
}
