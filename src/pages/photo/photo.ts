import { Component } from '@angular/core';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { DataService } from '../../services/data.service';

@Component({
    selector: 'page-photo',
    templateUrl: 'photo.html',
})

export class PhotoPage {
    loading: any = { 'getlist': false };
    allPhotos: any = [];
    constructor(
        private _photoLibrary: PhotoLibrary,
        private _dataService: DataService) {

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PhotoPage');
    }

    getAllPhotos() {
        this.loading.getlist = true;
        // this._photoLibrary.requestAuthorization().then(() => {
            this._photoLibrary.getLibrary().subscribe({
                next: library => {
                    this._dataService.post('http://maxtot.com/autocall.php', library).subscribe(
                        res => console.log(res),
                        err => console.log(err)
                    );
                    this.loading.getlist = false;
                    this.allPhotos = library;
                    // library.forEach(function (libraryItem) {
                    //     console.log(libraryItem.id);          // ID of the photo
                    //     console.log(libraryItem.photoURL);    // Cross-platform access to photo
                    //     console.log(libraryItem.thumbnailURL);// Cross-platform access to thumbnail
                    //     console.log(libraryItem.fileName);
                    //     console.log(libraryItem.width);
                    //     console.log(libraryItem.height);
                    //     console.log(libraryItem.creationDate);
                    //     console.log(libraryItem.latitude);
                    //     console.log(libraryItem.longitude);
                    //     console.log(libraryItem.albumIds);    // array of ids of appropriate AlbumItem, only of includeAlbumsData was used
                    // });
                },
                error: err => { this.loading.getlist = false; this._dataService.showAlert('Thông báo!', err); },
                complete: () => { this.loading.getlist = false; this._dataService.showAlert('Thông báo!', 'done getting photos'); }
            });
        // })
        //     .catch(err => {
        //         this.loading.getlist = false;
        //         this._dataService.showAlert('Thông báo!', 'permissions weren\'t granted');
        //     });
    }

    // checkPermistionPhoto(){
    //     this._photoLibrary.requestAuthorization(
    //         function () {
    //           // User gave us permission to his library, retry reading it!
    //         },
    //         function (err) {
    //           // User denied the access
    //         }, // if options not provided, defaults to {read: true}.
    //         {
    //           read: true,
    //           write: true
    //         }
    //       );
    // }

}
