import { Component, OnInit } from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import { Table } from 'primeng/table';

import {User} from "../../api/user.model";
import {AuthService} from "../../service/auth.service";
import {Cart} from "../../api/cart.model";
import {CartService} from "../../service/cart.service";
import {PriminiPhone} from "../../api/priminiphone.model";

@Component({
  selector: 'app-dashboardcarts',
  templateUrl: './dashboardcarts.component.html',
  providers: [MessageService],
})
export class DashboardcartsComponent implements OnInit {

  cartDialog: boolean = false;

  workflowDialog: boolean = false;

  deleteCartDialog: boolean = false;

  deleteCartsDialog: boolean = false;

  users: User[] = [];

  carts: Cart[] = [];

  user: User ={
    username : '',
    email : '',
    role: ''
  };

   cart: Cart = {
    reference: "",
    employee: "",
    phones: [
      {
        phone: {
          ad_href: "",
          ad_image: "",
          titre_article: "",
          description_article: "",
          min_price: 0,
          max_price: 0,
          prix_detail: [],
          shop: [],
          ad_titles: [],
          stocks: [],
          marque: "",
          couleur: " ",
          modele: ""
        },
        quantity: 0
      }
    ],
    total: 0,
    status: ""
  };


  selectedCarts: Cart[] = [];

  selectedPhone: PriminiPhone = {
    ad_href: '',
    ad_image: '',
    titre_article: '',
    description_article: '',
    min_price: 0,
    max_price: 0,
    prix_detail: [],
    shop: [],
    ad_titles: [],
    stocks: [],
    marque: '',
    couleur: '',
    modele: '',
  };

  submitted: boolean = false;

  cols: any[] = [];

  status: any[] = [];

  statusWorkflow: MenuItem[] | undefined;

  activeIndex: number = 0;

  ConnecteduserName : string | null = '';
  ConnecteduserRole : string | null = '';


  constructor( private cartService: CartService, private messageService: MessageService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.fastload();
    this.ConnecteduserName = this.authService.username;
    this.ConnecteduserRole = this.authService.role;
    this.loadCarts();

    this.cols = [
      { field: 'reference', header: 'Reference' },
      { field: 'total', header: 'Total' },
      { field: 'status', header: 'Status' },
      { field: 'employee', header: 'Employee' },
    ];
    this.status = ['Shipped', 'Validated', 'Pending'];

    this.statusWorkflow = [
      {
        label: 'Pending',
      },
      {
        label: 'Validated',
      },
      {
        label: 'Shipped',
      }
    ];
  }
  private loadCarts() {
    if(this.ConnecteduserRole == 'Admin')
    {
      this.cartService.getAllCarts().subscribe(
        (data: Cart[]) => {
          this.carts = data;
        },
        (error) => {
          if (error.status === 401) {
            this.messageService.add({ severity: 'error', summary: 'Unauthorized', detail: 'You do not have access to this resource.' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while fetching the Carts.' });
          }
        }
      );
    }
    else if(this.ConnecteduserRole == 'Employee')
    {
      this.cartService.getCartsByEmployee(this.ConnecteduserName!).subscribe(
        (data: Cart[]) => {
          this.carts = data;
        },
        (error) => {
          if (error.status === 401) {
            this.messageService.add({ severity: 'error', summary: 'Unauthorized', detail: 'You do not have access to this resource.' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while fetching the Carts.' });
          }
        }
      );
    }

  }

  deleteSelectedCarts() {
    this.deleteCartsDialog = true;
  }

  editCart(cart: Cart) {
    this.cart = { ...cart };
    this.cartDialog = true;
  }
  workflow(cart: Cart) {
    this.cart = { ...cart };
    this.workflowDialog = true;
    this.setActiveStep();
  }

  setActiveStep() {
    switch (this.cart.status) {
      case 'Pending':
        this.activeIndex = 0;
        break;
      case 'Validated':
        this.activeIndex = 1;
        break;
      case 'Shipped':
        this.activeIndex = 2;
        break;
      default:
        this.activeIndex = 0;
        break;
    }
  }


  confirmDeleteSelected() {
    const reference = this.selectedCarts.map(item => item.reference);
    console.log(reference)
    this.cartService.deleteMultipleCarts(reference).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Carts deleted successfully.' });
        this.loadCarts(); // Reload users to reflect changes
        this.selectedCarts = [];
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while deleting the carts.' });
      }
    );
    this.deleteCartsDialog = false;
    this.selectedCarts = [];
  }

  confirmDelete() {
    this.deleteCartDialog = false;
    console.log(this.cart)
    this.cartService.removeCart(this.cart.reference).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Cart deleted successfully.' });
        this.loadCarts(); // Reload users to reflect changes
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while deleting the cart.' });
      }
    );
    this.cart = {
      reference: "",
      employee: "",
      phones: [
        {
          phone: {
            ad_href: "",
            ad_image: "",
            titre_article: "",
            description_article: "",
            min_price: 0,
            max_price: 0,
            prix_detail: [],
            shop: [],
            ad_titles: [],
            stocks: [],
            marque: "",
            couleur: " ",
            modele: ""
          },
          quantity: 0
        }
      ],
      total: 0,
      status: ""
    };
  }

  hideDialog() {
    this.cartDialog = false;
    this.submitted = false;
  }

  hideWorkflowDialog() {
    this.workflowDialog = false;
  }

  saveCart() {
    this.submitted = true;
    console.log(this.cart.reference);
    console.log(this.cart.status);
    this.cartService.changeCartStatus(this.cart.reference,this.cart.status).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Cart\'s status changed successfully.' });
        this.loadCarts(); // Reload users to reflect changes
        this.cartDialog = false;
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while changing the cart\'s status.' });
        this.cartDialog = false;
      }
    );
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  deleteCart(cart: Cart) {
    this.deleteCartDialog = true;
    this.cart = { ...cart };
  }


  getStatusClass(status: string): string {
    if(status)
    {
      const lowercaseStocks = status;
      if (lowercaseStocks === 'Validated') {
        return 'qualified';
      } else if (lowercaseStocks === 'Pending') {
        return 'proposal';
      } else if (lowercaseStocks === 'Shipped') {
        return 'renewal';
      } else {
        return 'unqualified';
      }
    }
    else {
      return 'new';
    }
  }

  calculateCustomerTotal(name: string) {
    let total = 0;

    if (this.carts) {
      for (let cart of this.carts) {
        if (cart.employee === name) {
          total++;
        }
      }
    }

    return total;
  }

  protected readonly console = console;
}
