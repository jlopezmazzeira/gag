import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import 'rxjs/add/operator/map';

@Injectable()
export class CargaArchivoProvider {
	imagenes: ArchivoSubir[] = [];
	lastKey: string = null;

  constructor(private toastCtrl: ToastController,
  			  private afDB: AngularFireDatabase) {

  	this.cargar_ultimo_key().subscribe(()=>{
  		this.cargar_imagenes();
  	});

    console.log('Hello CargaArchivoProvider Provider');
  }

  private cargar_ultimo_key(){
  	return this.afDB.list('/post', ref=> ref.orderByKey().limitToLast(1) )
  			 .valueChanges()
  			 .map( (post:any)=> {
  			 	console.log(post);
  			 	this.lastKey = post[0].key;
  			 	this.imagenes.push(post[0]);
  			 });
  }

  cargar_imagenes(){
  	let promesa = new Promise((resolve, reject) => {
  		this.afDB.list('/post',
  		ref => ref.limitToLast(1)
  				  //.orderByKey()
  				  //.endAt(this.lastKey)
  		)
  		.valueChanges()
  		.subscribe( (posts:any)=> {

  			posts.pop();

  			if(posts.length == 0){
  				console.log("Ya no hay más registros");
  				resolve(false);
  				return;
  			}

  			this.lastKey = posts[0].key;

  			for(let i = posts.length-1; i>=0; i--){
  				let post = posts[i];
  				this.imagenes.push(post);
  			}

  			resolve(true);
  		})
  	});

  	return promesa;
  }

  cargar_imagen_firebase( archivo: ArchivoSubir ){
  	let promesa = new Promise( (resolve, reject)=>{
  		let storeRef = firebase.storage().ref();
  		let nombreArchivo: string = new Date().valueOf().toString();

  		let uploadTask: firebase.storage.UploadTask = 
  			storeRef.child(`img/${ nombreArchivo }`)
  					.putString( archivo.img, 'base64', { contentType: 'image/jpeg' } )

  			uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED, 
  				() => {},//saber el % de cuanto se ha subido
  				(error) => {
  					console.log("ERROR EN LA CARGA");
  					console.log(JSON.stringify(error));
  					this.mostrar_toast(JSON.stringify(error));
  					reject();
  				},
  				() => {
  					console.log("Archivo subido");
  					this.mostrar_toast("Imagen cargada correctamente");
  					let url = uploadTask.snapshot.downloadURL;
  					this.crear_post(archivo.titulo, url, nombreArchivo);
  					resolve();
  				}

  			)
  	});

  	return promesa;
  }

  mostrar_toast( mensaje: string ){
  	let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  crear_post(titulo: string, url: string, nombreArchivo: string){
  	let post = {
  		img: url,
  		titulo: titulo,
  		key: nombreArchivo
  	}

  	console.log(JSON.stringify(post));

  	//this.afDB.list('/post').push(post);

  	this.afDB.object(`/post/${ nombreArchivo }`).update(post);
  	this.imagenes.push(post);
  }

}

interface ArchivoSubir{
	titulo: string;
	img: string;
	key?: string; //significa que es opcional
}
