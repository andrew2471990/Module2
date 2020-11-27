import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router} from "@angular/router";
import { PhotoService } from '../../services/photo.service';
import { StorageService } from '../../services/storage.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {
  /*
    This class handles the expense review before submission.
    Params:
      Nil
    Returns:
      Nil
  */

  // Initialise variables.
  public confirmed: boolean = false;
  public receiptIndex:number = 0;
  public expenseAmount:string = "";
  public expenseDate:string = "";
  public expenseInfo:string = "";
  public expenseObject = {};

  constructor(
      public storageService: StorageService,
      public photoService: PhotoService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private alertController: AlertController
    ) {
      // Reload data even if page hasn't been destroyed when navigated to.
      activatedRoute.params.subscribe(val => {
        this.reviewExpense();
      });
    }

  async submitExpense(){
     /*
      Storage service handles storage of the expense claim. Passes information
      there and then takes user back to /home.
      Params:
        Nil
      Returns:
        Nil
    */
    // Save the current expense details.
    this.storageService.addExpense();
    // Show an alert to the user to indicate that it's been done.
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Expense Submitted',
      message: 'Expense details have been submitted.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // Navigate back to homepage.
            this.router.navigate(['/']);
          }
        }
      ]
    });
    await alert.present();
  }
  async reviewExpense() {
     /*
      Loads all the expense information into public variables in this class.
      Params:
        Nil
      Returns:
        Nil
    */
    // Load Photo
    await this.photoService.loadSaved();
    // Load all expense details.
    this.expenseObject = await this.storageService.getExpense();
    this.receiptIndex =  this.expenseObject['receipt'];
    this.expenseAmount =  this.expenseObject['currency'] + this.expenseObject['amount'];
    this.expenseDate =  this.expenseObject['date'];
    this.expenseInfo =  this.expenseObject['info'];
  }

  async ngOnInit(){
    await this.photoService.loadSaved();
  }

}
