import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { PhotoService } from '../services/photo.service';
import { ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public allExpenses = [];
  public amountArray = [];
  public countArray = [];

  constructor(
    public storageService: StorageService,
    public photoService: PhotoService,
    private activatedRoute:ActivatedRoute
    ) {
      // Reload data even if page hasn't been destroyed when navigated to.
      activatedRoute.params.subscribe(val => {
        this.showExpenseTotals();
      });
    }

  public async newExpense() {
    await this.storageService.newExpense();
    this.photoService.clearImages();
  }

  public async showExpenseTotals(){
    this.amountArray = [];
    this.countArray = [];
    let poundTotal:number = 0;
    let poundTotalString = "";
    let poundCount:number = 0;
    let dollarTotal:number = 0;
    let dollarTotalString = "";
    let dollarCount:number = 0;
    let euroTotal:number = 0;
    let euroTotalString = "";
    let euroCount:number = 0;
    await this.storageService.getAllExpenses().then( val => {
      this.allExpenses = val;
    });
    this.allExpenses.forEach( val => {
      if (val.currency === "£"){
        poundTotal += Number(val.amount);
        poundCount += 1;
      } else if (val.currency === "$"){ 
        dollarTotal += Number(val.amount);
        dollarCount += 1;
      } else if (val.currency === "€"){ 
        euroTotal += Number(val.amount);
        euroCount += 1;
        console.log(euroCount);
      } 
    });
    if (poundTotal !== 0){
      poundTotalString = "£" + poundTotal.toFixed(2);
      this.amountArray.push(poundTotalString);
      this.countArray.push(poundCount);
    }
    if (dollarTotal !== 0){
      dollarTotalString = "$" + dollarTotal.toFixed(2);
      this.amountArray.push(dollarTotalString);
      this.countArray.push(dollarCount);
    }
    if (euroTotal !== 0){
      euroTotalString = "€" + euroTotal.toFixed(2);
      this.amountArray.push(euroTotalString);
      this.countArray.push(euroCount);
    } 
  }
}
