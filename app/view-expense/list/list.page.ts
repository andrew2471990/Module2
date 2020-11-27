import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { StorageService } from '../../services/storage.service';
import { ActivatedRoute } from '@angular/router';
import { Router} from "@angular/router";
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  /*
    This class handles listing all receipt elements.
  */
  
  // Initialise variables.
  public allExpenses = [];

  constructor(
    public storageService: StorageService,
    public photoService: PhotoService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private router: Router,
  ) { 
    // Reload data even if page hasn't been destroyed when navigated to.
    activatedRoute.params.subscribe(val => {
      this.initiateAllExpenses();
    });
  }

  public async initiateAllExpenses(){
    /*
      Get all expenses in storage array and sort into ascending date order.
      Params:
        Nil
      Returns:
        Nil
	  */    
    await this.storageService.getAllExpenses().then( val => {
      this.allExpenses = val;
    });
    // Sort by date.
    this.allExpenses.sort(this.compare);
  }

  private compare(a, b) {
    /*
      Compare two values in order to sort by date.
      Params:
        a (Object): object in expenses array
        b (Object): object in expenses array
      Returns:
        Number: Value for sort(). -1, 1, or 0 depending on the date value comparison.
	  */
    if ( a.date < b.date ){
      return -1;
    }
    if ( a.date > b.date ){
      return 1;
    }
    return 0;
  }

  async confirmDelete(receiptIndex:number) {
    /*
      Generates an alert box to confirm user's request to delete item.
      Params:
        receiptIndex (Number): Expense ID to delete.
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
            // Once confirmed, action delete.
            this.deleteExpense(receiptIndex);
          }
        }
      ]
    });
    await alert.present();
  }
  
  public async deleteExpense(receiptIndex:number){
    /*
      Uses storage service to delete requested expense.
      Params:
        receiptIndex (Number): Expense ID to delete.
      Returns:
        Nil
	  */
    await this.storageService.deleteExpense(receiptIndex).then( val => {
      this.allExpenses = val;
    });
  }

  private async editExpense(receiptIndex:number){
    /*
      Uses storage service to start the editing process.
      Params:
        receiptIndex (Number): Expense ID to delete.
      Returns:
        Nil
	  */
    this.storageService.enableEditing(receiptIndex);
  }
  
  ngOnInit() {
    
  }

}
