import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-add-info',
  templateUrl: './add-info.page.html',
  styleUrls: ['./add-info.page.scss'],
})
export class AddInfoPage implements OnInit {
 /*
    This class handles the additional information submission.
    Params:
      Nil
    Returns:
      Nil
  */
  public confirmed: boolean = false;
  public expenseInfo:string = "";
  public infoError:boolean = false;
  public expenseObject = {};

  constructor(
      public storageService: StorageService,
      public photoService: PhotoService,
      public router: Router,
      private activatedRoute: ActivatedRoute
    ) {
      // Reload data even if page hasn't been destroyed when navigated to.
      activatedRoute.params.subscribe(val => {
        this.ngOnInit();
      });
     }

  confirmInfo(info: string) {
    /*
      Confirm info selection. As there is no correct format, this is largely redundant.
      Sanitising input would be better served in a different security class, so
      hasn't been implemented here.
      Params:
        info (String): Additional information.
      Returns:
        Nil
    */
    var correctFormat:boolean = false;
    //var regexp
    this.confirmed = true;
    //Blank regex...
    //regexp = new RegExp('^ $');
    // Automatically true.
    correctFormat = true; //regexp.test(date);
    if (correctFormat === true){
      this.expenseInfo = info;
      this.infoError = false;
    } else {
      this.expenseInfo = "";
      this.confirmed = false;
      this.infoError = true;
    }
  }

  editInfo() {
    /*
      Re-enables the input box to allow values to be changed.
      Params:
        Nil
      Returns:
        Nil
    */
    this.confirmed = false;
  }

  async submitInfo(){
    /*
      Add info to the storage object for the receipt ID being processed.
      Params:
        Nil
      Returns:
        Nil
    */
    await this.storageService.addExpenseInfo(this.expenseInfo);
    // Route there AFTER expense info has been saved.
    this.router.navigate(['/add-expense/review']);
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
    this.expenseInfo = this.expenseObject['info'];
  }

}
