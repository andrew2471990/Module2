import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  /*
    This class handles all storing and retrieving of expense details.
  */

  constructor(
      public storage: Storage
    ){ }

  // Initialise variables
  private expenseStorage: string = "permStorage";
  public loadingIndicator:boolean = true;
  private RECEIPT_NULL:number = 0;
  private IMAGE_NULL:string = "";
  private CURRENCY_NULL:string = "";
  private AMOUNT_NULL:number = 0;
  private DATE_NULL:string = "";
  private INFO_NULL:string = "";

  public async newExpense(){
     /*
      Create a new receipt ID, initialises a new object for it,
      and set all fields to a default value.
      Params:
        Nil
      Returns:
        Nil
	  */
    // Reset expenseObject
    let expenseObject = { 
      "receipt":this.RECEIPT_NULL, 
      "savedImage":this.IMAGE_NULL,
      "currency":this.CURRENCY_NULL, 
      "amount":this.AMOUNT_NULL,
      "date":this.DATE_NULL,
      "info":this.INFO_NULL
    };

    // Increment currentReceiptID. This ensures each receipt has a unique value.
    // receiptIndexTitle has to be a string for the object key.
    let receiptIndex:number = 0;
    let receiptIndexTitle:string = ""
    await this.storage.get("currentReceiptID").then(val => {
      receiptIndex = val + 1;
    });
    await this.storage.set("currentReceiptID", receiptIndex);
    receiptIndexTitle = receiptIndex + "";

    // Store expense as a new object with key receiptIndexTitle.
    expenseObject['receipt'] = receiptIndex;
    await this.storage.set(receiptIndexTitle, expenseObject);
  }

  public async enableEditing(receiptIndex:number){
     /*
      Sets the currentReceiptID to the input value in order to enable loading/
      editing of that expense.
      Params:
        receiptIndex (Number): The receipt ID to be modified.
      Returns:
        Nil
	  */
    await this.storage.set("currentReceiptID", receiptIndex);
  }

  private async saveTempObject(receipt:number, savedImage:string, currency:string,
    amount:number, date:string, info:string){
      /*
        Writes the currently in use expense object with any new values passed in.
        Only parameters passed into the function that differ from default values will
        be updated.
        Params:
          receipt (Number): The receipt ID
          savedImage (String): Stringified object with image details.
          currency (String): The selected currency (£/$/€).
          amount (Number): Expense value.
          date (String): Day in format YYYY-MM-DD.
          info (String): Additional receipt info.
        Returns:
          Nil
      */

      // Initialise variables.
      let tempReceipt:number = this.RECEIPT_NULL;
      let tempImage:string = this.IMAGE_NULL;
      let tempCurrency:string = this.CURRENCY_NULL;
      let tempAmount:number = this.AMOUNT_NULL;
      let tempDate:string = this.DATE_NULL;
      let tempInfo:string = this.INFO_NULL;
      let receiptIndexTitle:string = "";

      // Get currently in use receiptIndexTitle
      await this.getReceiptIndex().then( val => {
        receiptIndexTitle = val;
      });
      
      // Get values for expense object
      await this.storage.get(receiptIndexTitle).then((val) => {
        tempReceipt = val.receipt;
        tempImage = val.savedImage;
        tempCurrency = val.currency;
        tempDate = val.date;
        tempAmount = val.amount;
        tempInfo = val.info;
      });

      // Only update the values that have been passed into the function.
      if (receipt !== this.RECEIPT_NULL){
        tempReceipt = receipt;
      }
      if (savedImage !== this.IMAGE_NULL) {
        tempImage = savedImage;
      }
      if (currency !== this.CURRENCY_NULL){
        tempCurrency = currency;
      }
      if (amount !== this.AMOUNT_NULL){
        tempAmount = amount;
      }
      if (date !== this.DATE_NULL){
        tempDate = date;
      }
      if (info !== this.INFO_NULL){
        tempInfo = info;
      }

      // Save new/updated receipt object.
      await this.storage.set(receiptIndexTitle, {
        "receipt":tempReceipt, 
        "savedImage":tempImage,
        "currency":tempCurrency, 
        "amount":tempAmount, 
        "date":tempDate,
        "info":tempInfo
      });

      /*
      // Debugging option: output receipt object.
      await this.storage.get(receiptIndexTitle).then((val) => {
        console.log('Receipt Object:', val);
      });
      */
    }

  public async getReceiptIndex(){
    // Get receipt index and convert to string.
    let receiptIndex:number = 0;
    let receiptIndexTitle:string = ""
    await this.storage.get("currentReceiptID").then(val => {
      receiptIndex = val;
    });
    receiptIndexTitle = receiptIndex + "";
    return receiptIndexTitle;
  }

  public async addPhoto(savedImage:string) {
    /*
    Update/add expense receipt photo.
     Params:
       savedImage (String): Stringified object with image filepath details.
     Returns:
       Nil
   */
    await this.saveTempObject(this.RECEIPT_NULL, savedImage, this.CURRENCY_NULL,
      this.AMOUNT_NULL, this.DATE_NULL, this.INFO_NULL);
  }

  public async addExpenseAmount(currency:string, amount:number) {
    /*
    Update/add expense amount.
     Params:
       currency (String): £/$/€.
       amount (Number): Expense amount.
     Returns:
       Nil
   */
   await this.saveTempObject(this.RECEIPT_NULL,this.IMAGE_NULL, currency, 
    amount, this.DATE_NULL, this.INFO_NULL);
  }

  public async addExpenseDate(date:string) {
    /*
    Update/add expense date.
     Params:
       date (String): Day in format YYYY-MM-DD.
     Returns:
       Nil
   */
   await this.saveTempObject(this.RECEIPT_NULL,this.IMAGE_NULL, this.CURRENCY_NULL,
     this.AMOUNT_NULL, date, this.INFO_NULL);
 }

  public async addExpenseInfo(info:string) {
    /*
    Update/add expense additional information.
     Params:
       info (String): Additional info.
     Returns:
       Nil
    */
    await this.saveTempObject(this.RECEIPT_NULL,this.IMAGE_NULL, this.CURRENCY_NULL,
      this.AMOUNT_NULL, this.DATE_NULL, info);
  }

  public async getExpense(optionalIndex?:string) {
    /*
    Get expense details.
     Params:
       optionalIndex (String): If receiptIndexTitle isn't passed, the function will
        use the currently in use expense.
     Returns:
       tempObject (Object): Object containing expense details.
   */
    let tempReceipt:number = 0;
    let tempImage:string = "";
    let tempCurrency:string = "";
    let tempAmount:number = 0;
    let tempDate:string = "";
    let tempInfo:string = "";
    let tempObject = {};
    let receiptIndexTitle:string = "";
    
    // If receiptIndex is passed to function, use that instead.
    // Otherwise, get current in use receiptIndex
    if (!optionalIndex){
      await this.getReceiptIndex().then( val => {
        receiptIndexTitle = val;
      });
    } else {
      receiptIndexTitle = optionalIndex;
    }

    // Get expense details and incorporate them into tempObject.
    await this.storage.get(receiptIndexTitle).then((val) => {
      tempObject['receipt'] = val.receipt;
      tempObject['savedImage'] = val.savedImage;
      tempObject['currency'] = val.currency;
      tempObject['amount'] = val.amount;
      tempObject['date'] = val.date;
      tempObject['info'] = val.info;
    });

    // Return expense object
    return tempObject;
  }

  public async addExpense(){
    /*
      Add expense details.
      Params:
        Nil
      Returns:
        Nil
    */

    // Initialise variables.
    let expenseObject = {};
    let expenseArray = [];
    let index:number = 0;
    // Get expense object
    expenseObject = await this.getExpense();
    // Delete existing receipt if it already exists with same ID
    // This is applicable when editing an existing expense.
    await this.deleteExpense(expenseObject['receipt']);

    // Get all expenses
    await this.storage.get(this.expenseStorage).then(val => {
      if (val === null) {
        expenseArray = [];
      } else {
        expenseArray = val;
      }
    });

    // Append new expense to array of existing expenses.
    expenseArray.push(expenseObject);
    // Re-set the array in storage to the new one.
    await this.storage.set(this.expenseStorage, expenseArray);
  }

  public async getAllExpenses(){
    /*
      Get all stored expenses.
     Params:
       Nil
     Returns:
       expenseArray (Array): Array of expense objects.
    */
    let expenseArray = [];
    await this.storage.get(this.expenseStorage).then(val => {
      if (val === null) {
        // If empty, return empty array.
        expenseArray = [];
      } else {
        expenseArray = val;
      }
    });
    return expenseArray;
  }

  public async deleteExpense(receiptIndex:number){
    /*
      Delete a particular expense.
      Params:
        receiptIndex (Number): Expense ID for deletion.
      Returns:
        expenseArray (Array): Array of expense objects.
    */
    // Initialise variables
    let expenseArray = [];
    let index:number = 0;
    let deletePosition = -1;
    // Get array of all expenses.
    await this.storage.get(this.expenseStorage).then(val => {
      if (val === null) {
        // Can't delete what doesn't exist!
        console.log("No items to delete...");
      } else {
        expenseArray = val;
      }
    });
    // Loop through each expense object in turn and check if it's up for
    // deletion.
    expenseArray.forEach( val => {
      if (val.receipt === receiptIndex){
        // If it's the expense to be deleted, store the array element index.
        deletePosition = index;
      }
      index = index + 1;
    });
    if (deletePosition !== -1){
      // If element index stored, removed from expenseArray
      expenseArray.splice(deletePosition, 1);
      // Re-set array of expenses in storage without the removed expense.
      await this.storage.set(this.expenseStorage, expenseArray);
    } else {
      // If expense ID doesn't exist, log to console.
      console.log("Trying to delete item not in existance...");
    }
    return expenseArray;
  }
  
}
