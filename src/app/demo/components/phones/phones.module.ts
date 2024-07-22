import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PhonesComponent } from './phones.component';
import { PhonesRoutingModule } from './phones-routing.module';
import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import {SliderModule} from "primeng/slider";
import {CheckboxModule} from "primeng/checkbox";
import {RippleModule} from "primeng/ripple";
import {DialogModule} from "primeng/dialog";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {TableModule} from "primeng/table";
import {CarouselModule} from "primeng/carousel";
import {ImageModule} from "primeng/image";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {PanelModule} from "primeng/panel";
import {SidebarModule} from "primeng/sidebar";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {InputNumberModule} from "primeng/inputnumber";
import {MenuModule} from "primeng/menu";
import {ChipModule} from "primeng/chip";
import {TagModule} from "primeng/tag";
import {SpeedDialModule} from "primeng/speeddial";
import {ToastModule} from "primeng/toast";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PhonesRoutingModule,
    DataViewModule,
    PickListModule,
    OrderListModule,
    InputTextModule,
    DropdownModule,
    RatingModule,
    ButtonModule,
    SliderModule,
    CheckboxModule,
    RippleModule,
    DialogModule,
    OverlayPanelModule,
    TableModule,
    CarouselModule,
    ImageModule,
    ProgressSpinnerModule,
    PanelModule,
    SidebarModule,
    ConfirmPopupModule,
    InputNumberModule,
    MenuModule,
    ChipModule,
    TagModule,
    SpeedDialModule,
    ToastModule
  ],
    declarations: [
      PhonesComponent
    ]
})
export class PhonesModule { }
