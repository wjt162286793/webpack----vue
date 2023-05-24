"use strict";
(self["webpackChunkwebpack_vue"] = self["webpackChunkwebpack_vue"] || []).push([["src_pages_valueflow_index_vue"],{

/***/ 12779:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=unplugin-auto-import!./node_modules/babel-loader/lib/index.js??clonedRuleSet-10.use!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[17].use[0]!./node_modules/source-map-loader/dist/cjs.js!./src/pages/valueflow/index.vue?vue&type=script&setup=true&lang=js ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wangeditor_editor_dist_css_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wangeditor/editor/dist/css/style.css */ 996);
/* harmony import */ var _wangeditor_editor_for_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wangeditor/editor-for-vue */ 62252);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue */ 62494);
 // 引入 css




// 编辑器实例，必须用 shallowRef

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __name: 'index',
  setup: function setup(__props, _ref) {
    var expose = _ref.expose;
    expose();
    var editorRef = (0,vue__WEBPACK_IMPORTED_MODULE_2__.shallowRef)();
    var mode = (0,vue__WEBPACK_IMPORTED_MODULE_2__.ref)('default');
    // 内容 HTML
    var valueHtml = (0,vue__WEBPACK_IMPORTED_MODULE_2__.ref)('<p>hello wangjingtao</p>');

    // 模拟 ajax 异步获取内容
    (0,vue__WEBPACK_IMPORTED_MODULE_2__.onMounted)(function () {
      //error2 使用延迟渲染
      (0,vue__WEBPACK_IMPORTED_MODULE_2__.nextTick)(function () {
        valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>';
      });
    });
    var toolbarConfig = (0,vue__WEBPACK_IMPORTED_MODULE_2__.reactive)({});
    var editorConfig = (0,vue__WEBPACK_IMPORTED_MODULE_2__.reactive)({
      placeholder: '请输入内容...'
    });

    // 组件销毁时，也及时销毁编辑器
    (0,vue__WEBPACK_IMPORTED_MODULE_2__.onBeforeUnmount)(function () {
      var editor = editorRef.value;
      if (editor == null) return;
      editor.destroy();
    });
    var handleCreated = function handleCreated(editor) {
      editorRef.value = editor;
      console.log('created', editor);
    };
    var handleChange = function handleChange(editor) {
      console.log('change:', editor.children);
    };
    var handleDestroyed = function handleDestroyed(editor) {
      console.log('destroyed', editor);
    };
    var handleFocus = function handleFocus(editor) {
      console.log('focus', editor);
    };
    var handleBlur = function handleBlur(editor) {
      console.log('blur', editor);
    };
    var customAlert = function customAlert(info, type) {
      alert("\u3010\u81EA\u5B9A\u4E49\u63D0\u793A\u3011".concat(type, " - ").concat(info));
    };
    var customPaste = function customPaste(editor, event, callback) {
      console.log('ClipboardEvent 粘贴事件对象', event);
      // const html = event.clipboardData.getData('text/html') // 获取粘贴的 html
      // const text = event.clipboardData.getData('text/plain') // 获取粘贴的纯文本
      // const rtf = event.clipboardData.getData('text/rtf') // 获取 rtf 数据（如从 word wsp 复制粘贴）

      // 自定义插入内容
      editor.insertText('xxx');

      // 返回 false ，阻止默认粘贴行为
      event.preventDefault();
      callback(false); // 返回值（注意，vue 事件的返回值，不能用 return）

      // 返回 true ，继续默认的粘贴行为
      // callback(true)
    };

    var __returned__ = {
      editorRef: editorRef,
      mode: mode,
      valueHtml: valueHtml,
      toolbarConfig: toolbarConfig,
      editorConfig: editorConfig,
      handleCreated: handleCreated,
      handleChange: handleChange,
      handleDestroyed: handleDestroyed,
      handleFocus: handleFocus,
      handleBlur: handleBlur,
      customAlert: customAlert,
      customPaste: customPaste,
      get Editor() {
        return _wangeditor_editor_for_vue__WEBPACK_IMPORTED_MODULE_1__.Editor;
      },
      get Toolbar() {
        return _wangeditor_editor_for_vue__WEBPACK_IMPORTED_MODULE_1__.Toolbar;
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

/***/ 62959:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=unplugin-auto-import!./node_modules/babel-loader/lib/index.js??clonedRuleSet-10.use!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[17].use[0]!./node_modules/source-map-loader/dist/cjs.js!./src/pages/valueflow/index.vue?vue&type=template&id=3e442b0e ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ 62494);

var _hoisted_1 = {
  style: {
    "border": "1px solid #ccc"
  }
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["Toolbar"], {
    style: {
      "border-bottom": "1px solid #ccc"
    },
    editor: $setup.editorRef,
    defaultConfig: $setup.toolbarConfig,
    mode: $setup.mode
  }, null, 8 /* PROPS */, ["editor", "defaultConfig", "mode"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["Editor"], {
    style: {
      "height": "500px",
      "overflow-y": "hidden"
    },
    modelValue: $setup.valueHtml,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return $setup.valueHtml = $event;
    }),
    defaultConfig: $setup.editorConfig,
    mode: $setup.mode,
    onOnCreated: $setup.handleCreated,
    onOnChange: $setup.handleChange,
    onOnDestroyed: $setup.handleDestroyed,
    onOnFocus: $setup.handleFocus,
    onOnBlur: $setup.handleBlur,
    onCustomAlert: $setup.customAlert,
    onCustomPaste: $setup.customPaste
  }, null, 8 /* PROPS */, ["modelValue", "defaultConfig", "mode"])]);
}

/***/ }),

/***/ 91229:
/*!***************************************!*\
  !*** ./src/pages/valueflow/index.vue ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_vue_vue_type_template_id_3e442b0e__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=3e442b0e */ 84262);
/* harmony import */ var _index_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&setup=true&lang=js */ 58029);
/* harmony import */ var E_myProjects_webpack_vue_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ 51419);




;
const __exports__ = /*#__PURE__*/(0,E_myProjects_webpack_vue_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_index_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_index_vue_vue_type_template_id_3e442b0e__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"src/pages/valueflow/index.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ 58029:
/*!**************************************************************************!*\
  !*** ./src/pages/valueflow/index.vue?vue&type=script&setup=true&lang=js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_unplugin_dist_webpack_loaders_transform_js_unpluginName_unplugin_auto_import_node_modules_babel_loader_lib_index_js_clonedRuleSet_10_use_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_17_use_0_node_modules_source_map_loader_dist_cjs_js_index_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_unplugin_dist_webpack_loaders_transform_js_unpluginName_unplugin_auto_import_node_modules_babel_loader_lib_index_js_clonedRuleSet_10_use_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_17_use_0_node_modules_source_map_loader_dist_cjs_js_index_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=unplugin-auto-import!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-10.use!../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[17].use[0]!../../../node_modules/source-map-loader/dist/cjs.js!./index.vue?vue&type=script&setup=true&lang=js */ 12779);
 

/***/ }),

/***/ 84262:
/*!*********************************************************************!*\
  !*** ./src/pages/valueflow/index.vue?vue&type=template&id=3e442b0e ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_unplugin_dist_webpack_loaders_transform_js_unpluginName_unplugin_auto_import_node_modules_babel_loader_lib_index_js_clonedRuleSet_10_use_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_4_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_17_use_0_node_modules_source_map_loader_dist_cjs_js_index_vue_vue_type_template_id_3e442b0e__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_unplugin_dist_webpack_loaders_transform_js_unpluginName_unplugin_auto_import_node_modules_babel_loader_lib_index_js_clonedRuleSet_10_use_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_4_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_17_use_0_node_modules_source_map_loader_dist_cjs_js_index_vue_vue_type_template_id_3e442b0e__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=unplugin-auto-import!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-10.use!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[17].use[0]!../../../node_modules/source-map-loader/dist/cjs.js!./index.vue?vue&type=template&id=3e442b0e */ 62959);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX3BhZ2VzX3ZhbHVlZmxvd19pbmRleF92dWUuYjkyZDVjODJhMzVmOGFmZTYzMWIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUErQztBQUNjO0FBQzdEOzs7QUFDQTtBQUNBO0FBQ0EsaUVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiwrQ0FBVTtBQUM5QixlQUFlLHdDQUFHO0FBQ2xCO0FBQ0Esb0JBQW9CLHdDQUFHO0FBQ3ZCO0FBQ0E7QUFDQSxJQUFJLDhDQUFTO0FBQ2I7QUFDQSxNQUFNLDZDQUFRO0FBQ2Q7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDZDQUFRO0FBQ2hDLHVCQUF1Qiw2Q0FBUTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksb0RBQWU7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSw4REFBTTtBQUNyQjtBQUNBO0FBQ0EsZUFBZSwrREFBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7RUM5Rk1BLEtBQThCLEVBQTlCO0lBQUE7RUFBQTtBQUE4Qjs7MkRBQW5DQyx1REFBQSxDQUtNLE9BTE5DLFVBS00sR0FKSkMsZ0RBQUEsQ0FBaUhDLE1BQUE7SUFBeEdKLEtBQXFDLEVBQXJDO01BQUE7SUFBQSxDQUFxQztJQUFFSyxNQUFNLEVBQUVELE1BQUEsQ0FBQUUsU0FBUztJQUFHQyxhQUFhLEVBQUVILE1BQUEsQ0FBQUksYUFBYTtJQUFHQyxJQUFJLEVBQUVMLE1BQUEsQ0FBQUs7Z0VBQ3pHTixnREFBQSxDQUUrRUMsTUFBQTtJQUZ2RUosS0FBMEMsRUFBMUM7TUFBQTtNQUFBO0lBQUEsQ0FBMEM7Z0JBQVVJLE1BQUEsQ0FBQU0sU0FBUzs7YUFBVE4sTUFBQSxDQUFBTSxTQUFTLEdBQUFDLE1BQUE7SUFBQTtJQUFHSixhQUFhLEVBQUVILE1BQUEsQ0FBQVEsWUFBWTtJQUFHSCxJQUFJLEVBQUVMLE1BQUEsQ0FBQUssSUFBSTtJQUM3R0ksV0FBUyxFQUFFVCxNQUFBLENBQUFVLGFBQWE7SUFBR0MsVUFBUSxFQUFFWCxNQUFBLENBQUFZLFlBQVk7SUFBR0MsYUFBVyxFQUFFYixNQUFBLENBQUFjLGVBQWU7SUFBR0MsU0FBTyxFQUFFZixNQUFBLENBQUFnQixXQUFXO0lBQ3ZHQyxRQUFNLEVBQUVqQixNQUFBLENBQUFrQixVQUFVO0lBQUdDLGFBQVcsRUFBRW5CLE1BQUEsQ0FBQW9CLFdBQVc7SUFBR0MsYUFBVyxFQUFFckIsTUFBQSxDQUFBc0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMRjtBQUNDO0FBQ0w7O0FBRTlELENBQTZHO0FBQzdHLGlDQUFpQyxpSEFBZSxDQUFDLHFGQUFNLGFBQWEsNEVBQU07QUFDMUU7QUFDQSxJQUFJLEtBQVUsRUFBRSxFQVlmOzs7QUFHRCxpRUFBZTs7Ozs7Ozs7Ozs7Ozs7O0FDdEJxVyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2stdnVlLy4vc3JjL3BhZ2VzL3ZhbHVlZmxvdy9pbmRleC52dWU/NjY2ZiIsIndlYnBhY2s6Ly93ZWJwYWNrLXZ1ZS8uL3NyYy9wYWdlcy92YWx1ZWZsb3cvaW5kZXgudnVlIiwid2VicGFjazovL3dlYnBhY2stdnVlLy4vc3JjL3BhZ2VzL3ZhbHVlZmxvdy9pbmRleC52dWU/OWIyZSIsIndlYnBhY2s6Ly93ZWJwYWNrLXZ1ZS8uL3NyYy9wYWdlcy92YWx1ZWZsb3cvaW5kZXgudnVlPzRhYjQiLCJ3ZWJwYWNrOi8vd2VicGFjay12dWUvLi9zcmMvcGFnZXMvdmFsdWVmbG93L2luZGV4LnZ1ZT9hNmE3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnQHdhbmdlZGl0b3IvZWRpdG9yL2Rpc3QvY3NzL3N0eWxlLmNzcyc7IC8vIOW8leWFpSBjc3NcbmltcG9ydCB7IEVkaXRvciwgVG9vbGJhciB9IGZyb20gJ0B3YW5nZWRpdG9yL2VkaXRvci1mb3ItdnVlJztcblxuLy8g57yW6L6R5Zmo5a6e5L6L77yM5b+F6aG755SoIHNoYWxsb3dSZWZcblxuZXhwb3J0IGRlZmF1bHQge1xuICBfX25hbWU6ICdpbmRleCcsXG4gIHNldHVwOiBmdW5jdGlvbiBzZXR1cChfX3Byb3BzLCBfcmVmKSB7XG4gICAgdmFyIGV4cG9zZSA9IF9yZWYuZXhwb3NlO1xuICAgIGV4cG9zZSgpO1xuICAgIHZhciBlZGl0b3JSZWYgPSBzaGFsbG93UmVmKCk7XG4gICAgdmFyIG1vZGUgPSByZWYoJ2RlZmF1bHQnKTtcbiAgICAvLyDlhoXlrrkgSFRNTFxuICAgIHZhciB2YWx1ZUh0bWwgPSByZWYoJzxwPmhlbGxvIHdhbmdqaW5ndGFvPC9wPicpO1xuXG4gICAgLy8g5qih5oufIGFqYXgg5byC5q2l6I635Y+W5YaF5a65XG4gICAgb25Nb3VudGVkKGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vZXJyb3IyIOS9v+eUqOW7tui/n+a4suafk1xuICAgICAgbmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICB2YWx1ZUh0bWwudmFsdWUgPSAnPHA+5qih5oufIEFqYXgg5byC5q2l6K6+572u5YaF5a65PC9wPic7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICB2YXIgdG9vbGJhckNvbmZpZyA9IHJlYWN0aXZlKHt9KTtcbiAgICB2YXIgZWRpdG9yQ29uZmlnID0gcmVhY3RpdmUoe1xuICAgICAgcGxhY2Vob2xkZXI6ICfor7fovpPlhaXlhoXlrrkuLi4nXG4gICAgfSk7XG5cbiAgICAvLyDnu4Tku7bplIDmr4Hml7bvvIzkuZ/lj4rml7bplIDmr4HnvJbovpHlmahcbiAgICBvbkJlZm9yZVVubW91bnQoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGVkaXRvciA9IGVkaXRvclJlZi52YWx1ZTtcbiAgICAgIGlmIChlZGl0b3IgPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgZWRpdG9yLmRlc3Ryb3koKTtcbiAgICB9KTtcbiAgICB2YXIgaGFuZGxlQ3JlYXRlZCA9IGZ1bmN0aW9uIGhhbmRsZUNyZWF0ZWQoZWRpdG9yKSB7XG4gICAgICBlZGl0b3JSZWYudmFsdWUgPSBlZGl0b3I7XG4gICAgICBjb25zb2xlLmxvZygnY3JlYXRlZCcsIGVkaXRvcik7XG4gICAgfTtcbiAgICB2YXIgaGFuZGxlQ2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlQ2hhbmdlKGVkaXRvcikge1xuICAgICAgY29uc29sZS5sb2coJ2NoYW5nZTonLCBlZGl0b3IuY2hpbGRyZW4pO1xuICAgIH07XG4gICAgdmFyIGhhbmRsZURlc3Ryb3llZCA9IGZ1bmN0aW9uIGhhbmRsZURlc3Ryb3llZChlZGl0b3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdkZXN0cm95ZWQnLCBlZGl0b3IpO1xuICAgIH07XG4gICAgdmFyIGhhbmRsZUZvY3VzID0gZnVuY3Rpb24gaGFuZGxlRm9jdXMoZWRpdG9yKSB7XG4gICAgICBjb25zb2xlLmxvZygnZm9jdXMnLCBlZGl0b3IpO1xuICAgIH07XG4gICAgdmFyIGhhbmRsZUJsdXIgPSBmdW5jdGlvbiBoYW5kbGVCbHVyKGVkaXRvcikge1xuICAgICAgY29uc29sZS5sb2coJ2JsdXInLCBlZGl0b3IpO1xuICAgIH07XG4gICAgdmFyIGN1c3RvbUFsZXJ0ID0gZnVuY3Rpb24gY3VzdG9tQWxlcnQoaW5mbywgdHlwZSkge1xuICAgICAgYWxlcnQoXCJcXHUzMDEwXFx1ODFFQVxcdTVCOUFcXHU0RTQ5XFx1NjNEMFxcdTc5M0FcXHUzMDExXCIuY29uY2F0KHR5cGUsIFwiIC0gXCIpLmNvbmNhdChpbmZvKSk7XG4gICAgfTtcbiAgICB2YXIgY3VzdG9tUGFzdGUgPSBmdW5jdGlvbiBjdXN0b21QYXN0ZShlZGl0b3IsIGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgY29uc29sZS5sb2coJ0NsaXBib2FyZEV2ZW50IOeymOi0tOS6i+S7tuWvueixoScsIGV2ZW50KTtcbiAgICAgIC8vIGNvbnN0IGh0bWwgPSBldmVudC5jbGlwYm9hcmREYXRhLmdldERhdGEoJ3RleHQvaHRtbCcpIC8vIOiOt+WPlueymOi0tOeahCBodG1sXG4gICAgICAvLyBjb25zdCB0ZXh0ID0gZXZlbnQuY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0L3BsYWluJykgLy8g6I635Y+W57KY6LS055qE57qv5paH5pysXG4gICAgICAvLyBjb25zdCBydGYgPSBldmVudC5jbGlwYm9hcmREYXRhLmdldERhdGEoJ3RleHQvcnRmJykgLy8g6I635Y+WIHJ0ZiDmlbDmja7vvIjlpoLku44gd29yZCB3c3Ag5aSN5Yi257KY6LS077yJXG5cbiAgICAgIC8vIOiHquWumuS5ieaPkuWFpeWGheWuuVxuICAgICAgZWRpdG9yLmluc2VydFRleHQoJ3h4eCcpO1xuXG4gICAgICAvLyDov5Tlm54gZmFsc2Ug77yM6Zi75q2i6buY6K6k57KY6LS06KGM5Li6XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY2FsbGJhY2soZmFsc2UpOyAvLyDov5Tlm57lgLzvvIjms6jmhI/vvIx2dWUg5LqL5Lu255qE6L+U5Zue5YC877yM5LiN6IO955SoIHJldHVybu+8iVxuXG4gICAgICAvLyDov5Tlm54gdHJ1ZSDvvIznu6fnu63pu5jorqTnmoTnspjotLTooYzkuLpcbiAgICAgIC8vIGNhbGxiYWNrKHRydWUpXG4gICAgfTtcblxuICAgIHZhciBfX3JldHVybmVkX18gPSB7XG4gICAgICBlZGl0b3JSZWY6IGVkaXRvclJlZixcbiAgICAgIG1vZGU6IG1vZGUsXG4gICAgICB2YWx1ZUh0bWw6IHZhbHVlSHRtbCxcbiAgICAgIHRvb2xiYXJDb25maWc6IHRvb2xiYXJDb25maWcsXG4gICAgICBlZGl0b3JDb25maWc6IGVkaXRvckNvbmZpZyxcbiAgICAgIGhhbmRsZUNyZWF0ZWQ6IGhhbmRsZUNyZWF0ZWQsXG4gICAgICBoYW5kbGVDaGFuZ2U6IGhhbmRsZUNoYW5nZSxcbiAgICAgIGhhbmRsZURlc3Ryb3llZDogaGFuZGxlRGVzdHJveWVkLFxuICAgICAgaGFuZGxlRm9jdXM6IGhhbmRsZUZvY3VzLFxuICAgICAgaGFuZGxlQmx1cjogaGFuZGxlQmx1cixcbiAgICAgIGN1c3RvbUFsZXJ0OiBjdXN0b21BbGVydCxcbiAgICAgIGN1c3RvbVBhc3RlOiBjdXN0b21QYXN0ZSxcbiAgICAgIGdldCBFZGl0b3IoKSB7XG4gICAgICAgIHJldHVybiBFZGl0b3I7XG4gICAgICB9LFxuICAgICAgZ2V0IFRvb2xiYXIoKSB7XG4gICAgICAgIHJldHVybiBUb29sYmFyO1xuICAgICAgfVxuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KF9fcmV0dXJuZWRfXywgJ19faXNTY3JpcHRTZXR1cCcsIHtcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgdmFsdWU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gX19yZXR1cm5lZF9fO1xuICB9XG59OyIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2IHN0eWxlPVwiYm9yZGVyOiAxcHggc29saWQgI2NjY1wiPlxyXG4gICAgPFRvb2xiYXIgc3R5bGU9XCJib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NjY1wiIDplZGl0b3I9XCJlZGl0b3JSZWZcIiA6ZGVmYXVsdENvbmZpZz1cInRvb2xiYXJDb25maWdcIiA6bW9kZT1cIm1vZGVcIiAvPlxyXG4gICAgPEVkaXRvciBzdHlsZT1cImhlaWdodDogNTAwcHg7IG92ZXJmbG93LXk6IGhpZGRlbjtcIiB2LW1vZGVsPVwidmFsdWVIdG1sXCIgOmRlZmF1bHRDb25maWc9XCJlZGl0b3JDb25maWdcIiA6bW9kZT1cIm1vZGVcIlxyXG4gICAgICBAb25DcmVhdGVkPVwiaGFuZGxlQ3JlYXRlZFwiIEBvbkNoYW5nZT1cImhhbmRsZUNoYW5nZVwiIEBvbkRlc3Ryb3llZD1cImhhbmRsZURlc3Ryb3llZFwiIEBvbkZvY3VzPVwiaGFuZGxlRm9jdXNcIlxyXG4gICAgICBAb25CbHVyPVwiaGFuZGxlQmx1clwiIEBjdXN0b21BbGVydD1cImN1c3RvbUFsZXJ0XCIgQGN1c3RvbVBhc3RlPVwiY3VzdG9tUGFzdGVcIiAvPlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG48c2NyaXB0IHNldHVwPlxyXG5pbXBvcnQgJ0B3YW5nZWRpdG9yL2VkaXRvci9kaXN0L2Nzcy9zdHlsZS5jc3MnIC8vIOW8leWFpSBjc3NcclxuaW1wb3J0IHsgRWRpdG9yLCBUb29sYmFyIH0gZnJvbSAnQHdhbmdlZGl0b3IvZWRpdG9yLWZvci12dWUnXHJcblxyXG4gICAgLy8g57yW6L6R5Zmo5a6e5L6L77yM5b+F6aG755SoIHNoYWxsb3dSZWZcclxuICAgIGNvbnN0IGVkaXRvclJlZiA9IHNoYWxsb3dSZWYoKVxyXG4gICAgY29uc3QgbW9kZSA9IHJlZignZGVmYXVsdCcpXHJcbiAgICAvLyDlhoXlrrkgSFRNTFxyXG4gICAgY29uc3QgdmFsdWVIdG1sID0gcmVmKCc8cD5oZWxsbyB3YW5namluZ3RhbzwvcD4nKVxyXG5cclxuICAgIC8vIOaooeaLnyBhamF4IOW8guatpeiOt+WPluWGheWuuVxyXG4gICAgb25Nb3VudGVkKCgpID0+IHtcclxuICAgICAgLy9lcnJvcjIg5L2/55So5bu26L+f5riy5p+TXHJcbiAgICAgIG5leHRUaWNrKCgpPT57XHJcbiAgICAgICAgdmFsdWVIdG1sLnZhbHVlID0gJzxwPuaooeaLnyBBamF4IOW8guatpeiuvue9ruWGheWuuTwvcD4nXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICAgIGNvbnN0IHRvb2xiYXJDb25maWcgPSByZWFjdGl2ZSh7fSlcclxuICAgIGNvbnN0IGVkaXRvckNvbmZpZyA9IHJlYWN0aXZlKHsgcGxhY2Vob2xkZXI6ICfor7fovpPlhaXlhoXlrrkuLi4nIH0pXHJcblxyXG4gICAgLy8g57uE5Lu26ZSA5q+B5pe277yM5Lmf5Y+K5pe26ZSA5q+B57yW6L6R5ZmoXHJcbiAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xyXG4gICAgICBjb25zdCBlZGl0b3IgPSBlZGl0b3JSZWYudmFsdWVcclxuICAgICAgaWYgKGVkaXRvciA9PSBudWxsKSByZXR1cm5cclxuICAgICAgZWRpdG9yLmRlc3Ryb3koKVxyXG4gICAgfSlcclxuXHJcbiAgICBjb25zdCBoYW5kbGVDcmVhdGVkID0gKGVkaXRvcikgPT4ge1xyXG4gICAgICBlZGl0b3JSZWYudmFsdWUgPSBlZGl0b3JcclxuICAgICAgY29uc29sZS5sb2coJ2NyZWF0ZWQnLCBlZGl0b3IpXHJcbiAgICB9XHJcbiAgICBjb25zdCBoYW5kbGVDaGFuZ2UgPSAoZWRpdG9yKSA9PiB7IGNvbnNvbGUubG9nKCdjaGFuZ2U6JywgZWRpdG9yLmNoaWxkcmVuKSB9XHJcbiAgICBjb25zdCBoYW5kbGVEZXN0cm95ZWQgPSAoZWRpdG9yKSA9PiB7IGNvbnNvbGUubG9nKCdkZXN0cm95ZWQnLCBlZGl0b3IpIH1cclxuICAgIGNvbnN0IGhhbmRsZUZvY3VzID0gKGVkaXRvcikgPT4geyBjb25zb2xlLmxvZygnZm9jdXMnLCBlZGl0b3IpIH1cclxuICAgIGNvbnN0IGhhbmRsZUJsdXIgPSAoZWRpdG9yKSA9PiB7IGNvbnNvbGUubG9nKCdibHVyJywgZWRpdG9yKSB9XHJcbiAgICBjb25zdCBjdXN0b21BbGVydCA9IChpbmZvLCB0eXBlKSA9PiB7IGFsZXJ0KGDjgJDoh6rlrprkuYnmj5DnpLrjgJEke3R5cGV9IC0gJHtpbmZvfWApIH1cclxuICAgIGNvbnN0IGN1c3RvbVBhc3RlID0gKGVkaXRvciwgZXZlbnQsIGNhbGxiYWNrKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdDbGlwYm9hcmRFdmVudCDnspjotLTkuovku7blr7nosaEnLCBldmVudClcclxuICAgICAgLy8gY29uc3QgaHRtbCA9IGV2ZW50LmNsaXBib2FyZERhdGEuZ2V0RGF0YSgndGV4dC9odG1sJykgLy8g6I635Y+W57KY6LS055qEIGh0bWxcclxuICAgICAgLy8gY29uc3QgdGV4dCA9IGV2ZW50LmNsaXBib2FyZERhdGEuZ2V0RGF0YSgndGV4dC9wbGFpbicpIC8vIOiOt+WPlueymOi0tOeahOe6r+aWh+acrFxyXG4gICAgICAvLyBjb25zdCBydGYgPSBldmVudC5jbGlwYm9hcmREYXRhLmdldERhdGEoJ3RleHQvcnRmJykgLy8g6I635Y+WIHJ0ZiDmlbDmja7vvIjlpoLku44gd29yZCB3c3Ag5aSN5Yi257KY6LS077yJXHJcblxyXG4gICAgICAvLyDoh6rlrprkuYnmj5LlhaXlhoXlrrlcclxuICAgICAgZWRpdG9yLmluc2VydFRleHQoJ3h4eCcpXHJcblxyXG4gICAgICAvLyDov5Tlm54gZmFsc2Ug77yM6Zi75q2i6buY6K6k57KY6LS06KGM5Li6XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuICAgICAgY2FsbGJhY2soZmFsc2UpIC8vIOi/lOWbnuWAvO+8iOazqOaEj++8jHZ1ZSDkuovku7bnmoTov5Tlm57lgLzvvIzkuI3og73nlKggcmV0dXJu77yJXHJcblxyXG4gICAgICAvLyDov5Tlm54gdHJ1ZSDvvIznu6fnu63pu5jorqTnmoTnspjotLTooYzkuLpcclxuICAgICAgLy8gY2FsbGJhY2sodHJ1ZSlcclxuICAgIH1cclxuICBcclxuPC9zY3JpcHQ+IiwiaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSBcIi4vaW5kZXgudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTNlNDQyYjBlXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vaW5kZXgudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZzZXR1cD10cnVlJmxhbmc9anNcIlxuZXhwb3J0ICogZnJvbSBcIi4vaW5kZXgudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZzZXR1cD10cnVlJmxhbmc9anNcIlxuXG5pbXBvcnQgZXhwb3J0Q29tcG9uZW50IGZyb20gXCJFOlxcXFxteVByb2plY3RzXFxcXHdlYnBhY2stLS0tdnVlXFxcXG5vZGVfbW9kdWxlc1xcXFx2dWUtbG9hZGVyXFxcXGRpc3RcXFxcZXhwb3J0SGVscGVyLmpzXCJcbmNvbnN0IF9fZXhwb3J0c19fID0gLyojX19QVVJFX18qL2V4cG9ydENvbXBvbmVudChzY3JpcHQsIFtbJ3JlbmRlcicscmVuZGVyXSxbJ19fZmlsZScsXCJzcmMvcGFnZXMvdmFsdWVmbG93L2luZGV4LnZ1ZVwiXV0pXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICBfX2V4cG9ydHNfXy5fX2htcklkID0gXCIzZTQ0MmIwZVwiXG4gIGNvbnN0IGFwaSA9IF9fVlVFX0hNUl9SVU5USU1FX19cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIWFwaS5jcmVhdGVSZWNvcmQoJzNlNDQyYjBlJywgX19leHBvcnRzX18pKSB7XG4gICAgYXBpLnJlbG9hZCgnM2U0NDJiMGUnLCBfX2V4cG9ydHNfXylcbiAgfVxuICBcbiAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL2luZGV4LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0zZTQ0MmIwZVwiLCAoKSA9PiB7XG4gICAgYXBpLnJlcmVuZGVyKCczZTQ0MmIwZScsIHJlbmRlcilcbiAgfSlcblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IF9fZXhwb3J0c19fIiwiZXhwb3J0IHsgZGVmYXVsdCB9IGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy91bnBsdWdpbi9kaXN0L3dlYnBhY2svbG9hZGVycy90cmFuc2Zvcm0uanM/dW5wbHVnaW5OYW1lPXVucGx1Z2luLWF1dG8taW1wb3J0IS4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9jbG9uZWRSdWxlU2V0LTEwLnVzZSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9kaXN0L2luZGV4LmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzE3XS51c2VbMF0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NvdXJjZS1tYXAtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaW5kZXgudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZzZXR1cD10cnVlJmxhbmc9anNcIjsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3VucGx1Z2luL2Rpc3Qvd2VicGFjay9sb2FkZXJzL3RyYW5zZm9ybS5qcz91bnBsdWdpbk5hbWU9dW5wbHVnaW4tYXV0by1pbXBvcnQhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P2Nsb25lZFJ1bGVTZXQtMTAudXNlIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2Rpc3QvaW5kZXguanM/P3J1bGVTZXRbMV0ucnVsZXNbMTddLnVzZVswXSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc291cmNlLW1hcC1sb2FkZXIvZGlzdC9janMuanMhLi9pbmRleC52dWU/dnVlJnR5cGU9c2NyaXB0JnNldHVwPXRydWUmbGFuZz1qc1wiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3VucGx1Z2luL2Rpc3Qvd2VicGFjay9sb2FkZXJzL3RyYW5zZm9ybS5qcz91bnBsdWdpbk5hbWU9dW5wbHVnaW4tYXV0by1pbXBvcnQhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P2Nsb25lZFJ1bGVTZXQtMTAudXNlIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2Rpc3QvdGVtcGxhdGVMb2FkZXIuanM/P3J1bGVTZXRbMV0ucnVsZXNbNF0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvZGlzdC9pbmRleC5qcz8/cnVsZVNldFsxXS5ydWxlc1sxN10udXNlWzBdIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zb3VyY2UtbWFwLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZGV4LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0zZTQ0MmIwZVwiIl0sIm5hbWVzIjpbInN0eWxlIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9ob2lzdGVkXzEiLCJfY3JlYXRlVk5vZGUiLCIkc2V0dXAiLCJlZGl0b3IiLCJlZGl0b3JSZWYiLCJkZWZhdWx0Q29uZmlnIiwidG9vbGJhckNvbmZpZyIsIm1vZGUiLCJ2YWx1ZUh0bWwiLCIkZXZlbnQiLCJlZGl0b3JDb25maWciLCJvbk9uQ3JlYXRlZCIsImhhbmRsZUNyZWF0ZWQiLCJvbk9uQ2hhbmdlIiwiaGFuZGxlQ2hhbmdlIiwib25PbkRlc3Ryb3llZCIsImhhbmRsZURlc3Ryb3llZCIsIm9uT25Gb2N1cyIsImhhbmRsZUZvY3VzIiwib25PbkJsdXIiLCJoYW5kbGVCbHVyIiwib25DdXN0b21BbGVydCIsImN1c3RvbUFsZXJ0Iiwib25DdXN0b21QYXN0ZSIsImN1c3RvbVBhc3RlIl0sInNvdXJjZVJvb3QiOiIifQ==