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
exports.id = "app/api/user/complaints/route";
exports.ids = ["app/api/user/complaints/route"];
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuser%2Fcomplaints%2Froute&page=%2Fapi%2Fuser%2Fcomplaints%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Fcomplaints%2Froute.ts&appDir=%2Fworkspaces%2Ffront-line-rating-v1-Revamp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fworkspaces%2Ffront-line-rating-v1-Revamp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuser%2Fcomplaints%2Froute&page=%2Fapi%2Fuser%2Fcomplaints%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Fcomplaints%2Froute.ts&appDir=%2Fworkspaces%2Ffront-line-rating-v1-Revamp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fworkspaces%2Ffront-line-rating-v1-Revamp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _workspaces_front_line_rating_v1_Revamp_app_api_user_complaints_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/user/complaints/route.ts */ \"(rsc)/./app/api/user/complaints/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/user/complaints/route\",\n        pathname: \"/api/user/complaints\",\n        filename: \"route\",\n        bundlePath: \"app/api/user/complaints/route\"\n    },\n    resolvedPagePath: \"/workspaces/front-line-rating-v1-Revamp/app/api/user/complaints/route.ts\",\n    nextConfigOutput,\n    userland: _workspaces_front_line_rating_v1_Revamp_app_api_user_complaints_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/user/complaints/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZ1c2VyJTJGY29tcGxhaW50cyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGdXNlciUyRmNvbXBsYWludHMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZ1c2VyJTJGY29tcGxhaW50cyUyRnJvdXRlLnRzJmFwcERpcj0lMkZ3b3Jrc3BhY2VzJTJGZnJvbnQtbGluZS1yYXRpbmctdjEtUmV2YW1wJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZ3b3Jrc3BhY2VzJTJGZnJvbnQtbGluZS1yYXRpbmctdjEtUmV2YW1wJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUN3QjtBQUNyRztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb250LWxpbmUtcmF0aW5nLXYxLXJldmFtcC8/NDMzOSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvd29ya3NwYWNlcy9mcm9udC1saW5lLXJhdGluZy12MS1SZXZhbXAvYXBwL2FwaS91c2VyL2NvbXBsYWludHMvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3VzZXIvY29tcGxhaW50cy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3VzZXIvY29tcGxhaW50c1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvdXNlci9jb21wbGFpbnRzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL3dvcmtzcGFjZXMvZnJvbnQtbGluZS1yYXRpbmctdjEtUmV2YW1wL2FwcC9hcGkvdXNlci9jb21wbGFpbnRzL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS91c2VyL2NvbXBsYWludHMvcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuser%2Fcomplaints%2Froute&page=%2Fapi%2Fuser%2Fcomplaints%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Fcomplaints%2Froute.ts&appDir=%2Fworkspaces%2Ffront-line-rating-v1-Revamp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fworkspaces%2Ffront-line-rating-v1-Revamp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/user/complaints/route.ts":
/*!******************************************!*\
  !*** ./app/api/user/complaints/route.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n\n\n\n\n// Get user's own complaints (submitted or received depending on role)\nasync function GET(request) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session?.user) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        const searchParams = new URL(request.url).searchParams;\n        const page = parseInt(searchParams.get(\"page\") || \"1\");\n        const limit = parseInt(searchParams.get(\"limit\") || \"10\");\n        const skip = (page - 1) * limit;\n        let complaints;\n        let total;\n        if (session.user.role === \"AGENT\") {\n            // Agents see complaints against them\n            [complaints, total] = await Promise.all([\n                _lib_prisma__WEBPACK_IMPORTED_MODULE_3__[\"default\"].rating.findMany({\n                    where: {\n                        agentId: session.user.id,\n                        isComplaint: true\n                    },\n                    include: {\n                        responses: {\n                            include: {\n                                question: true\n                            }\n                        },\n                        department: true\n                    },\n                    orderBy: {\n                        createdAt: \"desc\"\n                    },\n                    skip,\n                    take: limit\n                }),\n                _lib_prisma__WEBPACK_IMPORTED_MODULE_3__[\"default\"].rating.count({\n                    where: {\n                        agentId: session.user.id,\n                        isComplaint: true\n                    }\n                })\n            ]);\n        } else {\n            // Regular users see complaints they've submitted\n            [complaints, total] = await Promise.all([\n                _lib_prisma__WEBPACK_IMPORTED_MODULE_3__[\"default\"].rating.findMany({\n                    where: {\n                        OR: [\n                            {\n                                customerContact: session.user.email\n                            },\n                            {\n                                customerName: session.user.name\n                            }\n                        ],\n                        isComplaint: true\n                    },\n                    include: {\n                        responses: {\n                            include: {\n                                question: true\n                            }\n                        },\n                        agent: {\n                            select: {\n                                name: true,\n                                department: true\n                            }\n                        },\n                        department: true\n                    },\n                    orderBy: {\n                        createdAt: \"desc\"\n                    },\n                    skip,\n                    take: limit\n                }),\n                _lib_prisma__WEBPACK_IMPORTED_MODULE_3__[\"default\"].rating.count({\n                    where: {\n                        OR: [\n                            {\n                                customerContact: session.user.email\n                            },\n                            {\n                                customerName: session.user.name\n                            }\n                        ],\n                        isComplaint: true\n                    }\n                })\n            ]);\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            complaints,\n            pagination: {\n                total,\n                pages: Math.ceil(total / limit),\n                page,\n                limit\n            }\n        });\n    } catch (error) {\n        console.error(\"Error fetching complaints:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to fetch complaints\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UUFDZHdDLFFBQVF4QyxLQUFLLENBQUMsOEJBQThCQTtRQUM1QyxPQUFPVCxxREFBWUEsQ0FBQ1EsSUFBSSxDQUN0QjtZQUFFQyxPQUFPO1FBQTZCLEdBQ3RDO1lBQUVDLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJvbnQtbGluZS1yYXRpbmctdjEtcmV2YW1wLy4vYXBwL2FwaS91c2VyL2NvbXBsYWludHMvcm91dGUudHM/MDliNiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcidcbmltcG9ydCB7IGdldFNlcnZlclNlc3Npb24gfSBmcm9tICduZXh0LWF1dGgnXG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gJ0AvbGliL2F1dGgnXG5pbXBvcnQgcHJpc21hIGZyb20gJ0AvbGliL3ByaXNtYSdcblxuLy8gR2V0IHVzZXIncyBvd24gY29tcGxhaW50cyAoc3VibWl0dGVkIG9yIHJlY2VpdmVkIGRlcGVuZGluZyBvbiByb2xlKVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpXG4gICAgXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ1VuYXV0aG9yaXplZCcgfSwgeyBzdGF0dXM6IDQwMSB9KVxuICAgIH1cblxuICAgIGNvbnN0IHNlYXJjaFBhcmFtcyA9IG5ldyBVUkwocmVxdWVzdC51cmwpLnNlYXJjaFBhcmFtc1xuICAgIGNvbnN0IHBhZ2UgPSBwYXJzZUludChzZWFyY2hQYXJhbXMuZ2V0KCdwYWdlJykgfHwgJzEnKVxuICAgIGNvbnN0IGxpbWl0ID0gcGFyc2VJbnQoc2VhcmNoUGFyYW1zLmdldCgnbGltaXQnKSB8fCAnMTAnKVxuICAgIGNvbnN0IHNraXAgPSAocGFnZSAtIDEpICogbGltaXRcblxuICAgIGxldCBjb21wbGFpbnRzXG4gICAgbGV0IHRvdGFsXG5cbiAgICBpZiAoc2Vzc2lvbi51c2VyLnJvbGUgPT09ICdBR0VOVCcpIHtcbiAgICAgIC8vIEFnZW50cyBzZWUgY29tcGxhaW50cyBhZ2FpbnN0IHRoZW1cbiAgICAgIFtjb21wbGFpbnRzLCB0b3RhbF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIHByaXNtYS5yYXRpbmcuZmluZE1hbnkoe1xuICAgICAgICAgIHdoZXJlOiB7IFxuICAgICAgICAgICAgYWdlbnRJZDogc2Vzc2lvbi51c2VyLmlkLFxuICAgICAgICAgICAgaXNDb21wbGFpbnQ6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgIHJlc3BvbnNlczoge1xuICAgICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgcXVlc3Rpb246IHRydWUsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVwYXJ0bWVudDogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9yZGVyQnk6IHsgY3JlYXRlZEF0OiAnZGVzYycgfSxcbiAgICAgICAgICBza2lwLFxuICAgICAgICAgIHRha2U6IGxpbWl0LFxuICAgICAgICB9KSxcbiAgICAgICAgcHJpc21hLnJhdGluZy5jb3VudCh7XG4gICAgICAgICAgd2hlcmU6IHsgXG4gICAgICAgICAgICBhZ2VudElkOiBzZXNzaW9uLnVzZXIuaWQsXG4gICAgICAgICAgICBpc0NvbXBsYWludDogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgXSlcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmVndWxhciB1c2VycyBzZWUgY29tcGxhaW50cyB0aGV5J3ZlIHN1Ym1pdHRlZFxuICAgICAgW2NvbXBsYWludHMsIHRvdGFsXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgcHJpc21hLnJhdGluZy5maW5kTWFueSh7XG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIE9SOiBbXG4gICAgICAgICAgICAgIHsgY3VzdG9tZXJDb250YWN0OiBzZXNzaW9uLnVzZXIuZW1haWwgfSxcbiAgICAgICAgICAgICAgeyBjdXN0b21lck5hbWU6IHNlc3Npb24udXNlci5uYW1lIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgaXNDb21wbGFpbnQ6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgIHJlc3BvbnNlczoge1xuICAgICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgcXVlc3Rpb246IHRydWUsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWdlbnQ6IHtcbiAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBkZXBhcnRtZW50OiB0cnVlLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlcGFydG1lbnQ6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvcmRlckJ5OiB7IGNyZWF0ZWRBdDogJ2Rlc2MnIH0sXG4gICAgICAgICAgc2tpcCxcbiAgICAgICAgICB0YWtlOiBsaW1pdCxcbiAgICAgICAgfSksXG4gICAgICAgIHByaXNtYS5yYXRpbmcuY291bnQoe1xuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBPUjogW1xuICAgICAgICAgICAgICB7IGN1c3RvbWVyQ29udGFjdDogc2Vzc2lvbi51c2VyLmVtYWlsIH0sXG4gICAgICAgICAgICAgIHsgY3VzdG9tZXJOYW1lOiBzZXNzaW9uLnVzZXIubmFtZSB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGlzQ29tcGxhaW50OiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICBdKVxuICAgIH1cblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XG4gICAgICBjb21wbGFpbnRzLFxuICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICB0b3RhbCxcbiAgICAgICAgcGFnZXM6IE1hdGguY2VpbCh0b3RhbCAvIGxpbWl0KSxcbiAgICAgICAgcGFnZSxcbiAgICAgICAgbGltaXQsXG4gICAgICB9LFxuICAgIH0pXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgY29tcGxhaW50czonLCBlcnJvcilcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICB7IGVycm9yOiAnRmFpbGVkIHRvIGZldGNoIGNvbXBsYWludHMnIH0sXG4gICAgICB7IHN0YXR1czogNTAwIH1cbiAgICApXG4gIH1cbn0iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiZ2V0U2VydmVyU2Vzc2lvbiIsImF1dGhPcHRpb25zIiwicHJpc21hIiwiR0VUIiwicmVxdWVzdCIsInNlc3Npb24iLCJ1c2VyIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwic2VhcmNoUGFyYW1zIiwiVVJMIiwidXJsIiwicGFnZSIsInBhcnNlSW50IiwiZ2V0IiwibGltaXQiLCJza2lwIiwiY29tcGxhaW50cyIsInRvdGFsIiwicm9sZSIsIlByb21pc2UiLCJhbGwiLCJyYXRpbmciLCJmaW5kTWFueSIsIndoZXJlIiwiYWdlbnRJZCIsImlkIiwiaXNDb21wbGFpbnQiLCJpbmNsdWRlIiwicmVzcG9uc2VzIiwicXVlc3Rpb24iLCJkZXBhcnRtZW50Iiwib3JkZXJCeSIsImNyZWF0ZWRBdCIsInRha2UiLCJjb3VudCIsIk9SIiwiY3VzdG9tZXJDb250YWN0IiwiZW1haWwiLCJjdXN0b21lck5hbWUiLCJuYW1lIiwiYWdlbnQiLCJzZWxlY3QiLCJwYWdpbmF0aW9uIiwicGFnZXMiLCJNYXRoIiwiY2VpbCIsImNvbnNvbGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/user/complaints/route.ts\n");

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
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/@panva","vendor-chunks/oidc-token-hash"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuser%2Fcomplaints%2Froute&page=%2Fapi%2Fuser%2Fcomplaints%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Fcomplaints%2Froute.ts&appDir=%2Fworkspaces%2Ffront-line-rating-v1-Revamp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fworkspaces%2Ffront-line-rating-v1-Revamp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();