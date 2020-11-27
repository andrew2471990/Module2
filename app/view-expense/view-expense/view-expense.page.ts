import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { StorageService } from '../../services/storage.service';
import { AlertController } from '@ionic/angular';
import { isNumber } from 'util';

@Component({
  selector: 'app-view-expense',
  templateUrl: './view-expense.page.html',
  styleUrls: ['./view-expense.page.scss'],
})
export class ViewExpensePage implements OnInit {
  /*
    This class handles the viewing of individual expenses (minus the receipt picture).
  */

  // Initialise variables.
  public receiptIndexTitle:string = "";
  public expenseAmount:string = "";
  public expenseDate:string = "";
  public expenseInfo:string = "";
  public expenseObject = {};

  constructor(
      private router:Router,
      private storageService: StorageService,
      private activatedRoute: ActivatedRoute,
      private alertController: AlertController
    ) { }

  private async loadExpense(){
    /*
      Gets the expense object for the receipt currently being viewed.
      receiptIndexTitle is set by ngOnInit from the URL route.
      Params:
        Nil
      Returns:
        Nil
	  */
    this.expenseObject = await this.storageService.getExpense(this.receiptIndexTitle);
    // Output expenseAmount in a readable format, prefixed with currency.
    this.expenseAmount =  this.expenseObject['currency'] + this.expenseObject['amount'];
    this.expenseDate =  this.expenseObject['date'];
    this.expenseInfo =  this.expenseObject['info'];
  }

  private async editExpense(){
    /*
      Uses storage service to enable editing of expense.
      receiptIndexTitle is set by ngOnInit from the URL route.
      Params:
        Nil
      Returns:
        Nil
	  */
    let receiptExpense:number = Number(this.receiptIndexTitle);
    this.storageService.enableEditing(receiptExpense);
  }

  public async deleteExpense(){
     /*
      Uses storage service to delete expense.
      receiptIndexTitle is set by ngOnInit from the URL route.
      Params:
        Nil
      Returns:
        Nil
	  */
    let receiptIndex:number = Number(this.receiptIndexTitle);
    await this.storageService.deleteExpense(receiptIndex);
    // Once deleted, return to list.
    this.router.navigate(['/view-expense/list']);
  }

  async confirmDelete() {
     /*
      Generates an alert box to confirm user's request to delete item. 
      Params:
        Nil
      Returns:
        Nil
	  */
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this expense?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Delete',
          handler: () => {
            // Once confirmed, delete.
            this.deleteExpense();
          }
        }
      ]
    });
    await alert.present();
  }

  ngOnInit() {
    /*
      Sets receiptIndexTitle based on the URL receiptIndex parameter.
      Params:
        Nil
      Returns:
        Nil
	  */
    this.activatedRoute.paramMap.subscribe(params => {
      this.receiptIndexTitle = params.get("receiptIndex");
      if (!Number(this.receiptIndexTitle)){
        // If receiptIndex is not a stringified number, go back home.
        this.receiptIdError();
      } else {
        // If receiptIndex is numeric, load expense.
        this.loadExpense();
      }
    });
  }

  private async receiptIdError() {
    /*
      Generates an alert box to highlight an incorrect receipt ID URL parameter. 
      Params:
        Nil
      Returns:
        Nil
	  */
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Expense ID not valid',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // Go back to list.
            this.router.navigate(['/view-expense/list']);
          }
        }
      ]
    });
    await alert.present();
  }



}
