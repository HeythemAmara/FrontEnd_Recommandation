import {Component, OnInit} from '@angular/core';
import {Filters} from "../../../api/filters.model";
import {FilterService} from "../../../service/filters.service";
import {ListDemoComponent} from 'src/app/demo/components/uikit/list/listdemo.component'
import {Phone} from "../../../api/phone.model";

@Component({
  selector: 'app-filterbar-component',
  templateUrl: './filterbar.component.html',
})
export class FilterbarComponent implements OnInit {
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
  valCheck: string[] = [];
  valCheckOffer: string[] = [];
  valCheckRam: string[] = [];
  valCheckStockage: string[] = [];
  valCheckShop: string[] = [];
  valCheckMarque: string[] = [];
  valCheckColor: string[] = [];
  sliderValues: [number, number] = [this.filters.min_price, this.filters.max_price];
  filteredData: any[] = [];

  constructor(private filterService: FilterService, private listcomponent: ListDemoComponent) {}

  refresh() {
    this.filterService.getFilters().subscribe((filters) => {
      this.filters = filters;
      this.sliderValues = [this.filters.min_price, this.filters.max_price];
    });
  }

  ngOnInit(): void {
    this.refresh();
  }

  updateFilters() {
    const selectedFilters = {
      priceRange: this.sliderValues,
      status: this.valCheck,
      ram: this.valCheckRam,
      stockage: this.valCheckStockage,
      offer: this.valCheckOffer,
      shop: this.valCheckShop,
      marque: this.valCheckMarque,
      color: this.valCheckColor,
    };

    this.filteredData = this.listcomponent.phones.filter((phone) => {
      return (
        this.matchesPriceRange(phone, selectedFilters.priceRange) &&
        this.matchesStatus(phone, selectedFilters.status) &&
        this.matchesShop(phone, selectedFilters.shop) &&
        this.matchesMarque(phone, selectedFilters.marque) &&
        this.matchesColor(phone, selectedFilters.color) &&
        this.matchesRam(phone, selectedFilters.ram) &&
        this.matchesStockage(phone, selectedFilters.stockage) &&
        this.matchesOffer(phone, selectedFilters.offer)
      );
    });
  }

  matchesPriceRange(phone: Phone, priceRange: number[]) {
    return phone.min_price >= priceRange[0] && phone.max_price <= priceRange[1];
  }

  matchesStatus(phone: Phone, status: string[]) {
    return status.length === 0 || status.some((s) => phone.ad_stocks.includes(s));
  }

  matchesShop(phone: Phone, shops: string[]) {
    return shops.length === 0 || shops.some((shop) => phone.shop.includes(shop));
  }

  matchesMarque(phone: Phone, marques: string[]) {
    return marques.length === 0 || marques.includes(phone.marque);
  }

  matchesColor(phone: Phone, colors: string[]) {
    return colors.length === 0 || colors.includes(phone.couleur);
  }

  matchesRam(phone: Phone, rams: string[]) {
    return rams.length === 0 || rams.includes(phone.ram);
  }

  matchesStockage(phone: Phone, stockages: string[]) {
    return stockages.length === 0 || stockages.includes(phone.stockage);
  }

  matchesOffer(phone: Phone, offers: string[]) {
    return offers.length === 0 || offers.includes(phone.options);
  }

}
