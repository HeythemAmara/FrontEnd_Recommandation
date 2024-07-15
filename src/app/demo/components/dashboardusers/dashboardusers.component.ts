import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import {UserService} from "../../service/user.service";
import {User} from "../../api/user.model";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-dashboardusers',
  templateUrl: './dashboardusers.component.html',
  providers: [MessageService]
})
export class DashboardusersComponent implements OnInit {

  userDialog: boolean = false;

  deleteUserDialog: boolean = false;

  deleteUsersDialog: boolean = false;

  users: User[] = [];

  user: User ={
    username : '',
    email : '',
    role: ''
  };

  selectedUsers: User[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  roles: any[] = [];

  ConnecteduserName : string | null = '';


  constructor(private userService: UserService, private messageService: MessageService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.fastload();
    this.ConnecteduserName = this.authService.username;
    this.loadUsers();
    this.cols = [
      { field: 'username', header: 'Username' },
      { field: 'email', header: 'Email' },
      { field: 'role', header: 'Role' },
    ];
    this.roles = ['Admin', 'Employee', 'New'];
  }
  private loadUsers() {
    this.userService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      (error) => {
        if (error.status === 401) {
          this.messageService.add({ severity: 'error', summary: 'Unauthorized', detail: 'You do not have access to this resource.' });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while fetching users.' });
        }
      }
    );
  }

  deleteSelectedUsers() {
    this.deleteUsersDialog = true;
  }

  editUser(user: User) {
    this.user = { ...user };
    this.userDialog = true;
  }


  confirmDeleteSelected() {
    const usernames = this.selectedUsers.map(item => item.username);
    this.userService.deleteUsers(usernames).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Users deleted successfully.' });
        this.loadUsers(); // Reload users to reflect changes
        this.selectedUsers = [];
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while deleting the users.' });
      }
    );
    this.deleteUsersDialog = false;
    this.selectedUsers = [];
  }

  confirmDelete() {
    this.deleteUserDialog = false;
    this.userService.deleteUser(this.user.username).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User deleted successfully.' });
        this.loadUsers(); // Reload users to reflect changes
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while deleting the user.' });
      }
    );
    this.user = {
      username : '',
      email : '',
      role: ''
    };
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }

  saveUser() {
    this.submitted = true;
    console.log(this.user.username);
    console.log(this.user.role);
    this.userService.changeRole(this.user.username,this.user.role).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User role changed successfully.' });
        this.loadUsers(); // Reload users to reflect changes
        this.userDialog = false;
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while changing the user role.' });
        this.userDialog = false;
      }
    );
  }

  findIndexByUsername(username: string): number { //? this is made to check the username exit before update
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].username === username) {
        index = i;
        break;
      }
    }

    return index;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  deleteUser(user: User) {
    this.deleteUserDialog = true;
    this.user = { ...user };
  }


  getRoleClass(role: string): string {
    if(role)
    {
      const lowercaseStocks = role;
      if (lowercaseStocks === 'Admin') {
        return 'qualified';
      } else if (lowercaseStocks === 'Employee') {
        return 'proposal';
      } else if (lowercaseStocks === 'New') {
        return 'renewal';
      } else {
        return 'unqualified';
      }
    }
    else {
      return 'new';
    }
  }
}
