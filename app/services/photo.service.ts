import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, 
  CameraPhoto, CameraSource } from '@capacitor/core';
import { StorageService } from './storage.service';

const { Camera, Filesystem } = Plugins;

@Injectable({
  providedIn: 'root'
})

export class PhotoService {
  /*
    This service deals with everything to do with the taking and storing of
    receipt photographs.
  */
  // Initialise variables
  public storedReceipts: Photo[] = [];
  public receiptIndex: number = 0;
  // Store name of key where image details are kept
  private RECEIPT_STORAGE: string = "tempReceiptImage";

  constructor(
      public storageService:StorageService,
      public platform: Platform
    ) { }

  public clearImages() {
    /*
      Clear the temporary stored image details.
      Params:
        Nil
      Returns:
        Nil
	  */
    this.storedReceipts = [];
  }

  private async savePicture(cameraPhoto: CameraPhoto) { 
    /*
      Save receipt picture. This function is based on an
      example given in the Ionic documentation.
      Params:
        cameraPhoto (CameraPhoto): Receipt picture
      Returns:
        {} (Object):
          filepath (String): File name
          webviewPath (String): File path for <img> src value
    */
    const base64Data = await this.readAsBase64(cameraPhoto);
    // Get the currently in use Receipt ID.
    await this.storageService.storage.get("currentReceiptID").then(val => {
      this.receiptIndex = val;
    });
    // Name the file accordingly
    const fileName = (this.receiptIndex + '.jpg');
    // Create image file
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data
    });

    if (this.platform.is('hybrid')) {
      // If platform is iOS/Android, convert filepath into a Web View-friendly path
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    } else {
      // If platform is web-based, must use <img> src friendly path
      return {
        filepath: fileName,
        webviewPath: cameraPhoto.webPath
      };
    }
  }

  public async addReceiptPhoto() { 
    /*
      Save receipt picture. Saves picture and data to receipt storage
      object for later consumption.
      Params:
        Nil
      Returns:
        Nil
    */
    this.clearImages();
    let savedImage:string = "";
    
    // Take photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, 
      source: CameraSource.Camera, 
      quality: 100 
    });
    // Save picture
    const savedReceipt = await this.savePicture(capturedPhoto);
    // Reverse contents of receipt picture array
    this.storedReceipts.unshift(savedReceipt);

    // Convert object to string format
    savedImage = JSON.stringify(this.storedReceipts)
    // Save details using storageService
    this.storageService.addPhoto(savedImage);
  }

  public async loadSaved(optionalIndex?:string) {
    /*
      Load receipt picture. By default will take the last taken photo as the
      in use Receipt ID unless optionalIndex is passed.
      Params:
        optionalIndex (String): Optional. Used for viewing/modifying existing expenses.
      Returns:
        Nil
    */
    // Initialise variables
    let tempImage:string = "";
    let receiptIndexTitle:string = "";

    if (!optionalIndex){
      // Default. If no argument passed, get latest receiptIndex.
      await this.storageService.getReceiptIndex().then(val => {
        receiptIndexTitle = val;
        // Convert from String to Number
        this.receiptIndex = Number(receiptIndexTitle);
      });
    } else {
      // Optional. If receiptIndex is passed, load that instead.
      receiptIndexTitle = optionalIndex;
      // Convert from String to Number.
      this.receiptIndex = Number(receiptIndexTitle);
    }

    // Get receiptID based image details
    await this.storageService.storage.get(receiptIndexTitle).then((val) => {
      tempImage = val.savedImage;
    });

    if (!tempImage) {
      // If no images stored, nullify.
      this.storedReceipts = [];
    } else {
      // Parse string back into object.
      this.storedReceipts = JSON.parse(tempImage) || [];
    }

    if (!this.platform.is('hybrid')) {
      // If platform is web-based, read in base64 format
      for (let photo of this.storedReceipts) {
        // For each stored photo. Legacy from multi-receipt option that was binned early
        // in development...
        const readFile = await Filesystem.readFile({
            path: photo.filepath,
            directory: FilesystemDirectory.Data
        });
  
        // Load base64 data
        photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
      }
    }
  }

  private async readAsBase64(cameraPhoto: CameraPhoto) {
    /*
      From Ionic documentation.
      Params:
        cameraPhoto (CameraPhoto): Receipt photo.
      Returns:
        (String): Base64 string of image data.
    */
    if (this.platform.is('hybrid')) {
      // For iOS/Android platforms
      const file = await Filesystem.readFile({
        path: cameraPhoto.path
      });

      return file.data;
    }
    else {
      // For web-based platforms.
      // Get photo, read as blob, convert to base64 format
      const response = await fetch(cameraPhoto.webPath);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    } 
  }
  
  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    /*
      Convert Blob to Base64. From Ionic documentation.
      Params:
        blob (Blob): Raw data.
      Returns:
        result (String): Base64 encoded data
    */
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

}

export interface Photo {
  filepath: string;
  webviewPath: string;
}
