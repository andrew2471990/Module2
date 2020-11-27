import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { StorageService } from '../../services/storage.service';
import { ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-add-amount',
  templateUrl: './add-amount.page.html',
  styleUrls: ['./add-amount.page.scss'],
})
export class AddAmountPage implements OnInit {
  /*
    This class handles the expense amount processing.
     Params:
       Nil
     Returns:
       Nil
    */
  public confirmed: boolean = false;
  public expenseAmount:number = 0.00;
  public currencyAmount:string = "";
  public amountError:boolean = false;
  public expenseObject = {};
  private defaultAmount = 0;
  private defaultCurrency = "£";

  constructor(
      public storageService: StorageService,
      public photoService: PhotoService,
      private activatedRoute: ActivatedRoute
    ) {
      // Reload data even if page hasn't been destroyed when navigated to.
      activatedRoute.params.subscribe(val => {
        this.ngOnInit();
      });
     }

  confirmAmount(currency: string, amount: number) {
    /*
    Confirm the amount entered and perform a check on .
     Params:
       currency (String): £/$/€
     Returns:
       Nil
    */
   // Initialise variables, default to £.
    var unit:string = this.defaultCurrency;
    var regexp;
    var correctFormat:boolean = false;
    this.confirmed = true;
    // 
    if (currency === "£"){
      unit = "£";
    } else if (currency === "$"){
      unit = "$";
    } else if (currency === "€"){
      unit = "€";
    }
    // Check amount is in format 0.00
    regexp = new RegExp('^\\s*-?(\\d+(\\.\\d{1,2})?|\\.\\d{1,2})\\s*$');
    correctFormat = regexp.test(amount);
    if (correctFormat === true){
      // If in correct format, continue.
      this.currencyAmount = unit
      this.expenseAmount = amount;
      this.amountError = false;
    } else {
      // If in wrong format, reset to 0.00 and do not proceed.
      this.expenseAmount = 0.00;
      this.confirmed = false;
      this.amountError = true;
    }
  }

  editAmount() {
    /*
    Re-enables the input box to allow values to be changed.
     Params:
       Nil
     Returns:
       Nil
    */
    this.confirmed = false;
  }

  submitAmount(){
    /*
    Add expense amount to the storage object for the receipt ID being processed.
     Params:
       Nil
     Returns:
       Nil
    */
    this.storageService.addExpenseAmount(this.currencyAmount,  this.expenseAmount);
  }

  async ngOnInit() {
    /*
    If values already exist in the expense object, load them here.
     Params:
       Nil
     Returns:
       Nil
    */
    this.expenseObject = await this.storageService.getExpense();
    if (this.expenseObject['amount'] === 0) {
      this.expenseAmount = this.defaultAmount;
    } else {
      this.expenseAmount = this.expenseObject['amount'];
    }
    if ( this.expenseObject['currency'] === "") {
      this.currencyAmount = this.defaultCurrency;
    } else {
      this.currencyAmount = this.expenseObject['currency'];
    }
  }

}
