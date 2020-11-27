import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { StorageService } from '../../services/storage.service';
import { ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-add-date',
  templateUrl: './add-date.page.html',
  styleUrls: ['./add-date.page.scss'],
})
export class AddDatePage implements OnInit {
  /*
    This class handles the receipt date addition.
     Params:
      Nil
     Returns:
      Nil
  */
  // Initialise variables.
  public confirmed: boolean = false;
  public expenseDate:string = "";
  public dateError:boolean = false;
  public expenseObject = {};
  // Calculate current date in correct format.
  private defaultDate = this.defaultDateCalc();

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

  private defaultDateCalc(){
    /*
      Calculate the current date.
      Params:
        Nil
      Returns:
        currentDate (String): Current date in format YYYY-MM-DD.
    */
    let day:string = ('0' + (new Date().getDate()).toString()).slice(-2);
    let month:string = ('0' + (new Date().getMonth() + 1).toString()).slice(-2);
    let year:string = new Date().getFullYear().toString();
    let currentDate:string = year + "-" + month + "-" + day;
    return currentDate;
  }

  confirmDate(date: string) {
    /*
      Confirm date selection.
      Params:
        date (String): Current date&time in <ion-datetime> format.
      Returns:
        Nil
    */
    // Initialise variables
    var correctFormat:boolean = false;
    var regexp
    this.confirmed = true;
    // Only require date, therefore remove time from string.
    date = date.substring(0,10);
    // Check date is in correct format (YYYY-MM-DD).
    // Actually only checks for correct pattern, doesn't check for year/month/day
    // logic. However, not required as user selects date rather than inputting.
    regexp = new RegExp('^\\d{4}\\-\\d{2}\\-\\d{2}$');
    correctFormat = regexp.test(date);
    if (correctFormat === true){
      this.expenseDate = date;
      this.dateError = false;
    } else {
      this.expenseDate = "";
      this.confirmed = false;
      this.dateError = true;
    }
  }

  editDate() {
    /*
      Re-enables the input box to allow values to be changed.
      Params:
        Nil
      Returns:
        Nil
    */
    this.confirmed = false;
  }

  submitDate(){
    /*
      Add date to the storage object for the receipt ID being processed.
      Params:
        Nil
      Returns:
        Nil
    */
    this.storageService.addExpenseDate(this.expenseDate);
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
    if (this.expenseObject['date'] === "") {
      this.expenseDate = this.defaultDate;
    } else {
      this.expenseDate = this.expenseObject['date'];
    }
  }

}
