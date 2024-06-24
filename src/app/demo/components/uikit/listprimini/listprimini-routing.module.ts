import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListPriminiComponent } from './listprimini.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ListPriminiComponent }
    ])],
    exports: [RouterModule]
})
export class ListPriminiRoutingModule { }
