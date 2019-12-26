import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { SingleItem, FolderItem } from '../../models/database';
import { AuthService } from './auth.service';

@Injectable()
export class PantryService {

  folders: Array<any> = [];

  constructor(private afDb: AngularFireDatabase, private auth: AuthService) {
    this.folders[0] = this.afDb.list('/' + this.auth.getUser().uid + '/food');
    this.folders[1] = this.afDb.list('/' + this.auth.getUser().uid + '/drinks');
    this.folders[2] = this.afDb.list('/' + this.auth.getUser().uid + '/home');
  }

  getFolders() {
    return this.folders;
  }

  getFoodItems(uid: string) {
    return this.afDb.list<SingleItem>(`/${uid}/food`, ref => ref.orderByChild('title')).snapshotChanges();
  }

  getDrinkItems(uid: string) {
    return this.afDb.list<SingleItem>(`/${uid}/drinks`, ref => ref.orderByChild('title')).snapshotChanges();
  }

  getHomeItems(uid: string) {
    return this.afDb.list<SingleItem>(`/${uid}/home`, ref => ref.orderByChild('title')).snapshotChanges();
  }

  updateFolder(uid: string, type: string, folderKey: string, data: any) {
    return this.afDb.list<FolderItem>(`/${uid}/${type}/`).update(folderKey, data);
  }

  updateItem(uid: string, type: string,  key: string, data: any) {
    return this.afDb.list<SingleItem>(`/${uid}/${type}/`).update(key, data);
  }

  updateItemFromFolder(uid: string, type: string, folderKey: string,  key: string, data: any) {
    return this.afDb.list<SingleItem>(`/${uid}/${type}/${folderKey}/products/`).update(key, data);
  }

  removeItem(uid: string, type: string, key: string) {
    return this.afDb.list<SingleItem>(`/${uid}/${type}`).remove(key);
  }

  removeItemFromFolder(uid: string, type: string, folderKey: string,  key: string) {
    return this.afDb.list<SingleItem>(`/${uid}/${type}/${folderKey}/products/`).remove(key);
  }

  pushItem(uid: string, type: string, item: any) {
    return this.afDb.list<SingleItem>(`/${uid}/${type}`).push(item);
  }

  pushItemFolder(uid: string, type: string, folderKey: string, item: any) {
    return this.afDb.list<SingleItem>(`/${uid}/${type}/${folderKey}/products/`).push(item);
  }
}
