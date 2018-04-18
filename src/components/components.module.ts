import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from "ionic-angular";

import { ShoppingListComponent } from './shopping-list/shopping-list';







@NgModule({
	declarations: [ShoppingListComponent],
	imports: [IonicModule, CommonModule],
	exports: [ShoppingListComponent]
})


export class ComponentsModule { }
