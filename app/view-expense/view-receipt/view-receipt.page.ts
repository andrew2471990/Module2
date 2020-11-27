import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { StorageService } from '../../services/storage.service';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-view-receipt',
  templateUrl: './view-receipt.page.html',
  styleUrls: ['./view-receipt.page.scss'],
})
export class ViewReceiptPage implements OnInit {
  /*
    This class handles showing a single receipt image.
  */
  public receiptIndexTitle:string = "";
  public receiptTimestamp:string = "";
  public receiptImage:string = "";
  public expenseObject = {};

  constructor(
      private router:Router,
      private storageService: StorageService,
      public photoService: PhotoService,
      private activatedRoute: ActivatedRoute
    ) { }

  private async loadReceipt(){
    /*
      Loads the correct image based on the selected receipt.
      Params:
        Nil
      Returns:
        Nil
	  */
    // Initialise variables
    var receiptObject = {};

    this.expenseObject = await this.storageService.getExpense(this.receiptIndexTitle);
    this.receiptImage = this.expenseObject['savedImage'];
    // Generate timestamp string.
    receiptObject = JSON.parse(this.receiptImage) || [];
    this.receiptTimestamp = this.generateTimestamp(receiptObject[0]['time']);
    // Load image
    await this.photoService.loadSaved(this.receiptIndexTitle);
  }

  private generateTimestamp(savedTimestamp:number){
    /*
      Generate a string showing the receipt photo timestamp.
      Params:
        savedTimestamp (Number): Unix epoch number
      Returns:
        timestamp (String): An easily readable time format (HH:MM on DD MMM YYYY)
	  */
   // Initialise variables.
    let epochTime = new Date(savedTimestamp);
    let months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    let day:number = epochTime.getDate()
    let month:number = epochTime.getMonth()
    let year:number = epochTime.getFullYear()
    let hours:number = epochTime.getHours()
    let minutes:number = epochTime.getMinutes()
    let timestamp:string = "";

    // Check if a timestamp has been saved with the photo
    if (savedTimestamp !== undefined) {
      timestamp = hours + ":" + minutes + " on " + day + " " + months[month] + " " + year;
    } else {
      timestamp = "No time stored";
    }
    return timestamp
  }

  ngOnInit() {
    /*
      On page creation, load the image.
      Params:
        Nil
      Returns:
        Nil
	  */
    this.activatedRoute.paramMap.subscribe(params => {
      this.receiptIndexTitle = params.get("receiptIndex");
      this.loadReceipt();
    })
  }

}
