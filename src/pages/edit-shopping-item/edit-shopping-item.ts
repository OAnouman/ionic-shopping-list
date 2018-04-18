import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { ShoppingItem } from '../../models/shopping-item/shopping.item.interface';
import { Subscription } from 'rxjs/Subscription';

/**
 * Generated class for the EditShoppingItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-shopping-item',
  templateUrl: 'edit-shopping-item.html',
})
export class EditShoppingItemPage {

  shoppingItemSubscription: Subscription;

  shoppingItemRef$: AngularFireObject<ShoppingItem>;

  shoppingItem = {} as ShoppingItem;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private database: AngularFireDatabase,
    private toastCtrl: ToastController) {

    // Get shopping item to dislay from navParams

    const shoppingItemKey = this.navParams.get('shoppingItemKey');

    // Retrieve the item matching the given key from 
    // Firebase

    this.shoppingItemRef$ = database.object<ShoppingItem>(`shopping-list/${shoppingItemKey}`)

    // Subscribe the object to get the last value of the item

    this.shoppingItemSubscription = this.shoppingItemRef$.valueChanges().subscribe(shoppingItem => this.shoppingItem = shoppingItem
    );


  }


  /**
   * Update firebase node
   *  
   * @param {ShoppingItem} shoppingItem 
   * @memberof EditShoppingItemPage
   */
  editShoppingItem(shoppingItem: ShoppingItem): void {

    if (shoppingItem.itemName !== '' && Number(shoppingItem.itemNumber) !== 0) {

      this.shoppingItemRef$.update({
        itemName: shoppingItem.itemName,
        itemNumber: Number(shoppingItem.itemNumber),
      })

      // Redirect the user back to shoppming list

      this.navCtrl.pop()
        .then(() => {

          this.navParams.get('callback')('Item edited successfully !');

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

  ionViewWillLeave() {

    // Unsubscribe from the AngularFireObject

    this.shoppingItemSubscription.unsubscribe();

  }


}
