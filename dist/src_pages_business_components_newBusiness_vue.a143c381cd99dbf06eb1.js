"use strict";
(self["webpackChunkwebpack_vue"] = self["webpackChunkwebpack_vue"] || []).push([["src_pages_business_components_newBusiness_vue"],{

/***/ 65637:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[17].use[0]!./src/pages/business/components/newBusiness.vue?vue&type=style&index=0&id=0e4bf362&lang=less&scoped=true ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 51864);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ 60352);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".formBox[data-v-0e4bf362] {\n  padding: 20px;\n  position: relative;\n  height: 100%;\n  padding-bottom: 40px;\n}\n.formBox .formItem[data-v-0e4bf362] {\n  width: 300px;\n}\n.formBox .footer[data-v-0e4bf362] {\n  height: 40px;\n  width: 100%;\n  position: absolute;\n  bottom: 0px;\n  left: 0px;\n  display: flex;\n  padding-right: 20px;\n  justify-content: flex-end;\n}\n", "",{"version":3,"sources":["webpack://./src/pages/business/components/newBusiness.vue","webpack://./newBusiness.vue"],"names":[],"mappings":"AACA;EACE,aAAA;EACA,kBAAA;EACA,YAAA;EACA,oBAAA;ACAF;ADJA;EAMI,YAAA;ACCJ;ADPA;EASI,YAAA;EACA,WAAA;EACA,kBAAA;EACA,WAAA;EACA,SAAA;EACA,aAAA;EACA,mBAAA;EACA,yBAAA;ACCJ","sourcesContent":["\n.formBox {\n  padding: 20px;\n  position: relative;\n  height: 100%;\n  padding-bottom: 40px;\n  .formItem {\n    width: 300px;\n  }\n  .footer {\n    height: 40px;\n    width: 100%;\n    position: absolute;\n    bottom: 0px;\n    left: 0px;\n    display: flex;\n    padding-right: 20px;\n    justify-content: flex-end;\n  }\n}\n",".formBox {\n  padding: 20px;\n  position: relative;\n  height: 100%;\n  padding-bottom: 40px;\n}\n.formBox .formItem {\n  width: 300px;\n}\n.formBox .footer {\n  height: 40px;\n  width: 100%;\n  position: absolute;\n  bottom: 0px;\n  left: 0px;\n  display: flex;\n  padding-right: 20px;\n  justify-content: flex-end;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 20389:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=unplugin-auto-import!./node_modules/babel-loader/lib/index.js??clonedRuleSet-10.use!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[17].use[0]!./node_modules/source-map-loader/dist/cjs.js!./src/pages/business/components/newBusiness.vue?vue&type=script&setup=true&lang=js ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-router */ 22201);
/* harmony import */ var _utils_requestUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/requestUtils */ 62860);
/* harmony import */ var element_plus__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! element-plus */ 93971);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ 62494);





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __name: 'newBusiness',
  setup: function setup(__props, _ref) {
    var expose = _ref.expose;
    expose();
    var ruleForm = (0,vue__WEBPACK_IMPORTED_MODULE_1__.reactive)({
      name: "",
      cname: "",
      user: "",
      region: null,
      entiry: null,
      dcs: "",
      type: null,
      status: 1
    });
    var route = (0,vue_router__WEBPACK_IMPORTED_MODULE_2__.useRoute)();
    var router = (0,vue_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    var ruleFormRef = (0,vue__WEBPACK_IMPORTED_MODULE_1__.ref)(null);
    var rules = (0,vue__WEBPACK_IMPORTED_MODULE_1__.reactive)({
      name: [{
        required: true,
        message: "请输入业务领域英文名称",
        trigger: "blur"
      }, {
        min: 3,
        max: 20,
        message: "Length should be 3 to 5",
        trigger: "blur"
      }],
      cname: [{
        required: true,
        message: "请输入业务领域中文名称",
        trigger: "blur"
      }, {
        min: 3,
        max: 10,
        message: "Length should be 3 to 5",
        trigger: "blur"
      }],
      user: [{
        required: true,
        message: "请选择资产负责人",
        trigger: "change"
      }],
      type: [{
        required: true,
        message: "请选择资产类型",
        trigger: "change"
      }]
    });
    var submitForm = function submitForm(formEl) {
      if (!formEl) return;
      formEl.validate(function (valid, fields) {
        if (valid) {
          console.log(ruleForm, "结果");
          _utils_requestUtils__WEBPACK_IMPORTED_MODULE_0__["default"].post("app/business/new", ruleForm).then(function (res) {
            if (res.code === 200) {
              (0,element_plus__WEBPACK_IMPORTED_MODULE_3__.ElMessage)({
                message: "新建成功",
                type: "success"
              });
              goBack();
            } else if (res.code === 201) {
              (0,element_plus__WEBPACK_IMPORTED_MODULE_3__.ElMessage)({
                message: res.message,
                type: "warning"
              });
            }
          });
        } else {
          console.log("error submit!", fields);
        }
      });
    };
    var resetForm = function resetForm(formEl) {
      if (!formEl) return;
      formEl.resetFields();
    };
    var goBack = function goBack() {
      router.push({
        name: "businessList"
      });
    };
    var options = Array.from({
      length: 10000
    }).map(function (_, idx) {
      return {
        value: "".concat(idx + 1),
        label: "".concat(idx + 1)
      };
    });
    var __returned__ = {
      ruleForm: ruleForm,
      route: route,
      router: router,
      ruleFormRef: ruleFormRef,
      rules: rules,
      submitForm: submitForm,
      resetForm: resetForm,
      goBack: goBack,
      options: options,
      get useRouter() {
        return vue_router__WEBPACK_IMPORTED_MODULE_2__.useRouter;
      },
      get useRoute() {
        return vue_router__WEBPACK_IMPORTED_MODULE_2__.useRoute;
      },
      get request() {
        return _utils_requestUtils__WEBPACK_IMPORTED_MODULE_0__["default"];
      },
      get ElMessage() {
        return element_plus__WEBPACK_IMPORTED_MODULE_3__.ElMessage;
      }
    };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true
    });
    return __returned__;
  }
});

/***/ }),

/***/ 81350:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=unplugin-auto-import!./node_modules/babel-loader/lib/index.js??clonedRuleSet-10.use!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[17].use[0]!./node_modules/source-map-loader/dist/cjs.js!./src/pages/business/components/newBusiness.vue?vue&type=template&id=0e4bf362&scoped=true ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ 62494);

var _withScopeId = function _withScopeId(n) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.pushScopeId)("data-v-0e4bf362"), n = n(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.popScopeId)(), n;
};
var _hoisted_1 = {
  "class": "formBox"
};
var _hoisted_2 = {
  "class": "footer"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_el_input = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-input");
  var _component_el_form_item = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-form-item");
  var _component_el_col = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-col");
  var _component_el_row = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-row");
  var _component_el_option = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-option");
  var _component_el_select = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-select");
  var _component_el_button = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-button");
  var _component_el_form = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("el-form");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_form, {
    ref: "ruleFormRef",
    model: $setup.ruleForm,
    rules: $setup.rules,
    "label-width": "120px",
    "class": "demo-ruleForm",
    "status-icon": ""
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_row, null, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
            span: 12
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_form_item, {
                label: "英文名称",
                prop: "name"
              }, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_input, {
                    modelValue: $setup.ruleForm.name,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
                      return $setup.ruleForm.name = $event;
                    }),
                    "class": "formItem",
                    placeholder: "请输入业务领域英文名称",
                    clearable: ""
                  }, null, 8 /* PROPS */, ["modelValue"])];
                }),
                _: 1 /* STABLE */
              })];
            }),

            _: 1 /* STABLE */
          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
            span: 12
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_form_item, {
                label: "中文名称",
                prop: "cname"
              }, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_input, {
                    modelValue: $setup.ruleForm.cname,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
                      return $setup.ruleForm.cname = $event;
                    }),
                    "class": "formItem",
                    placeholder: "请输入业务领域中文名",
                    clearable: ""
                  }, null, 8 /* PROPS */, ["modelValue"])];
                }),
                _: 1 /* STABLE */
              })];
            }),

            _: 1 /* STABLE */
          })];
        }),

        _: 1 /* STABLE */
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_row, null, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
            span: 12
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_form_item, {
                label: "指定负责人",
                prop: "user"
              }, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_select, {
                    modelValue: $setup.ruleForm.user,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
                      return $setup.ruleForm.user = $event;
                    }),
                    placeholder: "请选择资产负责人",
                    "class": "formItem",
                    clearable: ""
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_option, {
                        label: "王惊涛",
                        value: "wjt"
                      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_option, {
                        label: "马师",
                        value: "ms"
                      })];
                    }),
                    _: 1 /* STABLE */
                  }, 8 /* PROPS */, ["modelValue"])];
                }),
                _: 1 /* STABLE */
              })];
            }),

            _: 1 /* STABLE */
          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
            span: 12
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_form_item, {
                label: "资产类型",
                prop: "type"
              }, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_select, {
                    modelValue: $setup.ruleForm.type,
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
                      return $setup.ruleForm.type = $event;
                    }),
                    placeholder: "请选择资产类型",
                    "class": "formItem",
                    clearable: ""
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_option, {
                        label: "金融资产",
                        value: "1"
                      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_option, {
                        label: "不动产",
                        value: "2"
                      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_option, {
                        label: "移动资产",
                        value: "3"
                      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_option, {
                        label: "知识产权",
                        value: "4"
                      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_option, {
                        label: "文艺资产",
                        value: "5"
                      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_option, {
                        label: "公共基础设施",
                        value: "6"
                      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_option, {
                        label: "自然资源",
                        value: "7"
                      })];
                    }),
                    _: 1 /* STABLE */
                  }, 8 /* PROPS */, ["modelValue"])];
                }),
                _: 1 /* STABLE */
              })];
            }),

            _: 1 /* STABLE */
          })];
        }),

        _: 1 /* STABLE */
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_row, null, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
            span: 12
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_form_item, {
                label: "关联实体",
                prop: "entiry"
              }, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_select, {
                    modelValue: $setup.ruleForm.entiry,
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = function ($event) {
                      return $setup.ruleForm.entiry = $event;
                    }),
                    placeholder: "请选择资产负责人",
                    "class": "formItem",
                    clearable: ""
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_option, {
                        label: "长城汽车",
                        value: "1"
                      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_option, {
                        label: "富士康",
                        value: "2"
                      })];
                    }),
                    _: 1 /* STABLE */
                  }, 8 /* PROPS */, ["modelValue"])];
                }),
                _: 1 /* STABLE */
              })];
            }),

            _: 1 /* STABLE */
          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_col, {
            span: 12
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_form_item, {
                label: "资产描述",
                prop: "dsc"
              }, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_input, {
                    modelValue: $setup.ruleForm.dsc,
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) {
                      return $setup.ruleForm.dsc = $event;
                    }),
                    rows: 4,
                    type: "textarea",
                    placeholder: "请输入资产描述",
                    "class": "formItem",
                    clearable: ""
                  }, null, 8 /* PROPS */, ["modelValue"])];
                }),
                _: 1 /* STABLE */
              })];
            }),

            _: 1 /* STABLE */
          })];
        }),

        _: 1 /* STABLE */
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_button, {
        type: "primary",
        onClick: _cache[6] || (_cache[6] = function ($event) {
          return $setup.submitForm($setup.ruleFormRef);
        })
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" 创建 ")];
        }),
        _: 1 /* STABLE */
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_el_button, {
        onClick: $setup.goBack
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("返回")];
        }),
        _: 1 /* STABLE */
      })])];
    }),

    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["model", "rules"])]);
}

/***/ }),

/***/ 94115:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=unplugin-auto-import!./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[17].use[0]!./src/pages/business/components/newBusiness.vue?vue&type=style&index=0&id=0e4bf362&lang=less&scoped=true ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ 75701);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ 8236);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ 6080);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ 56850);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ 87182);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ 39213);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_17_use_0_newBusiness_vue_vue_type_style_index_0_id_0e4bf362_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js!../../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[17].use[0]!./newBusiness.vue?vue&type=style&index=0&id=0e4bf362&lang=less&scoped=true */ 65637);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_17_use_0_newBusiness_vue_vue_type_style_index_0_id_0e4bf362_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_17_use_0_newBusiness_vue_vue_type_style_index_0_id_0e4bf362_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_17_use_0_newBusiness_vue_vue_type_style_index_0_id_0e4bf362_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_17_use_0_newBusiness_vue_vue_type_style_index_0_id_0e4bf362_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ 48347:
/*!*******************************************************!*\
  !*** ./src/pages/business/components/newBusiness.vue ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _newBusiness_vue_vue_type_template_id_0e4bf362_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./newBusiness.vue?vue&type=template&id=0e4bf362&scoped=true */ 99832);
/* harmony import */ var _newBusiness_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./newBusiness.vue?vue&type=script&setup=true&lang=js */ 72627);
/* harmony import */ var _newBusiness_vue_vue_type_style_index_0_id_0e4bf362_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./newBusiness.vue?vue&type=style&index=0&id=0e4bf362&lang=less&scoped=true */ 97258);
/* harmony import */ var E_myProjects_webpack_vue_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ 51419);




;


const __exports__ = /*#__PURE__*/(0,E_myProjects_webpack_vue_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_newBusiness_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_newBusiness_vue_vue_type_template_id_0e4bf362_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-0e4bf362"],['__file',"src/pages/business/components/newBusiness.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ 72627:
/*!******************************************************************************************!*\
  !*** ./src/pages/business/components/newBusiness.vue?vue&type=script&setup=true&lang=js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_unplugin_dist_webpack_loaders_transform_js_unpluginName_unplugin_auto_import_node_modules_babel_loader_lib_index_js_clonedRuleSet_10_use_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_17_use_0_node_modules_source_map_loader_dist_cjs_js_newBusiness_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_unplugin_dist_webpack_loaders_transform_js_unpluginName_unplugin_auto_import_node_modules_babel_loader_lib_index_js_clonedRuleSet_10_use_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_17_use_0_node_modules_source_map_loader_dist_cjs_js_newBusiness_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=unplugin-auto-import!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-10.use!../../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[17].use[0]!../../../../node_modules/source-map-loader/dist/cjs.js!./newBusiness.vue?vue&type=script&setup=true&lang=js */ 20389);
 

/***/ }),

/***/ 99832:
/*!*************************************************************************************************!*\
  !*** ./src/pages/business/components/newBusiness.vue?vue&type=template&id=0e4bf362&scoped=true ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_unplugin_dist_webpack_loaders_transform_js_unpluginName_unplugin_auto_import_node_modules_babel_loader_lib_index_js_clonedRuleSet_10_use_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_4_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_17_use_0_node_modules_source_map_loader_dist_cjs_js_newBusiness_vue_vue_type_template_id_0e4bf362_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_unplugin_dist_webpack_loaders_transform_js_unpluginName_unplugin_auto_import_node_modules_babel_loader_lib_index_js_clonedRuleSet_10_use_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_4_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_17_use_0_node_modules_source_map_loader_dist_cjs_js_newBusiness_vue_vue_type_template_id_0e4bf362_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=unplugin-auto-import!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-10.use!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[17].use[0]!../../../../node_modules/source-map-loader/dist/cjs.js!./newBusiness.vue?vue&type=template&id=0e4bf362&scoped=true */ 81350);


/***/ }),

/***/ 97258:
/*!****************************************************************************************************************!*\
  !*** ./src/pages/business/components/newBusiness.vue?vue&type=style&index=0&id=0e4bf362&lang=less&scoped=true ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_unplugin_dist_webpack_loaders_transform_js_unpluginName_unplugin_auto_import_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_17_use_0_newBusiness_vue_vue_type_style_index_0_id_0e4bf362_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=unplugin-auto-import!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js!../../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[17].use[0]!./newBusiness.vue?vue&type=style&index=0&id=0e4bf362&lang=less&scoped=true */ 94115);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX3BhZ2VzX2J1c2luZXNzX2NvbXBvbmVudHNfbmV3QnVzaW5lc3NfdnVlLmExNDNjMzgxY2Q5OWRiZjA2ZWIxLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDbUg7QUFDakI7QUFDbEcsOEJBQThCLG1GQUEyQixDQUFDLDRGQUFxQztBQUMvRjtBQUNBLHFFQUFxRSxrQkFBa0IsdUJBQXVCLGlCQUFpQix5QkFBeUIsR0FBRyx1Q0FBdUMsaUJBQWlCLEdBQUcscUNBQXFDLGlCQUFpQixnQkFBZ0IsdUJBQXVCLGdCQUFnQixjQUFjLGtCQUFrQix3QkFBd0IsOEJBQThCLEdBQUcsU0FBUyw4SUFBOEksVUFBVSxXQUFXLFVBQVUsV0FBVyxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxVQUFVLFdBQVcsVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLHFDQUFxQyxrQkFBa0IsdUJBQXVCLGlCQUFpQix5QkFBeUIsZUFBZSxtQkFBbUIsS0FBSyxhQUFhLG1CQUFtQixrQkFBa0IseUJBQXlCLGtCQUFrQixnQkFBZ0Isb0JBQW9CLDBCQUEwQixnQ0FBZ0MsS0FBSyxHQUFHLGVBQWUsa0JBQWtCLHVCQUF1QixpQkFBaUIseUJBQXlCLEdBQUcsc0JBQXNCLGlCQUFpQixHQUFHLG9CQUFvQixpQkFBaUIsZ0JBQWdCLHVCQUF1QixnQkFBZ0IsY0FBYyxrQkFBa0Isd0JBQXdCLDhCQUE4QixHQUFHLHFCQUFxQjtBQUN6NEM7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1BVO0FBQ047QUFDRjs7O0FBQ3pDLGlFQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsNkNBQVE7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLG9EQUFRO0FBQ3hCLGlCQUFpQixxREFBUztBQUMxQixzQkFBc0Isd0NBQUc7QUFDekIsZ0JBQWdCLDZDQUFRO0FBQ3hCO0FB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O0FBQzdHLGlDQUFpQyxpSEFBZSxDQUFDLDJGQUFNLGFBQWEsOEZBQU07QUFDMUU7QUFDQSxJQUFJLEtBQVUsRUFBRSxFQVlmOzs7QUFHRCxpRUFBZTs7Ozs7Ozs7Ozs7Ozs7O0FDeEJ1WCIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2stdnVlLy4vc3JjL3BhZ2VzL2J1c2luZXNzL2NvbXBvbmVudHMvbmV3QnVzaW5lc3MudnVlPzEzMzYiLCJ3ZWJwYWNrOi8vd2VicGFjay12dWUvLi9zcmMvcGFnZXMvYnVzaW5lc3MvY29tcG9uZW50cy9uZXdCdXNpbmVzcy52dWU/MzdlMSIsIndlYnBhY2s6Ly93ZWJwYWNrLXZ1ZS8uL3NyYy9wYWdlcy9idXNpbmVzcy9jb21wb25lbnRzL25ld0J1c2luZXNzLnZ1ZSIsIndlYnBhY2s6Ly93ZWJwYWNrLXZ1ZS8uL3NyYy9wYWdlcy9idXNpbmVzcy9jb21wb25lbnRzL25ld0J1c2luZXNzLnZ1ZT8xMWRlIiwid2VicGFjazovL3dlYnBhY2stdnVlLy4vc3JjL3BhZ2VzL2J1c2luZXNzL2NvbXBvbmVudHMvbmV3QnVzaW5lc3MudnVlPzYxMDQiLCJ3ZWJwYWNrOi8vd2VicGFjay12dWUvLi9zcmMvcGFnZXMvYnVzaW5lc3MvY29tcG9uZW50cy9uZXdCdXNpbmVzcy52dWU/NzQ2YyIsIndlYnBhY2s6Ly93ZWJwYWNrLXZ1ZS8uL3NyYy9wYWdlcy9idXNpbmVzcy9jb21wb25lbnRzL25ld0J1c2luZXNzLnZ1ZT9iYjY3Iiwid2VicGFjazovL3dlYnBhY2stdnVlLy4vc3JjL3BhZ2VzL2J1c2luZXNzL2NvbXBvbmVudHMvbmV3QnVzaW5lc3MudnVlP2UwM2EiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIuZm9ybUJveFtkYXRhLXYtMGU0YmYzNjJdIHtcXG4gIHBhZGRpbmc6IDIwcHg7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBwYWRkaW5nLWJvdHRvbTogNDBweDtcXG59XFxuLmZvcm1Cb3ggLmZvcm1JdGVtW2RhdGEtdi0wZTRiZjM2Ml0ge1xcbiAgd2lkdGg6IDMwMHB4O1xcbn1cXG4uZm9ybUJveCAuZm9vdGVyW2RhdGEtdi0wZTRiZjM2Ml0ge1xcbiAgaGVpZ2h0OiA0MHB4O1xcbiAgd2lkdGg6IDEwMCU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBib3R0b206IDBweDtcXG4gIGxlZnQ6IDBweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBwYWRkaW5nLXJpZ2h0OiAyMHB4O1xcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3BhZ2VzL2J1c2luZXNzL2NvbXBvbmVudHMvbmV3QnVzaW5lc3MudnVlXCIsXCJ3ZWJwYWNrOi8vLi9uZXdCdXNpbmVzcy52dWVcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQ0E7RUFDRSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0Esb0JBQUE7QUNBRjtBREpBO0VBTUksWUFBQTtBQ0NKO0FEUEE7RUFTSSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFNBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx5QkFBQTtBQ0NKXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIlxcbi5mb3JtQm94IHtcXG4gIHBhZGRpbmc6IDIwcHg7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBwYWRkaW5nLWJvdHRvbTogNDBweDtcXG4gIC5mb3JtSXRlbSB7XFxuICAgIHdpZHRoOiAzMDBweDtcXG4gIH1cXG4gIC5mb290ZXIge1xcbiAgICBoZWlnaHQ6IDQwcHg7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGJvdHRvbTogMHB4O1xcbiAgICBsZWZ0OiAwcHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIHBhZGRpbmctcmlnaHQ6IDIwcHg7XFxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XFxuICB9XFxufVxcblwiLFwiLmZvcm1Cb3gge1xcbiAgcGFkZGluZzogMjBweDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHBhZGRpbmctYm90dG9tOiA0MHB4O1xcbn1cXG4uZm9ybUJveCAuZm9ybUl0ZW0ge1xcbiAgd2lkdGg6IDMwMHB4O1xcbn1cXG4uZm9ybUJveCAuZm9vdGVyIHtcXG4gIGhlaWdodDogNDBweDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm90dG9tOiAwcHg7XFxuICBsZWZ0OiAwcHg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgcGFkZGluZy1yaWdodDogMjBweDtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJpbXBvcnQgeyB1c2VSb3V0ZXIsIHVzZVJvdXRlIH0gZnJvbSBcInZ1ZS1yb3V0ZXJcIjtcbmltcG9ydCByZXF1ZXN0IGZyb20gXCJAL3V0aWxzL3JlcXVlc3RVdGlsc1wiO1xuaW1wb3J0IHsgRWxNZXNzYWdlIH0gZnJvbSBcImVsZW1lbnQtcGx1c1wiO1xuZXhwb3J0IGRlZmF1bHQge1xuICBfX25hbWU6ICduZXdCdXNpbmVzcycsXG4gIHNldHVwOiBmdW5jdGlvbiBzZXR1cChfX3Byb3BzLCBfcmVmKSB7XG4gICAgdmFyIGV4cG9zZSA9IF9yZWYuZXhwb3NlO1xuICAgIGV4cG9zZSgpO1xuICAgIHZhciBydWxlRm9ybSA9IHJlYWN0aXZlKHtcbiAgICAgIG5hbWU6IFwiXCIsXG4gICAgICBjbmFtZTogXCJcIixcbiAgICAgIHVzZXI6IFwiXCIsXG4gICAgICByZWdpb246IG51bGwsXG4gICAgICBlbnRpcnk6IG51bGwsXG4gICAgICBkY3M6IFwiXCIsXG4gICAgICB0eXBlOiBudWxsLFxuICAgICAgc3RhdHVzOiAxXG4gICAgfSk7XG4gICAgdmFyIHJvdXRlID0gdXNlUm91dGUoKTtcbiAgICB2YXIgcm91dGVyID0gdXNlUm91dGVyKCk7XG4gICAgdmFyIHJ1bGVGb3JtUmVmID0gcmVmKG51bGwpO1xuICAgIHZhciBydWxlcyA9IHJlYWN0aXZlKHtcbiAgICAgIG5hbWU6IFt7XG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBtZXNzYWdlOiBcIuivt+i+k+WFpeS4muWKoemihuWfn+iLseaWh+WQjeensFwiLFxuICAgICAgICB0cmlnZ2VyOiBcImJsdXJcIlxuICAgICAgfSwge1xuICAgICAgICBtaW46IDMsXG4gICAgICAgIG1heDogMjAsXG4gICAgICAgIG1lc3NhZ2U6IFwiTGVuZ3RoIHNob3VsZCBiZSAzIHRvIDVcIixcbiAgICAgICAgdHJpZ2dlcjogXCJibHVyXCJcbiAgICAgIH1dLFxuICAgICAgY25hbWU6IFt7XG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBtZXNzYWdlOiBcIuivt+i+k+WFpeS4muWKoemihuWfn+S4reaWh+WQjeensFwiLFxuICAgICAgICB0cmlnZ2VyOiBcImJsdXJcIlxuICAgICAgfSwge1xuICAgICAgICBtaW46IDMsXG4gICAgICAgIG1heDogMTAsXG4gICAgICAgIG1lc3NhZ2U6IFwiTGVuZ3RoIHNob3VsZCBiZSAzIHRvIDVcIixcbiAgICAgICAgdHJpZ2dlcjogXCJibHVyXCJcbiAgICAgIH1dLFxuICAgICAgdXNlcjogW3tcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIG1lc3NhZ2U6IFwi6K+36YCJ5oup6LWE5Lqn6LSf6LSj5Lq6XCIsXG4gICAgICAgIHRyaWdnZXI6IFwiY2hhbmdlXCJcbiAgICAgIH1dLFxuICAgICAgdHlwZTogW3tcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIG1lc3NhZ2U6IFwi6K+36YCJ5oup6LWE5Lqn57G75Z6LXCIsXG4gICAgICAgIHRyaWdnZXI6IFwiY2hhbmdlXCJcbiAgICAgIH1dXG4gICAgfSk7XG4gICAgdmFyIHN1Ym1pdEZvcm0gPSBmdW5jdGlvbiBzdWJtaXRGb3JtKGZvcm1FbCkge1xuICAgICAgaWYgKCFmb3JtRWwpIHJldHVybjtcbiAgICAgIGZvcm1FbC52YWxpZGF0ZShmdW5jdGlvbiAodmFsaWQsIGZpZWxkcykge1xuICAgICAgICBpZiAodmFsaWQpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhydWxlRm9ybSwgXCLnu5PmnpxcIik7XG4gICAgICAgICAgcmVxdWVzdC5wb3N0KFwiYXBwL2J1c2luZXNzL25ld1wiLCBydWxlRm9ybSkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDIwMCkge1xuICAgICAgICAgICAgICBFbE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwi5paw5bu65oiQ5YqfXCIsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJzdWNjZXNzXCJcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGdvQmFjaygpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY29kZSA9PT0gMjAxKSB7XG4gICAgICAgICAgICAgIEVsTWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogcmVzLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJ3YXJuaW5nXCJcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciBzdWJtaXQhXCIsIGZpZWxkcyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIHJlc2V0Rm9ybSA9IGZ1bmN0aW9uIHJlc2V0Rm9ybShmb3JtRWwpIHtcbiAgICAgIGlmICghZm9ybUVsKSByZXR1cm47XG4gICAgICBmb3JtRWwucmVzZXRGaWVsZHMoKTtcbiAgICB9O1xuICAgIHZhciBnb0JhY2sgPSBmdW5jdGlvbiBnb0JhY2soKSB7XG4gICAgICByb3V0ZXIucHVzaCh7XG4gICAgICAgIG5hbWU6IFwiYnVzaW5lc3NMaXN0XCJcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIG9wdGlvbnMgPSBBcnJheS5mcm9tKHtcbiAgICAgIGxlbmd0aDogMTAwMDBcbiAgICB9KS5tYXAoZnVuY3Rpb24gKF8sIGlkeCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IFwiXCIuY29uY2F0KGlkeCArIDEpLFxuICAgICAgICBsYWJlbDogXCJcIi5jb25jYXQoaWR4ICsgMSlcbiAgICAgIH07XG4gICAgfSk7XG4gICAgdmFyIF9fcmV0dXJuZWRfXyA9IHtcbiAgICAgIHJ1bGVGb3JtOiBydWxlRm9ybSxcbiAgICAgIHJvdXRlOiByb3V0ZSxcbiAgICAgIHJvdXRlcjogcm91dGVyLFxuICAgICAgcnVsZUZvcm1SZWY6IHJ1bGVGb3JtUmVmLFxuICAgICAgcnVsZXM6IHJ1bGVzLFxuICAgICAgc3VibWl0Rm9ybTogc3VibWl0Rm9ybSxcbiAgICAgIHJlc2V0Rm9ybTogcmVzZXRGb3JtLFxuICAgICAgZ29CYWNrOiBnb0JhY2ssXG4gICAgICBvcHRpb25zOiBvcHRpb25zLFxuICAgICAgZ2V0IHVzZVJvdXRlcigpIHtcbiAgICAgICAgcmV0dXJuIHVzZVJvdXRlcjtcbiAgICAgIH0sXG4gICAgICBnZXQgdXNlUm91dGUoKSB7XG4gICAgICAgIHJldHVybiB1c2VSb3V0ZTtcbiAgICAgIH0sXG4gICAgICBnZXQgcmVxdWVzdCgpIHtcbiAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XG4gICAgICB9LFxuICAgICAgZ2V0IEVsTWVzc2FnZSgpIHtcbiAgICAgICAgcmV0dXJuIEVsTWVzc2FnZTtcbiAgICAgIH1cbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfX3JldHVybmVkX18sICdfX2lzU2NyaXB0U2V0dXAnLCB7XG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHZhbHVlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIF9fcmV0dXJuZWRfXztcbiAgfVxufTsiLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cImZvcm1Cb3hcIj5cclxuICAgIDxlbC1mb3JtXHJcbiAgICAgIHJlZj1cInJ1bGVGb3JtUmVmXCJcclxuICAgICAgOm1vZGVsPVwicnVsZUZvcm1cIlxyXG4gICAgICA6cnVsZXM9XCJydWxlc1wiXHJcbiAgICAgIGxhYmVsLXdpZHRoPVwiMTIwcHhcIlxyXG4gICAgICBjbGFzcz1cImRlbW8tcnVsZUZvcm1cIlxyXG4gICAgICBzdGF0dXMtaWNvblxyXG4gICAgPlxyXG4gICAgICA8ZWwtcm93PlxyXG4gICAgICAgIDxlbC1jb2wgOnNwYW49XCIxMlwiPlxyXG4gICAgICAgICAgPGVsLWZvcm0taXRlbSBsYWJlbD1cIuiLseaWh+WQjeensFwiIHByb3A9XCJuYW1lXCI+XHJcbiAgICAgICAgICAgIDxlbC1pbnB1dFxyXG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJydWxlRm9ybS5uYW1lXCJcclxuICAgICAgICAgICAgICBjbGFzcz1cImZvcm1JdGVtXCJcclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIuivt+i+k+WFpeS4muWKoemihuWfn+iLseaWh+WQjeensFwiXHJcbiAgICAgICAgICAgICAgY2xlYXJhYmxlXHJcbiAgICAgICAgICAgIC8+IDwvZWwtZm9ybS1pdGVtXHJcbiAgICAgICAgPjwvZWwtY29sPlxyXG4gICAgICAgIDxlbC1jb2wgOnNwYW49XCIxMlwiPlxyXG4gICAgICAgICAgPGVsLWZvcm0taXRlbSBsYWJlbD1cIuS4reaWh+WQjeensFwiIHByb3A9XCJjbmFtZVwiPlxyXG4gICAgICAgICAgICA8ZWwtaW5wdXRcclxuICAgICAgICAgICAgICB2LW1vZGVsPVwicnVsZUZvcm0uY25hbWVcIlxyXG4gICAgICAgICAgICAgIGNsYXNzPVwiZm9ybUl0ZW1cIlxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwi6K+36L6T5YWl5Lia5Yqh6aKG5Z+f5Lit5paH5ZCNXCJcclxuICAgICAgICAgICAgICBjbGVhcmFibGVcclxuICAgICAgICAgICAgLz4gPC9lbC1mb3JtLWl0ZW1cclxuICAgICAgICA+PC9lbC1jb2w+XHJcbiAgICAgIDwvZWwtcm93PlxyXG4gICAgICA8ZWwtcm93PlxyXG4gICAgICAgIDxlbC1jb2wgOnNwYW49XCIxMlwiPlxyXG4gICAgICAgICAgPGVsLWZvcm0taXRlbSBsYWJlbD1cIuaMh+Wumui0n+i0o+S6ulwiIHByb3A9XCJ1c2VyXCI+XHJcbiAgICAgICAgICAgIDxlbC1zZWxlY3RcclxuICAgICAgICAgICAgICB2LW1vZGVsPVwicnVsZUZvcm0udXNlclwiXHJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCLor7fpgInmi6notYTkuqfotJ/otKPkurpcIlxyXG4gICAgICAgICAgICAgIGNsYXNzPVwiZm9ybUl0ZW1cIlxyXG4gICAgICAgICAgICAgIGNsZWFyYWJsZVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPGVsLW9wdGlvbiBsYWJlbD1cIueOi+aDiua2m1wiIHZhbHVlPVwid2p0XCIgLz5cclxuICAgICAgICAgICAgICA8ZWwtb3B0aW9uIGxhYmVsPVwi6ams5biIXCIgdmFsdWU9XCJtc1wiIC8+XHJcbiAgICAgICAgICAgIDwvZWwtc2VsZWN0PiA8L2VsLWZvcm0taXRlbVxyXG4gICAgICAgID48L2VsLWNvbD5cclxuICAgICAgICA8ZWwtY29sIDpzcGFuPVwiMTJcIj5cclxuICAgICAgICAgIDxlbC1mb3JtLWl0ZW0gbGFiZWw9XCLotYTkuqfnsbvlnotcIiBwcm9wPVwidHlwZVwiPlxyXG4gICAgICAgICAgICA8ZWwtc2VsZWN0XHJcbiAgICAgICAgICAgICAgdi1tb2RlbD1cInJ1bGVGb3JtLnR5cGVcIlxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwi6K+36YCJ5oup6LWE5Lqn57G75Z6LXCJcclxuICAgICAgICAgICAgICBjbGFzcz1cImZvcm1JdGVtXCJcclxuICAgICAgICAgICAgICBjbGVhcmFibGVcclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDxlbC1vcHRpb24gbGFiZWw9XCLph5Hono3otYTkuqdcIiB2YWx1ZT1cIjFcIiAvPlxyXG4gICAgICAgICAgICAgIDxlbC1vcHRpb24gbGFiZWw9XCLkuI3liqjkuqdcIiB2YWx1ZT1cIjJcIiAvPlxyXG4gICAgICAgICAgICAgIDxlbC1vcHRpb24gbGFiZWw9XCLnp7vliqjotYTkuqdcIiB2YWx1ZT1cIjNcIiAvPlxyXG4gICAgICAgICAgICAgIDxlbC1vcHRpb24gbGFiZWw9XCLnn6Xor4bkuqfmnYNcIiB2YWx1ZT1cIjRcIiAvPlxyXG4gICAgICAgICAgICAgIDxlbC1vcHRpb24gbGFiZWw9XCLmlofoibrotYTkuqdcIiB2YWx1ZT1cIjVcIiAvPlxyXG4gICAgICAgICAgICAgIDxlbC1vcHRpb24gbGFiZWw9XCLlhazlhbHln7rnoYDorr7mlr1cIiB2YWx1ZT1cIjZcIiAvPlxyXG4gICAgICAgICAgICAgIDxlbC1vcHRpb25cclxuICAgICAgICAgICAgICAgIGxhYmVsPVwi6Ieq54S26LWE5rqQXCJcclxuICAgICAgICAgICAgICAgIHZhbHVlPVwiN1wiXHJcbiAgICAgICAgICAgICAgLz4gPC9lbC1zZWxlY3Q+PC9lbC1mb3JtLWl0ZW1cclxuICAgICAgICA+PC9lbC1jb2w+XHJcbiAgICAgIDwvZWwtcm93PlxyXG4gICAgICA8ZWwtcm93PlxyXG4gICAgICAgIDxlbC1jb2wgOnNwYW49XCIxMlwiPlxyXG4gICAgICAgICAgPGVsLWZvcm0taXRlbSBsYWJlbD1cIuWFs+iBlOWunuS9k1wiIHByb3A9XCJlbnRpcnlcIj5cclxuICAgICAgICAgICAgPGVsLXNlbGVjdFxyXG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJydWxlRm9ybS5lbnRpcnlcIlxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwi6K+36YCJ5oup6LWE5Lqn6LSf6LSj5Lq6XCJcclxuICAgICAgICAgICAgICBjbGFzcz1cImZvcm1JdGVtXCJcclxuICAgICAgICAgICAgICBjbGVhcmFibGVcclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDxlbC1vcHRpb24gbGFiZWw9XCLplb/ln47msb3ovaZcIiB2YWx1ZT1cIjFcIiAvPlxyXG4gICAgICAgICAgICAgIDxlbC1vcHRpb24gbGFiZWw9XCLlr4zlo6vlurdcIiB2YWx1ZT1cIjJcIiAvPlxyXG4gICAgICAgICAgICA8L2VsLXNlbGVjdD4gPC9lbC1mb3JtLWl0ZW1cclxuICAgICAgICA+PC9lbC1jb2w+XHJcbiAgICAgICAgPGVsLWNvbCA6c3Bhbj1cIjEyXCI+XHJcbiAgICAgICAgICA8ZWwtZm9ybS1pdGVtIGxhYmVsPVwi6LWE5Lqn5o+P6L+wXCIgcHJvcD1cImRzY1wiPlxyXG4gICAgICAgICAgICA8ZWwtaW5wdXRcclxuICAgICAgICAgICAgICB2LW1vZGVsPVwicnVsZUZvcm0uZHNjXCJcclxuICAgICAgICAgICAgICA6cm93cz1cIjRcIlxyXG4gICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0YXJlYVwiXHJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCLor7fovpPlhaXotYTkuqfmj4/ov7BcIlxyXG4gICAgICAgICAgICAgIGNsYXNzPVwiZm9ybUl0ZW1cIlxyXG4gICAgICAgICAgICAgIGNsZWFyYWJsZVxyXG4gICAgICAgICAgICAvPiA8L2VsLWZvcm0taXRlbVxyXG4gICAgICAgID48L2VsLWNvbD5cclxuICAgICAgPC9lbC1yb3c+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJmb290ZXJcIj5cclxuICAgICAgICA8ZWwtYnV0dG9uIHR5cGU9XCJwcmltYXJ5XCIgQGNsaWNrPVwic3VibWl0Rm9ybShydWxlRm9ybVJlZilcIj5cclxuICAgICAgICAgIOWIm+W7ulxyXG4gICAgICAgIDwvZWwtYnV0dG9uPlxyXG4gICAgICAgIDxlbC1idXR0b24gQGNsaWNrPVwiZ29CYWNrXCI+6L+U5ZuePC9lbC1idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9lbC1mb3JtPlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdCBzZXR1cD5cclxuaW1wb3J0IHsgdXNlUm91dGVyLCB1c2VSb3V0ZSB9IGZyb20gXCJ2dWUtcm91dGVyXCI7XHJcbmltcG9ydCByZXF1ZXN0IGZyb20gXCJAL3V0aWxzL3JlcXVlc3RVdGlsc1wiO1xyXG5pbXBvcnQgeyBFbE1lc3NhZ2UgfSBmcm9tIFwiZWxlbWVudC1wbHVzXCI7XHJcbmNvbnN0IHJ1bGVGb3JtID0gcmVhY3RpdmUoe1xyXG4gIG5hbWU6IFwiXCIsXHJcbiAgY25hbWU6IFwiXCIsXHJcbiAgdXNlcjogXCJcIixcclxuICByZWdpb246IG51bGwsXHJcbiAgZW50aXJ5OiBudWxsLFxyXG4gIGRjczogXCJcIixcclxuICB0eXBlOiBudWxsLFxyXG4gIHN0YXR1czogMSxcclxufSk7XHJcbmNvbnN0IHJvdXRlID0gdXNlUm91dGUoKTtcclxuY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XHJcbmNvbnN0IHJ1bGVGb3JtUmVmID0gcmVmKG51bGwpO1xyXG5jb25zdCBydWxlcyA9IHJlYWN0aXZlKHtcclxuICBuYW1lOiBbXHJcbiAgICB7XHJcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICBtZXNzYWdlOiBcIuivt+i+k+WFpeS4muWKoemihuWfn+iLseaWh+WQjeensFwiLFxyXG4gICAgICB0cmlnZ2VyOiBcImJsdXJcIixcclxuICAgIH0sXHJcbiAgICB7IG1pbjogMywgbWF4OiAyMCwgbWVzc2FnZTogXCJMZW5ndGggc2hvdWxkIGJlIDMgdG8gNVwiLCB0cmlnZ2VyOiBcImJsdXJcIiB9LFxyXG4gIF0sXHJcbiAgY25hbWU6IFtcclxuICAgIHtcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgIG1lc3NhZ2U6IFwi6K+36L6T5YWl5Lia5Yqh6aKG5Z+f5Lit5paH5ZCN56ewXCIsXHJcbiAgICAgIHRyaWdnZXI6IFwiYmx1clwiLFxyXG4gICAgfSxcclxuICAgIHsgbWluOiAzLCBtYXg6IDEwLCBtZXNzYWdlOiBcIkxlbmd0aCBzaG91bGQgYmUgMyB0byA1XCIsIHRyaWdnZXI6IFwiYmx1clwiIH0sXHJcbiAgXSxcclxuICB1c2VyOiBbXHJcbiAgICB7XHJcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICBtZXNzYWdlOiBcIuivt+mAieaLqei1hOS6p+i0n+i0o+S6ulwiLFxyXG4gICAgICB0cmlnZ2VyOiBcImNoYW5nZVwiLFxyXG4gICAgfSxcclxuICBdLFxyXG4gIHR5cGU6IFtcclxuICAgIHtcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgIG1lc3NhZ2U6IFwi6K+36YCJ5oup6LWE5Lqn57G75Z6LXCIsXHJcbiAgICAgIHRyaWdnZXI6IFwiY2hhbmdlXCIsXHJcbiAgICB9LFxyXG4gIF0sXHJcbn0pO1xyXG5cclxuY29uc3Qgc3VibWl0Rm9ybSA9IChmb3JtRWwpID0+IHtcclxuICBpZiAoIWZvcm1FbCkgcmV0dXJuO1xyXG4gIGZvcm1FbC52YWxpZGF0ZSgodmFsaWQsIGZpZWxkcykgPT4ge1xyXG4gICAgaWYgKHZhbGlkKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHJ1bGVGb3JtLCBcIue7k+aenFwiKTtcclxuICAgICAgcmVxdWVzdC5wb3N0KFwiYXBwL2J1c2luZXNzL25ld1wiLCBydWxlRm9ybSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5jb2RlID09PSAyMDApIHtcclxuICAgICAgICAgIEVsTWVzc2FnZSh7XHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwi5paw5bu65oiQ5YqfXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwic3VjY2Vzc1wiLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBnb0JhY2soKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHJlcy5jb2RlID09PSAyMDEpIHtcclxuICAgICAgICAgIEVsTWVzc2FnZSh7XHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IHJlcy5tZXNzYWdlLFxyXG4gICAgICAgICAgICB0eXBlOiBcIndhcm5pbmdcIixcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcImVycm9yIHN1Ym1pdCFcIiwgZmllbGRzKTtcclxuICAgIH1cclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IHJlc2V0Rm9ybSA9IChmb3JtRWwpID0+IHtcclxuICBpZiAoIWZvcm1FbCkgcmV0dXJuO1xyXG4gIGZvcm1FbC5yZXNldEZpZWxkcygpO1xyXG59O1xyXG5cclxuY29uc3QgZ29CYWNrID0gKCkgPT4ge1xyXG4gIHJvdXRlci5wdXNoKHtcclxuICAgIG5hbWU6IFwiYnVzaW5lc3NMaXN0XCIsXHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCBvcHRpb25zID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAwMDAgfSkubWFwKChfLCBpZHgpID0+ICh7XHJcbiAgdmFsdWU6IGAke2lkeCArIDF9YCxcclxuICBsYWJlbDogYCR7aWR4ICsgMX1gLFxyXG59KSk7XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIGxhbmc9XCJsZXNzXCIgc2NvcGVkPlxyXG4uZm9ybUJveCB7XHJcbiAgcGFkZGluZzogMjBweDtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIHBhZGRpbmctYm90dG9tOiA0MHB4O1xyXG4gIC5mb3JtSXRlbSB7XHJcbiAgICB3aWR0aDogMzAwcHg7XHJcbiAgfVxyXG4gIC5mb290ZXIge1xyXG4gICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBib3R0b206IDBweDtcclxuICAgIGxlZnQ6IDBweDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAyMHB4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcclxuICB9XHJcbn1cclxuPC9zdHlsZT5cclxuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9kaXN0L3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvZGlzdC9pbmRleC5qcz8/cnVsZVNldFsxXS5ydWxlc1sxN10udXNlWzBdIS4vbmV3QnVzaW5lc3MudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MGU0YmYzNjImbGFuZz1sZXNzJnNjb3BlZD10cnVlXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvZGlzdC9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2Rpc3QvaW5kZXguanM/P3J1bGVTZXRbMV0ucnVsZXNbMTddLnVzZVswXSEuL25ld0J1c2luZXNzLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTBlNGJmMzYyJmxhbmc9bGVzcyZzY29wZWQ9dHJ1ZVwiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsImltcG9ydCB7IHJlbmRlciB9IGZyb20gXCIuL25ld0J1c2luZXNzLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0wZTRiZjM2MiZzY29wZWQ9dHJ1ZVwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL25ld0J1c2luZXNzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmc2V0dXA9dHJ1ZSZsYW5nPWpzXCJcbmV4cG9ydCAqIGZyb20gXCIuL25ld0J1c2luZXNzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmc2V0dXA9dHJ1ZSZsYW5nPWpzXCJcblxuaW1wb3J0IFwiLi9uZXdCdXNpbmVzcy52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0wZTRiZjM2MiZsYW5nPWxlc3Mmc2NvcGVkPXRydWVcIlxuXG5pbXBvcnQgZXhwb3J0Q29tcG9uZW50IGZyb20gXCJFOlxcXFxteVByb2plY3RzXFxcXHdlYnBhY2stLS0tdnVlXFxcXG5vZGVfbW9kdWxlc1xcXFx2dWUtbG9hZGVyXFxcXGRpc3RcXFxcZXhwb3J0SGVscGVyLmpzXCJcbmNvbnN0IF9fZXhwb3J0c19fID0gLyojX19QVVJFX18qL2V4cG9ydENvbXBvbmVudChzY3JpcHQsIFtbJ3JlbmRlcicscmVuZGVyXSxbJ19fc2NvcGVJZCcsXCJkYXRhLXYtMGU0YmYzNjJcIl0sWydfX2ZpbGUnLFwic3JjL3BhZ2VzL2J1c2luZXNzL2NvbXBvbmVudHMvbmV3QnVzaW5lc3MudnVlXCJdXSlcbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIF9fZXhwb3J0c19fLl9faG1ySWQgPSBcIjBlNGJmMzYyXCJcbiAgY29uc3QgYXBpID0gX19WVUVfSE1SX1JVTlRJTUVfX1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghYXBpLmNyZWF0ZVJlY29yZCgnMGU0YmYzNjInLCBfX2V4cG9ydHNfXykpIHtcbiAgICBhcGkucmVsb2FkKCcwZTRiZjM2MicsIF9fZXhwb3J0c19fKVxuICB9XG4gIFxuICBtb2R1bGUuaG90LmFjY2VwdChcIi4vbmV3QnVzaW5lc3MudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTBlNGJmMzYyJnNjb3BlZD10cnVlXCIsICgpID0+IHtcbiAgICBhcGkucmVyZW5kZXIoJzBlNGJmMzYyJywgcmVuZGVyKVxuICB9KVxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgX19leHBvcnRzX18iLCJleHBvcnQgeyBkZWZhdWx0IH0gZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3VucGx1Z2luL2Rpc3Qvd2VicGFjay9sb2FkZXJzL3RyYW5zZm9ybS5qcz91bnBsdWdpbk5hbWU9dW5wbHVnaW4tYXV0by1pbXBvcnQhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P2Nsb25lZFJ1bGVTZXQtMTAudXNlIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2Rpc3QvaW5kZXguanM/P3J1bGVTZXRbMV0ucnVsZXNbMTddLnVzZVswXSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc291cmNlLW1hcC1sb2FkZXIvZGlzdC9janMuanMhLi9uZXdCdXNpbmVzcy52dWU/dnVlJnR5cGU9c2NyaXB0JnNldHVwPXRydWUmbGFuZz1qc1wiOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdW5wbHVnaW4vZGlzdC93ZWJwYWNrL2xvYWRlcnMvdHJhbnNmb3JtLmpzP3VucGx1Z2luTmFtZT11bnBsdWdpbi1hdXRvLWltcG9ydCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/Y2xvbmVkUnVsZVNldC0xMC51c2UhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvZGlzdC9pbmRleC5qcz8/cnVsZVNldFsxXS5ydWxlc1sxN10udXNlWzBdIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zb3VyY2UtbWFwLWxvYWRlci9kaXN0L2Nqcy5qcyEuL25ld0J1c2luZXNzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmc2V0dXA9dHJ1ZSZsYW5nPWpzXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdW5wbHVnaW4vZGlzdC93ZWJwYWNrL2xvYWRlcnMvdHJhbnNmb3JtLmpzP3VucGx1Z2luTmFtZT11bnBsdWdpbi1hdXRvLWltcG9ydCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/Y2xvbmVkUnVsZVNldC0xMC51c2UhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvZGlzdC90ZW1wbGF0ZUxvYWRlci5qcz8/cnVsZVNldFsxXS5ydWxlc1s0XSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9kaXN0L2luZGV4LmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzE3XS51c2VbMF0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NvdXJjZS1tYXAtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbmV3QnVzaW5lc3MudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTBlNGJmMzYyJnNjb3BlZD10cnVlXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdW5wbHVnaW4vZGlzdC93ZWJwYWNrL2xvYWRlcnMvdHJhbnNmb3JtLmpzP3VucGx1Z2luTmFtZT11bnBsdWdpbi1hdXRvLWltcG9ydCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2Rpc3Qvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9sZXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9kaXN0L2luZGV4LmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzE3XS51c2VbMF0hLi9uZXdCdXNpbmVzcy52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0wZTRiZjM2MiZsYW5nPWxlc3Mmc2NvcGVkPXRydWVcIiJdLCJuYW1lcyI6WyJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX2hvaXN0ZWRfMSIsIl9jcmVhdGVWTm9kZSIsIl9jb21wb25lbnRfZWxfZm9ybSIsInJlZiIsIm1vZGVsIiwiJHNldHVwIiwicnVsZUZvcm0iLCJydWxlcyIsIl9jb21wb25lbnRfZWxfcm93IiwiX2NvbXBvbmVudF9lbF9jb2wiLCJzcGFuIiwiX2NvbXBvbmVudF9lbF9mb3JtX2l0ZW0iLCJsYWJlbCIsInByb3AiLCJfY29tcG9uZW50X2VsX2lucHV0IiwibmFtZSIsIiRldmVudCIsInBsYWNlaG9sZGVyIiwiY2xlYXJhYmxlIiwiY25hbWUiLCJfY29tcG9uZW50X2VsX3NlbGVjdCIsInVzZXIiLCJfY29tcG9uZW50X2VsX29wdGlvbiIsInZhbHVlIiwidHlwZSIsImVudGlyeSIsImRzYyIsInJvd3MiLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX2hvaXN0ZWRfMiIsIl9jb21wb25lbnRfZWxfYnV0dG9uIiwib25DbGljayIsIl9jYWNoZSIsInN1Ym1pdEZvcm0iLCJydWxlRm9ybVJlZiIsImdvQmFjayJdLCJzb3VyY2VSb290IjoiIn0=