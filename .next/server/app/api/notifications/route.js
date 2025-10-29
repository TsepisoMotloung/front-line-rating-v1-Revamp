"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/notifications/route";
exports.ids = ["app/api/notifications/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fnotifications%2Froute&page=%2Fapi%2Fnotifications%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fnotifications%2Froute.ts&appDir=%2Fworkspaces%2Ffront-line-rating-v1-Revamp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fworkspaces%2Ffront-line-rating-v1-Revamp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fnotifications%2Froute&page=%2Fapi%2Fnotifications%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fnotifications%2Froute.ts&appDir=%2Fworkspaces%2Ffront-line-rating-v1-Revamp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fworkspaces%2Ffront-line-rating-v1-Revamp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _workspaces_front_line_rating_v1_Revamp_app_api_notifications_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/notifications/route.ts */ \"(rsc)/./app/api/notifications/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/notifications/route\",\n        pathname: \"/api/notifications\",\n        filename: \"route\",\n        bundlePath: \"app/api/notifications/route\"\n    },\n    resolvedPagePath: \"/workspaces/front-line-rating-v1-Revamp/app/api/notifications/route.ts\",\n    nextConfigOutput,\n    userland: _workspaces_front_line_rating_v1_Revamp_app_api_notifications_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/notifications/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZub3RpZmljYXRpb25zJTJGcm91dGUmcGFnZT0lMkZhcGklMkZub3RpZmljYXRpb25zJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGbm90aWZpY2F0aW9ucyUyRnJvdXRlLnRzJmFwcERpcj0lMkZ3b3Jrc3BhY2VzJTJGZnJvbnQtbGluZS1yYXRpbmctdjEtUmV2YW1wJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZ3b3Jrc3BhY2VzJTJGZnJvbnQtbGluZS1yYXRpbmctdjEtUmV2YW1wJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUNzQjtBQUNuRztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb250LWxpbmUtcmF0aW5nLXYxLXJldmFtcC8/NmVmNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvd29ya3NwYWNlcy9mcm9udC1saW5lLXJhdGluZy12MS1SZXZhbXAvYXBwL2FwaS9ub3RpZmljYXRpb25zL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9ub3RpZmljYXRpb25zL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvbm90aWZpY2F0aW9uc1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvbm90aWZpY2F0aW9ucy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi93b3Jrc3BhY2VzL2Zyb250LWxpbmUtcmF0aW5nLXYxLVJldmFtcC9hcHAvYXBpL25vdGlmaWNhdGlvbnMvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL25vdGlmaWNhdGlvbnMvcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fnotifications%2Froute&page=%2Fapi%2Fnotifications%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fnotifications%2Froute.ts&appDir=%2Fworkspaces%2Ffront-line-rating-v1-Revamp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fworkspaces%2Ffront-line-rating-v1-Revamp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/notifications/route.ts":
/*!****************************************!*\
  !*** ./app/api/notifications/route.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   PUT: () => (/* binding */ PUT)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n\n\n\n\nasync function GET(request) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        const notifications = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__[\"default\"].notification.findMany({\n            where: {\n                userId: session.user.id\n            },\n            orderBy: {\n                createdAt: \"desc\"\n            },\n            take: 50,\n            include: {\n                user: {\n                    select: {\n                        name: true,\n                        role: true\n                    }\n                }\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(notifications);\n    } catch (error) {\n        console.error(\"Error fetching notifications:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to fetch notifications\"\n        }, {\n            status: 500\n        });\n    }\n}\n// Mark notifications as read\nasync function PUT(request) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__[\"default\"].notification.updateMany({\n            where: {\n                userId: session.user.id,\n                isRead: false\n            },\n            data: {\n                isRead: true\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Notifications marked as read\"\n        });\n    } catch (error) {\n        console.error(\"Error updating notifications:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to update notifications\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL25vdGlmaWNhdGlvbnMvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUF3RDtBQUNYO0FBQ0o7QUFDUDtBQUUzQixlQUFlSSxJQUFJQyxPQUFvQjtJQUM1QyxJQUFJO1FBQ0YsTUFBTUMsVUFBVSxNQUFNTCwyREFBZ0JBLENBQUNDLGtEQUFXQTtRQUNsRCxJQUFJLENBQUNJLFNBQVM7WUFDWixPQUFPTixxREFBWUEsQ0FBQ08sSUFBSSxDQUFDO2dCQUFFQyxPQUFPO1lBQWUsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ3BFO1FBRUEsTUFBTUMsZ0JBQWdCLE1BQU1QLG1EQUFNQSxDQUFDUSxZQUFZLENBQUNDLFFBQVEsQ0FBQztZQUN2REMsT0FBTztnQkFBRUMsUUFBUVIsUUFBUVMsSUFBSSxDQUFDQyxFQUFFO1lBQUM7WUFDakNDLFNBQVM7Z0JBQUVDLFdBQVc7WUFBTztZQUM3QkMsTUFBTTtZQUNOQyxTQUFTO2dCQUNQTCxNQUFNO29CQUNKTSxRQUFRO3dCQUNOQyxNQUFNO3dCQUNOQyxNQUFNO29CQUNSO2dCQUNGO1lBQ0Y7UUFDRjtRQUVBLE9BQU92QixxREFBWUEsQ0FBQ08sSUFBSSxDQUFDRztJQUMzQixFQUFFLE9BQU9GLE9BQU87UUFDZGdCLFFBQVFoQixLQUFLLENBQUMsaUNBQWlDQTtRQUMvQyxPQUFPUixxREFBWUEsQ0FBQ08sSUFBSSxDQUN0QjtZQUFFQyxPQUFPO1FBQWdDLEdBQ3pDO1lBQUVDLFFBQVE7UUFBSTtJQUVsQjtBQUNGO0FBRUEsNkJBQTZCO0FBQ3RCLGVBQWVnQixJQUFJcEIsT0FBb0I7SUFDNUMsSUFBSTtRQUNGLE1BQU1DLFVBQVUsTUFBTUwsMkRBQWdCQSxDQUFDQyxrREFBV0E7UUFFbEQsSUFBSSxDQUFDSSxTQUFTO1lBQ1osT0FBT04scURBQVlBLENBQUNPLElBQUksQ0FBQztnQkFBRUMsT0FBTztZQUFlLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUNwRTtRQUVBLE1BQU1OLG1EQUFNQSxDQUFDUSxZQUFZLENBQUNlLFVBQVUsQ0FBQztZQUNuQ2IsT0FBTztnQkFDTEMsUUFBUVIsUUFBUVMsSUFBSSxDQUFDQyxFQUFFO2dCQUN2QlcsUUFBUTtZQUNWO1lBQ0FDLE1BQU07Z0JBQ0pELFFBQVE7WUFDVjtRQUNGO1FBRUEsT0FBTzNCLHFEQUFZQSxDQUFDTyxJQUFJLENBQUM7WUFBRXNCLFNBQVM7UUFBK0I7SUFDckUsRUFBRSxPQUFPckIsT0FBTztRQUNkZ0IsUUFBUWhCLEtBQUssQ0FBQyxpQ0FBaUNBO1FBQy9DLE9BQU9SLHFEQUFZQSxDQUFDTyxJQUFJLENBQ3RCO1lBQUVDLE9BQU87UUFBaUMsR0FDMUM7WUFBRUMsUUFBUTtRQUFJO0lBRWxCO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mcm9udC1saW5lLXJhdGluZy12MS1yZXZhbXAvLi9hcHAvYXBpL25vdGlmaWNhdGlvbnMvcm91dGUudHM/OGUwYyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xuaW1wb3J0IHsgZ2V0U2VydmVyU2Vzc2lvbiB9IGZyb20gJ25leHQtYXV0aCc7XG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gJ0AvbGliL2F1dGgnO1xuaW1wb3J0IHByaXNtYSBmcm9tICdAL2xpYi9wcmlzbWEnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcXVlc3Q6IE5leHRSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpO1xuICAgIGlmICghc2Vzc2lvbikge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdVbmF1dGhvcml6ZWQnIH0sIHsgc3RhdHVzOiA0MDEgfSk7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IG5vdGlmaWNhdGlvbnMgPSBhd2FpdCBwcmlzbWEubm90aWZpY2F0aW9uLmZpbmRNYW55KHtcbiAgICAgIHdoZXJlOiB7IHVzZXJJZDogc2Vzc2lvbi51c2VyLmlkIH0sXG4gICAgICBvcmRlckJ5OiB7IGNyZWF0ZWRBdDogJ2Rlc2MnIH0sXG4gICAgICB0YWtlOiA1MCxcbiAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgdXNlcjoge1xuICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgICAgICAgIHJvbGU6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24obm90aWZpY2F0aW9ucyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgbm90aWZpY2F0aW9uczonLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBlcnJvcjogJ0ZhaWxlZCB0byBmZXRjaCBub3RpZmljYXRpb25zJyB9LFxuICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgKTtcbiAgfVxufVxuXG4vLyBNYXJrIG5vdGlmaWNhdGlvbnMgYXMgcmVhZFxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBVVChyZXF1ZXN0OiBOZXh0UmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKTtcblxuICAgIGlmICghc2Vzc2lvbikge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdVbmF1dGhvcml6ZWQnIH0sIHsgc3RhdHVzOiA0MDEgfSk7XG4gICAgfVxuXG4gICAgYXdhaXQgcHJpc21hLm5vdGlmaWNhdGlvbi51cGRhdGVNYW55KHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIHVzZXJJZDogc2Vzc2lvbi51c2VyLmlkLFxuICAgICAgICBpc1JlYWQ6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgaXNSZWFkOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IG1lc3NhZ2U6ICdOb3RpZmljYXRpb25zIG1hcmtlZCBhcyByZWFkJyB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciB1cGRhdGluZyBub3RpZmljYXRpb25zOicsIGVycm9yKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICB7IGVycm9yOiAnRmFpbGVkIHRvIHVwZGF0ZSBub3RpZmljYXRpb25zJyB9LFxuICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImdldFNlcnZlclNlc3Npb24iLCJhdXRoT3B0aW9ucyIsInByaXNtYSIsIkdFVCIsInJlcXVlc3QiLCJzZXNzaW9uIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwibm90aWZpY2F0aW9ucyIsIm5vdGlmaWNhdGlvbiIsImZpbmRNYW55Iiwid2hlcmUiLCJ1c2VySWQiLCJ1c2VyIiwiaWQiLCJvcmRlckJ5IiwiY3JlYXRlZEF0IiwidGFrZSIsImluY2x1ZGUiLCJzZWxlY3QiLCJuYW1lIiwicm9sZSIsImNvbnNvbGUiLCJQVVQiLCJ1cGRhdGVNYW55IiwiaXNSZWFkIiwiZGF0YSIsIm1lc3NhZ2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/notifications/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _prisma__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./prisma */ \"(rsc)/./lib/prisma.ts\");\n\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials, req) {\n                if (!credentials?.email || !credentials?.password) {\n                    throw new Error(\"Please enter your email and password\");\n                }\n                const user = await _prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].user.findUnique({\n                    where: {\n                        email: credentials.email\n                    },\n                    include: {\n                        department: true\n                    }\n                });\n                if (!user) {\n                    throw new Error(\"No user found with this email\");\n                }\n                if (user.status === \"PENDING\") {\n                    throw new Error(\"Your account is pending approval\");\n                }\n                if (user.status === \"REJECTED\") {\n                    throw new Error(\"Your account has been rejected\");\n                }\n                const isPasswordValid = await bcrypt__WEBPACK_IMPORTED_MODULE_1___default().compare(credentials.password, user.password);\n                if (!isPasswordValid) {\n                    throw new Error(\"Invalid password\");\n                }\n                return {\n                    id: user.id,\n                    email: user.email,\n                    name: user.name,\n                    role: user.role,\n                    departmentId: user.departmentId ?? undefined,\n                    departmentName: user.department?.name,\n                    status: user.status\n                };\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.role = user.role;\n                token.departmentId = user.departmentId;\n                token.departmentName = user.departmentName;\n                token.status = user.status;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.id = token.id;\n                session.user.role = token.role;\n                session.user.departmentId = token.departmentId;\n                session.user.departmentName = token.departmentName;\n                session.user.status = token.status;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/auth/login\",\n        error: \"/auth/login\"\n    },\n    session: {\n        strategy: \"jwt\",\n        maxAge: 30 * 24 * 60 * 60\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cmV2YW1wLy4vbGliL2F1dGgudHM/YmY3ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0QXV0aE9wdGlvbnMgfSBmcm9tICduZXh0LWF1dGgnO1xuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSAnbmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFscyc7XG5pbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdCc7XG5pbXBvcnQgcHJpc21hIGZyb20gJy4vcHJpc21hJztcblxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zOiBOZXh0QXV0aE9wdGlvbnMgPSB7XG4gIHByb3ZpZGVyczogW1xuICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xuICAgICAgbmFtZTogJ0NyZWRlbnRpYWxzJyxcbiAgICAgIGNyZWRlbnRpYWxzOiB7XG4gICAgICAgIGVtYWlsOiB7IGxhYmVsOiAnRW1haWwnLCB0eXBlOiAnZW1haWwnIH0sXG4gICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiAnUGFzc3dvcmQnLCB0eXBlOiAncGFzc3dvcmQnIH0sXG4gICAgICB9LFxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzLCByZXEpIHtcbiAgICAgICAgaWYgKCFjcmVkZW50aWFscz8uZW1haWwgfHwgIWNyZWRlbnRpYWxzPy5wYXNzd29yZCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIGVudGVyIHlvdXIgZW1haWwgYW5kIHBhc3N3b3JkJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XG4gICAgICAgICAgd2hlcmU6IHsgZW1haWw6IGNyZWRlbnRpYWxzLmVtYWlsIH0sXG4gICAgICAgICAgaW5jbHVkZTogeyBkZXBhcnRtZW50OiB0cnVlIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gdXNlciBmb3VuZCB3aXRoIHRoaXMgZW1haWwnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1c2VyLnN0YXR1cyA9PT0gJ1BFTkRJTkcnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3VyIGFjY291bnQgaXMgcGVuZGluZyBhcHByb3ZhbCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHVzZXIuc3RhdHVzID09PSAnUkVKRUNURUQnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3VyIGFjY291bnQgaGFzIGJlZW4gcmVqZWN0ZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGlzUGFzc3dvcmRWYWxpZCA9IGF3YWl0IGJjcnlwdC5jb21wYXJlKFxuICAgICAgICAgIGNyZWRlbnRpYWxzLnBhc3N3b3JkLFxuICAgICAgICAgIHVzZXIucGFzc3dvcmRcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoIWlzUGFzc3dvcmRWYWxpZCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBwYXNzd29yZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBpZDogdXNlci5pZCxcbiAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXG4gICAgICAgICAgcm9sZTogdXNlci5yb2xlLFxuICAgICAgICAgIGRlcGFydG1lbnRJZDogdXNlci5kZXBhcnRtZW50SWQgPz8gdW5kZWZpbmVkLFxuICAgICAgICAgIGRlcGFydG1lbnROYW1lOiB1c2VyLmRlcGFydG1lbnQ/Lm5hbWUsXG4gICAgICAgICAgc3RhdHVzOiB1c2VyLnN0YXR1cyxcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGNhbGxiYWNrczoge1xuICAgIGFzeW5jIGp3dCh7IHRva2VuLCB1c2VyIH0pIHtcbiAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgIHRva2VuLmlkID0gdXNlci5pZDtcbiAgICAgICAgdG9rZW4ucm9sZSA9IHVzZXIucm9sZTtcbiAgICAgICAgdG9rZW4uZGVwYXJ0bWVudElkID0gdXNlci5kZXBhcnRtZW50SWQ7XG4gICAgICAgIHRva2VuLmRlcGFydG1lbnROYW1lID0gdXNlci5kZXBhcnRtZW50TmFtZTtcbiAgICAgICAgdG9rZW4uc3RhdHVzID0gdXNlci5zdGF0dXM7XG4gICAgICB9XG4gICAgICByZXR1cm4gdG9rZW47XG4gICAgfSxcbiAgICBhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdG9rZW4gfSkge1xuICAgICAgaWYgKHNlc3Npb24udXNlcikge1xuICAgICAgICBzZXNzaW9uLnVzZXIuaWQgPSB0b2tlbi5pZCBhcyBzdHJpbmc7XG4gICAgICAgIHNlc3Npb24udXNlci5yb2xlID0gdG9rZW4ucm9sZSBhcyBzdHJpbmc7XG4gICAgICAgIHNlc3Npb24udXNlci5kZXBhcnRtZW50SWQgPSB0b2tlbi5kZXBhcnRtZW50SWQgYXMgc3RyaW5nO1xuICAgICAgICBzZXNzaW9uLnVzZXIuZGVwYXJ0bWVudE5hbWUgPSB0b2tlbi5kZXBhcnRtZW50TmFtZSBhcyBzdHJpbmc7XG4gICAgICAgIHNlc3Npb24udXNlci5zdGF0dXMgPSB0b2tlbi5zdGF0dXMgYXMgc3RyaW5nO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlc3Npb247XG4gICAgfSxcbiAgfSxcbiAgcGFnZXM6IHtcbiAgICBzaWduSW46ICcvYXV0aC9sb2dpbicsXG4gICAgZXJyb3I6ICcvYXV0aC9sb2dpbicsXG4gIH0sXG4gIHNlc3Npb246IHtcbiAgICBzdHJhdGVneTogJ2p3dCcsXG4gICAgbWF4QWdlOiAzMCAqIDI0ICogNjAgKiA2MCwgLy8gMzAgZGF5c1xuICB9LFxuICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRBVVRIX1NFQ1JFVCxcbn07Il0sIm5hbWVzIjpbIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJiY3J5cHQiLCJwcmlzbWEiLCJhdXRoT3B0aW9ucyIsInByb3ZpZGVycyIsIm5hbWUiLCJjcmVkZW50aWFscyIsImVtYWlsIiwibGFiZWwiLCJ0eXBlIiwicGFzc3dvcmQiLCJhdXRob3JpemUiLCJyZXEiLCJFcnJvciIsInVzZXIiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJpbmNsdWRlIiwiZGVwYXJ0bWVudCIsInN0YXR1cyIsImlzUGFzc3dvcmRWYWxpZCIsImNvbXBhcmUiLCJpZCIsInJvbGUiLCJkZXBhcnRtZW50SWQiLCJ1bmRlZmluZWQiLCJkZXBhcnRtZW50TmFtZSIsImNhbGxiYWNrcyIsImp3dCIsInRva2VuIiwic2Vzc2lvbiIsInBhZ2VzIiwic2lnbkluIiwiZXJyb3IiLCJzdHJhdGVneSIsIm1heEFnZSIsInNlY3JldCIsInByb2Nlc3MiLCJlbnYiLCJORVhUQVVUSF9TRUNSRVQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = global;\nconst prisma = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log:  true ? [\n        \"query\",\n        \"error\",\n        \"warn\"\n    ] : 0\n});\nif (true) globalForPrisma.prisma = prisma;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBOEM7QUFFOUMsTUFBTUMsa0JBQWtCQztBQUVqQixNQUFNQyxTQUNYRixnQkFBZ0JFLE1BQU0sSUFDdEIsSUFBSUgsd0RBQVlBLENBQUM7SUFDZkksS0FBS0MsS0FBeUIsR0FBZ0I7UUFBQztRQUFTO1FBQVM7S0FBTyxHQUFHLENBQVM7QUFDdEYsR0FBRztBQUVMLElBQUlBLElBQXlCLEVBQWNKLGdCQUFnQkUsTUFBTSxHQUFHQTtBQUVwRSxpRUFBZUEsTUFBTUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb250LWxpbmUtcmF0aW5nLXYxLXJldmFtcC8uL2xpYi9wcmlzbWEudHM/OTgyMiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCc7XG5cbmNvbnN0IGdsb2JhbEZvclByaXNtYSA9IGdsb2JhbCBhcyB1bmtub3duIGFzIHsgcHJpc21hOiBQcmlzbWFDbGllbnQgfTtcblxuZXhwb3J0IGNvbnN0IHByaXNtYSA9XG4gIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgfHxcbiAgbmV3IFByaXNtYUNsaWVudCh7XG4gICAgbG9nOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JyA/IFsncXVlcnknLCAnZXJyb3InLCAnd2FybiddIDogWydlcnJvciddLFxuICB9KTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPSBwcmlzbWE7XG5cbmV4cG9ydCBkZWZhdWx0IHByaXNtYTsiXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsIiwicHJpc21hIiwibG9nIiwicHJvY2VzcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/@panva","vendor-chunks/oidc-token-hash"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fnotifications%2Froute&page=%2Fapi%2Fnotifications%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fnotifications%2Froute.ts&appDir=%2Fworkspaces%2Ffront-line-rating-v1-Revamp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fworkspaces%2Ffront-line-rating-v1-Revamp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();