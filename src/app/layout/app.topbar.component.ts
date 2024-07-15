import {Component, ElementRef, ViewChild} from '@angular/core';
import {MenuItem, Message, MessageService} from 'primeng/api';
import {LayoutService} from "./service/app.layout.service";
import {AuthService} from '../demo/service/auth.service';
import {Router} from '@angular/router';
import {UserService} from "../demo/service/user.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
  providers: [MessageService]
})
export class AppTopBarComponent {

  items!: MenuItem[];

  tieredItems!: MenuItem[];
  userName: string | null = '';
  email: string | null = '';
  role: string | null = '';
  visible: boolean = false;
  passwordValue: string ='';
  ConfirmPasswordValue: string ='';
  isPasswordMatch: boolean = true;
  messageserror: Message[] = [{ severity: 'error', detail: 'Passwords do not match!' }];



  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;


  constructor(public layoutService: LayoutService, private authService: AuthService, private router: Router, private messageService: MessageService, private userService: UserService){}

  ngOnInit() {
    this.authService.fastload();
    this.userName = this.authService.username;
    this.email = this.authService.email;
    this.role = this.authService.role;
    this.loadUsername();
  }

  arePasswordsMatching(): boolean {
    this.isPasswordMatch = this.passwordValue === this.ConfirmPasswordValue;
    if(!this.isPasswordMatch)
    {
      this.messageserror = [{ severity: 'error', detail: 'Passwords do not match!' }];
    }
    return this.isPasswordMatch;
  }

  saveProfile(): void {
    if (!this.arePasswordsMatching()) {
      console.log('Passwords do not match');
      return;
    }
    if(this.userName)
    {
      this.userService.changePassword(this.userName, this.ConfirmPasswordValue).subscribe(
        response => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password changed successfully.' });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while changing the password.' });
        }
      );
    }
  }




  loadUsername() {
    this.tieredItems = [
      {
        label: this.userName ? this.userName : 'Profile',
        icon: 'pi pi-fw pi-user',
        items: this.userName ? [
          {
            label: 'My Profile',
            icon: 'pi pi-fw pi-file',
            command: () => this.showDialog()
          },
          {
            label: 'Disconnect',
            icon: 'pi pi-fw pi-sign-out',
            command: () => this.logout() // LogOut
          }
        ] :[
          {
            label: 'Login',
            icon: 'pi pi-fw pi-sign-in',
            command: () => this.router.navigate(['/auth/login'])
          },
        ]
      },
      { separator: true },
    ];
  }

  logout() {
    this.authService.logout();
    this.userName = null;
    this.ngOnInit();
    this.router.navigate(['/auth/login']);
  }

  showDialog() {
    this.visible = true;
  }


  getRoleClass(role: string | null): string {
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
        return 'new';
      }
    }
    else {
      return 'unqualified';
    }
  }
}
