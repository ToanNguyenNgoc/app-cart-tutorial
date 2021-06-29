import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../shared/common-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  productList=[
    {productId:0, img:'https://i.imgur.com/HO8e9b8.jpg', name:'Apple Watch', price: 1000, qnt: 1},
    {productId:1, img:'https://i.imgur.com/HO8e9b8.jpg', name:'Macbook', price: 800, qnt: 1},
    {productId:2, img:'https://i.imgur.com/QpjAiHq.jpg', name:'Iphone 11', price: 750, qnt: 1},
    {productId:3, img:'https://i.imgur.com/JvPeqEF.jpg', name:'Nokia', price: 500, qnt: 1},
    {productId:4, img:'https://i.imgur.com/Bf4dIaN.jpg', name:'Samsung', price: 1350, qnt: 1},
    {productId:5, img:'https://i.imgur.com/HO8e9b8.jpg', name:'Pixel', price: 800, qnt: 1},
  ]

  constructor(
    private commonCart: CommonServiceService
  ) { }

  ngOnInit(): void {
  }
  inc(productItem: any){
    if(productItem.qnt < 10){
      productItem.qnt += 1;
    }
  }
  dec(productItem: any){
    if(productItem.qnt >1){
      productItem.qnt -=1;
    }
  }
  //add cart
  itemsCart: any=[];
  addCart(category: any){
    
    console.log(category);
    let cartDataNull= localStorage.getItem('localCart');
    if(cartDataNull==null){
      let storeDataGet: any=[];
      storeDataGet.push(category);
      localStorage.setItem('localCart', JSON.stringify(storeDataGet));
    }else{
      var id= category.productId;
      let index:number= -1;
      let cartData: string=`${localStorage.getItem('localCart')}`
      this.itemsCart= JSON.parse(cartData);
      for(let i=0; i< this.itemsCart.lenght; i++){
        if(parseInt(id)===parseInt(this.itemsCart[i].productId)){
          this.itemsCart[i].qnt= category.qnt;
          index=i;
          break;
        }
      }
      if(index==-1){
        this.itemsCart.push(category);
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
      }else{
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
      }
    }
    this.cartNumberFunc();
  }
  cartNumber: number=0;
  cartNumberFunc(){
    let stringData: string = `${localStorage.getItem('localCart')}`;
    var cartValue= JSON.parse(stringData);
    this.cartNumber= cartValue.length;
    this.commonCart.cartSubject.next(this.cartNumber);
    
    console.log(this.cartNumber);
  }

}
