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
    this.expenseObject = await this.storageService.getExpense(this.receiptIndexTitle);
    this.receiptImage = this.expenseObject['savedImage'];
    await this.photoService.loadSaved(this.receiptIndexTitle);
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
