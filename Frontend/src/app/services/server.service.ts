import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})

export class ServerService {
  private serverURL: string = 'http://localhost:5000';

  constructor(
    private http: HttpClient
  ) { }

  addToCart(wrapper: any) {
    // throw new Error('Method not implemented.');
    return this.http.post(`${this.serverURL}/api/user/addToCart`, wrapper);
  }

  updateRegisterData(data: any) {
    // throw new Error('Method not implemented.');
    return this.http.put(`${this.serverURL}/api/user/updateInfo`, data);
  }

  updateProductData(data) {
    // throw new Error('Method not implemented.');
    return this.http.post(`${this.serverURL}/api/product/update`, data);
  }

  changeOnlineStatus(data): Observable<any> {
    // throw new Error('Method not implemented.');
    return this.http.post(`${this.serverURL}/api/info/changeOnlineStatus`, data);
  }

  deleteCartByID(data: any) {
    // throw new Error('Method not implemented.');
    return this.http.post(`${this.serverURL}/api/user/deleteFromCart`, data);
  }

  updateCartQuantity(data: any) {
    return this.http.post(`${this.serverURL}/api/user/updateCartQuantity`, data);
  }

  getProductByID(data: any): Observable<any> {
    // throw new Error('Method not implemented.');
    return this.http.post(`${this.serverURL}/api/product/getProduct`, data);
  }

  getRecentChats(): Observable<any> {
    // throw new Error('Method not implemented.');
    return this.http.get(`${this.serverURL}/api/info/recentChats`);
  }

  findByID(data): Observable<any> {
    // throw new Error('Method not implemented.');
    return this.http.post(`${this.serverURL}/api/user/getByID`, data);
  }
  getMessagesInfo(): Observable<any> {
    // throw new Error('Method not implemented.');
    return this.http.get(`${this.serverURL}/api/info/newMessages`);
  }

  getNotifications() {
    // throw new Error('Method not implemented.');
    return this.http.get(`${this.serverURL}/api/user/notifications`);
  }

  getOlxKategorije(data): Observable<any> {
    // throw new Error('Method not implemented.');    
    const headers = new HttpHeaders({
      'Content-Type':'application/json',      
    });
    return this.http.post(`${this.serverURL}/api/product/category`, data, {headers: headers});
  }

  getHomeData(data: any): Observable<any> {
    return this.http.post(`${this.serverURL}/api/public/home`, data); //here goes http options.
  }

  postRegisterData(data): Observable<any> {    
    return this.http.post(`${this.serverURL}/api/user/register`, data);
  }

  postProductData(data): Observable<any> {
    return this.http.post(`${this.serverURL}/api/product/add`, data);
  }

  postLoginData(data): Observable<any> {    
    return this.http.post(`${this.serverURL}/api/user/login`, data);
  }

  getProductPicture(data): Observable<any> {      
    return this.http.post(`${this.serverURL}/api/product/productImage`, data, {responseType: "blob"});
  }

  getProfileData(): Observable<any> {
    return this.http.get(`${this.serverURL}/api/user/profile`);
  }

  getCartData(): Observable<any> {
    return this.http.get(`${this.serverURL}/api/user/cart`);
  }

  getMyProducts(): Observable<any> {
    return this.http.get(`${this.serverURL}/api/user/products`);
  }

  getSellerData(data): Observable<any> {
    return this.http.post(`${this.serverURL}/api/public/sellerInfo`, data);
  }

  getProductData(data): Observable<any> {
    return this.http.post(`${this.serverURL}/api/public/productInfo`, data);
  } 

  getAvatarImage(data): Observable<any> {
    return this.http.post(`${this.serverURL}/api/public/avatarImage`, data, {responseType: "blob"});
  }

  getTopProducts(data): Observable<any> {
    return this.http.post(`${this.serverURL}/api/public/topProducts`, data);
  }

  loadOldMessages(data): Observable<any> {
    return this.http.post(`${this.serverURL}/api/user/chat/loadMessages`, data);
  }

  sendMessagee(data): Observable<any> {
    return this.http.post(`${this.serverURL}/api/user/chat/sendMessage`, data);
  }

  getNewMessages(data): Observable<any> {
    return this.http.post(`${this.serverURL}/api/user/chat/getNewMessages`, data);
  }

  deleteProduct(data): Observable<any> {
    return this.http.post(`${this.serverURL}/api/product/delete`, data);
  }
}
