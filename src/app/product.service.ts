import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {getObservableFromList } from './firebase-extension';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }
  getAll() {
    let list = this.db.list('/products');
    return getObservableFromList(list);
    // return this.db
    //     .list('/products', (ref) => ref.orderByChild('name'))
    //     .snapshotChanges()
    //     .pipe(
    //     map((actions) => {
    //         return actions.map((action) => ({
    //             key: action.key,
    //             val: action.payload.val(),
    //         }));
    //     }));
  }

  get(productId) {
    return this.db.object('/products/'+ productId);
  }

  update(productId, product) {
    return this.db.object('/products/'+ productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/'+productId).remove();
  }
}
