import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { PhotoService } from '../../services/photo.service';
import { ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-add-picture',
  templateUrl: './add-picture.page.html',
  styleUrls: ['./add-picture.page.scss'],
})

export class AddPicturePage implements OnInit {
  /*
    This class handles the picture submission.
    Params:
      Nil
    Returns:
      Nil
  */
  constructor(
    public photoService: PhotoService,
    public storageService: StorageService,
    private activatedRoute: ActivatedRoute
    ) {
      // Reload data even if page hasn't been destroyed when navigated to.
      activatedRoute.params.subscribe(val => {
        this.ngOnInit();
      });
     }

  addReceipt() {
    /*
      Pictures are dealt with by photo service. This calls the correct function.
      Params:
        Nil
      Returns:
        Nil
    */
    this.photoService.addReceiptPhoto();
  }

  async ngOnInit() {
    /*
    If picture already exist in the expense object, load it here.
     Params:
       Nil
     Returns:
       Nil
    */
    await this.photoService.loadSaved();
  }

}
