import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FilterbarComponent } from './filterbar.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: FilterbarComponent }
    ])],
    exports: [RouterModule]
})
export class FilterbarRoutingModule { }
