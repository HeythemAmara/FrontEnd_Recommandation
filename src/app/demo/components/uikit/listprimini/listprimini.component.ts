import {Component, OnInit, ViewChild} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {DataView} from 'primeng/dataview';
import {PriminiPhone} from 'src/app/demo/api/priminiphone.model';
import {PriminiPhoneService} from 'src/app/demo/service/priminiphone.service'
import {Filters} from "../../../api/filters.model";
import {FilterService} from "../../../service/filters.service";

@Component({
    templateUrl: './listprimini.component.html'
})
export class ListPriminiComponent implements OnInit {
  @ViewChild('dv') dataView!: DataView;
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
      max_price: 100,
      min_price: 0,
      ram: [],
      stockage: [],
      stocks: [],
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
  displayedColors = this.filters.couleur.slice(0, 5);
  displayedBrands = this.filters.marque.slice(0, 5);
  displayedShops = this.filters.shop.slice(0, 5);
  displayedStatus = this.filters.stocks.slice(0, 5);
  showAllColors = false;
  showAllBrands = false;
  showAllShops = false;
  showAllStatus = false;

    constructor(private priminiPhoneService: PriminiPhoneService, private filterService: FilterService) {}
    refresh() {
        this.priminiPhoneService.getPhones(0).subscribe((phones: PriminiPhone[]) => {
            this.phones = phones;
            this.filteredData = phones;
            this.totalRecords = this.filteredData.length ;
        });
      this.filterService.getFiltersPrimini().subscribe((filters) => {
        this.filters = filters;
        this.sliderMin = this.filters.min_price ;
        this.sliderMax = this.filters.max_price ;
        this.sliderValues = [this.sliderMin, this.sliderMax];
        this.displayedColors = this.filters.couleur.slice(0, 5);
        this.displayedBrands = this.filters.marque.slice(0, 5);
        this.displayedShops = this.filters.shop.slice(0, 5);
        this.displayedStatus = this.filters.stocks.slice(0, 5);
      });
    }
    ngOnInit() {
        this.refresh();
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

  onFilterdv(dv: DataView, event: Event) {
    dv.filter((event.target as HTMLInputElement).value);
  }

  onFilter(dv: any, event: any, filterType: string) {
    const searchValue = event.target.value.toLowerCase();
    switch (filterType) {
      case 'color':
        const filteredColors = this.filters.couleur.filter(color =>
          color.name.includes(searchValue)
        );
        this.displayedColors = this.showAllColors ? filteredColors : filteredColors.slice(0, 5);
        break;
      case 'brand':
        const filteredBrands = this.filters.marque.filter(brand =>{
          let brandname = brand.name;

          brandname.includes(searchValue)
        }
        );
        this.displayedBrands = this.showAllBrands ? filteredBrands : filteredBrands.slice(0, 5);
        break;
      case 'shop':
        const filteredShops = this.filters.shop.filter(shop =>
          shop.name.includes(searchValue)
        );
        this.displayedShops = this.showAllShops ? filteredShops : filteredShops.slice(0, 5);
        break;
      case 'status':
        const filteredStatus = this.filters.stocks.filter(status =>
          status.name.includes(searchValue)
        );
        this.displayedStatus = this.showAllStatus ? filteredStatus : filteredStatus.slice(0, 5);
        break;
    }
    dv.filter(searchValue);
  }

  // Functions to toggle between showing all items and limited items
  toggleShowAllColors() {
    this.showAllColors = !this.showAllColors;
    this.displayedColors = this.showAllColors ? this.filters.couleur : this.filters.couleur.slice(0, 5);
  }

  toggleShowAllBrands() {
    this.showAllBrands = !this.showAllBrands;
    this.displayedBrands = this.showAllBrands ? this.filters.marque : this.filters.marque.slice(0, 5);
  }

  toggleShowAllShops() {
    this.showAllShops = !this.showAllShops;
    this.displayedShops = this.showAllShops ? this.filters.shop : this.filters.shop.slice(0, 5);
  }

  toggleShowAllStatus() {
    this.showAllStatus = !this.showAllStatus;
    this.displayedStatus = this.showAllStatus ? this.filters.stocks : this.filters.stocks.slice(0, 5);
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


     updateFilters(changement :string) {
      if (changement ==='Delete' )
      {
        this.sliderValues = [this.sliderMin, this.sliderMax];
        this.valCheck =[]
        this.valCheckShop =[]
        this.valCheckMarque =[]
        this.valCheckColor =[]
        this.refresh()

      }
      else{
        const selectedFilters = {
          priceRange: this.sliderValues,
          stocks: this.valCheck,
          shop: this.valCheckShop,
          marque: this.valCheckMarque,
          color: this.valCheckColor
        };

        this.dataView.first = 0;

        let valpost=[selectedFilters,this.filters]
        this.filterService.getFilteredPriminiData(valpost).subscribe((data) => {
          this.filteredData = data.filtered_data;
          this.filters = data.newfilters;
          console.log(data.newfilters);
          this.displayedColors = this.filters.couleur.slice(0, 5);
          this.displayedBrands = this.filters.marque.slice(0, 5);
          this.displayedShops = this.filters.shop.slice(0, 5);
          this.displayedStatus = this.filters.stocks.slice(0, 5);
        });
      }
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
