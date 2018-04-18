import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { ShoppingItem } from '../../models/shopping-item/shopping.item.interface';

import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { NAMED_ENTITIES } from '@angular/compiler';

/**
 * Generated class for the AddShoppingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage {

  shoppingItem = {} as ShoppingItem;

  shoppingItemListRef$: AngularFireList<ShoppingItem>;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private database: AngularFireDatabase,
    private toastCtrl: ToastController) {

    this.shoppingItemListRef$ = this.database.list('shopping-list');
  }

  addShoppingItem(shoppingItem: ShoppingItem) {


    if (shoppingItem.itemName && shoppingItem.itemNumber && Number(shoppingItem.itemNumber) !== 0) {

      /*
       Create ea new object and convert item number to number.
       Then pushing the list to 'shopping-list' node
     */

      this.shoppingItemListRef$.push({

        itemName: shoppingItem.itemName,

        itemNumber: Number(shoppingItem.itemNumber),

      })

      // Reset shoppingItem

      this.shoppingItem = {} as ShoppingItem;

      // Send user to the shopping list

      this.navCtrl.pop()
        .then(() => {

          this.navParams.get('callback')('Item created successfully !');

        });

    } else {

      // Display an error toast

      this.toastCtrl.create({
        message: 'Oups ! Invalid data provided. Please try again.',
        duration: 3000,
        cssClass: 'toastDanger',
      }).present();

    }


  }

}
