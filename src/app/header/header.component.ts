import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../shared/common-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  constructor(private commonCart: CommonServiceService) {
    this.commonCart.cartSubject.subscribe((data)=>{
      this.cartItem= data;
    })
   }

  ngOnInit(): void {
    this.cartItemCount();
  }
  cartItem: number=0;
  cartItemCount(){
    if(localStorage.getItem('localCart') != null){
      var cartCount= JSON.parse(`${localStorage.getItem('localCart')}`);
     this.cartItem= cartCount.length;
     this.commonCart.cartSubject.next(this.cartItem);
    }
  }

}
