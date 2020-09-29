import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }
  getAll() {
    return this.db
        .list('/products', (ref) => ref.orderByChild('name'))
        .snapshotChanges()
        .pipe(
        map((actions) => {
            return actions.map((action) => ({
                key: action.key,
                val: action.payload.val(),
            }));
        }));
  }

  get(productId) {
    return this.db.object('/products/'+ productId);
  }
}
