import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListDemoComponent } from './listdemo.component';
import { ListDemoRoutingModule } from './listdemo-routing.module';
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
import {FilterbarComponent} from 'src/app/demo/components/uikit/filterbar/filterbar.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ListDemoRoutingModule,
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
        CarouselModule
    ],
    declarations: [
      ListDemoComponent,
      FilterbarComponent
    ]
})
export class ListDemoModule { }
