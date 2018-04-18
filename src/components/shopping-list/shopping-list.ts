import { Component, Input } from '@angular/core';

import { ActionSheetController, NavController, NavParams, ToastController } from 'ionic-angular';

import { AngularFireList, AngularFireDatabase, AngularFireAction, SnapshotAction, DatabaseSnapshot } from 'angularfire2/database';

import { Observable } from 'rxjs/observable';

import { ShoppingItem } from '../../models/shopping-item/shopping.item.interface';




/**
 * Generated class for the ShoppingListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListComponent {

  @Input() shopListRef$: Observable<any[]>;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private database: AngularFireDatabase,
    private navCtrl: NavController,
    private navParams: NavParams,
    private toastCtrl: ToastController) {

    const toastMessage: string = this.navParams.get('toastMessage');

    if (toastMessage) {

      this.toastCtrl.create({
        message: toastMessage,
        duration: 2000,
        cssClass: 'toastSuccess'
      }).present();

    }

  }




  selectShoppingItem(shoppingItem: SnapshotAction): void {

    this.actionSheetCtrl.create({

      title: `${shoppingItem.payload.val().itemName}`,
      buttons: [
        {

          text: 'Edit',
          handler: () => {

            // TODO: Send user to EditShoppingItem page and 
            // pass the key as a parameter

            this.navCtrl.push('EditShoppingItemPage', {
              shoppingItemKey: shoppingItem.key,

              callback: (toastMessage?: string) => {

                if (toastMessage) {

                  this.toastCtrl.create({
                    message: toastMessage,
                    duration: 2000,
                    cssClass: 'toastSuccess'
                  }).present();

                }

              }
            })

          }

        },

        {

          text: 'Delete',
          role: 'destructive',
          handler: () => {

            // this.shopListRef$.remove()

            this.database.object(`shopping-list/${shoppingItem.key}`).remove();

          }

        },
        {

          text: 'Cancel',
          role: 'cancel',
          handler: () => {

            console.log('User has selected the cancle button');

          }
        }
      ]

    }).present();

  }

}
