import { Component, OnInit } from '@angular/core';
import { Environment } from 'src/app/app.environment';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { CallOut } from 'src/app/utilities/callout';
import { DialogService } from 'src/app/confirm-dialog/dialog.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-consult-users',
  templateUrl: './consult-users.component.html',
  styleUrls: ['./consult-users.component.css']
})
export class ConsultUsersComponent implements OnInit {

  loading:boolean = false;
  users: User[] = new Array();
  currentPage: number = 1;
  elementsPerPage: number = Environment.defaultPaginationElements;
  
  constructor(
    private router: Router,
    private userService: UserService,
    private dialogService: DialogService,
  ) { }

  ngOnInit() {
    this.getAllUsers();

  }

  getAllUsers(){
    this.loading = true;

    this.userService.getUsers().subscribe(
      data => {
        this.fillList(data[0]);
        this.loading = false;
      },
      error => {
        this.loading = false;
        CallOut.addCallOut('error', 'Not found elements. Retry again.', 5000)
      }
    );
  }

  fillList(data){
    data.forEach(element => {
      let user: User = new User();

      for(let key in element){
        if(key === 'id'){
          user.id = element[key];
        }else if(key === 'lastName'){
          user.lastName = element[key];
        }else if(key === 'firstName'){
          user.firstName = element[key];
        }else if(key === 'email'){
          user.email = element[key];
        }else if(key === 'verificate'){
          user.verificate = element[key];
        }
      }

      this.users.push(user)
    });
  }

  editUser(id: number){
    let user: User;

    this.users.forEach(element => {
      if(element.id === id){
        user = element;
      }
    });

    this.dialogService.openConfirmDialog().afterClosed().subscribe(
      res => {
        if( res ) {
          this.loading = true;

          if(user.verificate){
            user.verificate = false;
          }else{
            user.verificate = true;
          }
          
          this.userService.updateUser(user).subscribe(
            (data: HttpResponse< { status: string }> ) => {
              try{
                if(data.body.status === 'User updated'){
                  this.loading = false;
                  CallOut.added = true;
                  this.router.navigate(["/consult-users"])
                }
              }catch (error) {
                console.log('No logrado')
              }
            },
            error => {
              this.loading = false;
              CallOut.addCallOut('error', 'The user has not updated.', 5000) 
            }
          );
        }
      }
    );
  }

  deleteUser(id: number){
    this.dialogService.openConfirmDialog().afterClosed().subscribe(
      res => {
        if( res ) {
          this.loading = true;

          this.userService.deleteUser(id).subscribe(
            (data) => {
              try{
                if(data['status'] === 'User deleted'){
                  this.loading = false;
                  this.users = this.users.filter( c => c.id !== id);
                  CallOut.addCallOut('success', 'User deleted succesfully.', 5000);
                }
              }catch(error){
                console.log('No logrado')
              }
            },
            error => {
              this.loading = false;
              CallOut.addCallOut('error', 'The user has not deleted', 5000);
            }
          );
        }
      }
    );
  }
}
