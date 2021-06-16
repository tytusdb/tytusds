(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _components_home_home_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/home/home.component */ "./src/app/components/home/home.component.ts");
/* harmony import */ var _components_listadobleCircular_listadobleCircular_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/listadobleCircular/listadobleCircular.component */ "./src/app/components/listadobleCircular/listadobleCircular.component.ts");


//########################## COMPONENTES #############################################




const routes = [
    { path: 'listaDobleCircular', component: _components_listadobleCircular_listadobleCircular_component__WEBPACK_IMPORTED_MODULE_3__["ListaDobleCircularComponent"], pathMatch: 'full' },
    { path: '', component: _components_home_home_component__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"], pathMatch: 'full' }
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
        _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");



class AppComponent {
    constructor() {
        this.title = 'TytusDS';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css']
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _components_home_home_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/home/home.component */ "./src/app/components/home/home.component.ts");
/* harmony import */ var _components_listadobleCircular_listadobleCircular_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/listadobleCircular/listadobleCircular.component */ "./src/app/components/listadobleCircular/listadobleCircular.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/animations.js");









class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["BrowserAnimationsModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
        _components_home_home_component__WEBPACK_IMPORTED_MODULE_4__["HomeComponent"],
        _components_listadobleCircular_listadobleCircular_component__WEBPACK_IMPORTED_MODULE_5__["ListaDobleCircularComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["BrowserAnimationsModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                    _components_home_home_component__WEBPACK_IMPORTED_MODULE_4__["HomeComponent"],
                    _components_listadobleCircular_listadobleCircular_component__WEBPACK_IMPORTED_MODULE_5__["ListaDobleCircularComponent"],
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["BrowserAnimationsModule"]
                ],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/components/home/home.component.ts":
/*!***************************************************!*\
  !*** ./src/app/components/home/home.component.ts ***!
  \***************************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");



class HomeComponent {
    constructor() { }
    ngOnInit() {
    }
}
HomeComponent.ɵfac = function HomeComponent_Factory(t) { return new (t || HomeComponent)(); };
HomeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HomeComponent, selectors: [["app-home"]], decls: 13, vars: 0, consts: [[1, "container"], [1, "row"], [1, "col", "text-center", "mt-4"], [1, "text-white"], [1, "row", "mt-5"], [1, "col-lg-4", "col-md-6", "w-100", "col-sm-6", "mb-2"], ["src", "https://prepinsta.com/wp-content/uploads/2020/06/asd.webp", "alt", "Card image cap", 1, "card-img-top"], [1, "card-body", "text-white"], ["routerLink", "/listaDobleCircular", 1, "nav-link", "text-white"]], template: function HomeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "body");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "h1", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "TytusDS");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "img", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "a", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, " Lista Circular Doble Enlazada");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLinkWithHref"]], styles: ["body[_ngcontent-%COMP%]{\r\n    min-height: 100vh;\r\n    background-color: #263238;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9ob21lL2hvbWUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGlCQUFpQjtJQUNqQix5QkFBeUI7QUFDN0IiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL2hvbWUvaG9tZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYm9keXtcclxuICAgIG1pbi1oZWlnaHQ6IDEwMHZoO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzI2MzIzODtcclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HomeComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-home',
                templateUrl: './home.component.html',
                styleUrls: ['./home.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/components/listadobleCircular/listadobleCircular.component.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/components/listadobleCircular/listadobleCircular.component.ts ***!
  \*******************************************************************************/
/*! exports provided: ListaDobleCircularComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListaDobleCircularComponent", function() { return ListaDobleCircularComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _helpers_DobleEnlazadaCircular_ListaDobleCircular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helpers/DobleEnlazadaCircular/ListaDobleCircular */ "./src/app/helpers/DobleEnlazadaCircular/ListaDobleCircular.ts");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");






const _c0 = ["cuerpoDraw"];
class ListaDobleCircularComponent {
    constructor(renderer) {
        this.renderer = renderer;
        this.repetidos = false;
        this.velocidad = 0.5;
        this.alfinal = true;
        this.alinicio = false;
        this.ordenado = false;
    }
    ngOnInit() {
        this.ListaDobleCircular = new _helpers_DobleEnlazadaCircular_ListaDobleCircular__WEBPACK_IMPORTED_MODULE_2__["ListaDobleCircular"]();
        this.svg1 = document.getElementById("svg");
        this.svg1.style.position = 'absolute';
        this.svg1.style.top = '0';
        this.svg1.style.left = '0';
        this.svg1.style.width = '100%';
        this.svg1.style.height = '100vh';
        this.svg1.style.zIndex = '0';
    }
    addLast() {
        if (!this.repetidos) {
            let temp = this.ListaDobleCircular.search(this.numero);
            if (temp !== null) {
                sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `El numero ${this.numero} ya existe en la lista`
                });
                return;
            }
        }
        if (this.alfinal) {
            let dibujo = document.getElementById("cuerpoDraw");
            this.ListaDobleCircular.add(this.numero, this.svg1, dibujo, `${this.velocidad}s`);
        }
        if (this.alinicio) {
            let dibujo = document.getElementById("cuerpoDraw");
            this.ListaDobleCircular.addAlInicio(this.numero, this.svg1, dibujo, `${this.velocidad}s`);
        }
        if (this.ordenado) {
            let dibujo = document.getElementById("cuerpoDraw");
            this.ListaDobleCircular.addOrdenado(this.numero, this.svg1, dibujo, `${this.velocidad}s`);
        }
        this.numero = 0;
    }
    search() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let result = yield this.ListaDobleCircular.searchAnimation(this.numeroBuscar, `${this.velocidad}s`);
            if (result === null) {
                sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `El numero ${this.numeroBuscar} no existe en la lista`
                });
                return;
            }
            sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire({
                icon: 'success',
                title: ':)',
                text: `Se econtro el numero ${this.numeroBuscar} en la posicion ${result.index}`
            });
            this.numeroBuscar = 0;
        });
    }
    delete() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let result = yield this.ListaDobleCircular.eliminar(this.numeroEliminar, `${this.velocidad}s`, this.svg1);
            if (result === -1) {
                sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `El numero ${this.numeroEliminar} no existe en la lista`
                });
                return;
            }
            this.numeroEliminar = 0;
        });
    }
    actualizar() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let result = yield this.ListaDobleCircular.searchAnimation(this.numeroAntiguo, `${this.velocidad}s`);
            if (result === null) {
                sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `El numero ${this.numeroAntiguo} no existe en la lista`
                });
                return;
            }
            result.nodo.setNumero(this.numeroNuevo);
            document.getElementById("nodo" + result.nodo.getId()).innerHTML = "" + this.numeroNuevo;
            this.numeroAntiguo = 0;
            this.numeroNuevo = 0;
        });
    }
    changeAlFinal() {
        if (this.alfinal) {
            this.alinicio = false;
            this.ordenado = false;
        }
    }
    changeAlInicio() {
        if (this.alinicio) {
            this.alfinal = false;
            this.ordenado = false;
        }
    }
    changeOrdenado() {
        if (this.ordenado) {
            this.alfinal = false;
            this.alinicio = false;
        }
    }
}
ListaDobleCircularComponent.ɵfac = function ListaDobleCircularComponent_Factory(t) { return new (t || ListaDobleCircularComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"])); };
ListaDobleCircularComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: ListaDobleCircularComponent, selectors: [["app-ListaDobleCircular"]], viewQuery: function ListaDobleCircularComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.cuerpoDraw = _t.first);
    } }, decls: 60, vars: 10, consts: [[1, "container", "mt-2"], [1, "row", "opciones", "p-2"], [1, "col-lg-3", "col-sm-12", "col-12", "mt-1"], [1, "input-group"], ["type", "number", "id", "numero", "name", "numero", "placeholder", "Ingresa un Numero", 1, "form-control", 3, "ngModel", "ngModelChange"], [1, "input-group-append"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "button", 1, "btn", "btn-success", 3, "click"], ["type", "number", "id", "numero", "name", "numero", "placeholder", "Antiguo", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "number", "id", "numero", "name", "numero", "placeholder", "Nuevo", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "button", 1, "btn", "btn-warning", 3, "click"], ["type", "button", 1, "btn", "btn-danger", 3, "click"], [1, "col-12", "col-sm-12", "col-lg-2", "text-left", "mt-2", "text-white", "mt-1"], [1, "dropdown"], ["type", "button", "id", "dropdownMenuButton", "data-toggle", "dropdown", "aria-haspopup", "true", "aria-expanded", "false", 1, "btn", "btn-info", "dropdown-toggle"], ["aria-labelledby", "dropdownMenuButton", 1, "dropdown-menu"], ["type", "checkbox", "value", "", "id", "repetidos", "name", "repetidos", 1, "form-check-input", "ml-1", 3, "ngModel", "ngModelChange"], ["for", "flexCheckDefault", 1, "form-check-label", "ml-4"], ["type", "checkbox", "value", "", "id", "alfinal", "name", "alfinal", 1, "form-check-input", "ml-1", 3, "ngModel", "ngModelChange", "change"], ["for", "alfinal", 1, "form-check-label", "ml-4"], ["type", "checkbox", "value", "", "id", "alinicio", "name", "alinicio", 1, "form-check-input", "ml-1", 3, "ngModel", "ngModelChange", "change"], ["for", "alinicio", 1, "form-check-label", "ml-4"], ["type", "checkbox", "value", "", "id", "ordenado", "name", "ordenado", 1, "form-check-input", "ml-1", 3, "ngModel", "ngModelChange", "change"], ["for", "ordenado", 1, "form-check-label", "ml-4"], ["type", "number", "id", "numero", "name", "numero", "placeholder", "Velocidad", 1, "form-control", 3, "ngModel", "ngModelChange"], ["id", "cuerpoDraw", 1, "row", "mt-5"], ["cuerpoDraw", ""], ["xmlns", "http://www.w3.org/2000/svg", "width", "100%", "height", "100%", "id", "svg", 1, "svg"], ["id", "arrowhead", "viewBox", "0 0 10 10", "refX", "3", "refY", "5", "markerWidth", "6", "markerHeight", "6", "orient", "auto"], ["d", "M 0 0 L 10 5 L 0 10 z"], ["fill", "none", "stroke", "black", "stroke-width", "2", "marker-end", "url(#arrowhead)"], ["id", "arrowLeft"], ["id", "arrowRight"]], template: function ListaDobleCircularComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "body");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function ListaDobleCircularComponent_Template_input_ngModelChange_5_listener($event) { return ctx.numero = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ListaDobleCircularComponent_Template_button_click_7_listener() { return ctx.addLast(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "Guardar");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function ListaDobleCircularComponent_Template_input_ngModelChange_11_listener($event) { return ctx.numeroBuscar = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ListaDobleCircularComponent_Template_button_click_13_listener() { return ctx.search(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "Buscar");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "input", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function ListaDobleCircularComponent_Template_input_ngModelChange_17_listener($event) { return ctx.numeroAntiguo = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "input", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function ListaDobleCircularComponent_Template_input_ngModelChange_18_listener($event) { return ctx.numeroNuevo = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ListaDobleCircularComponent_Template_button_click_20_listener() { return ctx.actualizar(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21, "Actualizar");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function ListaDobleCircularComponent_Template_input_ngModelChange_24_listener($event) { return ctx.numeroEliminar = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](26, "button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ListaDobleCircularComponent_Template_button_click_26_listener() { return ctx.delete(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](27, "Eliminar");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](29, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](30, "button", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](31, " Opciones ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](32, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](33, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](34, "input", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function ListaDobleCircularComponent_Template_input_ngModelChange_34_listener($event) { return ctx.repetidos = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](35, "label", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](36, " Numeros Repetidos");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](37, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](38, "input", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function ListaDobleCircularComponent_Template_input_ngModelChange_38_listener($event) { return ctx.alfinal = $event; })("change", function ListaDobleCircularComponent_Template_input_change_38_listener() { return ctx.changeAlFinal(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](39, "label", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](40, " Insertar al final");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](41, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](42, "input", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function ListaDobleCircularComponent_Template_input_ngModelChange_42_listener($event) { return ctx.alinicio = $event; })("change", function ListaDobleCircularComponent_Template_input_change_42_listener() { return ctx.changeAlInicio(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](43, "label", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](44, " Insertar al Inicio");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](45, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](46, "input", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function ListaDobleCircularComponent_Template_input_ngModelChange_46_listener($event) { return ctx.ordenado = $event; })("change", function ListaDobleCircularComponent_Template_input_change_46_listener() { return ctx.changeOrdenado(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](47, "label", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](48, " Ordenado");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](49, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](50, "input", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function ListaDobleCircularComponent_Template_input_ngModelChange_50_listener($event) { return ctx.velocidad = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](51, "div", 25, 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](53, "svg", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](54, "defs");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](55, "marker", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](56, "path", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](57, "g", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](58, "path", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](59, "path", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.numero);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.numeroBuscar);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.numeroAntiguo);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.numeroNuevo);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.numeroEliminar);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.repetidos);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.alfinal);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.alinicio);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.ordenado);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.velocidad);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["NumberValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["CheckboxControlValueAccessor"]], styles: ["body[_ngcontent-%COMP%] {\r\n  min-height: 100vh;\r\n  background-color: #FAFAFA;\r\n}\r\n\r\n.container[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  z-index: 9999;\r\n  \r\n}\r\n\r\n.opciones[_ngcontent-%COMP%]{\r\n  background-color:#B43E60;\r\n}\r\n\r\n.arrow[_ngcontent-%COMP%] {\r\n  stroke: rgb(0, 0, 0);\r\n  stroke-width: 2;\r\n  marker-end: url(#markerArrow);\r\n}\r\n\r\n.svg[_ngcontent-%COMP%] {\r\n  position: \"absolute\";\r\n  top: \"0\";\r\n  left: \"0\";\r\n  width: \"100%\";\r\n  height: \"100vh\";\r\n  z-index: \"0\";\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9saXN0YWRvYmxlQ2lyY3VsYXIvTGlzdGFEb2JsZUNpcmN1bGFyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQkFBaUI7RUFDakIseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGFBQWE7O0FBRWY7O0FBRUE7RUFDRSx3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSxvQkFBb0I7RUFDcEIsZUFBZTtFQUNmLDZCQUE2QjtBQUMvQjs7QUFFQTtFQUNFLG9CQUFvQjtFQUNwQixRQUFRO0VBQ1IsU0FBUztFQUNULGFBQWE7RUFDYixlQUFlO0VBQ2YsWUFBWTtBQUNkIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9saXN0YWRvYmxlQ2lyY3VsYXIvTGlzdGFEb2JsZUNpcmN1bGFyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJib2R5IHtcclxuICBtaW4taGVpZ2h0OiAxMDB2aDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkFGQUZBO1xyXG59XHJcblxyXG4uY29udGFpbmVyIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgei1pbmRleDogOTk5OTtcclxuICBcclxufVxyXG5cclxuLm9wY2lvbmVze1xyXG4gIGJhY2tncm91bmQtY29sb3I6I0I0M0U2MDtcclxufVxyXG5cclxuLmFycm93IHtcclxuICBzdHJva2U6IHJnYigwLCAwLCAwKTtcclxuICBzdHJva2Utd2lkdGg6IDI7XHJcbiAgbWFya2VyLWVuZDogdXJsKCNtYXJrZXJBcnJvdyk7XHJcbn1cclxuXHJcbi5zdmcge1xyXG4gIHBvc2l0aW9uOiBcImFic29sdXRlXCI7XHJcbiAgdG9wOiBcIjBcIjtcclxuICBsZWZ0OiBcIjBcIjtcclxuICB3aWR0aDogXCIxMDAlXCI7XHJcbiAgaGVpZ2h0OiBcIjEwMHZoXCI7XHJcbiAgei1pbmRleDogXCIwXCI7XHJcbn1cclxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](ListaDobleCircularComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-ListaDobleCircular',
                templateUrl: './ListaDobleCircular.component.html',
                styleUrls: ['./ListaDobleCircular.component.css']
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"] }]; }, { cuerpoDraw: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"],
            args: ['cuerpoDraw']
        }] }); })();


/***/ }),

/***/ "./src/app/helpers/DobleEnlazadaCircular/ListaDobleCircular.ts":
/*!*********************************************************************!*\
  !*** ./src/app/helpers/DobleEnlazadaCircular/ListaDobleCircular.ts ***!
  \*********************************************************************/
/*! exports provided: ListaDobleCircular */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListaDobleCircular", function() { return ListaDobleCircular; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _NodoDobleCircular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NodoDobleCircular */ "./src/app/helpers/DobleEnlazadaCircular/NodoDobleCircular.ts");


class ListaDobleCircular {
    constructor() {
        this.primero = null;
        this.ultimo = null;
        this.id = 0;
    }
    add(numero, svg, dibujo, duracion) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let temp = new _NodoDobleCircular__WEBPACK_IMPORTED_MODULE_1__["NodoDobleCircular"](numero, this.id);
            if (this.primero == null) {
                this.primero = temp;
                this.ultimo = temp;
                let div = this.crearNodo(numero, this.id);
                dibujo.appendChild(div);
                this.id++;
                yield this.animateNode("nodo" + temp.getId(), "zoomIn", duracion);
                return temp.getId();
            }
            temp.setId(this.id);
            this.id++;
            if (this.primero.getSiguiente() !== this.ultimo && this.primero.getSiguiente() !== null) {
                this.removerElemento("arrowprimero-ultimo");
                this.removerElemento("arrowultimo-primero");
            }
            let div = this.crearNodo(numero, temp.getId());
            dibujo.appendChild(div);
            yield this.animateNode("nodo" + temp.getId(), "zoomIn", duracion);
            let div2 = document.getElementById("nodo" + this.ultimo.getId());
            let posiciones = this.posicionesLeft(div, div2);
            posiciones.color = 'black';
            this.crearPath(this.ultimo.getId() + "-" + temp.getId(), svg, posiciones);
            posiciones = this.posicionesRight(div, div2);
            posiciones.color = 'black';
            this.crearPath(temp.getId() + "-" + this.ultimo.getId(), svg, posiciones);
            let tempUltimo = this.ultimo;
            tempUltimo.setSiguiente(temp);
            temp.setAnterior(tempUltimo);
            temp.setSiguiente(this.primero);
            this.primero.setAnterior(temp);
            this.ultimo = temp;
            this.crearUltimos(svg);
            return temp.getId();
        });
    }
    addAlInicio(numero, svg, dibujo, duracion) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let temp = new _NodoDobleCircular__WEBPACK_IMPORTED_MODULE_1__["NodoDobleCircular"](numero, this.id);
            if (this.primero == null) {
                this.primero = temp;
                this.ultimo = temp;
                let div = this.crearNodo(numero, this.id);
                dibujo.appendChild(div);
                this.id++;
                yield this.animateNode("nodo" + temp.getId(), "zoomIn", duracion);
                return temp.getId();
            }
            temp.setId(this.id);
            this.id++;
            if (this.primero.getSiguiente() !== this.ultimo && this.primero.getSiguiente() !== null) {
                this.removerElemento("arrowprimero-ultimo");
                this.removerElemento("arrowultimo-primero");
            }
            let div = this.crearNodo(numero, temp.getId());
            dibujo.insertBefore(div, dibujo.firstChild);
            yield this.animateNode("nodo" + temp.getId(), "zoomIn", duracion);
            let tempPrimero = this.primero;
            temp.setSiguiente(tempPrimero);
            tempPrimero.setAnterior(temp);
            this.ultimo.setSiguiente(temp);
            temp.setAnterior(this.ultimo);
            this.primero = temp;
            this.corregirPaths(svg, this.primero);
            return temp.getId();
        });
    }
    addOrdenado(numero, svg, dibujo, duracion) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            // Ingresar si esta vacia
            if (this.primero == null) {
                let temp = new _NodoDobleCircular__WEBPACK_IMPORTED_MODULE_1__["NodoDobleCircular"](numero, this.id);
                this.primero = temp;
                this.ultimo = temp;
                let div = this.crearNodo(numero, this.id);
                dibujo.appendChild(div);
                this.id++;
                yield this.animateNode("nodo" + temp.getId(), "zoomIn", duracion);
                return temp.getId();
            }
            if (this.primero.getSiguiente() !== this.ultimo && this.primero.getSiguiente() !== null) {
                this.removerElemento("arrowprimero-ultimo");
                this.removerElemento("arrowultimo-primero");
            }
            //Ingresar si solo hay uno
            if (this.primero.getSiguiente() === null) {
                yield this.add(numero, svg, dibujo, duracion);
                return 1;
            }
            // Si es mayor al primero pero menor al siguiente
            if (numero >= this.primero.getNumero() && numero < this.primero.getSiguiente().getNumero()) {
                let temp = new _NodoDobleCircular__WEBPACK_IMPORTED_MODULE_1__["NodoDobleCircular"](numero, this.id);
                temp.setId(this.id);
                this.id++;
                let id1 = this.primero.getId();
                let id2 = this.primero.getSiguiente().getId();
                let tempPrimero = this.primero;
                temp.setAnterior(tempPrimero);
                temp.setSiguiente(tempPrimero.getSiguiente());
                tempPrimero.setSiguiente(temp);
                tempPrimero.getSiguiente().setAnterior(temp);
                this.removerElemento("arrow" + id1 + "-" + id2);
                this.removerElemento("arrow" + id2 + "-" + id1);
                let div = this.crearNodo(numero, temp.getId());
                dibujo.insertBefore(div, dibujo.children[1]);
                yield this.animateNode("nodo" + temp.getId(), "zoomIn", duracion);
                this.corregirPaths(svg, this.primero);
                return 1;
            }
            let tempPrimero = this.primero;
            let index = 0;
            do {
                let siguiente = tempPrimero.getSiguiente();
                if (numero >= tempPrimero.getNumero() && numero < siguiente.getNumero()) {
                    let temp = new _NodoDobleCircular__WEBPACK_IMPORTED_MODULE_1__["NodoDobleCircular"](numero, this.id);
                    temp.setId(this.id);
                    this.id++;
                    let id1 = this.primero.getId();
                    let id2 = this.primero.getSiguiente().getId();
                    temp.setAnterior(tempPrimero);
                    temp.setSiguiente(tempPrimero.getSiguiente());
                    tempPrimero.setSiguiente(temp);
                    tempPrimero.getSiguiente().setAnterior(temp);
                    this.removerElemento("arrow" + id1 + "-" + id2);
                    this.removerElemento("arrow" + id2 + "-" + id1);
                    let div = this.crearNodo(numero, temp.getId());
                    dibujo.insertBefore(div, dibujo.children[index + 1]);
                    yield this.animateNode("nodo" + temp.getId(), "zoomIn", duracion);
                    this.corregirPaths(svg, this.primero);
                    return 1;
                }
                index++;
                tempPrimero = tempPrimero.getSiguiente();
                if (tempPrimero === this.ultimo)
                    break;
                if (tempPrimero === null)
                    break;
            } while (tempPrimero != this.primero);
            // Ingresar siempre de ultimo
            yield this.add(numero, svg, dibujo, duracion);
            return 1;
        });
    }
    search(numero) {
        let temp = this.primero;
        if (temp === null)
            return null;
        do {
            if (temp.getNumero() === numero)
                return temp;
            temp = temp.getSiguiente();
            if (temp === null)
                break;
        } while (temp != this.primero);
        return null;
    }
    searchAnimation(numero, duration) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let temp = this.primero;
            let i = 0;
            if (temp === null)
                return null;
            do {
                yield this.animateNode("nodo" + temp.getId(), 'bounceIn', duration);
                if (temp.getNumero() === numero)
                    return { nodo: temp, index: i };
                temp = temp.getSiguiente();
                i++;
                if (temp === null)
                    break;
            } while (temp != this.primero);
            return null;
        });
    }
    eliminar(numero, duracion, svg) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let temp = this.primero;
            if (temp === null)
                return -1;
            //Eliminar Primero
            if (temp.getNumero() === numero) {
                yield this.animateNode("nodo" + temp.getId(), 'zoomOut', duracion);
                this.removerElemento("nodo" + temp.getId());
                //Solo hay 1
                if (temp.getSiguiente() === null) {
                    this.primero = null;
                    this.ultimo = null;
                    return 1;
                }
                this.ultimo.setSiguiente(temp.getSiguiente());
                temp.getSiguiente().setAnterior(this.ultimo);
                let id1 = this.primero.getId();
                let id2 = this.primero.getSiguiente().getId();
                this.removerElemento("arrow" + id1 + "-" + id2);
                this.removerElemento("arrow" + id2 + "-" + id1);
                this.primero = temp.getSiguiente();
                this.corregirPaths(svg, this.primero);
                return 1;
            }
            //Eliminar Ultimo
            else if (this.ultimo.getNumero() === numero) {
                let id1 = this.ultimo.getId();
                yield this.animateNode("nodo" + id1, 'zoomOut', duracion);
                this.removerElemento("nodo" + id1);
                //Solo hay 2
                if (this.ultimo.getAnterior() === this.primero) {
                    this.primero.setSiguiente(null);
                    this.ultimo = this.primero;
                    let id2 = this.primero.getId();
                    this.removerElemento("arrow" + id1 + "-" + id2);
                    this.removerElemento("arrow" + id2 + "-" + id1);
                    this.corregirPaths(svg, this.primero);
                    return 1;
                }
                console.log("HGola");
                this.ultimo.getAnterior().setSiguiente(this.primero);
                this.primero.setAnterior(this.ultimo.getAnterior());
                let id2 = this.ultimo.getAnterior().getId();
                this.ultimo = this.ultimo.getAnterior();
                this.removerElemento("arrow" + id1 + "-" + id2);
                this.removerElemento("arrow" + id2 + "-" + id1);
                this.corregirPaths(svg, this.ultimo);
                return 1;
            }
            do {
                if (temp.getNumero() === numero) {
                    let anterior = temp.getAnterior();
                    let siguiente = temp.getSiguiente();
                    let id1 = temp.getId();
                    let id2 = anterior.getId();
                    let id3 = siguiente.getId();
                    yield this.animateNode("nodo" + id1, 'zoomOut', duracion);
                    this.removerElemento("nodo" + id1);
                    anterior.setSiguiente(temp.getSiguiente());
                    temp.getSiguiente().setAnterior(anterior);
                    this.removerElemento("arrow" + id1 + "-" + id2);
                    this.removerElemento("arrow" + id2 + "-" + id1);
                    this.removerElemento("arrow" + id1 + "-" + id3);
                    this.removerElemento("arrow" + id3 + "-" + id1);
                    this.corregirPaths(svg, anterior);
                    return 1;
                }
                temp = temp.getSiguiente();
                if (temp === this.ultimo)
                    break;
                if (temp === null)
                    break;
            } while (temp !== this.ultimo);
            return -1;
        });
    }
    crearPath(result, svg, posiciones) {
        const pathLeft = document.createElementNS("http://www.w3.org/2000/svg", "line");
        pathLeft.setAttribute("id", "arrow" + result);
        pathLeft.setAttribute('stroke-width', '2');
        pathLeft.setAttribute('stroke', posiciones.color);
        pathLeft.setAttribute('marker-end', 'url(#arrowhead)');
        svg.appendChild(pathLeft);
        pathLeft.setAttribute('x1', `${posiciones.x1}`);
        pathLeft.setAttribute('x2', `${posiciones.x2}`);
        pathLeft.setAttribute('y1', `${posiciones.y1}`);
        pathLeft.setAttribute('y2', `${posiciones.y2}`);
    }
    animateNode(element, animation, duration) {
        let prefix = 'animate__';
        return new Promise((resolve, reject) => {
            const animationName = `${prefix}${animation}`;
            const node = document.getElementById(element);
            node.classList.add(animationName);
            node.style.setProperty('--animate-duration', duration);
            function handleAnimationEnd(event) {
                event.stopPropagation();
                node.classList.remove(animationName);
                resolve('Animation ended');
            }
            node.addEventListener('animationend', handleAnimationEnd, { once: true });
            //resolve('Animation ended');
        });
    }
    getPrimero() {
        return this.primero;
    }
    getUltimo() {
        return this.ultimo;
    }
    crearNodo(numero, id) {
        let div = document.createElement('div');
        div.className = "node animate__animated ml-5";
        div.id = "nodo" + id;
        div.textContent = numero;
        return div;
    }
    removerElemento(id) {
        try {
            document.getElementById(id).remove();
        }
        catch (e) { }
    }
    crearUltimos(svg) {
        if (this.primero.getSiguiente() === null)
            return;
        if (this.primero.getSiguiente() === this.ultimo)
            return;
        let div = document.getElementById("nodo" + this.primero.getId());
        let div2 = document.getElementById("nodo" + this.ultimo.getId());
        let posiciones = this.posicionesLeft(div, div2);
        posiciones.y1 += 20;
        posiciones.y2 += 20;
        posiciones.x1 -= 10;
        posiciones.x2 += 50;
        this.crearPath("primero-ultimo", svg, posiciones);
        posiciones = this.posicionesRight(div, div2);
        posiciones.y1 += 30;
        posiciones.y2 += 30;
        posiciones.x1 -= 20;
        posiciones.x2 -= 30;
        this.crearPath("ultimo-primero", svg, posiciones);
    }
    posicionesLeft(div, div2) {
        return {
            x1: div2.getBoundingClientRect().right,
            x2: div.getBoundingClientRect().left,
            y1: div2.getBoundingClientRect().top + div2.offsetHeight / 2,
            y2: div.getBoundingClientRect().top + div.offsetHeight / 2,
            color: 'red'
        };
    }
    posicionesRight(div, div2) {
        return {
            x1: div.getBoundingClientRect().right,
            x2: div2.getBoundingClientRect().left + 50,
            y1: div.getBoundingClientRect().top + div.offsetHeight / 2 - 5,
            y2: div2.getBoundingClientRect().top + div2.offsetHeight / 2 - 5,
            color: 'red'
        };
    }
    corregirPaths(svg, nodo) {
        this.removerElemento("arrowprimero-ultimo");
        this.removerElemento("arrowultimo-primero");
        let temp = nodo;
        do {
            let siguiente = temp.getSiguiente();
            if (siguiente !== null) {
                let id1 = temp.getId();
                let id2 = siguiente.getId();
                this.removerElemento("arrow" + id1 + "-" + id2);
                this.removerElemento("arrow" + id2 + "-" + id1);
                let div1 = document.getElementById("nodo" + id1);
                let div2 = document.getElementById("nodo" + id2);
                let pos = this.posicionesLeft(div1, div2);
                pos.color = 'black';
                pos.x1 -= 20;
                pos.x2 += 55;
                this.crearPath(id1 + "-" + id2, svg, pos);
                pos = this.posicionesRight(div1, div2);
                pos.color = 'black';
                pos.x2 -= 55;
                this.crearPath(id2 + "-" + id1, svg, pos);
            }
            temp = temp.getSiguiente();
            if (temp === null)
                break;
            if (temp === this.ultimo)
                break;
        } while (temp !== this.ultimo);
        this.crearUltimos(svg);
    }
}


/***/ }),

/***/ "./src/app/helpers/DobleEnlazadaCircular/NodoDobleCircular.ts":
/*!********************************************************************!*\
  !*** ./src/app/helpers/DobleEnlazadaCircular/NodoDobleCircular.ts ***!
  \********************************************************************/
/*! exports provided: NodoDobleCircular */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodoDobleCircular", function() { return NodoDobleCircular; });
class NodoDobleCircular {
    constructor(numero, id) {
        this.numero = numero;
        this.id = id;
        this.siguiente = null;
        this.anterior = null;
    }
    setNumero(numero) {
        this.numero = numero;
    }
    setSiguiente(siguiente) {
        this.siguiente = siguiente;
    }
    setAnterior(anterior) {
        this.anterior = anterior;
    }
    getNumero() {
        return this.numero;
    }
    setId(id) {
        this.id = id;
    }
    getId() {
        return this.id;
    }
    getSiguiente() {
        return this.siguiente;
    }
    getAnterior() {
        return this.anterior;
    }
}


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Escritorio\Proyectos\Tytus General\tytusds\tytusds\20211SVAC\G15\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map