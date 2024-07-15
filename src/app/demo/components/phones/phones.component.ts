import {Component, OnInit, ViewChild} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {DataView} from 'primeng/dataview';
import {PriminiPhone} from 'src/app/demo/api/priminiphone.model';
import {ItemCart} from 'src/app/demo/api/cart.model';
import {PriminiPhoneService} from 'src/app/demo/service/priminiphone.service'
import {Filters} from "src/app/demo/api/filters.model";
import {FilterService} from "src/app/demo/service/filters.service";
import {CacheService} from "src/app/demo/service/cache.service";

@Component({
    templateUrl: './phones.component.html'
})
export class PhonesComponent implements OnInit {
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
  selectedFilters = {
    priceRange: this.sliderValues,
    stocks: this.valCheck,
    shop: this.valCheckShop,
    marque: this.valCheckMarque,
    color: this.valCheckColor
  };
  totalRecords: number = 0;
  reloadedTimes: number[] = [];
  displayedColors = this.filters.couleur.slice(0, 5);
  displayedBrands = this.filters.marque.slice(0, 5);
  displayedShops = this.filters.shop.slice(0, 5);
  displayedStatus = this.filters.stocks.slice(0, 5);
  showAllColors = false;
  showAllBrands = false;
  showAllShops = false;
  visibleSidebar2: boolean = false;
  quantity:number=0;
  filterHistory: string[]=[];
  itemCart : ItemCart[] = [];


    constructor(private priminiPhoneService: PriminiPhoneService, private filterService: FilterService, private cacheService: CacheService) {}
    refresh() {
        this.priminiPhoneService.getPhones(0).subscribe((phones: PriminiPhone[]) => {
            this.phones = phones;
            this.filteredData = phones;
            this.totalRecords = this.filteredData.length ;
        });
      this.filterHistory=this.cacheService.getFilters();
      this.itemCart=this.cacheService.getCart();
      this.filterService.getFiltersPrimini().subscribe((filters) => {
        this.filters = filters;
        this.sliderMin = this.filters.min_price ;
        this.sliderMax = this.filters.max_price ;
        this.sliderValues = [this.sliderMin, this.sliderMax];

        if (this.filterHistory.length > 0){
          this.loadcachedfilters();
          this.updateFilters('','');
        }
        this.sortfilters();
      });

    }
    ngOnInit() {
        this.refresh();
        this.sortOptions = [
            { label: 'Price High to Low', value: '!min_price' },
            { label: 'Price Low to High', value: 'min_price' }
        ];
    }

    sortfilters(){
      this.displayedColors = this.filters.couleur.sort((a, b) => b.count - a.count).slice(0, 5);
      this.displayedBrands = this.filters.marque.sort((a, b) => b.count - a.count).slice(0, 5);
      this.displayedShops = this.filters.shop.sort((a, b) => b.count - a.count).slice(0, 5);
      this.displayedStatus = this.filters.stocks.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return nameA.localeCompare(nameB);
      }).slice(0, 5);
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
    let filteredItems: any[] = [];

    switch (filterType) {
      case 'color':
        filteredItems = this.filters.couleur.filter(color =>
          color.name.toLowerCase().includes(searchValue)
        );
        this.displayedColors = this.showAllColors ? filteredItems : filteredItems.slice(0, 5);
        break;
      case 'brand':
        filteredItems = this.filters.marque.filter(brand =>
          brand.name.toLowerCase().includes(searchValue)
        );
        this.displayedBrands = this.showAllBrands ? filteredItems : filteredItems.slice(0, 5);
        break;
      case 'shop':
        filteredItems = this.filters.shop.filter(shop =>
          shop.name.toLowerCase().includes(searchValue)
        );
        this.displayedShops = this.showAllShops ? filteredItems : filteredItems.slice(0, 5);
        break;
    }
    dv.filter(searchValue);
  }

  toggleShowAllColors() {
    this.showAllColors = !this.showAllColors;
    this.updateDisplayedColors();
  }

  toggleShowAllBrands() {
    this.showAllBrands = !this.showAllBrands;
    this.updateDisplayedBrands();
  }

  toggleShowAllShops() {
    this.showAllShops = !this.showAllShops;
    this.updateDisplayedShops();
  }

  updateDisplayedColors() {
    const searchValue = ''; // Assume an empty search value, update this logic if you need to persist search value
    const filteredItems = this.filters.couleur.filter(color =>
      color.name.toLowerCase().includes(searchValue)
    );
    this.displayedColors = this.showAllColors ? filteredItems : filteredItems.slice(0, 5);
  }

  updateDisplayedBrands() {
    const searchValue = ''; // Assume an empty search value, update this logic if you need to persist search value
    const filteredItems = this.filters.marque.filter(brand =>
      brand.name.toLowerCase().includes(searchValue)
    );
    this.displayedBrands = this.showAllBrands ? filteredItems : filteredItems.slice(0, 5);
  }

  updateDisplayedShops() {
    const searchValue = ''; // Assume an empty search value, update this logic if you need to persist search value
    const filteredItems = this.filters.shop.filter(shop =>
      shop.name.toLowerCase().includes(searchValue)
    );
    this.displayedShops = this.showAllShops ? filteredItems : filteredItems.slice(0, 5);
  }


  onPage(event: any) {
      this.currentPage = event.first / event.rows + 1;
      if (this.currentPage % 20 === 0) {
        let val =this.currentPage/20;
        this.priminiPhoneService.getPhones(val).subscribe((phones: PriminiPhone[]) => {
          if (!this.reloadedTimes.some(n => n === val )){
            this.reloadedTimes.push(val);
            this.filteredData.push(...phones);
            this.totalRecords += phones.length;
          }
        });
      }
    }



  updateSelectPhone(phone: PriminiPhone) {
    this.selectedPhone= phone;
    const existingItem = this.itemCart.find(item => item.phone === phone);
    if (existingItem) {
      this.quantity = existingItem.quantity;
    } else {
      this.quantity = 0;
    }
    console.log(this.selectedPhone);
  }

    selectPhone(phone: PriminiPhone) {
        this.updateSelectPhone(phone);
        this.display = true;
    }



  saveFiltersToCache() {
    this.cacheService.saveFilters(this.filterHistory);
  }

     updateFilters(changement :string, addedfilter :string) {
      if (changement ==='Delete' )
      {
        this.sliderValues = [this.sliderMin, this.sliderMax];
        this.valCheck =[]
        this.valCheckShop =[]
        this.valCheckMarque =[]
        this.valCheckColor =[]
        this.refresh()
        this.filterHistory = []
        this.cacheService.deleteFilters();
      }
      else {
        this.selectedFilters = {
          priceRange: this.sliderValues,
          stocks: this.valCheck,
          shop: this.valCheckShop,
          marque: this.valCheckMarque,
          color: this.valCheckColor
        };

        this.dataView.first = 0;

        let valpost = [this.selectedFilters, this.filters]
        this.filterService.getFilteredPriminiData(valpost).subscribe((data) => {
          this.filteredData = data.filtered_data;
          this.filters = data.newfilters;
          this.sortfilters();
        });
        this.filterHistory = this.filterHistory.filter(item => item !==addedfilter);
        switch (changement){
          case 'status':
            this.filterHistory = this.filterHistory.filter(item => !this.valCheck.includes(item))
            this.filterHistory.push(...this.valCheck);
            break
          case 'shop':
            this.filterHistory = this.filterHistory.filter(item => !this.valCheckShop.includes(item))
            this.filterHistory.push(...this.valCheckShop);
            break
          case 'brand':
            this.filterHistory = this.filterHistory.filter(item => !this.valCheckMarque.includes(item))
            this.filterHistory.push(...this.valCheckMarque);
            break
          case 'color':
            this.filterHistory = this.filterHistory.filter(item => !this.valCheckColor.includes(item))
            this.filterHistory.push(...this.valCheckColor);
            break
        }
      }
  }

  removeFilter(index: number) {
    const removedFilter = this.filterHistory[index];
    this.filterHistory.splice(index, 1);
    if (this.valCheck.includes(removedFilter)) {
      this.valCheck = this.valCheck.filter(item => item !== removedFilter);
    }
    if (this.valCheckShop.includes(removedFilter)) {
      this.valCheckShop = this.valCheckShop.filter(item => item !== removedFilter);
    }
    if (this.valCheckMarque.includes(removedFilter)) {
      this.valCheckMarque = this.valCheckMarque.filter(item => item !== removedFilter);
    }
    if (this.valCheckColor.includes(removedFilter)) {
      this.valCheckColor = this.valCheckColor.filter(item => item !== removedFilter);
    }
    this.cacheService.deleteFilters();
    this.cacheService.saveFilters(this.filterHistory);
  }

  removeCartFromCache()
  {
    console.log(this.itemCart);
    this.cacheService.deleteCart();
  }

  loadcachedfilters(){
    this.valCheck = this.filterHistory.filter(item =>
      this.filters.stocks.some(stock => stock.name === item)
    );

    this.valCheckMarque = this.filterHistory.filter(item =>
      this.filters.marque.some(marque => marque.name === item)
    );
    this.valCheckShop = this.filterHistory.filter(item =>
      this.filters.shop.some(shop => shop.name === item)
    );
    this.valCheckColor = this.filterHistory.filter(item =>
      this.filters.couleur.some(couleur => couleur.name === item)
    );
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

  onQuantityChange(event: any) {
    this.quantity = event.value;
    this.addToCart();
  }

  incrementBy(amount: number) {
    if (this.quantity + amount <= 999) {
      this.quantity += amount;
    }
    this.addToCart();
  }

  decrementBy(amount: number) {
    if (this.quantity - amount >= 0) {
      this.quantity -= amount;
    }
    this.addToCart();
  }

  addToCart() {
    let itemCart = {
      phone: this.selectedPhone,
      quantity: this.quantity,
    };
    const existingItemIndex = this.itemCart.findIndex(item => item.phone === itemCart.phone);
    if (existingItemIndex !== -1) {
      this.itemCart[existingItemIndex] = itemCart;
    } else {
      this.itemCart.push(itemCart);
    }
    this.cacheService.deleteCart();
    this.cacheService.saveCart(this.itemCart);
  }



  openExternalLink(url: string) {
    window.open(url, '_blank');
  }
}
