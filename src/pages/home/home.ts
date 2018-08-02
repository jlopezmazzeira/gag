import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { SubirPage } from '../../pages/subir/subir';

//import { AngularFireDatabase } from 'angularfire2/database';
//import { Observable } from 'rxjs/Observable';

//Plugin
import { SocialSharing } from '@ionic-native/social-sharing';

import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  hayMas:boolean = true;
	
  //posts: Observable<any[]>;

  //constructor(private modalCtrl: ModalController, private afDB: AngularFireDatabase) {
  constructor(private modalCtrl: ModalController, 
              private _cap: CargaArchivoProvider,
              private socialSharing: SocialSharing) {
  	//this.posts = this.afDB.list('post').valueChanges();
  }


  mostrar_modal(){
  	let modal = this.modalCtrl.create(SubirPage);

  	modal.present();
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

      this._cap.cargar_imagenes().then(
        (hayMas:boolean)=> {
          this.hayMas = hayMas;
          console.log(hayMas);
          infiniteScroll.complete()
        }
      );
  }

  compartir(post:any){

    // Share via Facebook
    this.socialSharing.shareViaFacebook(post.titulo, post.img, post.img).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }

}
