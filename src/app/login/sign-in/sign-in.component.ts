import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css',]
})
export class SignInComponent implements OnInit {
  constructor( private router: Router ) {


  }

  ngOnInit() {
  }

  login(){
    this.router.navigate(["/home"]);
  }
}
