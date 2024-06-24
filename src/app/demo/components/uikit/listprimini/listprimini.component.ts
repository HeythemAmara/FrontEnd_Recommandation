import {Component, OnInit} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {DataView} from 'primeng/dataview';
import {PriminiPhone} from 'src/app/demo/api/priminiphone.model';
import {PriminiPhoneService} from 'src/app/demo/service/priminiphone.service'
import {Filters} from "../../../api/filters.model";
import {FilterService} from "../../../service/filters.service";
import {Phone} from "../../../api/phone.model";
@Component({
    templateUrl: './listprimini.component.html'
})
export class ListPriminiComponent implements OnInit {
    display: boolean = false;
    phones: PriminiPhone[] = [];
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
    filters: Filters = {
      max_ad_price: 100,
      min_ad_price: 0,
      ram: [],
      stockage: [],
      ad_stocks: [],
      couleur: [],
      shop: [],
      marque: [],
    };
    valCheckMarque: string[] = [];
    valCheckColor: string[] = [];
    valCheck: string[] = [];
    valCheckShop: string[] = [];
    sliderMin: number = 0 ;
    sliderMax: number = 100 ;
    sliderValues: [number, number] = [this.sliderMin, this.sliderMax];
    filteredData: PriminiPhone[] = [];
    totalRecords: number = 0;
    reloadedTimes: number[] = [];

    constructor(private priminiPhoneService: PriminiPhoneService, private filterService: FilterService) {}
    refresh() {
        this.priminiPhoneService.getPhones(0).subscribe((phones: PriminiPhone[]) => {
            this.phones = phones;
            console.log(phones);
            this.filteredData = phones;
            this.totalRecords = this.filteredData.length ;
        });
    }
    ngOnInit() {
        this.refresh();
        this.filterService.getFiltersPrimini().subscribe((filters) => {
          this.filters = filters;
          this.sliderMin = this.filters.min_ad_price ;
          this.sliderMax = this.filters.max_ad_price ;
          this.sliderValues = [this.sliderMin, this.sliderMax];
        });
        this.sortOptions = [
            { label: 'Price High to Low', value: '!min_price' },
            { label: 'Price Low to High', value: 'min_price' }
        ];
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
      if (this.currentPage % 20 === 0) {
        console.log(`This is page ${this.currentPage}, sending message`);
        let val =this.currentPage/20;
        this.priminiPhoneService.getPhones(val).subscribe((phones: PriminiPhone[]) => {
          if (!this.reloadedTimes.some(n => n === val )){
            this.reloadedTimes.push(val);
            this.filteredData.push(...phones);
            console.log(this.filteredData);
            this.totalRecords += phones.length;
          }
        });
      }
    }



    selectPhone(phone: PriminiPhone) {
        console.log("Phone is equal to ");
        console.log(phone);
        this.selectedPhone= phone;
        this.display = true;
    }


     updateFilters() {
    const selectedFilters = {
      priceRange: this.sliderValues,
      status: this.valCheck,
      shop: this.valCheckShop,
      marque: this.valCheckMarque,
      color: this.valCheckColor,
    };
    
    //TODO here i need to display the first page of the pagination

    this.filterService.getFilteredPriminiData(selectedFilters).subscribe((data) => {
      this.filteredData = data.filtered_data;
      this.filters = data.newfilters;
    });
  }


  getCarouselData(): any[] {
    return this.selectedPhone.shop.map((shop, index) => ({
      shop,
      prix_detail: this.selectedPhone.prix_detail[index],
      stocks: this.selectedPhone.stocks[index],
      ad_titles: this.selectedPhone.ad_titles[index],
    }));
  }


  getStatusClass(stocks: string): string {
      if(stocks)
      {
        const lowercaseStocks = stocks.toLowerCase();
        if (lowercaseStocks === 'en stock') {
          return 'qualified';
        } else if (lowercaseStocks === 'info non disponible') {
          return 'proposal';
        } else if (lowercaseStocks === 'hors stock') {
          return 'unqualified';
        } else if (lowercaseStocks === 'précommande') {
          return 'renewal';
        } else {
          return 'new';
        }
      }
      else {
        return 'new';
      }
  }
  openExternalLink(url: string) {
    window.open(url, '_blank');
  }

}
