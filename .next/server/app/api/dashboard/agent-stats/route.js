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
exports.id = "app/api/dashboard/agent-stats/route";
exports.ids = ["app/api/dashboard/agent-stats/route"];
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fdashboard%2Fagent-stats%2Froute&page=%2Fapi%2Fdashboard%2Fagent-stats%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fdashboard%2Fagent-stats%2Froute.ts&appDir=%2Fworkspaces%2Ffront-line-rating-v1-Revamp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fworkspaces%2Ffront-line-rating-v1-Revamp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fdashboard%2Fagent-stats%2Froute&page=%2Fapi%2Fdashboard%2Fagent-stats%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fdashboard%2Fagent-stats%2Froute.ts&appDir=%2Fworkspaces%2Ffront-line-rating-v1-Revamp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fworkspaces%2Ffront-line-rating-v1-Revamp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _workspaces_front_line_rating_v1_Revamp_app_api_dashboard_agent_stats_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/dashboard/agent-stats/route.ts */ \"(rsc)/./app/api/dashboard/agent-stats/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/dashboard/agent-stats/route\",\n        pathname: \"/api/dashboard/agent-stats\",\n        filename: \"route\",\n        bundlePath: \"app/api/dashboard/agent-stats/route\"\n    },\n    resolvedPagePath: \"/workspaces/front-line-rating-v1-Revamp/app/api/dashboard/agent-stats/route.ts\",\n    nextConfigOutput,\n    userland: _workspaces_front_line_rating_v1_Revamp_app_api_dashboard_agent_stats_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/dashboard/agent-stats/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZkYXNoYm9hcmQlMkZhZ2VudC1zdGF0cyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGZGFzaGJvYXJkJTJGYWdlbnQtc3RhdHMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZkYXNoYm9hcmQlMkZhZ2VudC1zdGF0cyUyRnJvdXRlLnRzJmFwcERpcj0lMkZ3b3Jrc3BhY2VzJTJGZnJvbnQtbGluZS1yYXRpbmctdjEtUmV2YW1wJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZ3b3Jrc3BhY2VzJTJGZnJvbnQtbGluZS1yYXRpbmctdjEtUmV2YW1wJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUM4QjtBQUMzRztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb250LWxpbmUtcmF0aW5nLXYxLXJldmFtcC8/NTE4MSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvd29ya3NwYWNlcy9mcm9udC1saW5lLXJhdGluZy12MS1SZXZhbXAvYXBwL2FwaS9kYXNoYm9hcmQvYWdlbnQtc3RhdHMvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2Rhc2hib2FyZC9hZ2VudC1zdGF0cy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2Rhc2hib2FyZC9hZ2VudC1zdGF0c1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvZGFzaGJvYXJkL2FnZW50LXN0YXRzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL3dvcmtzcGFjZXMvZnJvbnQtbGluZS1yYXRpbmctdjEtUmV2YW1wL2FwcC9hcGkvZGFzaGJvYXJkL2FnZW50LXN0YXRzL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9kYXNoYm9hcmQvYWdlbnQtc3RhdHMvcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fdashboard%2Fagent-stats%2Froute&page=%2Fapi%2Fdashboard%2Fagent-stats%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fdashboard%2Fagent-stats%2Froute.ts&appDir=%2Fworkspaces%2Ffront-line-rating-v1-Revamp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fworkspaces%2Ffront-line-rating-v1-Revamp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/dashboard/agent-stats/route.ts":
/*!************************************************!*\
  !*** ./app/api/dashboard/agent-stats/route.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n\n\n\n\nasync function GET(request) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session || session.user.role !== \"AGENT\") {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        const agentId = session.user.id;\n        // Get all ratings for this agent\n        const ratings = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__[\"default\"].rating.findMany({\n            where: {\n                agentId\n            },\n            include: {\n                responses: true\n            },\n            orderBy: {\n                createdAt: \"desc\"\n            }\n        });\n        const totalRatings = ratings.length;\n        // Calculate average rating\n        let totalScore = 0;\n        let totalResponses = 0;\n        ratings.forEach((rating)=>{\n            rating.responses.forEach((response)=>{\n                totalScore += response.score;\n                totalResponses++;\n            });\n        });\n        const averageRating = totalResponses > 0 ? totalScore / totalResponses : 0;\n        const satisfactionPercentage = Math.round(averageRating / 5 * 100);\n        // Get complaints\n        const totalComplaints = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__[\"default\"].rating.count({\n            where: {\n                agentId,\n                isComplaint: true\n            }\n        });\n        // Get trend data (last 30 days)\n        const thirtyDaysAgo = new Date();\n        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);\n        const trendRatings = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__[\"default\"].rating.findMany({\n            where: {\n                agentId,\n                createdAt: {\n                    gte: thirtyDaysAgo\n                }\n            },\n            include: {\n                responses: true\n            },\n            orderBy: {\n                createdAt: \"asc\"\n            }\n        });\n        // Group by date\n        const trendMap = new Map();\n        trendRatings.forEach((rating)=>{\n            const date = rating.createdAt.toISOString().split(\"T\")[0];\n            if (!trendMap.has(date)) {\n                trendMap.set(date, {\n                    count: 0,\n                    totalScore: 0,\n                    totalResponses: 0\n                });\n            }\n            const data = trendMap.get(date);\n            data.count++;\n            rating.responses.forEach((r)=>{\n                data.totalScore += r.score;\n                data.totalResponses++;\n            });\n        });\n        const trendData = Array.from(trendMap.entries()).map(([date, data])=>({\n                date: new Date(date).toLocaleDateString(\"en-US\", {\n                    month: \"short\",\n                    day: \"numeric\"\n                }),\n                count: data.count,\n                avgRating: data.totalResponses > 0 ? data.totalScore / data.totalResponses : 0\n            }));\n        // Get recent ratings (last 5)\n        const recentRatings = ratings.slice(0, 5).map((rating)=>{\n            let ratingTotalScore = 0;\n            rating.responses.forEach((r)=>{\n                ratingTotalScore += r.score;\n            });\n            const averageScore = rating.responses.length > 0 ? ratingTotalScore / rating.responses.length : 0;\n            return {\n                customerName: rating.customerName,\n                feedbackText: rating.feedbackText,\n                isComplaint: rating.isComplaint,\n                averageScore,\n                createdAt: rating.createdAt\n            };\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            totalRatings,\n            averageRating: Math.round(averageRating * 10) / 10,\n            satisfactionPercentage,\n            totalComplaints,\n            trendData,\n            recentRatings\n        });\n    } catch (error) {\n        console.error(\"Error fetching agent stats:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to fetch statistics\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2Rhc2hib2FyZC9hZ2VudC1zdGF0cy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBd0Q7QUFDWDtBQUNKO0FBQ1A7QUFFM0IsZUFBZUksSUFBSUMsT0FBb0I7SUFDNUMsSUFBSTtRQUNGLE1BQU1DLFVBQVUsTUFBTUwsMkRBQWdCQSxDQUFDQyxrREFBV0E7UUFFbEQsSUFBSSxDQUFDSSxXQUFXQSxRQUFRQyxJQUFJLENBQUNDLElBQUksS0FBSyxTQUFTO1lBQzdDLE9BQU9SLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBZSxHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDcEU7UUFFQSxNQUFNQyxVQUFVTixRQUFRQyxJQUFJLENBQUNNLEVBQUU7UUFFL0IsaUNBQWlDO1FBQ2pDLE1BQU1DLFVBQVUsTUFBTVgsbURBQU1BLENBQUNZLE1BQU0sQ0FBQ0MsUUFBUSxDQUFDO1lBQzNDQyxPQUFPO2dCQUFFTDtZQUFRO1lBQ2pCTSxTQUFTO2dCQUNQQyxXQUFXO1lBQ2I7WUFDQUMsU0FBUztnQkFBRUMsV0FBVztZQUFPO1FBQy9CO1FBRUEsTUFBTUMsZUFBZVIsUUFBUVMsTUFBTTtRQUVuQywyQkFBMkI7UUFDM0IsSUFBSUMsYUFBYTtRQUNqQixJQUFJQyxpQkFBaUI7UUFFckJYLFFBQVFZLE9BQU8sQ0FBQyxDQUFDWDtZQUNmQSxPQUFPSSxTQUFTLENBQUNPLE9BQU8sQ0FBQyxDQUFDQztnQkFDeEJILGNBQWNHLFNBQVNDLEtBQUs7Z0JBQzVCSDtZQUNGO1FBQ0Y7UUFFQSxNQUFNSSxnQkFBZ0JKLGlCQUFpQixJQUFJRCxhQUFhQyxpQkFBaUI7UUFDekUsTUFBTUsseUJBQXlCQyxLQUFLQyxLQUFLLENBQUMsZ0JBQWlCLElBQUs7UUFFaEUsaUJBQWlCO1FBQ2pCLE1BQU1DLGtCQUFrQixNQUFNOUIsbURBQU1BLENBQUNZLE1BQU0sQ0FBQ21CLEtBQUssQ0FBQztZQUNoRGpCLE9BQU87Z0JBQ0xMO2dCQUNBdUIsYUFBYTtZQUNmO1FBQ0Y7UUFFQSxnQ0FBZ0M7UUFDaEMsTUFBTUMsZ0JBQWdCLElBQUlDO1FBQzFCRCxjQUFjRSxPQUFPLENBQUNGLGNBQWNHLE9BQU8sS0FBSztRQUVoRCxNQUFNQyxlQUFlLE1BQU1yQyxtREFBTUEsQ0FBQ1ksTUFBTSxDQUFDQyxRQUFRLENBQUM7WUFDaERDLE9BQU87Z0JBQ0xMO2dCQUNBUyxXQUFXO29CQUNUb0IsS0FBS0w7Z0JBQ1A7WUFDRjtZQUNBbEIsU0FBUztnQkFDUEMsV0FBVztZQUNiO1lBQ0FDLFNBQVM7Z0JBQ1BDLFdBQVc7WUFDYjtRQUNGO1FBRUEsZ0JBQWdCO1FBQ2hCLE1BQU1xQixXQUFXLElBQUlDO1FBQ3JCSCxhQUFhZCxPQUFPLENBQUMsQ0FBQ1g7WUFDcEIsTUFBTTZCLE9BQU83QixPQUFPTSxTQUFTLENBQUN3QixXQUFXLEdBQUdDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN6RCxJQUFJLENBQUNKLFNBQVNLLEdBQUcsQ0FBQ0gsT0FBTztnQkFDdkJGLFNBQVNNLEdBQUcsQ0FBQ0osTUFBTTtvQkFBRVYsT0FBTztvQkFBR1YsWUFBWTtvQkFBR0MsZ0JBQWdCO2dCQUFFO1lBQ2xFO1lBQ0EsTUFBTXdCLE9BQU9QLFNBQVNRLEdBQUcsQ0FBQ047WUFDMUJLLEtBQUtmLEtBQUs7WUFDVm5CLE9BQU9JLFNBQVMsQ0FBQ08sT0FBTyxDQUFDLENBQUN5QjtnQkFDeEJGLEtBQUt6QixVQUFVLElBQUkyQixFQUFFdkIsS0FBSztnQkFDMUJxQixLQUFLeEIsY0FBYztZQUNyQjtRQUNGO1FBRUEsTUFBTTJCLFlBQVlDLE1BQU1DLElBQUksQ0FBQ1osU0FBU2EsT0FBTyxJQUFJQyxHQUFHLENBQUMsQ0FBQyxDQUFDWixNQUFNSyxLQUFLLEdBQU07Z0JBQ3RFTCxNQUFNLElBQUlQLEtBQUtPLE1BQU1hLGtCQUFrQixDQUFDLFNBQVM7b0JBQUVDLE9BQU87b0JBQVNDLEtBQUs7Z0JBQVU7Z0JBQ2xGekIsT0FBT2UsS0FBS2YsS0FBSztnQkFDakIwQixXQUFXWCxLQUFLeEIsY0FBYyxHQUFHLElBQUl3QixLQUFLekIsVUFBVSxHQUFHeUIsS0FBS3hCLGNBQWMsR0FBRztZQUMvRTtRQUVBLDhCQUE4QjtRQUM5QixNQUFNb0MsZ0JBQWdCL0MsUUFBUWdELEtBQUssQ0FBQyxHQUFHLEdBQUdOLEdBQUcsQ0FBQyxDQUFDekM7WUFDN0MsSUFBSWdELG1CQUFtQjtZQUN2QmhELE9BQU9JLFNBQVMsQ0FBQ08sT0FBTyxDQUFDLENBQUN5QjtnQkFDeEJZLG9CQUFvQlosRUFBRXZCLEtBQUs7WUFDN0I7WUFDQSxNQUFNb0MsZUFBZWpELE9BQU9JLFNBQVMsQ0FBQ0ksTUFBTSxHQUFHLElBQUl3QyxtQkFBbUJoRCxPQUFPSSxTQUFTLENBQUNJLE1BQU0sR0FBRztZQUVoRyxPQUFPO2dCQUNMMEMsY0FBY2xELE9BQU9rRCxZQUFZO2dCQUNqQ0MsY0FBY25ELE9BQU9tRCxZQUFZO2dCQUNqQy9CLGFBQWFwQixPQUFPb0IsV0FBVztnQkFDL0I2QjtnQkFDQTNDLFdBQVdOLE9BQU9NLFNBQVM7WUFDN0I7UUFDRjtRQUVBLE9BQU9yQixxREFBWUEsQ0FBQ1MsSUFBSSxDQUFDO1lBQ3ZCYTtZQUNBTyxlQUFlRSxLQUFLQyxLQUFLLENBQUNILGdCQUFnQixNQUFNO1lBQ2hEQztZQUNBRztZQUNBbUI7WUFDQVM7UUFDRjtJQUNGLEVBQUUsT0FBT25ELE9BQU87UUFDZHlELFFBQVF6RCxLQUFLLENBQUMsK0JBQStCQTtRQUM3QyxPQUFPVixxREFBWUEsQ0FBQ1MsSUFBSSxDQUN0QjtZQUFFQyxPQUFPO1FBQTZCLEdBQ3RDO1lBQUVDLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJvbnQtbGluZS1yYXRpbmctdjEtcmV2YW1wLy4vYXBwL2FwaS9kYXNoYm9hcmQvYWdlbnQtc3RhdHMvcm91dGUudHM/Mjc0NCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xuaW1wb3J0IHsgZ2V0U2VydmVyU2Vzc2lvbiB9IGZyb20gJ25leHQtYXV0aCc7XG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gJ0AvbGliL2F1dGgnO1xuaW1wb3J0IHByaXNtYSBmcm9tICdAL2xpYi9wcmlzbWEnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcXVlc3Q6IE5leHRSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpO1xuXG4gICAgaWYgKCFzZXNzaW9uIHx8IHNlc3Npb24udXNlci5yb2xlICE9PSAnQUdFTlQnKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ1VuYXV0aG9yaXplZCcgfSwgeyBzdGF0dXM6IDQwMSB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBhZ2VudElkID0gc2Vzc2lvbi51c2VyLmlkO1xuXG4gICAgLy8gR2V0IGFsbCByYXRpbmdzIGZvciB0aGlzIGFnZW50XG4gICAgY29uc3QgcmF0aW5ncyA9IGF3YWl0IHByaXNtYS5yYXRpbmcuZmluZE1hbnkoe1xuICAgICAgd2hlcmU6IHsgYWdlbnRJZCB9LFxuICAgICAgaW5jbHVkZToge1xuICAgICAgICByZXNwb25zZXM6IHRydWUsXG4gICAgICB9LFxuICAgICAgb3JkZXJCeTogeyBjcmVhdGVkQXQ6ICdkZXNjJyB9LFxuICAgIH0pO1xuXG4gICAgY29uc3QgdG90YWxSYXRpbmdzID0gcmF0aW5ncy5sZW5ndGg7XG5cbiAgICAvLyBDYWxjdWxhdGUgYXZlcmFnZSByYXRpbmdcbiAgICBsZXQgdG90YWxTY29yZSA9IDA7XG4gICAgbGV0IHRvdGFsUmVzcG9uc2VzID0gMDtcblxuICAgIHJhdGluZ3MuZm9yRWFjaCgocmF0aW5nKSA9PiB7XG4gICAgICByYXRpbmcucmVzcG9uc2VzLmZvckVhY2goKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHRvdGFsU2NvcmUgKz0gcmVzcG9uc2Uuc2NvcmU7XG4gICAgICAgIHRvdGFsUmVzcG9uc2VzKys7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGF2ZXJhZ2VSYXRpbmcgPSB0b3RhbFJlc3BvbnNlcyA+IDAgPyB0b3RhbFNjb3JlIC8gdG90YWxSZXNwb25zZXMgOiAwO1xuICAgIGNvbnN0IHNhdGlzZmFjdGlvblBlcmNlbnRhZ2UgPSBNYXRoLnJvdW5kKChhdmVyYWdlUmF0aW5nIC8gNSkgKiAxMDApO1xuXG4gICAgLy8gR2V0IGNvbXBsYWludHNcbiAgICBjb25zdCB0b3RhbENvbXBsYWludHMgPSBhd2FpdCBwcmlzbWEucmF0aW5nLmNvdW50KHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIGFnZW50SWQsXG4gICAgICAgIGlzQ29tcGxhaW50OiB0cnVlLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIC8vIEdldCB0cmVuZCBkYXRhIChsYXN0IDMwIGRheXMpXG4gICAgY29uc3QgdGhpcnR5RGF5c0FnbyA9IG5ldyBEYXRlKCk7XG4gICAgdGhpcnR5RGF5c0Fnby5zZXREYXRlKHRoaXJ0eURheXNBZ28uZ2V0RGF0ZSgpIC0gMzApO1xuXG4gICAgY29uc3QgdHJlbmRSYXRpbmdzID0gYXdhaXQgcHJpc21hLnJhdGluZy5maW5kTWFueSh7XG4gICAgICB3aGVyZToge1xuICAgICAgICBhZ2VudElkLFxuICAgICAgICBjcmVhdGVkQXQ6IHtcbiAgICAgICAgICBndGU6IHRoaXJ0eURheXNBZ28sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgaW5jbHVkZToge1xuICAgICAgICByZXNwb25zZXM6IHRydWUsXG4gICAgICB9LFxuICAgICAgb3JkZXJCeToge1xuICAgICAgICBjcmVhdGVkQXQ6ICdhc2MnLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIC8vIEdyb3VwIGJ5IGRhdGVcbiAgICBjb25zdCB0cmVuZE1hcCA9IG5ldyBNYXAoKTtcbiAgICB0cmVuZFJhdGluZ3MuZm9yRWFjaCgocmF0aW5nKSA9PiB7XG4gICAgICBjb25zdCBkYXRlID0gcmF0aW5nLmNyZWF0ZWRBdC50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF07XG4gICAgICBpZiAoIXRyZW5kTWFwLmhhcyhkYXRlKSkge1xuICAgICAgICB0cmVuZE1hcC5zZXQoZGF0ZSwgeyBjb3VudDogMCwgdG90YWxTY29yZTogMCwgdG90YWxSZXNwb25zZXM6IDAgfSk7XG4gICAgICB9XG4gICAgICBjb25zdCBkYXRhID0gdHJlbmRNYXAuZ2V0KGRhdGUpO1xuICAgICAgZGF0YS5jb3VudCsrO1xuICAgICAgcmF0aW5nLnJlc3BvbnNlcy5mb3JFYWNoKChyKSA9PiB7XG4gICAgICAgIGRhdGEudG90YWxTY29yZSArPSByLnNjb3JlO1xuICAgICAgICBkYXRhLnRvdGFsUmVzcG9uc2VzKys7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHRyZW5kRGF0YSA9IEFycmF5LmZyb20odHJlbmRNYXAuZW50cmllcygpKS5tYXAoKFtkYXRlLCBkYXRhXSkgPT4gKHtcbiAgICAgIGRhdGU6IG5ldyBEYXRlKGRhdGUpLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tVVMnLCB7IG1vbnRoOiAnc2hvcnQnLCBkYXk6ICdudW1lcmljJyB9KSxcbiAgICAgIGNvdW50OiBkYXRhLmNvdW50LFxuICAgICAgYXZnUmF0aW5nOiBkYXRhLnRvdGFsUmVzcG9uc2VzID4gMCA/IGRhdGEudG90YWxTY29yZSAvIGRhdGEudG90YWxSZXNwb25zZXMgOiAwLFxuICAgIH0pKTtcblxuICAgIC8vIEdldCByZWNlbnQgcmF0aW5ncyAobGFzdCA1KVxuICAgIGNvbnN0IHJlY2VudFJhdGluZ3MgPSByYXRpbmdzLnNsaWNlKDAsIDUpLm1hcCgocmF0aW5nKSA9PiB7XG4gICAgICBsZXQgcmF0aW5nVG90YWxTY29yZSA9IDA7XG4gICAgICByYXRpbmcucmVzcG9uc2VzLmZvckVhY2goKHIpID0+IHtcbiAgICAgICAgcmF0aW5nVG90YWxTY29yZSArPSByLnNjb3JlO1xuICAgICAgfSk7XG4gICAgICBjb25zdCBhdmVyYWdlU2NvcmUgPSByYXRpbmcucmVzcG9uc2VzLmxlbmd0aCA+IDAgPyByYXRpbmdUb3RhbFNjb3JlIC8gcmF0aW5nLnJlc3BvbnNlcy5sZW5ndGggOiAwO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBjdXN0b21lck5hbWU6IHJhdGluZy5jdXN0b21lck5hbWUsXG4gICAgICAgIGZlZWRiYWNrVGV4dDogcmF0aW5nLmZlZWRiYWNrVGV4dCxcbiAgICAgICAgaXNDb21wbGFpbnQ6IHJhdGluZy5pc0NvbXBsYWludCxcbiAgICAgICAgYXZlcmFnZVNjb3JlLFxuICAgICAgICBjcmVhdGVkQXQ6IHJhdGluZy5jcmVhdGVkQXQsXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcbiAgICAgIHRvdGFsUmF0aW5ncyxcbiAgICAgIGF2ZXJhZ2VSYXRpbmc6IE1hdGgucm91bmQoYXZlcmFnZVJhdGluZyAqIDEwKSAvIDEwLFxuICAgICAgc2F0aXNmYWN0aW9uUGVyY2VudGFnZSxcbiAgICAgIHRvdGFsQ29tcGxhaW50cyxcbiAgICAgIHRyZW5kRGF0YSxcbiAgICAgIHJlY2VudFJhdGluZ3MsXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgYWdlbnQgc3RhdHM6JywgZXJyb3IpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgIHsgZXJyb3I6ICdGYWlsZWQgdG8gZmV0Y2ggc3RhdGlzdGljcycgfSxcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgICk7XG4gIH1cbn0iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiZ2V0U2VydmVyU2Vzc2lvbiIsImF1dGhPcHRpb25zIiwicHJpc21hIiwiR0VUIiwicmVxdWVzdCIsInNlc3Npb24iLCJ1c2VyIiwicm9sZSIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsImFnZW50SWQiLCJpZCIsInJhdGluZ3MiLCJyYXRpbmciLCJmaW5kTWFueSIsIndoZXJlIiwiaW5jbHVkZSIsInJlc3BvbnNlcyIsIm9yZGVyQnkiLCJjcmVhdGVkQXQiLCJ0b3RhbFJhdGluZ3MiLCJsZW5ndGgiLCJ0b3RhbFNjb3JlIiwidG90YWxSZXNwb25zZXMiLCJmb3JFYWNoIiwicmVzcG9uc2UiLCJzY29yZSIsImF2ZXJhZ2VSYXRpbmciLCJzYXRpc2ZhY3Rpb25QZXJjZW50YWdlIiwiTWF0aCIsInJvdW5kIiwidG90YWxDb21wbGFpbnRzIiwiY291bnQiLCJpc0NvbXBsYWludCIsInRoaXJ0eURheXNBZ28iLCJEYXRlIiwic2V0RGF0ZSIsImdldERhdGUiLCJ0cmVuZFJhdGluZ3MiLCJndGUiLCJ0cmVuZE1hcCIsIk1hcCIsImRhdGUiLCJ0b0lTT1N0cmluZyIsInNwbGl0IiwiaGFzIiwic2V0IiwiZGF0YSIsImdldCIsInIiLCJ0cmVuZERhdGEiLCJBcnJheSIsImZyb20iLCJlbnRyaWVzIiwibWFwIiwidG9Mb2NhbGVEYXRlU3RyaW5nIiwibW9udGgiLCJkYXkiLCJhdmdSYXRpbmciLCJyZWNlbnRSYXRpbmdzIiwic2xpY2UiLCJyYXRpbmdUb3RhbFNjb3JlIiwiYXZlcmFnZVNjb3JlIiwiY3VzdG9tZXJOYW1lIiwiZmVlZGJhY2tUZXh0IiwiY29uc29sZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/dashboard/agent-stats/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _prisma__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./prisma */ \"(rsc)/./lib/prisma.ts\");\n\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    throw new Error(\"Please enter your email and password\");\n                }\n                const user = await _prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].user.findUnique({\n                    where: {\n                        email: credentials.email\n                    },\n                    include: {\n                        department: true\n                    }\n                });\n                if (!user) {\n                    throw new Error(\"No user found with this email\");\n                }\n                if (user.status === \"PENDING\") {\n                    throw new Error(\"Your account is pending approval\");\n                }\n                if (user.status === \"REJECTED\") {\n                    throw new Error(\"Your account has been rejected\");\n                }\n                const isPasswordValid = await bcrypt__WEBPACK_IMPORTED_MODULE_1___default().compare(credentials.password, user.password);\n                if (!isPasswordValid) {\n                    throw new Error(\"Invalid password\");\n                }\n                return {\n                    id: user.id,\n                    email: user.email,\n                    name: user.name,\n                    role: user.role,\n                    departmentId: user.departmentId,\n                    departmentName: user.department?.name,\n                    status: user.status\n                };\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.role = user.role;\n                token.departmentId = user.departmentId;\n                token.departmentName = user.departmentName;\n                token.status = user.status;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.id = token.id;\n                session.user.role = token.role;\n                session.user.departmentId = token.departmentId;\n                session.user.departmentName = token.departmentName;\n                session.user.status = token.status;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/auth/login\",\n        error: \"/auth/login\"\n    },\n    session: {\n        strategy: \"jwt\",\n        maxAge: 30 * 24 * 60 * 60\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0QXV0aE9wdGlvbnMgfSBmcm9tICduZXh0LWF1dGgnO1xuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSAnbmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFscyc7XG5pbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdCc7XG5pbXBvcnQgcHJpc21hIGZyb20gJy4vcHJpc21hJztcblxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zOiBOZXh0QXV0aE9wdGlvbnMgPSB7XG4gIHByb3ZpZGVyczogW1xuICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xuICAgICAgbmFtZTogJ0NyZWRlbnRpYWxzJyxcbiAgICAgIGNyZWRlbnRpYWxzOiB7XG4gICAgICAgIGVtYWlsOiB7IGxhYmVsOiAnRW1haWwnLCB0eXBlOiAnZW1haWwnIH0sXG4gICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiAnUGFzc3dvcmQnLCB0eXBlOiAncGFzc3dvcmQnIH0sXG4gICAgICB9LFxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XG4gICAgICAgIGlmICghY3JlZGVudGlhbHM/LmVtYWlsIHx8ICFjcmVkZW50aWFscz8ucGFzc3dvcmQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBlbnRlciB5b3VyIGVtYWlsIGFuZCBwYXNzd29yZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xuICAgICAgICAgIHdoZXJlOiB7IGVtYWlsOiBjcmVkZW50aWFscy5lbWFpbCB9LFxuICAgICAgICAgIGluY2x1ZGU6IHsgZGVwYXJ0bWVudDogdHJ1ZSB9LFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHVzZXIgZm91bmQgd2l0aCB0aGlzIGVtYWlsJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXNlci5zdGF0dXMgPT09ICdQRU5ESU5HJykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91ciBhY2NvdW50IGlzIHBlbmRpbmcgYXBwcm92YWwnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1c2VyLnN0YXR1cyA9PT0gJ1JFSkVDVEVEJykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91ciBhY2NvdW50IGhhcyBiZWVuIHJlamVjdGVkJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpc1Bhc3N3b3JkVmFsaWQgPSBhd2FpdCBiY3J5cHQuY29tcGFyZShcbiAgICAgICAgICBjcmVkZW50aWFscy5wYXNzd29yZCxcbiAgICAgICAgICB1c2VyLnBhc3N3b3JkXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKCFpc1Bhc3N3b3JkVmFsaWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgcGFzc3dvcmQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaWQ6IHVzZXIuaWQsXG4gICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICAgICAgbmFtZTogdXNlci5uYW1lLFxuICAgICAgICAgIHJvbGU6IHVzZXIucm9sZSxcbiAgICAgICAgICBkZXBhcnRtZW50SWQ6IHVzZXIuZGVwYXJ0bWVudElkLFxuICAgICAgICAgIGRlcGFydG1lbnROYW1lOiB1c2VyLmRlcGFydG1lbnQ/Lm5hbWUsXG4gICAgICAgICAgc3RhdHVzOiB1c2VyLnN0YXR1cyxcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGNhbGxiYWNrczoge1xuICAgIGFzeW5jIGp3dCh7IHRva2VuLCB1c2VyIH0pIHtcbiAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgIHRva2VuLmlkID0gdXNlci5pZDtcbiAgICAgICAgdG9rZW4ucm9sZSA9IHVzZXIucm9sZTtcbiAgICAgICAgdG9rZW4uZGVwYXJ0bWVudElkID0gdXNlci5kZXBhcnRtZW50SWQ7XG4gICAgICAgIHRva2VuLmRlcGFydG1lbnROYW1lID0gdXNlci5kZXBhcnRtZW50TmFtZTtcbiAgICAgICAgdG9rZW4uc3RhdHVzID0gdXNlci5zdGF0dXM7XG4gICAgICB9XG4gICAgICByZXR1cm4gdG9rZW47XG4gICAgfSxcbiAgICBhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdG9rZW4gfSkge1xuICAgICAgaWYgKHNlc3Npb24udXNlcikge1xuICAgICAgICBzZXNzaW9uLnVzZXIuaWQgPSB0b2tlbi5pZCBhcyBzdHJpbmc7XG4gICAgICAgIHNlc3Npb24udXNlci5yb2xlID0gdG9rZW4ucm9sZSBhcyBzdHJpbmc7XG4gICAgICAgIHNlc3Npb24udXNlci5kZXBhcnRtZW50SWQgPSB0b2tlbi5kZXBhcnRtZW50SWQgYXMgc3RyaW5nO1xuICAgICAgICBzZXNzaW9uLnVzZXIuZGVwYXJ0bWVudE5hbWUgPSB0b2tlbi5kZXBhcnRtZW50TmFtZSBhcyBzdHJpbmc7XG4gICAgICAgIHNlc3Npb24udXNlci5zdGF0dXMgPSB0b2tlbi5zdGF0dXMgYXMgc3RyaW5nO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlc3Npb247XG4gICAgfSxcbiAgfSxcbiAgcGFnZXM6IHtcbiAgICBzaWduSW46ICcvYXV0aC9sb2dpbicsXG4gICAgZXJyb3I6ICcvYXV0aC9sb2dpbicsXG4gIH0sXG4gIHNlc3Npb246IHtcbiAgICBzdHJhdGVneTogJ2p3dCcsXG4gICAgbWF4QWdlOiAzMCAqIDI0ICogNjAgKiA2MCwgLy8gMzAgZGF5c1xuICB9LFxuICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRBVVRIX1NFQ1JFVCxcbn07Il0sIm5hbWVzIjpbIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJiY3J5cHQiLCJwcmlzbWEiLCJhdXRoT3B0aW9ucyIsInByb3ZpZGVycyIsIm5hbWUiLCJjcmVkZW50aWFscyIsImVtYWlsIiwibGFiZWwiLCJ0eXBlIiwicGFzc3dvcmQiLCJhdXRob3JpemUiLCJFcnJvciIsInVzZXIiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJpbmNsdWRlIiwiZGVwYXJ0bWVudCIsInN0YXR1cyIsImlzUGFzc3dvcmRWYWxpZCIsImNvbXBhcmUiLCJpZCIsInJvbGUiLCJkZXBhcnRtZW50SWQiLCJkZXBhcnRtZW50TmFtZSIsImNhbGxiYWNrcyIsImp3dCIsInRva2VuIiwic2Vzc2lvbiIsInBhZ2VzIiwic2lnbkluIiwiZXJyb3IiLCJzdHJhdGVneSIsIm1heEFnZSIsInNlY3JldCIsInByb2Nlc3MiLCJlbnYiLCJORVhUQVVUSF9TRUNSRVQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/@panva","vendor-chunks/oidc-token-hash"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fdashboard%2Fagent-stats%2Froute&page=%2Fapi%2Fdashboard%2Fagent-stats%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fdashboard%2Fagent-stats%2Froute.ts&appDir=%2Fworkspaces%2Ffront-line-rating-v1-Revamp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fworkspaces%2Ffront-line-rating-v1-Revamp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();