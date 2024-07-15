import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PhonesComponent } from './phones.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: PhonesComponent }
    ])],
    exports: [RouterModule]
})
export class PhonesRoutingModule { }
