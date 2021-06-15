function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {
  /***/
  "./$$_lazy_route_resource lazy recursive":
  /*!******************************************************!*\
    !*** ./$$_lazy_route_resource lazy namespace object ***!
    \******************************************************/

  /*! no static exports found */

  /***/
  function $$_lazy_route_resourceLazyRecursive(module, exports) {
    function webpackEmptyAsyncContext(req) {
      // Here Promise.resolve().then() is used instead of new Promise() to prevent
      // uncaught exception popping up in devtools
      return Promise.resolve().then(function () {
        var e = new Error("Cannot find module '" + req + "'");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
      });
    }

    webpackEmptyAsyncContext.keys = function () {
      return [];
    };

    webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
    module.exports = webpackEmptyAsyncContext;
    webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";
    /***/
  },

  /***/
  "./src/app/app-routing.module.ts":
  /*!***************************************!*\
    !*** ./src/app/app-routing.module.ts ***!
    \***************************************/

  /*! exports provided: AppRoutingModule */

  /***/
  function srcAppAppRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function () {
      return AppRoutingModule;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
    /* harmony import */


    var _components_home_home_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./components/home/home.component */
    "./src/app/components/home/home.component.ts");
    /* harmony import */


    var _components_listadobleCircular_listadobleCircular_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./components/listadobleCircular/listadobleCircular.component */
    "./src/app/components/listadobleCircular/listadobleCircular.component.ts"); //########################## COMPONENTES #############################################


    var routes = [{
      path: 'listaDobleCircular',
      component: _components_listadobleCircular_listadobleCircular_component__WEBPACK_IMPORTED_MODULE_3__["ListaDobleCircularComponent"],
      pathMatch: 'full'
    }, {
      path: '',
      component: _components_home_home_component__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"],
      pathMatch: 'full'
    }];

    var AppRoutingModule = function AppRoutingModule() {
      _classCallCheck(this, AppRoutingModule);
    };

    AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: AppRoutingModule
    });
    AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function AppRoutingModule_Factory(t) {
        return new (t || AppRoutingModule)();
      },
      imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, {
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
          exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        }]
      }], null, null);
    })();
    /***/

  },

  /***/
  "./src/app/app.component.ts":
  /*!**********************************!*\
    !*** ./src/app/app.component.ts ***!
    \**********************************/

  /*! exports provided: AppComponent */

  /***/
  function srcAppAppComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppComponent", function () {
      return AppComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");

    var AppComponent = function AppComponent() {
      _classCallCheck(this, AppComponent);

      this.title = 'TytusDS';
    };

    AppComponent.ɵfac = function AppComponent_Factory(t) {
      return new (t || AppComponent)();
    };

    AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: AppComponent,
      selectors: [["app-root"]],
      decls: 1,
      vars: 0,
      template: function AppComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
        }
      },
      directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]],
      styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"]
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-root',
          templateUrl: './app.component.html',
          styleUrls: ['./app.component.css']
        }]
      }], null, null);
    })();
    /***/

  },

  /***/
  "./src/app/app.module.ts":
  /*!*******************************!*\
    !*** ./src/app/app.module.ts ***!
    \*******************************/

  /*! exports provided: AppModule */

  /***/
  function srcAppAppModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppModule", function () {
      return AppModule;
    });
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./app-routing.module */
    "./src/app/app-routing.module.ts");
    /* harmony import */


    var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./app.component */
    "./src/app/app.component.ts");
    /* harmony import */


    var _components_home_home_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./components/home/home.component */
    "./src/app/components/home/home.component.ts");
    /* harmony import */


    var _components_listadobleCircular_listadobleCircular_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./components/listadobleCircular/listadobleCircular.component */
    "./src/app/components/listadobleCircular/listadobleCircular.component.ts");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
    /* harmony import */


    var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! @angular/platform-browser/animations */
    "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/animations.js");

    var AppModule = function AppModule() {
      _classCallCheck(this, AppModule);
    };

    AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
      type: AppModule,
      bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
    });
    AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
      factory: function AppModule_Factory(t) {
        return new (t || AppModule)();
      },
      providers: [],
      imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["BrowserAnimationsModule"]]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, {
        declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"], _components_home_home_component__WEBPACK_IMPORTED_MODULE_4__["HomeComponent"], _components_listadobleCircular_listadobleCircular_component__WEBPACK_IMPORTED_MODULE_5__["ListaDobleCircularComponent"]],
        imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["BrowserAnimationsModule"]]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
          declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"], _components_home_home_component__WEBPACK_IMPORTED_MODULE_4__["HomeComponent"], _components_listadobleCircular_listadobleCircular_component__WEBPACK_IMPORTED_MODULE_5__["ListaDobleCircularComponent"]],
          imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["BrowserAnimationsModule"]],
          providers: [],
          bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        }]
      }], null, null);
    })();
    /***/

  },

  /***/
  "./src/app/components/home/home.component.ts":
  /*!***************************************************!*\
    !*** ./src/app/components/home/home.component.ts ***!
    \***************************************************/

  /*! exports provided: HomeComponent */

  /***/
  function srcAppComponentsHomeHomeComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "HomeComponent", function () {
      return HomeComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");

    var HomeComponent = /*#__PURE__*/function () {
      function HomeComponent() {
        _classCallCheck(this, HomeComponent);
      }

      _createClass(HomeComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }]);

      return HomeComponent;
    }();

    HomeComponent.ɵfac = function HomeComponent_Factory(t) {
      return new (t || HomeComponent)();
    };

    HomeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: HomeComponent,
      selectors: [["app-home"]],
      decls: 13,
      vars: 0,
      consts: [[1, "container"], [1, "row"], [1, "col", "text-center", "mt-4"], [1, "text-white"], [1, "row", "mt-5"], [1, "col-lg-4", "col-md-6", "w-100", "col-sm-6", "mb-2"], ["src", "https://prepinsta.com/wp-content/uploads/2020/06/asd.webp", "alt", "Card image cap", 1, "card-img-top"], [1, "card-body", "text-white"], ["routerLink", "/listaDobleCircular", 1, "nav-link", "text-white"]],
      template: function HomeComponent_Template(rf, ctx) {
        if (rf & 1) {
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
        }
      },
      directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLinkWithHref"]],
      styles: ["body[_ngcontent-%COMP%]{\r\n    min-height: 100vh;\r\n    background-color: #263238;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9ob21lL2hvbWUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGlCQUFpQjtJQUNqQix5QkFBeUI7QUFDN0IiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL2hvbWUvaG9tZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYm9keXtcclxuICAgIG1pbi1oZWlnaHQ6IDEwMHZoO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzI2MzIzODtcclxufSJdfQ== */"]
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HomeComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-home',
          templateUrl: './home.component.html',
          styleUrls: ['./home.component.css']
        }]
      }], function () {
        return [];
      }, null);
    })();
    /***/

  },

  /***/
  "./src/app/components/listadobleCircular/listadobleCircular.component.ts":
  /*!*******************************************************************************!*\
    !*** ./src/app/components/listadobleCircular/listadobleCircular.component.ts ***!
    \*******************************************************************************/

  /*! exports provided: ListaDobleCircularComponent */

  /***/
  function srcAppComponentsListadobleCircularListadobleCircularComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ListaDobleCircularComponent", function () {
      return ListaDobleCircularComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _helpers_DobleEnlazadaCircular_ListaDobleCircular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../../helpers/DobleEnlazadaCircular/ListaDobleCircular */
    "./src/app/helpers/DobleEnlazadaCircular/ListaDobleCircular.ts");
    /* harmony import */


    var sweetalert2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! sweetalert2 */
    "./node_modules/sweetalert2/dist/sweetalert2.all.js");
    /* harmony import */


    var sweetalert2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_3__);
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");

    var _c0 = ["cuerpoDraw"];

    var ListaDobleCircularComponent = /*#__PURE__*/function () {
      function ListaDobleCircularComponent(renderer) {
        _classCallCheck(this, ListaDobleCircularComponent);

        this.renderer = renderer;
        this.repetidos = false;
        this.velocidad = 0.5;
        this.alfinal = true;
        this.alinicio = false;
        this.ordenado = false;
      }

      _createClass(ListaDobleCircularComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.ListaDobleCircular = new _helpers_DobleEnlazadaCircular_ListaDobleCircular__WEBPACK_IMPORTED_MODULE_2__["ListaDobleCircular"]();
          this.svg1 = document.getElementById("svg");
          this.svg1.style.position = 'absolute';
          this.svg1.style.top = '0';
          this.svg1.style.left = '0';
          this.svg1.style.width = '100%';
          this.svg1.style.height = '100vh';
          this.svg1.style.zIndex = '0';
        }
      }, {
        key: "addLast",
        value: function addLast() {
          if (!this.repetidos) {
            var temp = this.ListaDobleCircular.search(this.numero);

            if (temp !== null) {
              sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire({
                icon: 'error',
                title: 'Oops...',
                text: "El numero ".concat(this.numero, " ya existe en la lista")
              });
              return;
            }
          }

          if (this.alfinal) {
            var dibujo = document.getElementById("cuerpoDraw");
            this.ListaDobleCircular.add(this.numero, this.svg1, dibujo, "".concat(this.velocidad, "s"));
          }

          if (this.alinicio) {
            var _dibujo = document.getElementById("cuerpoDraw");

            this.ListaDobleCircular.addAlInicio(this.numero, this.svg1, _dibujo, "".concat(this.velocidad, "s"));
          }

          if (this.ordenado) {
            var _dibujo2 = document.getElementById("cuerpoDraw");

            this.ListaDobleCircular.addOrdenado(this.numero, this.svg1, _dibujo2, "".concat(this.velocidad, "s"));
          }

          this.numero = 0;
        }
      }, {
        key: "search",
        value: function search() {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var result;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return this.ListaDobleCircular.searchAnimation(this.numeroBuscar, "".concat(this.velocidad, "s"));

                  case 2:
                    result = _context.sent;

                    if (!(result === null)) {
                      _context.next = 6;
                      break;
                    }

                    sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: "El numero ".concat(this.numeroBuscar, " no existe en la lista")
                    });
                    return _context.abrupt("return");

                  case 6:
                    sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire({
                      icon: 'success',
                      title: ':)',
                      text: "Se econtro el numero ".concat(this.numeroBuscar, " en la posicion ").concat(result.index)
                    });
                    this.numeroBuscar = 0;

                  case 8:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));
        }
      }, {
        key: "delete",
        value: function _delete() {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var result;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return this.ListaDobleCircular.eliminar(this.numeroEliminar, "".concat(this.velocidad, "s"), this.svg1);

                  case 2:
                    result = _context2.sent;

                    if (!(result === -1)) {
                      _context2.next = 6;
                      break;
                    }

                    sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: "El numero ".concat(this.numeroEliminar, " no existe en la lista")
                    });
                    return _context2.abrupt("return");

                  case 6:
                    this.numeroEliminar = 0;

                  case 7:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          }));
        }
      }, {
        key: "actualizar",
        value: function actualizar() {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var result;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return this.ListaDobleCircular.searchAnimation(this.numeroAntiguo, "".concat(this.velocidad, "s"));

                  case 2:
                    result = _context3.sent;

                    if (!(result === null)) {
                      _context3.next = 6;
                      break;
                    }

                    sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: "El numero ".concat(this.numeroAntiguo, " no existe en la lista")
                    });
                    return _context3.abrupt("return");

                  case 6:
                    result.nodo.setNumero(this.numeroNuevo);
                    document.getElementById("nodo" + result.nodo.getId()).innerHTML = "" + this.numeroNuevo;
                    this.numeroAntiguo = 0;
                    this.numeroNuevo = 0;

                  case 10:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this);
          }));
        }
      }, {
        key: "changeAlFinal",
        value: function changeAlFinal() {
          if (this.alfinal) {
            this.alinicio = false;
            this.ordenado = false;
          }
        }
      }, {
        key: "changeAlInicio",
        value: function changeAlInicio() {
          if (this.alinicio) {
            this.alfinal = false;
            this.ordenado = false;
          }
        }
      }, {
        key: "changeOrdenado",
        value: function changeOrdenado() {
          if (this.ordenado) {
            this.alfinal = false;
            this.alinicio = false;
          }
        }
      }]);

      return ListaDobleCircularComponent;
    }();

    ListaDobleCircularComponent.ɵfac = function ListaDobleCircularComponent_Factory(t) {
      return new (t || ListaDobleCircularComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]));
    };

    ListaDobleCircularComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: ListaDobleCircularComponent,
      selectors: [["app-ListaDobleCircular"]],
      viewQuery: function ListaDobleCircularComponent_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, true);
        }

        if (rf & 2) {
          var _t;

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.cuerpoDraw = _t.first);
        }
      },
      decls: 60,
      vars: 10,
      consts: [[1, "container", "mt-2"], [1, "row", "opciones", "p-2"], [1, "col-lg-3", "col-sm-12", "col-12", "mt-1"], [1, "input-group"], ["type", "number", "id", "numero", "name", "numero", "placeholder", "Ingresa un Numero", 1, "form-control", 3, "ngModel", "ngModelChange"], [1, "input-group-append"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "button", 1, "btn", "btn-success", 3, "click"], ["type", "number", "id", "numero", "name", "numero", "placeholder", "Antiguo", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "number", "id", "numero", "name", "numero", "placeholder", "Nuevo", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "button", 1, "btn", "btn-warning", 3, "click"], ["type", "button", 1, "btn", "btn-danger", 3, "click"], [1, "col-12", "col-sm-12", "col-lg-2", "text-left", "mt-2", "text-white", "mt-1"], [1, "dropdown"], ["type", "button", "id", "dropdownMenuButton", "data-toggle", "dropdown", "aria-haspopup", "true", "aria-expanded", "false", 1, "btn", "btn-info", "dropdown-toggle"], ["aria-labelledby", "dropdownMenuButton", 1, "dropdown-menu"], ["type", "checkbox", "value", "", "id", "repetidos", "name", "repetidos", 1, "form-check-input", "ml-1", 3, "ngModel", "ngModelChange"], ["for", "flexCheckDefault", 1, "form-check-label", "ml-4"], ["type", "checkbox", "value", "", "id", "alfinal", "name", "alfinal", 1, "form-check-input", "ml-1", 3, "ngModel", "ngModelChange", "change"], ["for", "alfinal", 1, "form-check-label", "ml-4"], ["type", "checkbox", "value", "", "id", "alinicio", "name", "alinicio", 1, "form-check-input", "ml-1", 3, "ngModel", "ngModelChange", "change"], ["for", "alinicio", 1, "form-check-label", "ml-4"], ["type", "checkbox", "value", "", "id", "ordenado", "name", "ordenado", 1, "form-check-input", "ml-1", 3, "ngModel", "ngModelChange", "change"], ["for", "ordenado", 1, "form-check-label", "ml-4"], ["type", "number", "id", "numero", "name", "numero", "placeholder", "Velocidad", 1, "form-control", 3, "ngModel", "ngModelChange"], ["id", "cuerpoDraw", 1, "row", "mt-5"], ["cuerpoDraw", ""], ["xmlns", "http://www.w3.org/2000/svg", "width", "100%", "height", "100%", "id", "svg", 1, "svg"], ["id", "arrowhead", "viewBox", "0 0 10 10", "refX", "3", "refY", "5", "markerWidth", "6", "markerHeight", "6", "orient", "auto"], ["d", "M 0 0 L 10 5 L 0 10 z"], ["fill", "none", "stroke", "black", "stroke-width", "2", "marker-end", "url(#arrowhead)"], ["id", "arrowLeft"], ["id", "arrowRight"]],
      template: function ListaDobleCircularComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "body");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "input", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function ListaDobleCircularComponent_Template_input_ngModelChange_5_listener($event) {
            return ctx.numero = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "button", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ListaDobleCircularComponent_Template_button_click_7_listener() {
            return ctx.addLast();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "Guardar");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "input", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function ListaDobleCircularComponent_Template_input_ngModelChange_11_listener($event) {
            return ctx.numeroBuscar = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "button", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ListaDobleCircularComponent_Template_button_click_13_listener() {
            return ctx.search();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "Buscar");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "div", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "input", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function ListaDobleCircularComponent_Template_input_ngModelChange_17_listener($event) {
            return ctx.numeroAntiguo = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "input", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function ListaDobleCircularComponent_Template_input_ngModelChange_18_listener($event) {
            return ctx.numeroNuevo = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "button", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ListaDobleCircularComponent_Template_button_click_20_listener() {
            return ctx.actualizar();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21, "Actualizar");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "div", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "input", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function ListaDobleCircularComponent_Template_input_ngModelChange_24_listener($event) {
            return ctx.numeroEliminar = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](26, "button", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ListaDobleCircularComponent_Template_button_click_26_listener() {
            return ctx["delete"]();
          });

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

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function ListaDobleCircularComponent_Template_input_ngModelChange_34_listener($event) {
            return ctx.repetidos = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](35, "label", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](36, " Numeros Repetidos");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](37, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](38, "input", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function ListaDobleCircularComponent_Template_input_ngModelChange_38_listener($event) {
            return ctx.alfinal = $event;
          })("change", function ListaDobleCircularComponent_Template_input_change_38_listener() {
            return ctx.changeAlFinal();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](39, "label", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](40, " Insertar al final");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](41, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](42, "input", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function ListaDobleCircularComponent_Template_input_ngModelChange_42_listener($event) {
            return ctx.alinicio = $event;
          })("change", function ListaDobleCircularComponent_Template_input_change_42_listener() {
            return ctx.changeAlInicio();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](43, "label", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](44, " Insertar al Inicio");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](45, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](46, "input", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function ListaDobleCircularComponent_Template_input_ngModelChange_46_listener($event) {
            return ctx.ordenado = $event;
          })("change", function ListaDobleCircularComponent_Template_input_change_46_listener() {
            return ctx.changeOrdenado();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](47, "label", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](48, " Ordenado");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](49, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](50, "input", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function ListaDobleCircularComponent_Template_input_ngModelChange_50_listener($event) {
            return ctx.velocidad = $event;
          });

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
        }

        if (rf & 2) {
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
        }
      },
      directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["NumberValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["CheckboxControlValueAccessor"]],
      styles: ["body[_ngcontent-%COMP%] {\r\n  min-height: 100vh;\r\n  background-color: #FAFAFA;\r\n}\r\n\r\n.container[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  z-index: 9999;\r\n  \r\n}\r\n\r\n.opciones[_ngcontent-%COMP%]{\r\n  background-color:#B43E60;\r\n}\r\n\r\n.arrow[_ngcontent-%COMP%] {\r\n  stroke: rgb(0, 0, 0);\r\n  stroke-width: 2;\r\n  marker-end: url(#markerArrow);\r\n}\r\n\r\n.svg[_ngcontent-%COMP%] {\r\n  position: \"absolute\";\r\n  top: \"0\";\r\n  left: \"0\";\r\n  width: \"100%\";\r\n  height: \"100vh\";\r\n  z-index: \"0\";\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9saXN0YWRvYmxlQ2lyY3VsYXIvTGlzdGFEb2JsZUNpcmN1bGFyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQkFBaUI7RUFDakIseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGFBQWE7O0FBRWY7O0FBRUE7RUFDRSx3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSxvQkFBb0I7RUFDcEIsZUFBZTtFQUNmLDZCQUE2QjtBQUMvQjs7QUFFQTtFQUNFLG9CQUFvQjtFQUNwQixRQUFRO0VBQ1IsU0FBUztFQUNULGFBQWE7RUFDYixlQUFlO0VBQ2YsWUFBWTtBQUNkIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9saXN0YWRvYmxlQ2lyY3VsYXIvTGlzdGFEb2JsZUNpcmN1bGFyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJib2R5IHtcclxuICBtaW4taGVpZ2h0OiAxMDB2aDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkFGQUZBO1xyXG59XHJcblxyXG4uY29udGFpbmVyIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgei1pbmRleDogOTk5OTtcclxuICBcclxufVxyXG5cclxuLm9wY2lvbmVze1xyXG4gIGJhY2tncm91bmQtY29sb3I6I0I0M0U2MDtcclxufVxyXG5cclxuLmFycm93IHtcclxuICBzdHJva2U6IHJnYigwLCAwLCAwKTtcclxuICBzdHJva2Utd2lkdGg6IDI7XHJcbiAgbWFya2VyLWVuZDogdXJsKCNtYXJrZXJBcnJvdyk7XHJcbn1cclxuXHJcbi5zdmcge1xyXG4gIHBvc2l0aW9uOiBcImFic29sdXRlXCI7XHJcbiAgdG9wOiBcIjBcIjtcclxuICBsZWZ0OiBcIjBcIjtcclxuICB3aWR0aDogXCIxMDAlXCI7XHJcbiAgaGVpZ2h0OiBcIjEwMHZoXCI7XHJcbiAgei1pbmRleDogXCIwXCI7XHJcbn1cclxuIl19 */"]
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](ListaDobleCircularComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
          selector: 'app-ListaDobleCircular',
          templateUrl: './ListaDobleCircular.component.html',
          styleUrls: ['./ListaDobleCircular.component.css']
        }]
      }], function () {
        return [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]
        }];
      }, {
        cuerpoDraw: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"],
          args: ['cuerpoDraw']
        }]
      });
    })();
    /***/

  },

  /***/
  "./src/app/helpers/DobleEnlazadaCircular/ListaDobleCircular.ts":
  /*!*********************************************************************!*\
    !*** ./src/app/helpers/DobleEnlazadaCircular/ListaDobleCircular.ts ***!
    \*********************************************************************/

  /*! exports provided: ListaDobleCircular */

  /***/
  function srcAppHelpersDobleEnlazadaCircularListaDobleCircularTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ListaDobleCircular", function () {
      return ListaDobleCircular;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _NodoDobleCircular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./NodoDobleCircular */
    "./src/app/helpers/DobleEnlazadaCircular/NodoDobleCircular.ts");

    var ListaDobleCircular = /*#__PURE__*/function () {
      function ListaDobleCircular() {
        _classCallCheck(this, ListaDobleCircular);

        this.primero = null;
        this.ultimo = null;
        this.id = 0;
      }

      _createClass(ListaDobleCircular, [{
        key: "add",
        value: function add(numero, svg, dibujo, duracion) {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            var temp, _div, div, div2, posiciones, tempUltimo;

            return regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    temp = new _NodoDobleCircular__WEBPACK_IMPORTED_MODULE_1__["NodoDobleCircular"](numero, this.id);

                    if (!(this.primero == null)) {
                      _context4.next = 10;
                      break;
                    }

                    this.primero = temp;
                    this.ultimo = temp;
                    _div = this.crearNodo(numero, this.id);
                    dibujo.appendChild(_div);
                    this.id++;
                    _context4.next = 9;
                    return this.animateNode("nodo" + temp.getId(), "zoomIn", duracion);

                  case 9:
                    return _context4.abrupt("return", temp.getId());

                  case 10:
                    temp.setId(this.id);
                    this.id++;

                    if (this.primero.getSiguiente() !== this.ultimo && this.primero.getSiguiente() !== null) {
                      this.removerElemento("arrowprimero-ultimo");
                      this.removerElemento("arrowultimo-primero");
                    }

                    div = this.crearNodo(numero, temp.getId());
                    dibujo.appendChild(div);
                    _context4.next = 17;
                    return this.animateNode("nodo" + temp.getId(), "zoomIn", duracion);

                  case 17:
                    div2 = document.getElementById("nodo" + this.ultimo.getId());
                    posiciones = this.posicionesLeft(div, div2);
                    posiciones.color = 'black';
                    this.crearPath(this.ultimo.getId() + "-" + temp.getId(), svg, posiciones);
                    posiciones = this.posicionesRight(div, div2);
                    posiciones.color = 'black';
                    this.crearPath(temp.getId() + "-" + this.ultimo.getId(), svg, posiciones);
                    tempUltimo = this.ultimo;
                    tempUltimo.setSiguiente(temp);
                    temp.setAnterior(tempUltimo);
                    temp.setSiguiente(this.primero);
                    this.primero.setAnterior(temp);
                    this.ultimo = temp;
                    this.crearUltimos(svg);
                    return _context4.abrupt("return", temp.getId());

                  case 32:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4, this);
          }));
        }
      }, {
        key: "addAlInicio",
        value: function addAlInicio(numero, svg, dibujo, duracion) {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
            var temp, _div2, div, tempPrimero;

            return regeneratorRuntime.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    temp = new _NodoDobleCircular__WEBPACK_IMPORTED_MODULE_1__["NodoDobleCircular"](numero, this.id);

                    if (!(this.primero == null)) {
                      _context5.next = 10;
                      break;
                    }

                    this.primero = temp;
                    this.ultimo = temp;
                    _div2 = this.crearNodo(numero, this.id);
                    dibujo.appendChild(_div2);
                    this.id++;
                    _context5.next = 9;
                    return this.animateNode("nodo" + temp.getId(), "zoomIn", duracion);

                  case 9:
                    return _context5.abrupt("return", temp.getId());

                  case 10:
                    temp.setId(this.id);
                    this.id++;

                    if (this.primero.getSiguiente() !== this.ultimo && this.primero.getSiguiente() !== null) {
                      this.removerElemento("arrowprimero-ultimo");
                      this.removerElemento("arrowultimo-primero");
                    }

                    div = this.crearNodo(numero, temp.getId());
                    dibujo.insertBefore(div, dibujo.firstChild);
                    _context5.next = 17;
                    return this.animateNode("nodo" + temp.getId(), "zoomIn", duracion);

                  case 17:
                    tempPrimero = this.primero;
                    temp.setSiguiente(tempPrimero);
                    tempPrimero.setAnterior(temp);
                    this.ultimo.setSiguiente(temp);
                    temp.setAnterior(this.ultimo);
                    this.primero = temp;
                    this.corregirPaths(svg, this.primero);
                    return _context5.abrupt("return", temp.getId());

                  case 25:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee5, this);
          }));
        }
      }, {
        key: "addOrdenado",
        value: function addOrdenado(numero, svg, dibujo, duracion) {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
            var temp, div, _temp, id1, id2, _tempPrimero, _div3, tempPrimero, index, siguiente, _temp2, _id, _id2, _div4;

            return regeneratorRuntime.wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    if (!(this.primero == null)) {
                      _context6.next = 10;
                      break;
                    }

                    temp = new _NodoDobleCircular__WEBPACK_IMPORTED_MODULE_1__["NodoDobleCircular"](numero, this.id);
                    this.primero = temp;
                    this.ultimo = temp;
                    div = this.crearNodo(numero, this.id);
                    dibujo.appendChild(div);
                    this.id++;
                    _context6.next = 9;
                    return this.animateNode("nodo" + temp.getId(), "zoomIn", duracion);

                  case 9:
                    return _context6.abrupt("return", temp.getId());

                  case 10:
                    if (this.primero.getSiguiente() !== this.ultimo && this.primero.getSiguiente() !== null) {
                      this.removerElemento("arrowprimero-ultimo");
                      this.removerElemento("arrowultimo-primero");
                    } //Ingresar si solo hay uno


                    if (!(this.primero.getSiguiente() === null)) {
                      _context6.next = 15;
                      break;
                    }

                    _context6.next = 14;
                    return this.add(numero, svg, dibujo, duracion);

                  case 14:
                    return _context6.abrupt("return", 1);

                  case 15:
                    if (!(numero >= this.primero.getNumero() && numero < this.primero.getSiguiente().getNumero())) {
                      _context6.next = 34;
                      break;
                    }

                    _temp = new _NodoDobleCircular__WEBPACK_IMPORTED_MODULE_1__["NodoDobleCircular"](numero, this.id);

                    _temp.setId(this.id);

                    this.id++;
                    id1 = this.primero.getId();
                    id2 = this.primero.getSiguiente().getId();
                    _tempPrimero = this.primero;

                    _temp.setAnterior(_tempPrimero);

                    _temp.setSiguiente(_tempPrimero.getSiguiente());

                    _tempPrimero.setSiguiente(_temp);

                    _tempPrimero.getSiguiente().setAnterior(_temp);

                    this.removerElemento("arrow" + id1 + "-" + id2);
                    this.removerElemento("arrow" + id2 + "-" + id1);
                    _div3 = this.crearNodo(numero, _temp.getId());
                    dibujo.insertBefore(_div3, dibujo.children[1]);
                    _context6.next = 32;
                    return this.animateNode("nodo" + _temp.getId(), "zoomIn", duracion);

                  case 32:
                    this.corregirPaths(svg, this.primero);
                    return _context6.abrupt("return", 1);

                  case 34:
                    tempPrimero = this.primero;
                    index = 0;

                  case 36:
                    siguiente = tempPrimero.getSiguiente();

                    if (!(numero >= tempPrimero.getNumero() && numero < siguiente.getNumero())) {
                      _context6.next = 55;
                      break;
                    }

                    _temp2 = new _NodoDobleCircular__WEBPACK_IMPORTED_MODULE_1__["NodoDobleCircular"](numero, this.id);

                    _temp2.setId(this.id);

                    this.id++;
                    _id = this.primero.getId();
                    _id2 = this.primero.getSiguiente().getId();

                    _temp2.setAnterior(tempPrimero);

                    _temp2.setSiguiente(tempPrimero.getSiguiente());

                    tempPrimero.setSiguiente(_temp2);
                    tempPrimero.getSiguiente().setAnterior(_temp2);
                    this.removerElemento("arrow" + _id + "-" + _id2);
                    this.removerElemento("arrow" + _id2 + "-" + _id);
                    _div4 = this.crearNodo(numero, _temp2.getId());
                    dibujo.insertBefore(_div4, dibujo.children[index + 1]);
                    _context6.next = 53;
                    return this.animateNode("nodo" + _temp2.getId(), "zoomIn", duracion);

                  case 53:
                    this.corregirPaths(svg, this.primero);
                    return _context6.abrupt("return", 1);

                  case 55:
                    index++;
                    tempPrimero = tempPrimero.getSiguiente();

                    if (!(tempPrimero === this.ultimo)) {
                      _context6.next = 59;
                      break;
                    }

                    return _context6.abrupt("break", 62);

                  case 59:
                    if (!(tempPrimero === null)) {
                      _context6.next = 61;
                      break;
                    }

                    return _context6.abrupt("break", 62);

                  case 61:
                    if (tempPrimero != this.primero) {
                      _context6.next = 36;
                      break;
                    }

                  case 62:
                    _context6.next = 64;
                    return this.add(numero, svg, dibujo, duracion);

                  case 64:
                    return _context6.abrupt("return", 1);

                  case 65:
                  case "end":
                    return _context6.stop();
                }
              }
            }, _callee6, this);
          }));
        }
      }, {
        key: "search",
        value: function search(numero) {
          var temp = this.primero;
          if (temp === null) return null;

          do {
            if (temp.getNumero() === numero) return temp;
            temp = temp.getSiguiente();
            if (temp === null) break;
          } while (temp != this.primero);

          return null;
        }
      }, {
        key: "searchAnimation",
        value: function searchAnimation(numero, duration) {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
            var temp, i;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    temp = this.primero;
                    i = 0;

                    if (!(temp === null)) {
                      _context7.next = 4;
                      break;
                    }

                    return _context7.abrupt("return", null);

                  case 4:
                    _context7.next = 6;
                    return this.animateNode("nodo" + temp.getId(), 'bounceIn', duration);

                  case 6:
                    if (!(temp.getNumero() === numero)) {
                      _context7.next = 8;
                      break;
                    }

                    return _context7.abrupt("return", {
                      nodo: temp,
                      index: i
                    });

                  case 8:
                    temp = temp.getSiguiente();
                    i++;

                    if (!(temp === null)) {
                      _context7.next = 12;
                      break;
                    }

                    return _context7.abrupt("break", 13);

                  case 12:
                    if (temp != this.primero) {
                      _context7.next = 4;
                      break;
                    }

                  case 13:
                    return _context7.abrupt("return", null);

                  case 14:
                  case "end":
                    return _context7.stop();
                }
              }
            }, _callee7, this);
          }));
        }
      }, {
        key: "eliminar",
        value: function eliminar(numero, duracion, svg) {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
            var temp, id1, id2, _id3, _id5, _id4, anterior, siguiente, _id6, _id7, id3;

            return regeneratorRuntime.wrap(function _callee8$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    temp = this.primero;

                    if (!(temp === null)) {
                      _context8.next = 3;
                      break;
                    }

                    return _context8.abrupt("return", -1);

                  case 3:
                    if (!(temp.getNumero() === numero)) {
                      _context8.next = 22;
                      break;
                    }

                    _context8.next = 6;
                    return this.animateNode("nodo" + temp.getId(), 'zoomOut', duracion);

                  case 6:
                    this.removerElemento("nodo" + temp.getId()); //Solo hay 1

                    if (!(temp.getSiguiente() === null)) {
                      _context8.next = 11;
                      break;
                    }

                    this.primero = null;
                    this.ultimo = null;
                    return _context8.abrupt("return", 1);

                  case 11:
                    this.ultimo.setSiguiente(temp.getSiguiente());
                    temp.getSiguiente().setAnterior(this.ultimo);
                    id1 = this.primero.getId();
                    id2 = this.primero.getSiguiente().getId();
                    this.removerElemento("arrow" + id1 + "-" + id2);
                    this.removerElemento("arrow" + id2 + "-" + id1);
                    this.primero = temp.getSiguiente();
                    this.corregirPaths(svg, this.primero);
                    return _context8.abrupt("return", 1);

                  case 22:
                    if (!(this.ultimo.getNumero() === numero)) {
                      _context8.next = 44;
                      break;
                    }

                    _id3 = this.ultimo.getId();
                    _context8.next = 26;
                    return this.animateNode("nodo" + _id3, 'zoomOut', duracion);

                  case 26:
                    this.removerElemento("nodo" + _id3); //Solo hay 2

                    if (!(this.ultimo.getAnterior() === this.primero)) {
                      _context8.next = 35;
                      break;
                    }

                    this.primero.setSiguiente(null);
                    this.ultimo = this.primero;
                    _id5 = this.primero.getId();
                    this.removerElemento("arrow" + _id3 + "-" + _id5);
                    this.removerElemento("arrow" + _id5 + "-" + _id3);
                    this.corregirPaths(svg, this.primero);
                    return _context8.abrupt("return", 1);

                  case 35:
                    console.log("HGola");
                    this.ultimo.getAnterior().setSiguiente(this.primero);
                    this.primero.setAnterior(this.ultimo.getAnterior());
                    _id4 = this.ultimo.getAnterior().getId();
                    this.ultimo = this.ultimo.getAnterior();
                    this.removerElemento("arrow" + _id3 + "-" + _id4);
                    this.removerElemento("arrow" + _id4 + "-" + _id3);
                    this.corregirPaths(svg, this.ultimo);
                    return _context8.abrupt("return", 1);

                  case 44:
                    if (!(temp.getNumero() === numero)) {
                      _context8.next = 61;
                      break;
                    }

                    anterior = temp.getAnterior();
                    siguiente = temp.getSiguiente();
                    _id6 = temp.getId();
                    _id7 = anterior.getId();
                    id3 = siguiente.getId();
                    _context8.next = 52;
                    return this.animateNode("nodo" + _id6, 'zoomOut', duracion);

                  case 52:
                    this.removerElemento("nodo" + _id6);
                    anterior.setSiguiente(temp.getSiguiente());
                    temp.getSiguiente().setAnterior(anterior);
                    this.removerElemento("arrow" + _id6 + "-" + _id7);
                    this.removerElemento("arrow" + _id7 + "-" + _id6);
                    this.removerElemento("arrow" + _id6 + "-" + id3);
                    this.removerElemento("arrow" + id3 + "-" + _id6);
                    this.corregirPaths(svg, anterior);
                    return _context8.abrupt("return", 1);

                  case 61:
                    temp = temp.getSiguiente();

                    if (!(temp === this.ultimo)) {
                      _context8.next = 64;
                      break;
                    }

                    return _context8.abrupt("break", 67);

                  case 64:
                    if (!(temp === null)) {
                      _context8.next = 66;
                      break;
                    }

                    return _context8.abrupt("break", 67);

                  case 66:
                    if (temp !== this.ultimo) {
                      _context8.next = 44;
                      break;
                    }

                  case 67:
                    return _context8.abrupt("return", -1);

                  case 68:
                  case "end":
                    return _context8.stop();
                }
              }
            }, _callee8, this);
          }));
        }
      }, {
        key: "crearPath",
        value: function crearPath(result, svg, posiciones) {
          var pathLeft = document.createElementNS("http://www.w3.org/2000/svg", "line");
          pathLeft.setAttribute("id", "arrow" + result);
          pathLeft.setAttribute('stroke-width', '2');
          pathLeft.setAttribute('stroke', posiciones.color);
          pathLeft.setAttribute('marker-end', 'url(#arrowhead)');
          svg.appendChild(pathLeft);
          pathLeft.setAttribute('x1', "".concat(posiciones.x1));
          pathLeft.setAttribute('x2', "".concat(posiciones.x2));
          pathLeft.setAttribute('y1', "".concat(posiciones.y1));
          pathLeft.setAttribute('y2', "".concat(posiciones.y2));
        }
      }, {
        key: "animateNode",
        value: function animateNode(element, animation, duration) {
          var prefix = 'animate__';
          return new Promise(function (resolve, reject) {
            var animationName = "".concat(prefix).concat(animation);
            var node = document.getElementById(element);
            node.classList.add(animationName);
            node.style.setProperty('--animate-duration', duration);

            function handleAnimationEnd(event) {
              event.stopPropagation();
              node.classList.remove(animationName);
              resolve('Animation ended');
            }

            node.addEventListener('animationend', handleAnimationEnd, {
              once: true
            }); //resolve('Animation ended');
          });
        }
      }, {
        key: "getPrimero",
        value: function getPrimero() {
          return this.primero;
        }
      }, {
        key: "getUltimo",
        value: function getUltimo() {
          return this.ultimo;
        }
      }, {
        key: "crearNodo",
        value: function crearNodo(numero, id) {
          var div = document.createElement('div');
          div.className = "node animate__animated ml-5";
          div.id = "nodo" + id;
          div.textContent = numero;
          return div;
        }
      }, {
        key: "removerElemento",
        value: function removerElemento(id) {
          try {
            document.getElementById(id).remove();
          } catch (e) {}
        }
      }, {
        key: "crearUltimos",
        value: function crearUltimos(svg) {
          if (this.primero.getSiguiente() === null) return;
          if (this.primero.getSiguiente() === this.ultimo) return;
          var div = document.getElementById("nodo" + this.primero.getId());
          var div2 = document.getElementById("nodo" + this.ultimo.getId());
          var posiciones = this.posicionesLeft(div, div2);
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
      }, {
        key: "posicionesLeft",
        value: function posicionesLeft(div, div2) {
          return {
            x1: div2.getBoundingClientRect().right,
            x2: div.getBoundingClientRect().left,
            y1: div2.getBoundingClientRect().top + div2.offsetHeight / 2,
            y2: div.getBoundingClientRect().top + div.offsetHeight / 2,
            color: 'red'
          };
        }
      }, {
        key: "posicionesRight",
        value: function posicionesRight(div, div2) {
          return {
            x1: div.getBoundingClientRect().right,
            x2: div2.getBoundingClientRect().left + 50,
            y1: div.getBoundingClientRect().top + div.offsetHeight / 2 - 5,
            y2: div2.getBoundingClientRect().top + div2.offsetHeight / 2 - 5,
            color: 'red'
          };
        }
      }, {
        key: "corregirPaths",
        value: function corregirPaths(svg, nodo) {
          this.removerElemento("arrowprimero-ultimo");
          this.removerElemento("arrowultimo-primero");
          var temp = nodo;

          do {
            var siguiente = temp.getSiguiente();

            if (siguiente !== null) {
              var id1 = temp.getId();
              var id2 = siguiente.getId();
              this.removerElemento("arrow" + id1 + "-" + id2);
              this.removerElemento("arrow" + id2 + "-" + id1);
              var div1 = document.getElementById("nodo" + id1);
              var div2 = document.getElementById("nodo" + id2);
              var pos = this.posicionesLeft(div1, div2);
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
            if (temp === null) break;
            if (temp === this.ultimo) break;
          } while (temp !== this.ultimo);

          this.crearUltimos(svg);
        }
      }]);

      return ListaDobleCircular;
    }();
    /***/

  },

  /***/
  "./src/app/helpers/DobleEnlazadaCircular/NodoDobleCircular.ts":
  /*!********************************************************************!*\
    !*** ./src/app/helpers/DobleEnlazadaCircular/NodoDobleCircular.ts ***!
    \********************************************************************/

  /*! exports provided: NodoDobleCircular */

  /***/
  function srcAppHelpersDobleEnlazadaCircularNodoDobleCircularTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "NodoDobleCircular", function () {
      return NodoDobleCircular;
    });

    var NodoDobleCircular = /*#__PURE__*/function () {
      function NodoDobleCircular(numero, id) {
        _classCallCheck(this, NodoDobleCircular);

        this.numero = numero;
        this.id = id;
        this.siguiente = null;
        this.anterior = null;
      }

      _createClass(NodoDobleCircular, [{
        key: "setNumero",
        value: function setNumero(numero) {
          this.numero = numero;
        }
      }, {
        key: "setSiguiente",
        value: function setSiguiente(siguiente) {
          this.siguiente = siguiente;
        }
      }, {
        key: "setAnterior",
        value: function setAnterior(anterior) {
          this.anterior = anterior;
        }
      }, {
        key: "getNumero",
        value: function getNumero() {
          return this.numero;
        }
      }, {
        key: "setId",
        value: function setId(id) {
          this.id = id;
        }
      }, {
        key: "getId",
        value: function getId() {
          return this.id;
        }
      }, {
        key: "getSiguiente",
        value: function getSiguiente() {
          return this.siguiente;
        }
      }, {
        key: "getAnterior",
        value: function getAnterior() {
          return this.anterior;
        }
      }]);

      return NodoDobleCircular;
    }();
    /***/

  },

  /***/
  "./src/environments/environment.ts":
  /*!*****************************************!*\
    !*** ./src/environments/environment.ts ***!
    \*****************************************/

  /*! exports provided: environment */

  /***/
  function srcEnvironmentsEnvironmentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "environment", function () {
      return environment;
    }); // This file can be replaced during build by using the `fileReplacements` array.
    // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
    // The list of file replacements can be found in `angular.json`.


    var environment = {
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

    /***/
  },

  /***/
  "./src/main.ts":
  /*!*********************!*\
    !*** ./src/main.ts ***!
    \*********************/

  /*! no exports provided */

  /***/
  function srcMainTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./environments/environment */
    "./src/environments/environment.ts");
    /* harmony import */


    var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./app/app.module */
    "./src/app/app.module.ts");
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");

    if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
      Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
    }

    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])["catch"](function (err) {
      return console.error(err);
    });
    /***/

  },

  /***/
  0:
  /*!***************************!*\
    !*** multi ./src/main.ts ***!
    \***************************/

  /*! no static exports found */

  /***/
  function _(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(
    /*! D:\Escritorio\Proyectos\Tytus General\tytusds\tytusds\20211SVAC\G15\src\main.ts */
    "./src/main.ts");
    /***/
  }
}, [[0, "runtime", "vendor"]]]);
//# sourceMappingURL=main-es5.js.map