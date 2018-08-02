webpackJsonp([0],{

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CargaArchivoProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CargaArchivoProvider = /** @class */ (function () {
    function CargaArchivoProvider(toastCtrl, afDB) {
        var _this = this;
        this.toastCtrl = toastCtrl;
        this.afDB = afDB;
        this.imagenes = [];
        this.lastKey = null;
        this.cargar_ultimo_key().subscribe(function () {
            _this.cargar_imagenes();
        });
        console.log('Hello CargaArchivoProvider Provider');
    }
    CargaArchivoProvider.prototype.cargar_ultimo_key = function () {
        var _this = this;
        return this.afDB.list('/post', function (ref) { return ref.orderByKey().limitToLast(1); })
            .valueChanges()
            .map(function (post) {
            console.log(post);
            _this.lastKey = post[0].key;
            _this.imagenes.push(post[0]);
        });
    };
    CargaArchivoProvider.prototype.cargar_imagenes = function () {
        var _this = this;
        var promesa = new Promise(function (resolve, reject) {
            _this.afDB.list('/post', function (ref) { return ref.limitToLast(1); }
            //.orderByKey()
            //.endAt(this.lastKey)
            )
                .valueChanges()
                .subscribe(function (posts) {
                posts.pop();
                if (posts.length == 0) {
                    console.log("Ya no hay más registros");
                    resolve(false);
                    return;
                }
                _this.lastKey = posts[0].key;
                for (var i = posts.length - 1; i >= 0; i--) {
                    var post = posts[i];
                    _this.imagenes.push(post);
                }
                resolve(true);
            });
        });
        return promesa;
    };
    CargaArchivoProvider.prototype.cargar_imagen_firebase = function (archivo) {
        var _this = this;
        var promesa = new Promise(function (resolve, reject) {
            var storeRef = __WEBPACK_IMPORTED_MODULE_3_firebase__["storage"]().ref();
            var nombreArchivo = new Date().valueOf().toString();
            var uploadTask = storeRef.child("img/" + nombreArchivo)
                .putString(archivo.img, 'base64', { contentType: 'image/jpeg' });
            uploadTask.on(__WEBPACK_IMPORTED_MODULE_3_firebase__["storage"].TaskEvent.STATE_CHANGED, function () { }, //saber el % de cuanto se ha subido
            function (error) {
                console.log("ERROR EN LA CARGA");
                console.log(JSON.stringify(error));
                _this.mostrar_toast(JSON.stringify(error));
                reject();
            }, function () {
                console.log("Archivo subido");
                _this.mostrar_toast("Imagen cargada correctamente");
                var url = uploadTask.snapshot.downloadURL;
                _this.crear_post(archivo.titulo, url, nombreArchivo);
                resolve();
            });
        });
        return promesa;
    };
    CargaArchivoProvider.prototype.mostrar_toast = function (mensaje) {
        var toast = this.toastCtrl.create({
            message: mensaje,
            duration: 2000
        });
        toast.present();
    };
    CargaArchivoProvider.prototype.crear_post = function (titulo, url, nombreArchivo) {
        var post = {
            img: url,
            titulo: titulo,
            key: nombreArchivo
        };
        console.log(JSON.stringify(post));
        //this.afDB.list('/post').push(post);
        this.afDB.object("/post/" + nombreArchivo).update(post);
        this.imagenes.push(post);
    };
    CargaArchivoProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], CargaArchivoProvider);
    return CargaArchivoProvider;
}());

//# sourceMappingURL=carga-archivo.js.map

/***/ }),

/***/ 120:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 120;

/***/ }),

/***/ 163:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 163;

/***/ }),

/***/ 230:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_subir_subir__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_carga_archivo_carga_archivo__ = __webpack_require__(109);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { AngularFireDatabase } from 'angularfire2/database';
//import { Observable } from 'rxjs/Observable';

var HomePage = /** @class */ (function () {
    //posts: Observable<any[]>;
    //constructor(private modalCtrl: ModalController, private afDB: AngularFireDatabase) {
    function HomePage(modalCtrl, _cap) {
        this.modalCtrl = modalCtrl;
        this._cap = _cap;
        this.hayMas = true;
        //this.posts = this.afDB.list('post').valueChanges();
    }
    HomePage.prototype.mostrar_modal = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__pages_subir_subir__["a" /* SubirPage */]);
        modal.present();
    };
    HomePage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log('Begin async operation');
        this._cap.cargar_imagenes().then(function (hayMas) {
            _this.hayMas = hayMas;
            console.log(hayMas);
            infiniteScroll.complete();
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/var/www/html/gag/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="dark">\n    <ion-title>\n      8Gag\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n\n	<!--<ion-card *ngFor="let post of posts | async">-->\n	<ion-card *ngFor="let post of _cap.imagenes">\n	  <img [src]="post.imagen"/>\n	  <ion-card-content>\n	    <ion-card-title>\n	      {{post.titulo}}\n	      </ion-card-title>\n	  </ion-card-content>\n	  <ion-row>\n	  	<ion-col text-right>\n	  		<button ion-button clear small color="primary"\n	  				icon-left>\n	  					<ion-icon name="share-alt">\n	  						Compartir\n	  					</ion-icon>\n	  				</button>\n	  	</ion-col>\n	  </ion-row>\n	</ion-card>\n\n	<ion-fab right bottom>\n	    <button ion-fab \n	    		color="danger"\n	    		(click)="mostrar_modal()">\n	    	<ion-icon name="add"></ion-icon>\n	    </button>\n	</ion-fab>\n\n	<ion-infinite-scroll (ionInfinite)="doInfinite($event)" [enabled]="hayMas">\n	   <ion-infinite-scroll-content></ion-infinite-scroll-content>\n	 </ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"/var/www/html/gag/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* ModalController */], __WEBPACK_IMPORTED_MODULE_3__providers_carga_archivo_carga_archivo__["a" /* CargaArchivoProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubirPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_image_picker__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_carga_archivo_carga_archivo__ = __webpack_require__(109);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SubirPage = /** @class */ (function () {
    function SubirPage(viewCtrl, camera, imagePicker, _cap) {
        this.viewCtrl = viewCtrl;
        this.camera = camera;
        this.imagePicker = imagePicker;
        this._cap = _cap;
        this.titulo = "";
        this.imagenPreview = "";
    }
    SubirPage.prototype.cerrar_modal = function () {
        this.viewCtrl.dismiss();
    };
    SubirPage.prototype.mostrar_camara = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            _this.imagenPreview = 'data:image/jpeg;base64,' + imageData;
            _this.imagen64 = imageData;
        }, function (err) {
            // Handle error
            console.log("ERROR EN CAMARA: ", JSON.stringify(err));
        });
    };
    SubirPage.prototype.seleccionar_foto = function () {
        var _this = this;
        var options = {
            quality: 70,
            outputType: 1,
            maximumImagesCount: 1
        };
        this.imagePicker.getPictures(options).then(function (results) {
            for (var i = 0; i < results.length; i++) {
                //console.log('Image URI: ' + results[i]);
                _this.imagenPreview = 'data:image/jpeg;base64,' + results[i];
                _this.imagen64 = results[i];
            }
        }, function (err) {
            console.log("ERROR EN SELECTOR: ", JSON.stringify(err));
        });
    };
    SubirPage.prototype.crear_post = function () {
        var _this = this;
        var archivo = {
            img: this.imagen64,
            titulo: this.titulo
        };
        this._cap.cargar_imagen_firebase(archivo).then(function () { return _this.cerrar_modal(); });
    };
    SubirPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-subir',template:/*ion-inline-start:"/var/www/html/gag/src/pages/subir/subir.html"*/'<ion-header>\n\n  <ion-navbar>\n  	<ion-buttons>\n  		<button ion-button (click)="cerrar_modal()">\n  			Cerrar\n  		</button>\n  	</ion-buttons>\n\n  	<ion-buttons end>\n  		<button ion-button (click)="crear_post()" [disabled]=" titulo.length <= 1 || imagenPreview.length <= 1">\n  			Crear post\n  		</button>\n  	</ion-buttons>	\n    <ion-title>{{ titulo | placeHolder: \'Crear un nuevo post\'}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n	<ion-list>\n		<ion-item>\n	    	<ion-label fixed>Titulo</ion-label>\n	    	<ion-input type="text"[(ngModel)]="titulo"></ion-input>\n	  	</ion-item>\n	  	<ion-item *ngIf="imagenPreview">\n	    	<img [src]="imagenPreview">\n	  	</ion-item>\n	</ion-list>\n\n	<ion-grid>\n		<ion-row>\n			<ion-col>\n				<button ion-button block icon-left\n					(click)="seleccionar_foto()">\n					<ion-icon name="photos"></ion-icon>\n					Seleccionar\n				</button>\n			</ion-col>\n			<ion-col>\n				<button ion-button block icon-left\n					(click)="mostrar_camara()">\n					<ion-icon name="camera"></ion-icon>\n					Camara\n				</button>\n			</ion-col>\n		</ion-row>\n	</ion-grid>\n</ion-content>\n'/*ion-inline-end:"/var/www/html/gag/src/pages/subir/subir.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_image_picker__["a" /* ImagePicker */],
            __WEBPACK_IMPORTED_MODULE_4__providers_carga_archivo_carga_archivo__["a" /* CargaArchivoProvider */]])
    ], SubirPage);
    return SubirPage;
}());

//# sourceMappingURL=subir.js.map

/***/ }),

/***/ 232:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(252);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 252:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_module__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_image_picker__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2_database__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2_auth__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_component__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_home_home__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_subir_subir__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_carga_archivo_carga_archivo__ = __webpack_require__(109);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





//Pipes

//Plugins


//firebase



var firebaseConfig = {
    apiKey: "AIzaSyBFxbOQil8BVycs0RQfhj_et3FzZ7SmhkY",
    authDomain: "gag-83aec.firebaseapp.com",
    databaseURL: "https://gag-83aec.firebaseio.com",
    projectId: "gag-83aec",
    storageBucket: "gag-83aec.appspot.com",
    messagingSenderId: "356591150599"
};




var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_12__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_subir_subir__["a" /* SubirPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_8_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
                __WEBPACK_IMPORTED_MODULE_9_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_10_angularfire2_auth__["a" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_module__["a" /* PipesModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_12__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_subir_subir__["a" /* SubirPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_9_angularfire2_database__["a" /* AngularFireDatabase */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_image_picker__["a" /* ImagePicker */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_14__providers_carga_archivo_carga_archivo__["a" /* CargaArchivoProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__place_holder_place_holder__ = __webpack_require__(302);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var PipesModule = /** @class */ (function () {
    function PipesModule() {
    }
    PipesModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__place_holder_place_holder__["a" /* PlaceHolderPipe */]],
            imports: [],
            exports: [__WEBPACK_IMPORTED_MODULE_1__place_holder_place_holder__["a" /* PlaceHolderPipe */]]
        })
    ], PipesModule);
    return PipesModule;
}());

//# sourceMappingURL=pipes.module.js.map

/***/ }),

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlaceHolderPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var PlaceHolderPipe = /** @class */ (function () {
    function PlaceHolderPipe() {
    }
    PlaceHolderPipe.prototype.transform = function (value, defecto) {
        if (defecto === void 0) { defecto = "Sin texto"; }
        return (value) ? value : defecto;
    };
    PlaceHolderPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'placeHolder',
        })
    ], PlaceHolderPipe);
    return PlaceHolderPipe;
}());

//# sourceMappingURL=place-holder.js.map

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(230);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/var/www/html/gag/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/var/www/html/gag/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[232]);
//# sourceMappingURL=main.js.map