import {Component, OnInit} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {DataView} from 'primeng/dataview';
import {PhoneService} from 'src/app/demo/service/phone.service';
import {Phone} from 'src/app/demo/api/phone.model';
@Component({
    templateUrl: './listdemo.component.html'
})
export class ListDemoComponent implements OnInit {
    display: boolean = false;
    phones: Phone[] = [];
    selectedPhone: Phone = {
    modele: '',
    marque: '',
    ram: '',
    stockage: '',
    couleur: '',
    options: '',
    reference_global: 'none',
    reference_detail: '',
    ad_title: '',
    ad_url: [],
    shop: [],
    ad_stocks: [],
    max_price: 0,
    min_price: 0,
    date_scrapy: [],
    all_prices: [],
    image: ''
};
    sortOptions: SelectItem[] = [];
    sortOrder: number = 0;
    sortField: string = '';
    carouselResponsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];
    currentPage: number = 1;

    constructor(private phoneService: PhoneService) {}
    refresh() {
        this.phoneService.getPhones().subscribe((phones) => {
            this.phones = phones;
        });
    }
    ngOnInit() {
        this.refresh();
        this.sortOptions = [
            { label: 'Price High to Low', value: '!max_price' },
            { label: 'Price Low to High', value: 'max_price' }
        ];
    }

    getProductStatus(adStocks: string[]): string {
      if (!adStocks) return '';
      return adStocks.includes('ONDEMAND') ? 'outofstock' : 'instock';
    }

    getProductStatusLabel(adStocks: string[]): string {
      if (!adStocks) return '';
      return adStocks.includes('ONDEMAND') ? 'ONDEMAND' : 'INSTOCK';
    }

    onSortChange(event: any) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }
    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }

    onPage(event: any) {
      this.currentPage = event.first / event.rows + 1;
      console.log(this.currentPage);
      if (this.currentPage % 20 === 0) {
        console.log(`This is page ${this.currentPage}, sending message`);
      }
    }




  selectPhone(phone: Phone) {
        console.log("Phone is equal to ");
        console.log(phone);
        this.selectedPhone= phone;
        console.log(this.selectedPhone.all_prices);
        this.display = true;
    }
    getCarouselData(): any[] {
        return this.selectedPhone.shop.map((shop, index) => ({
            shop,
            ad_url: this.selectedPhone.ad_url[index],
            ram: this.selectedPhone.ram[index],
            stockage: this.selectedPhone.stockage[index],
            couleur: this.selectedPhone.couleur[index],
            options: this.selectedPhone.options[index],
            ad_stocks: this.selectedPhone.ad_stocks[index],
            date_scrapy: this.selectedPhone.date_scrapy[index],
            all_prices: this.selectedPhone.all_prices[index]
        }));
    }


}
