(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "../pkg/hiom_sim.js":
/*!**************************!*\
  !*** ../pkg/hiom_sim.js ***!
  \**************************/
/*! exports provided: init, Agent, BlockNetwork, Model, __wbg_new_59cb74e423758ede, __wbg_stack_558ba5917b466edd, __wbg_error_4bb6c2a97407129a, __wbindgen_object_drop_ref, __wbg_random_39c02e3d0f8a020f, __wbindgen_throw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _hiom_sim_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hiom_sim_bg.wasm */ \"../pkg/hiom_sim_bg.wasm\");\n/* harmony import */ var _hiom_sim_bg_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hiom_sim_bg.js */ \"../pkg/hiom_sim_bg.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"init\", function() { return _hiom_sim_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"init\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Agent\", function() { return _hiom_sim_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"Agent\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"BlockNetwork\", function() { return _hiom_sim_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"BlockNetwork\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Model\", function() { return _hiom_sim_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"Model\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_new_59cb74e423758ede\", function() { return _hiom_sim_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_new_59cb74e423758ede\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_stack_558ba5917b466edd\", function() { return _hiom_sim_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_stack_558ba5917b466edd\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_error_4bb6c2a97407129a\", function() { return _hiom_sim_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_error_4bb6c2a97407129a\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_object_drop_ref\", function() { return _hiom_sim_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbindgen_object_drop_ref\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_random_39c02e3d0f8a020f\", function() { return _hiom_sim_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_random_39c02e3d0f8a020f\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return _hiom_sim_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbindgen_throw\"]; });\n\n\n\n\n//# sourceURL=webpack:///../pkg/hiom_sim.js?");

/***/ }),

/***/ "../pkg/hiom_sim_bg.js":
/*!*****************************!*\
  !*** ../pkg/hiom_sim_bg.js ***!
  \*****************************/
/*! exports provided: init, Agent, BlockNetwork, Model, __wbg_new_59cb74e423758ede, __wbg_stack_558ba5917b466edd, __wbg_error_4bb6c2a97407129a, __wbindgen_object_drop_ref, __wbg_random_39c02e3d0f8a020f, __wbindgen_throw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"init\", function() { return init; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Agent\", function() { return Agent; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BlockNetwork\", function() { return BlockNetwork; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Model\", function() { return Model; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_new_59cb74e423758ede\", function() { return __wbg_new_59cb74e423758ede; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_stack_558ba5917b466edd\", function() { return __wbg_stack_558ba5917b466edd; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_error_4bb6c2a97407129a\", function() { return __wbg_error_4bb6c2a97407129a; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_object_drop_ref\", function() { return __wbindgen_object_drop_ref; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_random_39c02e3d0f8a020f\", function() { return __wbg_random_39c02e3d0f8a020f; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return __wbindgen_throw; });\n/* harmony import */ var _hiom_sim_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hiom_sim_bg.wasm */ \"../pkg/hiom_sim_bg.wasm\");\n\n\nconst heap = new Array(32).fill(undefined);\n\nheap.push(undefined, null, true, false);\n\nfunction getObject(idx) { return heap[idx]; }\n\nlet heap_next = heap.length;\n\nfunction dropObject(idx) {\n    if (idx < 36) return;\n    heap[idx] = heap_next;\n    heap_next = idx;\n}\n\nfunction takeObject(idx) {\n    const ret = getObject(idx);\n    dropObject(idx);\n    return ret;\n}\n\nconst lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;\n\nlet cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });\n\ncachedTextDecoder.decode();\n\nlet cachegetUint8Memory0 = null;\nfunction getUint8Memory0() {\n    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== _hiom_sim_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetUint8Memory0 = new Uint8Array(_hiom_sim_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetUint8Memory0;\n}\n\nfunction getStringFromWasm0(ptr, len) {\n    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));\n}\n/**\n*/\nfunction init() {\n    _hiom_sim_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"init\"]();\n}\n\nlet cachegetInt32Memory0 = null;\nfunction getInt32Memory0() {\n    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== _hiom_sim_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetInt32Memory0 = new Int32Array(_hiom_sim_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetInt32Memory0;\n}\n\nfunction addHeapObject(obj) {\n    if (heap_next === heap.length) heap.push(heap.length + 1);\n    const idx = heap_next;\n    heap_next = heap[idx];\n\n    heap[idx] = obj;\n    return idx;\n}\n\nlet WASM_VECTOR_LEN = 0;\n\nconst lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;\n\nlet cachedTextEncoder = new lTextEncoder('utf-8');\n\nconst encodeString = (typeof cachedTextEncoder.encodeInto === 'function'\n    ? function (arg, view) {\n    return cachedTextEncoder.encodeInto(arg, view);\n}\n    : function (arg, view) {\n    const buf = cachedTextEncoder.encode(arg);\n    view.set(buf);\n    return {\n        read: arg.length,\n        written: buf.length\n    };\n});\n\nfunction passStringToWasm0(arg, malloc, realloc) {\n\n    if (realloc === undefined) {\n        const buf = cachedTextEncoder.encode(arg);\n        const ptr = malloc(buf.length);\n        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);\n        WASM_VECTOR_LEN = buf.length;\n        return ptr;\n    }\n\n    let len = arg.length;\n    let ptr = malloc(len);\n\n    const mem = getUint8Memory0();\n\n    let offset = 0;\n\n    for (; offset < len; offset++) {\n        const code = arg.charCodeAt(offset);\n        if (code > 0x7F) break;\n        mem[ptr + offset] = code;\n    }\n\n    if (offset !== len) {\n        if (offset !== 0) {\n            arg = arg.slice(offset);\n        }\n        ptr = realloc(ptr, len, len = offset + arg.length * 3);\n        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);\n        const ret = encodeString(arg, view);\n\n        offset += ret.written;\n    }\n\n    WASM_VECTOR_LEN = offset;\n    return ptr;\n}\n\nfunction notDefined(what) { return () => { throw new Error(`${what} is not defined`); }; }\n/**\n*/\nclass Agent {\n\n    free() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n\n        _hiom_sim_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_agent_free\"](ptr);\n    }\n}\n/**\n*/\nclass BlockNetwork {\n\n    static __wrap(ptr) {\n        const obj = Object.create(BlockNetwork.prototype);\n        obj.ptr = ptr;\n\n        return obj;\n    }\n\n    free() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n\n        _hiom_sim_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_blocknetwork_free\"](ptr);\n    }\n    /**\n    * @param {number} width\n    * @param {number} height\n    * @returns {BlockNetwork}\n    */\n    static new(width, height) {\n        var ret = _hiom_sim_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"blocknetwork_new\"](width, height);\n        return BlockNetwork.__wrap(ret);\n    }\n    /**\n    * @returns {string}\n    */\n    render() {\n        try {\n            _hiom_sim_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"blocknetwork_render\"](8, this.ptr);\n            var r0 = getInt32Memory0()[8 / 4 + 0];\n            var r1 = getInt32Memory0()[8 / 4 + 1];\n            return getStringFromWasm0(r0, r1);\n        } finally {\n            _hiom_sim_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_free\"](r0, r1);\n        }\n    }\n}\n/**\n*/\nclass Model {\n\n    static __wrap(ptr) {\n        const obj = Object.create(Model.prototype);\n        obj.ptr = ptr;\n\n        return obj;\n    }\n\n    free() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n\n        _hiom_sim_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_model_free\"](ptr);\n    }\n    /**\n    * @param {number} l\n    * @param {number} a_star\n    * @param {number} s_i\n    * @param {number} d_a\n    * @param {number} persuasion\n    * @param {number} r_min\n    * @param {number} t_o\n    * @returns {Model}\n    */\n    static new(l, a_star, s_i, d_a, persuasion, r_min, t_o) {\n        var ret = _hiom_sim_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"model_new\"](l, a_star, s_i, d_a, persuasion, r_min, t_o);\n        return Model.__wrap(ret);\n    }\n    /**\n    * @param {number} row\n    * @param {number} col\n    */\n    add_activist(row, col) {\n        _hiom_sim_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"model_add_activist\"](this.ptr, row, col);\n    }\n    /**\n    */\n    tick() {\n        _hiom_sim_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"model_tick\"](this.ptr);\n    }\n    /**\n    * @returns {number}\n    */\n    cell_ptr() {\n        var ret = _hiom_sim_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"model_cell_ptr\"](this.ptr);\n        return ret;\n    }\n    /**\n    * @returns {string}\n    */\n    render() {\n        try {\n            _hiom_sim_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"model_render\"](8, this.ptr);\n            var r0 = getInt32Memory0()[8 / 4 + 0];\n            var r1 = getInt32Memory0()[8 / 4 + 1];\n            return getStringFromWasm0(r0, r1);\n        } finally {\n            _hiom_sim_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_free\"](r0, r1);\n        }\n    }\n    /**\n    * @returns {number}\n    */\n    count() {\n        var ret = _hiom_sim_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"model_count\"](this.ptr);\n        return ret >>> 0;\n    }\n    /**\n    * @param {number} d_a\n    */\n    set_d_a(d_a) {\n        _hiom_sim_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"model_set_d_a\"](this.ptr, d_a);\n    }\n    /**\n    * @param {number} r_min\n    */\n    set_r_min(r_min) {\n        _hiom_sim_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"model_set_r_min\"](this.ptr, r_min);\n    }\n    /**\n    * @param {number} a_star\n    */\n    set_a_star(a_star) {\n        _hiom_sim_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"model_set_a_star\"](this.ptr, a_star);\n    }\n    /**\n    * @param {number} persuasion\n    */\n    set_persuasion(persuasion) {\n        _hiom_sim_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"model_set_persuasion\"](this.ptr, persuasion);\n    }\n    /**\n    * @param {number} row\n    * @param {number} col\n    * @returns {string}\n    */\n    inspect_agent(row, col) {\n        try {\n            _hiom_sim_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"model_inspect_agent\"](8, this.ptr, row, col);\n            var r0 = getInt32Memory0()[8 / 4 + 0];\n            var r1 = getInt32Memory0()[8 / 4 + 1];\n            return getStringFromWasm0(r0, r1);\n        } finally {\n            _hiom_sim_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_free\"](r0, r1);\n        }\n    }\n}\n\nconst __wbg_new_59cb74e423758ede = function() {\n    var ret = new Error();\n    return addHeapObject(ret);\n};\n\nconst __wbg_stack_558ba5917b466edd = function(arg0, arg1) {\n    var ret = getObject(arg1).stack;\n    var ptr0 = passStringToWasm0(ret, _hiom_sim_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_malloc\"], _hiom_sim_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_realloc\"]);\n    var len0 = WASM_VECTOR_LEN;\n    getInt32Memory0()[arg0 / 4 + 1] = len0;\n    getInt32Memory0()[arg0 / 4 + 0] = ptr0;\n};\n\nconst __wbg_error_4bb6c2a97407129a = function(arg0, arg1) {\n    try {\n        console.error(getStringFromWasm0(arg0, arg1));\n    } finally {\n        _hiom_sim_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_free\"](arg0, arg1);\n    }\n};\n\nconst __wbindgen_object_drop_ref = function(arg0) {\n    takeObject(arg0);\n};\n\nconst __wbg_random_39c02e3d0f8a020f = typeof Math.random == 'function' ? Math.random : notDefined('Math.random');\n\nconst __wbindgen_throw = function(arg0, arg1) {\n    throw new Error(getStringFromWasm0(arg0, arg1));\n};\n\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../www/node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///../pkg/hiom_sim_bg.js?");

/***/ }),

/***/ "../pkg/hiom_sim_bg.wasm":
/*!*******************************!*\
  !*** ../pkg/hiom_sim_bg.wasm ***!
  \*******************************/
/*! exports provided: memory, init, __wbg_agent_free, __wbg_blocknetwork_free, blocknetwork_new, blocknetwork_render, __wbg_model_free, model_new, model_add_activist, model_tick, model_cell_ptr, model_render, model_count, model_set_d_a, model_set_r_min, model_set_a_star, model_set_persuasion, model_inspect_agent, __wbindgen_free, __wbindgen_malloc, __wbindgen_realloc */
/***/ (function(module, exports, __webpack_require__) {

eval("\"use strict\";\n// Instantiate WebAssembly module\nvar wasmExports = __webpack_require__.w[module.i];\n__webpack_require__.r(exports);\n// export exports from WebAssembly module\nfor(var name in wasmExports) if(name != \"__webpack_init__\") exports[name] = wasmExports[name];\n// exec imports from WebAssembly module (for esm order)\n/* harmony import */ var m0 = __webpack_require__(/*! ./hiom_sim_bg.js */ \"../pkg/hiom_sim_bg.js\");\n\n\n// exec wasm module\nwasmExports[\"__webpack_init__\"]()\n\n//# sourceURL=webpack:///../pkg/hiom_sim_bg.wasm?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var hiom_sim__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hiom-sim */ \"../pkg/hiom_sim.js\");\n/* harmony import */ var hiom_sim_hiom_sim_bg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! hiom-sim/hiom_sim_bg */ \"../pkg/hiom_sim_bg.wasm\");\n\n\n\nvar colormap = __webpack_require__(/*! colormap */ \"./node_modules/colormap/index.js\");\n\nObject(hiom_sim__WEBPACK_IMPORTED_MODULE_0__[\"init\"])();\n\nconst SIZE = 200;\nconst MIN_O = -1.5;\nconst MAX_O = 1.5;\nconst NSHADES = 100;\nconst S_I = 0;\nconst T_O = 0;\n\nconst CELL_SIZE = 5; // px\nconst GRID_COLOR = \"#CCCCCC\";\nlet colors = colormap({\n    colormap: 'picnic',\n    nshades: NSHADES,\n    format: 'hex',\n    alpha: 1\n})\n\nconst tick_but = document.getElementById(\"tick-but\");\nconst pp_but = document.getElementById(\"pp-but\");\nconst reset_but = document.getElementById(\"reset-but\");\nconst agent_info_pre = document.getElementById(\"agent-info\");\nconst update_info_pre = document.getElementById(\"update-info\");\nconst d_a_slider = document.getElementById(\"d_a\");\nconst a_star_slider = document.getElementById(\"a_star\");\nconst r_min_slider = document.getElementById(\"r_min\");\nconst persuasion_slider = document.getElementById(\"persuasion\");\n\nlet model = hiom_sim__WEBPACK_IMPORTED_MODULE_0__[\"Model\"].new(SIZE, a_star_slider.value, S_I, d_a_slider.value, persuasion_slider.value, r_min_slider.value, T_O);\nconst width = SIZE;\nconst height = SIZE;\n\nlet pause = true;\nlet mouse_x = null;\nlet mouse_y = null;\n\nconst canvas = document.getElementById(\"canvas\");\ncanvas.height = (CELL_SIZE + 1) * height + 1;\ncanvas.width = (CELL_SIZE + 1) * width + 1;\n\nconst ctx = canvas.getContext('2d');\n\ncanvas.addEventListener(\"click\", event => {\n    const boundingRect = canvas.getBoundingClientRect();\n\n    const scaleX = canvas.width / boundingRect.width;\n    const scaleY = canvas.height / boundingRect.height;\n\n    const canvasLeft = (event.clientX - boundingRect.left) * scaleX;\n    const canvasTop = (event.clientY - boundingRect.top) * scaleY;\n\n    const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);\n    const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);\n\n    model.add_activist(row, col);\n\n    draw();\n});\n\ncanvas.addEventListener(\"mousemove\", event => {\n    mouse_x = event.clientX;\n    mouse_y = event.clientY;\n\n    update_info();\n});\n\ntick_but.onclick = () => {\n    frame();\n}\n\npp_but.onclick = () => {\n    pause = !pause;\n    if (!pause) {\n        requestAnimationFrame(play);\n        pp_but.innerText = \"pause\";\n    } else {\n        pp_but.innerText = \"play\";\n    }\n}\n\nreset_but.onclick = () => {\n    model = hiom_sim__WEBPACK_IMPORTED_MODULE_0__[\"Model\"].new(SIZE, a_star_slider.value, S_I, d_a_slider.value, persuasion_slider.value, r_min_slider.value, T_O);\n    draw();\n}\n\nr_min_slider.oninput = () => {\n    model.set_r_min(r_min_slider.value);\n    document.getElementById(\"r_min_label\").textContent = \"r_min: \" + r_min_slider.value;\n}\n\nd_a_slider.oninput = () => {\n    model.set_d_a(d_a_slider.value);\n    document.getElementById(\"d_a_label\").textContent = \"d_a: \" + d_a_slider.value;\n}\n\na_star_slider.oninput = () => {\n    model.set_a_star(a_star_slider.value);\n    document.getElementById(\"a_star_label\").textContent = \"a_star: \" + a_star_slider.value;\n}\n\npersuasion_slider.oninput = () => {\n    model.set_persuasion(persuasion_slider.value);\n    document.getElementById(\"persuasion_label\").textContent = \"persuasion: \" + persuasion_slider.value;\n}\n\nconst getIndex = (row, column) => {\n    return (row * width + column) * 3;\n};\n\nconst drawCells = () => {\n    const networkPtr = model.cell_ptr();\n    const agents = new Float32Array(hiom_sim_hiom_sim_bg__WEBPACK_IMPORTED_MODULE_1__[\"memory\"].buffer, networkPtr, width * height * 3);\n\n    ctx.beginPath();\n\n    for (let row = 0; row < height; row++) {\n        for (let col = 0; col < width; col++) {\n            const idx = getIndex(row, col);\n\n            let op = (Math.min(Math.max(agents[idx], MIN_O), MAX_O) + 1.5) / 3;\n\n            ctx.fillStyle = colors[NSHADES - 1 - Math.floor(op * NSHADES)];\n\n            ctx.fillRect(\n                col * (CELL_SIZE + 1) + 1,\n                row * (CELL_SIZE + 1) + 1,\n                CELL_SIZE,\n                CELL_SIZE\n            );\n        }\n    }\n\n    ctx.stroke();\n};\n\nconst draw = () => {\n    // drawGrid();\n    drawCells();\n    update_info();\n}\n\nconst update_info = () => {\n    update_info_pre.textContent = \"agents updated: \" + model.count();\n\n    if (mouse_x === null || mouse_y === null) {\n        return\n    }\n\n    const boundingRect = canvas.getBoundingClientRect();\n\n    const scaleX = canvas.width / boundingRect.width;\n    const scaleY = canvas.height / boundingRect.height;\n\n    const canvasLeft = (mouse_x - boundingRect.left) * scaleX;\n    const canvasTop = (mouse_y - boundingRect.top) * scaleY;\n\n    const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);\n    const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);\n\n    agent_info_pre.textContent = model.inspect_agent(row, col);\n}\n\nconst frame = () => {\n    model.tick();\n\n    draw();\n}\n\nconst play = () => {\n    if (!pause) {\n        frame();\n        requestAnimationFrame(play);\n    }\n}\n\ndraw();\nrequestAnimationFrame(play);\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

}]);