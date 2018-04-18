import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController } from 'ionic-angular';

import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

import { ShoppingItem } from '../../models/shopping-item/shopping.item.interface';
import { Observable } from 'rxjs/observable';

/**
 * Generated class for the ShoppingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingListRef$: Observable<any>;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private database: AngularFireDatabase,
    private actionSheetCtrl: ActionSheetController,
    private toastCtrl: ToastController) {

    // Point shoppingListRef$ to firesbase 'shopping-list'

    this.shoppingListRef$ = this.database.list<ShoppingItem>('shopping-list').snapshotChanges();

  }

  goToAddShoppingPage(): void {

    this.navCtrl.push('AddShoppingPage', {

      callback: (toastMessage?: string) => {

        if (toastMessage) {

          this.toastCtrl.create({
            message: toastMessage,
            duration: 2000,
            cssClass: 'toastSuccess'
          }).present();

        }

      }

    });

  }


}
