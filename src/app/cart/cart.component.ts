import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../shared/common-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartList: any=[];
  totalPrice : number=0;
  constructor(
    public commonCart: CommonServiceService
  ) { }

  ngOnInit(): void {
    this.getCartList();
    this.loadCart();
  }
  getCartList(){
    let stringData: string =`${localStorage.getItem('localCart')}`;
    if(localStorage.getItem('localCart')){
      this.cartList= JSON.parse(stringData);
      console.log(this.cartList);
    }
  }
  incQnt(productId: any, qnt: any){
    for(let i=0; i< this.cartList.length; i++){
      if(this.cartList[i].productId === productId){
        this.cartList[i].qnt= parseInt(qnt) + 1;
      }
    }
    localStorage.setItem('localCart', JSON.stringify(this.cartList));
    this.loadCart();
  }
  decQnt(productId: any, qnt: any){
    for(let i=0; i< this.cartList.length; i++){
      if(this.cartList[i].productId === productId){
        if(qnt>1){
          this.cartList[i].qnt= parseInt(qnt) - 1;
        }
      }
    }
    localStorage.setItem('localCart', JSON.stringify(this.cartList));
    this.loadCart();
  }
  loadCart(){
    if(localStorage.getItem('localCart')){
      let stringData: string =`${localStorage.getItem('localCart')}`;
      this.cartList= JSON.parse(stringData);
      this.totalPrice= this.cartList.reduce(function(acc:any, val: any){
        return acc += (val.qnt * val.price);
      },0)
    }
  }
  //delete item
  deleteItem(productId: any){
    console.log(productId);
    if(localStorage.getItem('localCart')){
      this.cartList= JSON.parse(`${localStorage.getItem('localCart')}`);
      for(let i=0; i< this.cartList.length; i++){
        if(this.cartList[i].productId=== productId){
          this.cartList.splice(i, 1);
          localStorage.setItem('localCart', JSON.stringify(this.cartList));
          this.loadCart();
          this.cartItemCount();
        }
      }
    }
  }
  deleteAllItem(){
    localStorage.removeItem('localCart');
    this.cartList=[];
    this.totalPrice=0;
    this.loadCart();
    this.cartItem= 0;
    this.commonCart.cartSubject.next(this.cartItem);
  }
  //cart count item
  cartItem: number=0;
  cartItemCount(){
    if(localStorage.getItem('localCart') != null){
      var cartCount= JSON.parse(`${localStorage.getItem('localCart')}`);
     this.cartItem= cartCount.length;
     this.commonCart.cartSubject.next(this.cartItem);
    }
  }

}
