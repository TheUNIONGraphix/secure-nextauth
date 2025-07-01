import require$$0, { createContext, useContext, useState, useEffect } from 'react';
import { jsx } from 'react/jsx-runtime';
import { getServerSession } from 'next-auth';

const SecureSessionContext = createContext({
    isAuthenticated: false,
});
const useSecureSession = () => {
    const context = useContext(SecureSessionContext);
    if (context === undefined) {
        throw new Error('useSecureSession must be used within a SecureSessionProvider');
    }
    return context;
};

function useAuthStatus(config) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const endpoint = (config === null || config === void 0 ? void 0 : config.authStatusEndpoint) || '/api/auth/status';
    const checkAuthStatus = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const newAuthStatus = data.isAuthenticated;
            setIsAuthenticated(newAuthStatus);
            // Call the optional callback
            if (config === null || config === void 0 ? void 0 : config.onAuthChange) {
                config.onAuthChange(newAuthStatus);
            }
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to check auth status';
            setError(errorMessage);
            setIsAuthenticated(false);
        }
        finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        checkAuthStatus();
    }, [endpoint]);
    return {
        isAuthenticated,
        isLoading,
        error,
        refetch: checkAuthStatus,
    };
}

function SecureSessionProvider({ children, isAuthenticated }) {
    return (jsx(SecureSessionContext.Provider, { value: { isAuthenticated }, children: children }));
}

var navigation$1 = {exports: {}};

var appRouterContext_sharedRuntime = {};

var _interop_require_default = {};

var hasRequired_interop_require_default;

function require_interop_require_default () {
	if (hasRequired_interop_require_default) return _interop_require_default;
	hasRequired_interop_require_default = 1;

	function _interop_require_default$1(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}
	_interop_require_default._ = _interop_require_default$1;
	return _interop_require_default;
}

var hasRequiredAppRouterContext_sharedRuntime;

function requireAppRouterContext_sharedRuntime () {
	if (hasRequiredAppRouterContext_sharedRuntime) return appRouterContext_sharedRuntime;
	hasRequiredAppRouterContext_sharedRuntime = 1;
	(function (exports) {
		'use client';
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    AppRouterContext: function() {
		        return AppRouterContext;
		    },
		    GlobalLayoutRouterContext: function() {
		        return GlobalLayoutRouterContext;
		    },
		    LayoutRouterContext: function() {
		        return LayoutRouterContext;
		    },
		    MissingSlotContext: function() {
		        return MissingSlotContext;
		    },
		    TemplateContext: function() {
		        return TemplateContext;
		    }
		});
		const _interop_require_default = /*@__PURE__*/ require_interop_require_default();
		const _react = /*#__PURE__*/ _interop_require_default._(require$$0);
		const AppRouterContext = _react.default.createContext(null);
		const LayoutRouterContext = _react.default.createContext(null);
		const GlobalLayoutRouterContext = _react.default.createContext(null);
		const TemplateContext = _react.default.createContext(null);
		if (process.env.NODE_ENV !== 'production') {
		    AppRouterContext.displayName = 'AppRouterContext';
		    LayoutRouterContext.displayName = 'LayoutRouterContext';
		    GlobalLayoutRouterContext.displayName = 'GlobalLayoutRouterContext';
		    TemplateContext.displayName = 'TemplateContext';
		}
		const MissingSlotContext = _react.default.createContext(new Set());

		
	} (appRouterContext_sharedRuntime));
	return appRouterContext_sharedRuntime;
}

var hooksClientContext_sharedRuntime = {};

var hasRequiredHooksClientContext_sharedRuntime;

function requireHooksClientContext_sharedRuntime () {
	if (hasRequiredHooksClientContext_sharedRuntime) return hooksClientContext_sharedRuntime;
	hasRequiredHooksClientContext_sharedRuntime = 1;
	(function (exports) {
		'use client';
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    PathParamsContext: function() {
		        return PathParamsContext;
		    },
		    PathnameContext: function() {
		        return PathnameContext;
		    },
		    SearchParamsContext: function() {
		        return SearchParamsContext;
		    }
		});
		const _react = require$$0;
		const SearchParamsContext = (0, _react.createContext)(null);
		const PathnameContext = (0, _react.createContext)(null);
		const PathParamsContext = (0, _react.createContext)(null);
		if (process.env.NODE_ENV !== 'production') {
		    SearchParamsContext.displayName = 'SearchParamsContext';
		    PathnameContext.displayName = 'PathnameContext';
		    PathParamsContext.displayName = 'PathParamsContext';
		}

		
	} (hooksClientContext_sharedRuntime));
	return hooksClientContext_sharedRuntime;
}

var getSegmentValue = {exports: {}};

var hasRequiredGetSegmentValue;

function requireGetSegmentValue () {
	if (hasRequiredGetSegmentValue) return getSegmentValue.exports;
	hasRequiredGetSegmentValue = 1;
	(function (module, exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "getSegmentValue", {
		    enumerable: true,
		    get: function() {
		        return getSegmentValue;
		    }
		});
		function getSegmentValue(segment) {
		    return Array.isArray(segment) ? segment[1] : segment;
		}

		if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
		  Object.defineProperty(exports.default, '__esModule', { value: true });
		  Object.assign(exports.default, exports);
		  module.exports = exports.default;
		}

		
	} (getSegmentValue, getSegmentValue.exports));
	return getSegmentValue.exports;
}

var segment = {};

var hasRequiredSegment;

function requireSegment () {
	if (hasRequiredSegment) return segment;
	hasRequiredSegment = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    DEFAULT_SEGMENT_KEY: function() {
		        return DEFAULT_SEGMENT_KEY;
		    },
		    PAGE_SEGMENT_KEY: function() {
		        return PAGE_SEGMENT_KEY;
		    },
		    addSearchParamsIfPageSegment: function() {
		        return addSearchParamsIfPageSegment;
		    },
		    isGroupSegment: function() {
		        return isGroupSegment;
		    },
		    isParallelRouteSegment: function() {
		        return isParallelRouteSegment;
		    }
		});
		function isGroupSegment(segment) {
		    // Use array[0] for performant purpose
		    return segment[0] === '(' && segment.endsWith(')');
		}
		function isParallelRouteSegment(segment) {
		    return segment.startsWith('@') && segment !== '@children';
		}
		function addSearchParamsIfPageSegment(segment, searchParams) {
		    const isPageSegment = segment.includes(PAGE_SEGMENT_KEY);
		    if (isPageSegment) {
		        const stringifiedQuery = JSON.stringify(searchParams);
		        return stringifiedQuery !== '{}' ? PAGE_SEGMENT_KEY + '?' + stringifiedQuery : PAGE_SEGMENT_KEY;
		    }
		    return segment;
		}
		const PAGE_SEGMENT_KEY = '__PAGE__';
		const DEFAULT_SEGMENT_KEY = '__DEFAULT__';

		
	} (segment));
	return segment;
}

var navigation_reactServer = {exports: {}};

var redirect = {exports: {}};

var redirectStatusCode = {exports: {}};

var hasRequiredRedirectStatusCode;

function requireRedirectStatusCode () {
	if (hasRequiredRedirectStatusCode) return redirectStatusCode.exports;
	hasRequiredRedirectStatusCode = 1;
	(function (module, exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "RedirectStatusCode", {
		    enumerable: true,
		    get: function() {
		        return RedirectStatusCode;
		    }
		});
		var RedirectStatusCode = /*#__PURE__*/ function(RedirectStatusCode) {
		    RedirectStatusCode[RedirectStatusCode["SeeOther"] = 303] = "SeeOther";
		    RedirectStatusCode[RedirectStatusCode["TemporaryRedirect"] = 307] = "TemporaryRedirect";
		    RedirectStatusCode[RedirectStatusCode["PermanentRedirect"] = 308] = "PermanentRedirect";
		    return RedirectStatusCode;
		}({});

		if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
		  Object.defineProperty(exports.default, '__esModule', { value: true });
		  Object.assign(exports.default, exports);
		  module.exports = exports.default;
		}

		
	} (redirectStatusCode, redirectStatusCode.exports));
	return redirectStatusCode.exports;
}

var redirectError = {exports: {}};

var hasRequiredRedirectError;

function requireRedirectError () {
	if (hasRequiredRedirectError) return redirectError.exports;
	hasRequiredRedirectError = 1;
	(function (module, exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    REDIRECT_ERROR_CODE: function() {
		        return REDIRECT_ERROR_CODE;
		    },
		    RedirectType: function() {
		        return RedirectType;
		    },
		    isRedirectError: function() {
		        return isRedirectError;
		    }
		});
		const _redirectstatuscode = requireRedirectStatusCode();
		const REDIRECT_ERROR_CODE = 'NEXT_REDIRECT';
		var RedirectType = /*#__PURE__*/ function(RedirectType) {
		    RedirectType["push"] = "push";
		    RedirectType["replace"] = "replace";
		    return RedirectType;
		}({});
		function isRedirectError(error) {
		    if (typeof error !== 'object' || error === null || !('digest' in error) || typeof error.digest !== 'string') {
		        return false;
		    }
		    const digest = error.digest.split(';');
		    const [errorCode, type] = digest;
		    const destination = digest.slice(2, -2).join(';');
		    const status = digest.at(-2);
		    const statusCode = Number(status);
		    return errorCode === REDIRECT_ERROR_CODE && (type === 'replace' || type === 'push') && typeof destination === 'string' && !isNaN(statusCode) && statusCode in _redirectstatuscode.RedirectStatusCode;
		}

		if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
		  Object.defineProperty(exports.default, '__esModule', { value: true });
		  Object.assign(exports.default, exports);
		  module.exports = exports.default;
		}

		
	} (redirectError, redirectError.exports));
	return redirectError.exports;
}

var actionAsyncStorage_external = {};

var actionAsyncStorageInstance = {};

var asyncLocalStorage = {};

var hasRequiredAsyncLocalStorage;

function requireAsyncLocalStorage () {
	if (hasRequiredAsyncLocalStorage) return asyncLocalStorage;
	hasRequiredAsyncLocalStorage = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    bindSnapshot: function() {
		        return bindSnapshot;
		    },
		    createAsyncLocalStorage: function() {
		        return createAsyncLocalStorage;
		    },
		    createSnapshot: function() {
		        return createSnapshot;
		    }
		});
		const sharedAsyncLocalStorageNotAvailableError = Object.defineProperty(new Error('Invariant: AsyncLocalStorage accessed in runtime where it is not available'), "__NEXT_ERROR_CODE", {
		    value: "E504",
		    enumerable: false,
		    configurable: true
		});
		class FakeAsyncLocalStorage {
		    disable() {
		        throw sharedAsyncLocalStorageNotAvailableError;
		    }
		    getStore() {
		        // This fake implementation of AsyncLocalStorage always returns `undefined`.
		        return undefined;
		    }
		    run() {
		        throw sharedAsyncLocalStorageNotAvailableError;
		    }
		    exit() {
		        throw sharedAsyncLocalStorageNotAvailableError;
		    }
		    enterWith() {
		        throw sharedAsyncLocalStorageNotAvailableError;
		    }
		    static bind(fn) {
		        return fn;
		    }
		}
		const maybeGlobalAsyncLocalStorage = typeof globalThis !== 'undefined' && globalThis.AsyncLocalStorage;
		function createAsyncLocalStorage() {
		    if (maybeGlobalAsyncLocalStorage) {
		        return new maybeGlobalAsyncLocalStorage();
		    }
		    return new FakeAsyncLocalStorage();
		}
		function bindSnapshot(fn) {
		    if (maybeGlobalAsyncLocalStorage) {
		        return maybeGlobalAsyncLocalStorage.bind(fn);
		    }
		    return FakeAsyncLocalStorage.bind(fn);
		}
		function createSnapshot() {
		    if (maybeGlobalAsyncLocalStorage) {
		        return maybeGlobalAsyncLocalStorage.snapshot();
		    }
		    return function(fn, ...args) {
		        return fn(...args);
		    };
		}

		
	} (asyncLocalStorage));
	return asyncLocalStorage;
}

var hasRequiredActionAsyncStorageInstance;

function requireActionAsyncStorageInstance () {
	if (hasRequiredActionAsyncStorageInstance) return actionAsyncStorageInstance;
	hasRequiredActionAsyncStorageInstance = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "actionAsyncStorageInstance", {
		    enumerable: true,
		    get: function() {
		        return actionAsyncStorageInstance;
		    }
		});
		const _asynclocalstorage = requireAsyncLocalStorage();
		const actionAsyncStorageInstance = (0, _asynclocalstorage.createAsyncLocalStorage)();

		
	} (actionAsyncStorageInstance));
	return actionAsyncStorageInstance;
}

var hasRequiredActionAsyncStorage_external;

function requireActionAsyncStorage_external () {
	if (hasRequiredActionAsyncStorage_external) return actionAsyncStorage_external;
	hasRequiredActionAsyncStorage_external = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "actionAsyncStorage", {
		    enumerable: true,
		    get: function() {
		        return _actionasyncstorageinstance.actionAsyncStorageInstance;
		    }
		});
		const _actionasyncstorageinstance = requireActionAsyncStorageInstance();

		
	} (actionAsyncStorage_external));
	return actionAsyncStorage_external;
}

var hasRequiredRedirect;

function requireRedirect () {
	if (hasRequiredRedirect) return redirect.exports;
	hasRequiredRedirect = 1;
	(function (module, exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    getRedirectError: function() {
		        return getRedirectError;
		    },
		    getRedirectStatusCodeFromError: function() {
		        return getRedirectStatusCodeFromError;
		    },
		    getRedirectTypeFromError: function() {
		        return getRedirectTypeFromError;
		    },
		    getURLFromRedirectError: function() {
		        return getURLFromRedirectError;
		    },
		    permanentRedirect: function() {
		        return permanentRedirect;
		    },
		    redirect: function() {
		        return redirect;
		    }
		});
		const _redirectstatuscode = requireRedirectStatusCode();
		const _redirecterror = requireRedirectError();
		const actionAsyncStorage = typeof window === 'undefined' ? requireActionAsyncStorage_external().actionAsyncStorage : undefined;
		function getRedirectError(url, type, statusCode) {
		    if (statusCode === void 0) statusCode = _redirectstatuscode.RedirectStatusCode.TemporaryRedirect;
		    const error = Object.defineProperty(new Error(_redirecterror.REDIRECT_ERROR_CODE), "__NEXT_ERROR_CODE", {
		        value: "E394",
		        enumerable: false,
		        configurable: true
		    });
		    error.digest = _redirecterror.REDIRECT_ERROR_CODE + ";" + type + ";" + url + ";" + statusCode + ";";
		    return error;
		}
		function redirect(/** The URL to redirect to */ url, type) {
		    var _actionAsyncStorage_getStore;
		    type != null ? type : type = (actionAsyncStorage == null ? void 0 : (_actionAsyncStorage_getStore = actionAsyncStorage.getStore()) == null ? void 0 : _actionAsyncStorage_getStore.isAction) ? _redirecterror.RedirectType.push : _redirecterror.RedirectType.replace;
		    throw getRedirectError(url, type, _redirectstatuscode.RedirectStatusCode.TemporaryRedirect);
		}
		function permanentRedirect(/** The URL to redirect to */ url, type) {
		    if (type === void 0) type = _redirecterror.RedirectType.replace;
		    throw getRedirectError(url, type, _redirectstatuscode.RedirectStatusCode.PermanentRedirect);
		}
		function getURLFromRedirectError(error) {
		    if (!(0, _redirecterror.isRedirectError)(error)) return null;
		    // Slices off the beginning of the digest that contains the code and the
		    // separating ';'.
		    return error.digest.split(';').slice(2, -2).join(';');
		}
		function getRedirectTypeFromError(error) {
		    if (!(0, _redirecterror.isRedirectError)(error)) {
		        throw Object.defineProperty(new Error('Not a redirect error'), "__NEXT_ERROR_CODE", {
		            value: "E260",
		            enumerable: false,
		            configurable: true
		        });
		    }
		    return error.digest.split(';', 2)[1];
		}
		function getRedirectStatusCodeFromError(error) {
		    if (!(0, _redirecterror.isRedirectError)(error)) {
		        throw Object.defineProperty(new Error('Not a redirect error'), "__NEXT_ERROR_CODE", {
		            value: "E260",
		            enumerable: false,
		            configurable: true
		        });
		    }
		    return Number(error.digest.split(';').at(-2));
		}

		if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
		  Object.defineProperty(exports.default, '__esModule', { value: true });
		  Object.assign(exports.default, exports);
		  module.exports = exports.default;
		}

		
	} (redirect, redirect.exports));
	return redirect.exports;
}

var notFound = {exports: {}};

var httpAccessFallback = {exports: {}};

var hasRequiredHttpAccessFallback;

function requireHttpAccessFallback () {
	if (hasRequiredHttpAccessFallback) return httpAccessFallback.exports;
	hasRequiredHttpAccessFallback = 1;
	(function (module, exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    HTTPAccessErrorStatus: function() {
		        return HTTPAccessErrorStatus;
		    },
		    HTTP_ERROR_FALLBACK_ERROR_CODE: function() {
		        return HTTP_ERROR_FALLBACK_ERROR_CODE;
		    },
		    getAccessFallbackErrorTypeByStatus: function() {
		        return getAccessFallbackErrorTypeByStatus;
		    },
		    getAccessFallbackHTTPStatus: function() {
		        return getAccessFallbackHTTPStatus;
		    },
		    isHTTPAccessFallbackError: function() {
		        return isHTTPAccessFallbackError;
		    }
		});
		const HTTPAccessErrorStatus = {
		    NOT_FOUND: 404,
		    FORBIDDEN: 403,
		    UNAUTHORIZED: 401
		};
		const ALLOWED_CODES = new Set(Object.values(HTTPAccessErrorStatus));
		const HTTP_ERROR_FALLBACK_ERROR_CODE = 'NEXT_HTTP_ERROR_FALLBACK';
		function isHTTPAccessFallbackError(error) {
		    if (typeof error !== 'object' || error === null || !('digest' in error) || typeof error.digest !== 'string') {
		        return false;
		    }
		    const [prefix, httpStatus] = error.digest.split(';');
		    return prefix === HTTP_ERROR_FALLBACK_ERROR_CODE && ALLOWED_CODES.has(Number(httpStatus));
		}
		function getAccessFallbackHTTPStatus(error) {
		    const httpStatus = error.digest.split(';')[1];
		    return Number(httpStatus);
		}
		function getAccessFallbackErrorTypeByStatus(status) {
		    switch(status){
		        case 401:
		            return 'unauthorized';
		        case 403:
		            return 'forbidden';
		        case 404:
		            return 'not-found';
		        default:
		            return;
		    }
		}

		if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
		  Object.defineProperty(exports.default, '__esModule', { value: true });
		  Object.assign(exports.default, exports);
		  module.exports = exports.default;
		}

		
	} (httpAccessFallback, httpAccessFallback.exports));
	return httpAccessFallback.exports;
}

var hasRequiredNotFound;

function requireNotFound () {
	if (hasRequiredNotFound) return notFound.exports;
	hasRequiredNotFound = 1;
	(function (module, exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "notFound", {
		    enumerable: true,
		    get: function() {
		        return notFound;
		    }
		});
		const _httpaccessfallback = requireHttpAccessFallback();
		/**
		 * This function allows you to render the [not-found.js file](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)
		 * within a route segment as well as inject a tag.
		 *
		 * `notFound()` can be used in
		 * [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components),
		 * [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and
		 * [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).
		 *
		 * - In a Server Component, this will insert a `<meta name="robots" content="noindex" />` meta tag and set the status code to 404.
		 * - In a Route Handler or Server Action, it will serve a 404 to the caller.
		 *
		 * Read more: [Next.js Docs: `notFound`](https://nextjs.org/docs/app/api-reference/functions/not-found)
		 */ const DIGEST = "" + _httpaccessfallback.HTTP_ERROR_FALLBACK_ERROR_CODE + ";404";
		function notFound() {
		    // eslint-disable-next-line no-throw-literal
		    const error = Object.defineProperty(new Error(DIGEST), "__NEXT_ERROR_CODE", {
		        value: "E394",
		        enumerable: false,
		        configurable: true
		    });
		    error.digest = DIGEST;
		    throw error;
		}

		if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
		  Object.defineProperty(exports.default, '__esModule', { value: true });
		  Object.assign(exports.default, exports);
		  module.exports = exports.default;
		}

		
	} (notFound, notFound.exports));
	return notFound.exports;
}

var forbidden = {exports: {}};

var hasRequiredForbidden;

function requireForbidden () {
	if (hasRequiredForbidden) return forbidden.exports;
	hasRequiredForbidden = 1;
	(function (module, exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "forbidden", {
		    enumerable: true,
		    get: function() {
		        return forbidden;
		    }
		});
		const _httpaccessfallback = requireHttpAccessFallback();
		// TODO: Add `forbidden` docs
		/**
		 * @experimental
		 * This function allows you to render the [forbidden.js file](https://nextjs.org/docs/app/api-reference/file-conventions/forbidden)
		 * within a route segment as well as inject a tag.
		 *
		 * `forbidden()` can be used in
		 * [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components),
		 * [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and
		 * [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).
		 *
		 * Read more: [Next.js Docs: `forbidden`](https://nextjs.org/docs/app/api-reference/functions/forbidden)
		 */ const DIGEST = "" + _httpaccessfallback.HTTP_ERROR_FALLBACK_ERROR_CODE + ";403";
		function forbidden() {
		    if (!process.env.__NEXT_EXPERIMENTAL_AUTH_INTERRUPTS) {
		        throw Object.defineProperty(new Error("`forbidden()` is experimental and only allowed to be enabled when `experimental.authInterrupts` is enabled."), "__NEXT_ERROR_CODE", {
		            value: "E488",
		            enumerable: false,
		            configurable: true
		        });
		    }
		    // eslint-disable-next-line no-throw-literal
		    const error = Object.defineProperty(new Error(DIGEST), "__NEXT_ERROR_CODE", {
		        value: "E394",
		        enumerable: false,
		        configurable: true
		    });
		    error.digest = DIGEST;
		    throw error;
		}

		if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
		  Object.defineProperty(exports.default, '__esModule', { value: true });
		  Object.assign(exports.default, exports);
		  module.exports = exports.default;
		}

		
	} (forbidden, forbidden.exports));
	return forbidden.exports;
}

var unauthorized = {exports: {}};

var hasRequiredUnauthorized;

function requireUnauthorized () {
	if (hasRequiredUnauthorized) return unauthorized.exports;
	hasRequiredUnauthorized = 1;
	(function (module, exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "unauthorized", {
		    enumerable: true,
		    get: function() {
		        return unauthorized;
		    }
		});
		const _httpaccessfallback = requireHttpAccessFallback();
		// TODO: Add `unauthorized` docs
		/**
		 * @experimental
		 * This function allows you to render the [unauthorized.js file](https://nextjs.org/docs/app/api-reference/file-conventions/unauthorized)
		 * within a route segment as well as inject a tag.
		 *
		 * `unauthorized()` can be used in
		 * [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components),
		 * [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and
		 * [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).
		 *
		 *
		 * Read more: [Next.js Docs: `unauthorized`](https://nextjs.org/docs/app/api-reference/functions/unauthorized)
		 */ const DIGEST = "" + _httpaccessfallback.HTTP_ERROR_FALLBACK_ERROR_CODE + ";401";
		function unauthorized() {
		    if (!process.env.__NEXT_EXPERIMENTAL_AUTH_INTERRUPTS) {
		        throw Object.defineProperty(new Error("`unauthorized()` is experimental and only allowed to be used when `experimental.authInterrupts` is enabled."), "__NEXT_ERROR_CODE", {
		            value: "E411",
		            enumerable: false,
		            configurable: true
		        });
		    }
		    // eslint-disable-next-line no-throw-literal
		    const error = Object.defineProperty(new Error(DIGEST), "__NEXT_ERROR_CODE", {
		        value: "E394",
		        enumerable: false,
		        configurable: true
		    });
		    error.digest = DIGEST;
		    throw error;
		}

		if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
		  Object.defineProperty(exports.default, '__esModule', { value: true });
		  Object.assign(exports.default, exports);
		  module.exports = exports.default;
		}

		
	} (unauthorized, unauthorized.exports));
	return unauthorized.exports;
}

var unstableRethrow = {exports: {}};

var unstableRethrow_server = {exports: {}};

var dynamicRenderingUtils = {};

var hasRequiredDynamicRenderingUtils;

function requireDynamicRenderingUtils () {
	if (hasRequiredDynamicRenderingUtils) return dynamicRenderingUtils;
	hasRequiredDynamicRenderingUtils = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    isHangingPromiseRejectionError: function() {
		        return isHangingPromiseRejectionError;
		    },
		    makeHangingPromise: function() {
		        return makeHangingPromise;
		    }
		});
		function isHangingPromiseRejectionError(err) {
		    if (typeof err !== 'object' || err === null || !('digest' in err)) {
		        return false;
		    }
		    return err.digest === HANGING_PROMISE_REJECTION;
		}
		const HANGING_PROMISE_REJECTION = 'HANGING_PROMISE_REJECTION';
		class HangingPromiseRejectionError extends Error {
		    constructor(expression){
		        super(`During prerendering, ${expression} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${expression} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context.`), this.expression = expression, this.digest = HANGING_PROMISE_REJECTION;
		    }
		}
		const abortListenersBySignal = new WeakMap();
		function makeHangingPromise(signal, expression) {
		    if (signal.aborted) {
		        return Promise.reject(new HangingPromiseRejectionError(expression));
		    } else {
		        const hangingPromise = new Promise((_, reject)=>{
		            const boundRejection = reject.bind(null, new HangingPromiseRejectionError(expression));
		            let currentListeners = abortListenersBySignal.get(signal);
		            if (currentListeners) {
		                currentListeners.push(boundRejection);
		            } else {
		                const listeners = [
		                    boundRejection
		                ];
		                abortListenersBySignal.set(signal, listeners);
		                signal.addEventListener('abort', ()=>{
		                    for(let i = 0; i < listeners.length; i++){
		                        listeners[i]();
		                    }
		                }, {
		                    once: true
		                });
		            }
		        });
		        // We are fine if no one actually awaits this promise. We shouldn't consider this an unhandled rejection so
		        // we attach a noop catch handler here to suppress this warning. If you actually await somewhere or construct
		        // your own promise out of it you'll need to ensure you handle the error when it rejects.
		        hangingPromise.catch(ignoreReject);
		        return hangingPromise;
		    }
		}
		function ignoreReject() {}

		
	} (dynamicRenderingUtils));
	return dynamicRenderingUtils;
}

var isPostpone = {};

var hasRequiredIsPostpone;

function requireIsPostpone () {
	if (hasRequiredIsPostpone) return isPostpone;
	hasRequiredIsPostpone = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "isPostpone", {
		    enumerable: true,
		    get: function() {
		        return isPostpone;
		    }
		});
		const REACT_POSTPONE_TYPE = Symbol.for('react.postpone');
		function isPostpone(error) {
		    return typeof error === 'object' && error !== null && error.$$typeof === REACT_POSTPONE_TYPE;
		}

		
	} (isPostpone));
	return isPostpone;
}

var bailoutToCsr = {};

var hasRequiredBailoutToCsr;

function requireBailoutToCsr () {
	if (hasRequiredBailoutToCsr) return bailoutToCsr;
	hasRequiredBailoutToCsr = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    BailoutToCSRError: function() {
		        return BailoutToCSRError;
		    },
		    isBailoutToCSRError: function() {
		        return isBailoutToCSRError;
		    }
		});
		const BAILOUT_TO_CSR = 'BAILOUT_TO_CLIENT_SIDE_RENDERING';
		class BailoutToCSRError extends Error {
		    constructor(reason){
		        super("Bail out to client-side rendering: " + reason), this.reason = reason, this.digest = BAILOUT_TO_CSR;
		    }
		}
		function isBailoutToCSRError(err) {
		    if (typeof err !== 'object' || err === null || !('digest' in err)) {
		        return false;
		    }
		    return err.digest === BAILOUT_TO_CSR;
		}

		
	} (bailoutToCsr));
	return bailoutToCsr;
}

var isNextRouterError = {exports: {}};

var hasRequiredIsNextRouterError;

function requireIsNextRouterError () {
	if (hasRequiredIsNextRouterError) return isNextRouterError.exports;
	hasRequiredIsNextRouterError = 1;
	(function (module, exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "isNextRouterError", {
		    enumerable: true,
		    get: function() {
		        return isNextRouterError;
		    }
		});
		const _httpaccessfallback = requireHttpAccessFallback();
		const _redirecterror = requireRedirectError();
		function isNextRouterError(error) {
		    return (0, _redirecterror.isRedirectError)(error) || (0, _httpaccessfallback.isHTTPAccessFallbackError)(error);
		}

		if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
		  Object.defineProperty(exports.default, '__esModule', { value: true });
		  Object.assign(exports.default, exports);
		  module.exports = exports.default;
		}

		
	} (isNextRouterError, isNextRouterError.exports));
	return isNextRouterError.exports;
}

var dynamicRendering = {};

var hooksServerContext = {exports: {}};

var hasRequiredHooksServerContext;

function requireHooksServerContext () {
	if (hasRequiredHooksServerContext) return hooksServerContext.exports;
	hasRequiredHooksServerContext = 1;
	(function (module, exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    DynamicServerError: function() {
		        return DynamicServerError;
		    },
		    isDynamicServerError: function() {
		        return isDynamicServerError;
		    }
		});
		const DYNAMIC_ERROR_CODE = 'DYNAMIC_SERVER_USAGE';
		class DynamicServerError extends Error {
		    constructor(description){
		        super("Dynamic server usage: " + description), this.description = description, this.digest = DYNAMIC_ERROR_CODE;
		    }
		}
		function isDynamicServerError(err) {
		    if (typeof err !== 'object' || err === null || !('digest' in err) || typeof err.digest !== 'string') {
		        return false;
		    }
		    return err.digest === DYNAMIC_ERROR_CODE;
		}

		if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
		  Object.defineProperty(exports.default, '__esModule', { value: true });
		  Object.assign(exports.default, exports);
		  module.exports = exports.default;
		}

		
	} (hooksServerContext, hooksServerContext.exports));
	return hooksServerContext.exports;
}

var staticGenerationBailout = {exports: {}};

var hasRequiredStaticGenerationBailout;

function requireStaticGenerationBailout () {
	if (hasRequiredStaticGenerationBailout) return staticGenerationBailout.exports;
	hasRequiredStaticGenerationBailout = 1;
	(function (module, exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    StaticGenBailoutError: function() {
		        return StaticGenBailoutError;
		    },
		    isStaticGenBailoutError: function() {
		        return isStaticGenBailoutError;
		    }
		});
		const NEXT_STATIC_GEN_BAILOUT = 'NEXT_STATIC_GEN_BAILOUT';
		class StaticGenBailoutError extends Error {
		    constructor(...args){
		        super(...args), this.code = NEXT_STATIC_GEN_BAILOUT;
		    }
		}
		function isStaticGenBailoutError(error) {
		    if (typeof error !== 'object' || error === null || !('code' in error)) {
		        return false;
		    }
		    return error.code === NEXT_STATIC_GEN_BAILOUT;
		}

		if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
		  Object.defineProperty(exports.default, '__esModule', { value: true });
		  Object.assign(exports.default, exports);
		  module.exports = exports.default;
		}

		
	} (staticGenerationBailout, staticGenerationBailout.exports));
	return staticGenerationBailout.exports;
}

var workUnitAsyncStorage_external = {};

var workUnitAsyncStorageInstance = {};

var hasRequiredWorkUnitAsyncStorageInstance;

function requireWorkUnitAsyncStorageInstance () {
	if (hasRequiredWorkUnitAsyncStorageInstance) return workUnitAsyncStorageInstance;
	hasRequiredWorkUnitAsyncStorageInstance = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "workUnitAsyncStorageInstance", {
		    enumerable: true,
		    get: function() {
		        return workUnitAsyncStorageInstance;
		    }
		});
		const _asynclocalstorage = requireAsyncLocalStorage();
		const workUnitAsyncStorageInstance = (0, _asynclocalstorage.createAsyncLocalStorage)();

		
	} (workUnitAsyncStorageInstance));
	return workUnitAsyncStorageInstance;
}

var appRouterHeaders = {exports: {}};

var hasRequiredAppRouterHeaders;

function requireAppRouterHeaders () {
	if (hasRequiredAppRouterHeaders) return appRouterHeaders.exports;
	hasRequiredAppRouterHeaders = 1;
	(function (module, exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    ACTION_HEADER: function() {
		        return ACTION_HEADER;
		    },
		    FLIGHT_HEADERS: function() {
		        return FLIGHT_HEADERS;
		    },
		    NEXT_DID_POSTPONE_HEADER: function() {
		        return NEXT_DID_POSTPONE_HEADER;
		    },
		    NEXT_HMR_REFRESH_HASH_COOKIE: function() {
		        return NEXT_HMR_REFRESH_HASH_COOKIE;
		    },
		    NEXT_HMR_REFRESH_HEADER: function() {
		        return NEXT_HMR_REFRESH_HEADER;
		    },
		    NEXT_IS_PRERENDER_HEADER: function() {
		        return NEXT_IS_PRERENDER_HEADER;
		    },
		    NEXT_REWRITTEN_PATH_HEADER: function() {
		        return NEXT_REWRITTEN_PATH_HEADER;
		    },
		    NEXT_REWRITTEN_QUERY_HEADER: function() {
		        return NEXT_REWRITTEN_QUERY_HEADER;
		    },
		    NEXT_ROUTER_PREFETCH_HEADER: function() {
		        return NEXT_ROUTER_PREFETCH_HEADER;
		    },
		    NEXT_ROUTER_SEGMENT_PREFETCH_HEADER: function() {
		        return NEXT_ROUTER_SEGMENT_PREFETCH_HEADER;
		    },
		    NEXT_ROUTER_STALE_TIME_HEADER: function() {
		        return NEXT_ROUTER_STALE_TIME_HEADER;
		    },
		    NEXT_ROUTER_STATE_TREE_HEADER: function() {
		        return NEXT_ROUTER_STATE_TREE_HEADER;
		    },
		    NEXT_RSC_UNION_QUERY: function() {
		        return NEXT_RSC_UNION_QUERY;
		    },
		    NEXT_URL: function() {
		        return NEXT_URL;
		    },
		    RSC_CONTENT_TYPE_HEADER: function() {
		        return RSC_CONTENT_TYPE_HEADER;
		    },
		    RSC_HEADER: function() {
		        return RSC_HEADER;
		    }
		});
		const RSC_HEADER = 'RSC';
		const ACTION_HEADER = 'Next-Action';
		const NEXT_ROUTER_STATE_TREE_HEADER = 'Next-Router-State-Tree';
		const NEXT_ROUTER_PREFETCH_HEADER = 'Next-Router-Prefetch';
		const NEXT_ROUTER_SEGMENT_PREFETCH_HEADER = 'Next-Router-Segment-Prefetch';
		const NEXT_HMR_REFRESH_HEADER = 'Next-HMR-Refresh';
		const NEXT_HMR_REFRESH_HASH_COOKIE = '__next_hmr_refresh_hash__';
		const NEXT_URL = 'Next-Url';
		const RSC_CONTENT_TYPE_HEADER = 'text/x-component';
		const FLIGHT_HEADERS = [
		    RSC_HEADER,
		    NEXT_ROUTER_STATE_TREE_HEADER,
		    NEXT_ROUTER_PREFETCH_HEADER,
		    NEXT_HMR_REFRESH_HEADER,
		    NEXT_ROUTER_SEGMENT_PREFETCH_HEADER
		];
		const NEXT_RSC_UNION_QUERY = '_rsc';
		const NEXT_ROUTER_STALE_TIME_HEADER = 'x-nextjs-stale-time';
		const NEXT_DID_POSTPONE_HEADER = 'x-nextjs-postponed';
		const NEXT_REWRITTEN_PATH_HEADER = 'x-nextjs-rewritten-path';
		const NEXT_REWRITTEN_QUERY_HEADER = 'x-nextjs-rewritten-query';
		const NEXT_IS_PRERENDER_HEADER = 'x-nextjs-prerender';

		if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
		  Object.defineProperty(exports.default, '__esModule', { value: true });
		  Object.assign(exports.default, exports);
		  module.exports = exports.default;
		}

		
	} (appRouterHeaders, appRouterHeaders.exports));
	return appRouterHeaders.exports;
}

var hasRequiredWorkUnitAsyncStorage_external;

function requireWorkUnitAsyncStorage_external () {
	if (hasRequiredWorkUnitAsyncStorage_external) return workUnitAsyncStorage_external;
	hasRequiredWorkUnitAsyncStorage_external = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    getDraftModeProviderForCacheScope: function() {
		        return getDraftModeProviderForCacheScope;
		    },
		    getExpectedRequestStore: function() {
		        return getExpectedRequestStore;
		    },
		    getHmrRefreshHash: function() {
		        return getHmrRefreshHash;
		    },
		    getPrerenderResumeDataCache: function() {
		        return getPrerenderResumeDataCache;
		    },
		    getRenderResumeDataCache: function() {
		        return getRenderResumeDataCache;
		    },
		    throwForMissingRequestStore: function() {
		        return throwForMissingRequestStore;
		    },
		    workUnitAsyncStorage: function() {
		        return _workunitasyncstorageinstance.workUnitAsyncStorageInstance;
		    }
		});
		const _workunitasyncstorageinstance = requireWorkUnitAsyncStorageInstance();
		const _approuterheaders = requireAppRouterHeaders();
		function getExpectedRequestStore(callingExpression) {
		    const workUnitStore = _workunitasyncstorageinstance.workUnitAsyncStorageInstance.getStore();
		    if (!workUnitStore) {
		        throwForMissingRequestStore(callingExpression);
		    }
		    switch(workUnitStore.type){
		        case 'request':
		            return workUnitStore;
		        case 'prerender':
		        case 'prerender-ppr':
		        case 'prerender-legacy':
		            // This should not happen because we should have checked it already.
		            throw Object.defineProperty(new Error(`\`${callingExpression}\` cannot be called inside a prerender. This is a bug in Next.js.`), "__NEXT_ERROR_CODE", {
		                value: "E401",
		                enumerable: false,
		                configurable: true
		            });
		        case 'cache':
		            throw Object.defineProperty(new Error(`\`${callingExpression}\` cannot be called inside "use cache". Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
		                value: "E37",
		                enumerable: false,
		                configurable: true
		            });
		        case 'unstable-cache':
		            throw Object.defineProperty(new Error(`\`${callingExpression}\` cannot be called inside unstable_cache. Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", {
		                value: "E69",
		                enumerable: false,
		                configurable: true
		            });
		        default:
		            const _exhaustiveCheck = workUnitStore;
		            return _exhaustiveCheck;
		    }
		}
		function throwForMissingRequestStore(callingExpression) {
		    throw Object.defineProperty(new Error(`\`${callingExpression}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", {
		        value: "E251",
		        enumerable: false,
		        configurable: true
		    });
		}
		function getPrerenderResumeDataCache(workUnitStore) {
		    if (workUnitStore.type === 'prerender' || workUnitStore.type === 'prerender-ppr') {
		        return workUnitStore.prerenderResumeDataCache;
		    }
		    return null;
		}
		function getRenderResumeDataCache(workUnitStore) {
		    if (workUnitStore.type !== 'prerender-legacy' && workUnitStore.type !== 'cache' && workUnitStore.type !== 'unstable-cache') {
		        if (workUnitStore.type === 'request') {
		            return workUnitStore.renderResumeDataCache;
		        }
		        // We return the mutable resume data cache here as an immutable version of
		        // the cache as it can also be used for reading.
		        return workUnitStore.prerenderResumeDataCache;
		    }
		    return null;
		}
		function getHmrRefreshHash(workStore, workUnitStore) {
		    var _workUnitStore_cookies_get;
		    if (!workStore.dev) {
		        return undefined;
		    }
		    return workUnitStore.type === 'cache' || workUnitStore.type === 'prerender' ? workUnitStore.hmrRefreshHash : workUnitStore.type === 'request' ? (_workUnitStore_cookies_get = workUnitStore.cookies.get(_approuterheaders.NEXT_HMR_REFRESH_HASH_COOKIE)) == null ? void 0 : _workUnitStore_cookies_get.value : undefined;
		}
		function getDraftModeProviderForCacheScope(workStore, workUnitStore) {
		    if (workStore.isDraftMode) {
		        switch(workUnitStore.type){
		            case 'cache':
		            case 'unstable-cache':
		            case 'request':
		                return workUnitStore.draftMode;
		            default:
		                return undefined;
		        }
		    }
		    return undefined;
		}

		
	} (workUnitAsyncStorage_external));
	return workUnitAsyncStorage_external;
}

var workAsyncStorage_external = {};

var workAsyncStorageInstance = {};

var hasRequiredWorkAsyncStorageInstance;

function requireWorkAsyncStorageInstance () {
	if (hasRequiredWorkAsyncStorageInstance) return workAsyncStorageInstance;
	hasRequiredWorkAsyncStorageInstance = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "workAsyncStorageInstance", {
		    enumerable: true,
		    get: function() {
		        return workAsyncStorageInstance;
		    }
		});
		const _asynclocalstorage = requireAsyncLocalStorage();
		const workAsyncStorageInstance = (0, _asynclocalstorage.createAsyncLocalStorage)();

		
	} (workAsyncStorageInstance));
	return workAsyncStorageInstance;
}

var hasRequiredWorkAsyncStorage_external;

function requireWorkAsyncStorage_external () {
	if (hasRequiredWorkAsyncStorage_external) return workAsyncStorage_external;
	hasRequiredWorkAsyncStorage_external = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "workAsyncStorage", {
		    enumerable: true,
		    get: function() {
		        return _workasyncstorageinstance.workAsyncStorageInstance;
		    }
		});
		const _workasyncstorageinstance = requireWorkAsyncStorageInstance();

		
	} (workAsyncStorage_external));
	return workAsyncStorage_external;
}

var metadataConstants = {};

var hasRequiredMetadataConstants;

function requireMetadataConstants () {
	if (hasRequiredMetadataConstants) return metadataConstants;
	hasRequiredMetadataConstants = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    METADATA_BOUNDARY_NAME: function() {
		        return METADATA_BOUNDARY_NAME;
		    },
		    OUTLET_BOUNDARY_NAME: function() {
		        return OUTLET_BOUNDARY_NAME;
		    },
		    VIEWPORT_BOUNDARY_NAME: function() {
		        return VIEWPORT_BOUNDARY_NAME;
		    }
		});
		const METADATA_BOUNDARY_NAME = '__next_metadata_boundary__';
		const VIEWPORT_BOUNDARY_NAME = '__next_viewport_boundary__';
		const OUTLET_BOUNDARY_NAME = '__next_outlet_boundary__';

		
	} (metadataConstants));
	return metadataConstants;
}

var scheduler = {};

var hasRequiredScheduler;

function requireScheduler () {
	if (hasRequiredScheduler) return scheduler;
	hasRequiredScheduler = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    atLeastOneTask: function() {
		        return atLeastOneTask;
		    },
		    scheduleImmediate: function() {
		        return scheduleImmediate;
		    },
		    scheduleOnNextTick: function() {
		        return scheduleOnNextTick;
		    },
		    waitAtLeastOneReactRenderTask: function() {
		        return waitAtLeastOneReactRenderTask;
		    }
		});
		const scheduleOnNextTick = (cb)=>{
		    // We use Promise.resolve().then() here so that the operation is scheduled at
		    // the end of the promise job queue, we then add it to the next process tick
		    // to ensure it's evaluated afterwards.
		    //
		    // This was inspired by the implementation of the DataLoader interface: https://github.com/graphql/dataloader/blob/d336bd15282664e0be4b4a657cb796f09bafbc6b/src/index.js#L213-L255
		    //
		    Promise.resolve().then(()=>{
		        if (process.env.NEXT_RUNTIME === 'edge') {
		            setTimeout(cb, 0);
		        } else {
		            process.nextTick(cb);
		        }
		    });
		};
		const scheduleImmediate = (cb)=>{
		    if (process.env.NEXT_RUNTIME === 'edge') {
		        setTimeout(cb, 0);
		    } else {
		        setImmediate(cb);
		    }
		};
		function atLeastOneTask() {
		    return new Promise((resolve)=>scheduleImmediate(resolve));
		}
		function waitAtLeastOneReactRenderTask() {
		    if (process.env.NEXT_RUNTIME === 'edge') {
		        return new Promise((r)=>setTimeout(r, 0));
		    } else {
		        return new Promise((r)=>setImmediate(r));
		    }
		}

		
	} (scheduler));
	return scheduler;
}

/**
 * The functions provided by this module are used to communicate certain properties
 * about the currently running code so that Next.js can make decisions on how to handle
 * the current execution in different rendering modes such as pre-rendering, resuming, and SSR.
 *
 * Today Next.js treats all code as potentially static. Certain APIs may only make sense when dynamically rendering.
 * Traditionally this meant deopting the entire render to dynamic however with PPR we can now deopt parts
 * of a React tree as dynamic while still keeping other parts static. There are really two different kinds of
 * Dynamic indications.
 *
 * The first is simply an intention to be dynamic. unstable_noStore is an example of this where
 * the currently executing code simply declares that the current scope is dynamic but if you use it
 * inside unstable_cache it can still be cached. This type of indication can be removed if we ever
 * make the default dynamic to begin with because the only way you would ever be static is inside
 * a cache scope which this indication does not affect.
 *
 * The second is an indication that a dynamic data source was read. This is a stronger form of dynamic
 * because it means that it is inappropriate to cache this at all. using a dynamic data source inside
 * unstable_cache should error. If you want to use some dynamic data inside unstable_cache you should
 * read that data outside the cache and pass it in as an argument to the cached function.
 */

var hasRequiredDynamicRendering;

function requireDynamicRendering () {
	if (hasRequiredDynamicRendering) return dynamicRendering;
	hasRequiredDynamicRendering = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    Postpone: function() {
		        return Postpone;
		    },
		    abortAndThrowOnSynchronousRequestDataAccess: function() {
		        return abortAndThrowOnSynchronousRequestDataAccess;
		    },
		    abortOnSynchronousPlatformIOAccess: function() {
		        return abortOnSynchronousPlatformIOAccess;
		    },
		    accessedDynamicData: function() {
		        return accessedDynamicData;
		    },
		    annotateDynamicAccess: function() {
		        return annotateDynamicAccess;
		    },
		    consumeDynamicAccess: function() {
		        return consumeDynamicAccess;
		    },
		    createDynamicTrackingState: function() {
		        return createDynamicTrackingState;
		    },
		    createDynamicValidationState: function() {
		        return createDynamicValidationState;
		    },
		    createHangingInputAbortSignal: function() {
		        return createHangingInputAbortSignal;
		    },
		    createPostponedAbortSignal: function() {
		        return createPostponedAbortSignal;
		    },
		    formatDynamicAPIAccesses: function() {
		        return formatDynamicAPIAccesses;
		    },
		    getFirstDynamicReason: function() {
		        return getFirstDynamicReason;
		    },
		    isDynamicPostpone: function() {
		        return isDynamicPostpone;
		    },
		    isPrerenderInterruptedError: function() {
		        return isPrerenderInterruptedError;
		    },
		    markCurrentScopeAsDynamic: function() {
		        return markCurrentScopeAsDynamic;
		    },
		    postponeWithTracking: function() {
		        return postponeWithTracking;
		    },
		    throwIfDisallowedDynamic: function() {
		        return throwIfDisallowedDynamic;
		    },
		    throwToInterruptStaticGeneration: function() {
		        return throwToInterruptStaticGeneration;
		    },
		    trackAllowedDynamicAccess: function() {
		        return trackAllowedDynamicAccess;
		    },
		    trackDynamicDataInDynamicRender: function() {
		        return trackDynamicDataInDynamicRender;
		    },
		    trackFallbackParamAccessed: function() {
		        return trackFallbackParamAccessed;
		    },
		    trackSynchronousPlatformIOAccessInDev: function() {
		        return trackSynchronousPlatformIOAccessInDev;
		    },
		    trackSynchronousRequestDataAccessInDev: function() {
		        return trackSynchronousRequestDataAccessInDev;
		    },
		    useDynamicRouteParams: function() {
		        return useDynamicRouteParams;
		    }
		});
		const _react = /*#__PURE__*/ _interop_require_default(require$$0);
		const _hooksservercontext = requireHooksServerContext();
		const _staticgenerationbailout = requireStaticGenerationBailout();
		const _workunitasyncstorageexternal = requireWorkUnitAsyncStorage_external();
		const _workasyncstorageexternal = requireWorkAsyncStorage_external();
		const _dynamicrenderingutils = requireDynamicRenderingUtils();
		const _metadataconstants = requireMetadataConstants();
		const _scheduler = requireScheduler();
		function _interop_require_default(obj) {
		    return obj && obj.__esModule ? obj : {
		        default: obj
		    };
		}
		const hasPostpone = typeof _react.default.unstable_postpone === 'function';
		function createDynamicTrackingState(isDebugDynamicAccesses) {
		    return {
		        isDebugDynamicAccesses,
		        dynamicAccesses: [],
		        syncDynamicExpression: undefined,
		        syncDynamicErrorWithStack: null
		    };
		}
		function createDynamicValidationState() {
		    return {
		        hasSuspendedDynamic: false,
		        hasDynamicMetadata: false,
		        hasDynamicViewport: false,
		        hasSyncDynamicErrors: false,
		        dynamicErrors: []
		    };
		}
		function getFirstDynamicReason(trackingState) {
		    var _trackingState_dynamicAccesses_;
		    return (_trackingState_dynamicAccesses_ = trackingState.dynamicAccesses[0]) == null ? void 0 : _trackingState_dynamicAccesses_.expression;
		}
		function markCurrentScopeAsDynamic(store, workUnitStore, expression) {
		    if (workUnitStore) {
		        if (workUnitStore.type === 'cache' || workUnitStore.type === 'unstable-cache') {
		            // inside cache scopes marking a scope as dynamic has no effect because the outer cache scope
		            // creates a cache boundary. This is subtly different from reading a dynamic data source which is
		            // forbidden inside a cache scope.
		            return;
		        }
		    }
		    // If we're forcing dynamic rendering or we're forcing static rendering, we
		    // don't need to do anything here because the entire page is already dynamic
		    // or it's static and it should not throw or postpone here.
		    if (store.forceDynamic || store.forceStatic) return;
		    if (store.dynamicShouldError) {
		        throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route ${store.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
		            value: "E553",
		            enumerable: false,
		            configurable: true
		        });
		    }
		    if (workUnitStore) {
		        if (workUnitStore.type === 'prerender-ppr') {
		            postponeWithTracking(store.route, expression, workUnitStore.dynamicTracking);
		        } else if (workUnitStore.type === 'prerender-legacy') {
		            workUnitStore.revalidate = 0;
		            // We aren't prerendering but we are generating a static page. We need to bail out of static generation
		            const err = Object.defineProperty(new _hooksservercontext.DynamicServerError(`Route ${store.route} couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
		                value: "E550",
		                enumerable: false,
		                configurable: true
		            });
		            store.dynamicUsageDescription = expression;
		            store.dynamicUsageStack = err.stack;
		            throw err;
		        } else if (process.env.NODE_ENV === 'development' && workUnitStore && workUnitStore.type === 'request') {
		            workUnitStore.usedDynamic = true;
		        }
		    }
		}
		function trackFallbackParamAccessed(store, expression) {
		    const prerenderStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
		    if (!prerenderStore || prerenderStore.type !== 'prerender-ppr') return;
		    postponeWithTracking(store.route, expression, prerenderStore.dynamicTracking);
		}
		function throwToInterruptStaticGeneration(expression, store, prerenderStore) {
		    // We aren't prerendering but we are generating a static page. We need to bail out of static generation
		    const err = Object.defineProperty(new _hooksservercontext.DynamicServerError(`Route ${store.route} couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
		        value: "E558",
		        enumerable: false,
		        configurable: true
		    });
		    prerenderStore.revalidate = 0;
		    store.dynamicUsageDescription = expression;
		    store.dynamicUsageStack = err.stack;
		    throw err;
		}
		function trackDynamicDataInDynamicRender(_store, workUnitStore) {
		    if (workUnitStore) {
		        if (workUnitStore.type === 'cache' || workUnitStore.type === 'unstable-cache') {
		            // inside cache scopes marking a scope as dynamic has no effect because the outer cache scope
		            // creates a cache boundary. This is subtly different from reading a dynamic data source which is
		            // forbidden inside a cache scope.
		            return;
		        }
		        if (workUnitStore.type === 'prerender' || workUnitStore.type === 'prerender-legacy') {
		            workUnitStore.revalidate = 0;
		        }
		        if (process.env.NODE_ENV === 'development' && workUnitStore.type === 'request') {
		            workUnitStore.usedDynamic = true;
		        }
		    }
		}
		// Despite it's name we don't actually abort unless we have a controller to call abort on
		// There are times when we let a prerender run long to discover caches where we want the semantics
		// of tracking dynamic access without terminating the prerender early
		function abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore) {
		    const reason = `Route ${route} needs to bail out of prerendering at this point because it used ${expression}.`;
		    const error = createPrerenderInterruptedError(reason);
		    prerenderStore.controller.abort(error);
		    const dynamicTracking = prerenderStore.dynamicTracking;
		    if (dynamicTracking) {
		        dynamicTracking.dynamicAccesses.push({
		            // When we aren't debugging, we don't need to create another error for the
		            // stack trace.
		            stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : undefined,
		            expression
		        });
		    }
		}
		function abortOnSynchronousPlatformIOAccess(route, expression, errorWithStack, prerenderStore) {
		    const dynamicTracking = prerenderStore.dynamicTracking;
		    if (dynamicTracking) {
		        if (dynamicTracking.syncDynamicErrorWithStack === null) {
		            dynamicTracking.syncDynamicExpression = expression;
		            dynamicTracking.syncDynamicErrorWithStack = errorWithStack;
		        }
		    }
		    abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore);
		}
		function trackSynchronousPlatformIOAccessInDev(requestStore) {
		    // We don't actually have a controller to abort but we do the semantic equivalent by
		    // advancing the request store out of prerender mode
		    requestStore.prerenderPhase = false;
		}
		function abortAndThrowOnSynchronousRequestDataAccess(route, expression, errorWithStack, prerenderStore) {
		    const prerenderSignal = prerenderStore.controller.signal;
		    if (prerenderSignal.aborted === false) {
		        // TODO it would be better to move this aborted check into the callsite so we can avoid making
		        // the error object when it isn't relevant to the aborting of the prerender however
		        // since we need the throw semantics regardless of whether we abort it is easier to land
		        // this way. See how this was handled with `abortOnSynchronousPlatformIOAccess` for a closer
		        // to ideal implementation
		        const dynamicTracking = prerenderStore.dynamicTracking;
		        if (dynamicTracking) {
		            if (dynamicTracking.syncDynamicErrorWithStack === null) {
		                dynamicTracking.syncDynamicExpression = expression;
		                dynamicTracking.syncDynamicErrorWithStack = errorWithStack;
		                if (prerenderStore.validating === true) {
		                    // We always log Request Access in dev at the point of calling the function
		                    // So we mark the dynamic validation as not requiring it to be printed
		                    dynamicTracking.syncDynamicLogged = true;
		                }
		            }
		        }
		        abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore);
		    }
		    throw createPrerenderInterruptedError(`Route ${route} needs to bail out of prerendering at this point because it used ${expression}.`);
		}
		const trackSynchronousRequestDataAccessInDev = trackSynchronousPlatformIOAccessInDev;
		function Postpone({ reason, route }) {
		    const prerenderStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
		    const dynamicTracking = prerenderStore && prerenderStore.type === 'prerender-ppr' ? prerenderStore.dynamicTracking : null;
		    postponeWithTracking(route, reason, dynamicTracking);
		}
		function postponeWithTracking(route, expression, dynamicTracking) {
		    assertPostpone();
		    if (dynamicTracking) {
		        dynamicTracking.dynamicAccesses.push({
		            // When we aren't debugging, we don't need to create another error for the
		            // stack trace.
		            stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : undefined,
		            expression
		        });
		    }
		    _react.default.unstable_postpone(createPostponeReason(route, expression));
		}
		function createPostponeReason(route, expression) {
		    return `Route ${route} needs to bail out of prerendering at this point because it used ${expression}. ` + `React throws this special object to indicate where. It should not be caught by ` + `your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
		}
		function isDynamicPostpone(err) {
		    if (typeof err === 'object' && err !== null && typeof err.message === 'string') {
		        return isDynamicPostponeReason(err.message);
		    }
		    return false;
		}
		function isDynamicPostponeReason(reason) {
		    return reason.includes('needs to bail out of prerendering at this point because it used') && reason.includes('Learn more: https://nextjs.org/docs/messages/ppr-caught-error');
		}
		if (isDynamicPostponeReason(createPostponeReason('%%%', '^^^')) === false) {
		    throw Object.defineProperty(new Error('Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js'), "__NEXT_ERROR_CODE", {
		        value: "E296",
		        enumerable: false,
		        configurable: true
		    });
		}
		const NEXT_PRERENDER_INTERRUPTED = 'NEXT_PRERENDER_INTERRUPTED';
		function createPrerenderInterruptedError(message) {
		    const error = Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
		        value: "E394",
		        enumerable: false,
		        configurable: true
		    });
		    error.digest = NEXT_PRERENDER_INTERRUPTED;
		    return error;
		}
		function isPrerenderInterruptedError(error) {
		    return typeof error === 'object' && error !== null && error.digest === NEXT_PRERENDER_INTERRUPTED && 'name' in error && 'message' in error && error instanceof Error;
		}
		function accessedDynamicData(dynamicAccesses) {
		    return dynamicAccesses.length > 0;
		}
		function consumeDynamicAccess(serverDynamic, clientDynamic) {
		    // We mutate because we only call this once we are no longer writing
		    // to the dynamicTrackingState and it's more efficient than creating a new
		    // array.
		    serverDynamic.dynamicAccesses.push(...clientDynamic.dynamicAccesses);
		    return serverDynamic.dynamicAccesses;
		}
		function formatDynamicAPIAccesses(dynamicAccesses) {
		    return dynamicAccesses.filter((access)=>typeof access.stack === 'string' && access.stack.length > 0).map(({ expression, stack })=>{
		        stack = stack.split('\n')// Remove the "Error: " prefix from the first line of the stack trace as
		        // well as the first 4 lines of the stack trace which is the distance
		        // from the user code and the `new Error().stack` call.
		        .slice(4).filter((line)=>{
		            // Exclude Next.js internals from the stack trace.
		            if (line.includes('node_modules/next/')) {
		                return false;
		            }
		            // Exclude anonymous functions from the stack trace.
		            if (line.includes(' (<anonymous>)')) {
		                return false;
		            }
		            // Exclude Node.js internals from the stack trace.
		            if (line.includes(' (node:')) {
		                return false;
		            }
		            return true;
		        }).join('\n');
		        return `Dynamic API Usage Debug - ${expression}:\n${stack}`;
		    });
		}
		function assertPostpone() {
		    if (!hasPostpone) {
		        throw Object.defineProperty(new Error(`Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js`), "__NEXT_ERROR_CODE", {
		            value: "E224",
		            enumerable: false,
		            configurable: true
		        });
		    }
		}
		function createPostponedAbortSignal(reason) {
		    assertPostpone();
		    const controller = new AbortController();
		    // We get our hands on a postpone instance by calling postpone and catching the throw
		    try {
		        _react.default.unstable_postpone(reason);
		    } catch (x) {
		        controller.abort(x);
		    }
		    return controller.signal;
		}
		function createHangingInputAbortSignal(workUnitStore) {
		    const controller = new AbortController();
		    if (workUnitStore.cacheSignal) {
		        // If we have a cacheSignal it means we're in a prospective render. If the input
		        // we're waiting on is coming from another cache, we do want to wait for it so that
		        // we can resolve this cache entry too.
		        workUnitStore.cacheSignal.inputReady().then(()=>{
		            controller.abort();
		        });
		    } else {
		        // Otherwise we're in the final render and we should already have all our caches
		        // filled. We might still be waiting on some microtasks so we wait one tick before
		        // giving up. When we give up, we still want to render the content of this cache
		        // as deeply as we can so that we can suspend as deeply as possible in the tree
		        // or not at all if we don't end up waiting for the input.
		        (0, _scheduler.scheduleOnNextTick)(()=>controller.abort());
		    }
		    return controller.signal;
		}
		function annotateDynamicAccess(expression, prerenderStore) {
		    const dynamicTracking = prerenderStore.dynamicTracking;
		    if (dynamicTracking) {
		        dynamicTracking.dynamicAccesses.push({
		            stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : undefined,
		            expression
		        });
		    }
		}
		function useDynamicRouteParams(expression) {
		    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
		    if (workStore && workStore.isStaticGeneration && workStore.fallbackRouteParams && workStore.fallbackRouteParams.size > 0) {
		        // There are fallback route params, we should track these as dynamic
		        // accesses.
		        const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
		        if (workUnitStore) {
		            // We're prerendering with dynamicIO or PPR or both
		            if (workUnitStore.type === 'prerender') {
		                // We are in a prerender with dynamicIO semantics
		                // We are going to hang here and never resolve. This will cause the currently
		                // rendering component to effectively be a dynamic hole
		                _react.default.use((0, _dynamicrenderingutils.makeHangingPromise)(workUnitStore.renderSignal, expression));
		            } else if (workUnitStore.type === 'prerender-ppr') {
		                // We're prerendering with PPR
		                postponeWithTracking(workStore.route, expression, workUnitStore.dynamicTracking);
		            } else if (workUnitStore.type === 'prerender-legacy') {
		                throwToInterruptStaticGeneration(expression, workStore, workUnitStore);
		            }
		        }
		    }
		}
		const hasSuspenseRegex = /\n\s+at Suspense \(<anonymous>\)/;
		const hasMetadataRegex = new RegExp(`\\n\\s+at ${_metadataconstants.METADATA_BOUNDARY_NAME}[\\n\\s]`);
		const hasViewportRegex = new RegExp(`\\n\\s+at ${_metadataconstants.VIEWPORT_BOUNDARY_NAME}[\\n\\s]`);
		const hasOutletRegex = new RegExp(`\\n\\s+at ${_metadataconstants.OUTLET_BOUNDARY_NAME}[\\n\\s]`);
		function trackAllowedDynamicAccess(route, componentStack, dynamicValidation, serverDynamic, clientDynamic) {
		    if (hasOutletRegex.test(componentStack)) {
		        // We don't need to track that this is dynamic. It is only so when something else is also dynamic.
		        return;
		    } else if (hasMetadataRegex.test(componentStack)) {
		        dynamicValidation.hasDynamicMetadata = true;
		        return;
		    } else if (hasViewportRegex.test(componentStack)) {
		        dynamicValidation.hasDynamicViewport = true;
		        return;
		    } else if (hasSuspenseRegex.test(componentStack)) {
		        dynamicValidation.hasSuspendedDynamic = true;
		        return;
		    } else if (serverDynamic.syncDynamicErrorWithStack || clientDynamic.syncDynamicErrorWithStack) {
		        dynamicValidation.hasSyncDynamicErrors = true;
		        return;
		    } else {
		        const message = `Route "${route}": A component accessed data, headers, params, searchParams, or a short-lived cache without a Suspense boundary nor a "use cache" above it. We don't have the exact line number added to error messages yet but you can see which component in the stack below. See more info: https://nextjs.org/docs/messages/next-prerender-missing-suspense`;
		        const error = createErrorWithComponentStack(message, componentStack);
		        dynamicValidation.dynamicErrors.push(error);
		        return;
		    }
		}
		function createErrorWithComponentStack(message, componentStack) {
		    const error = Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
		        value: "E394",
		        enumerable: false,
		        configurable: true
		    });
		    error.stack = 'Error: ' + message + componentStack;
		    return error;
		}
		function throwIfDisallowedDynamic(route, dynamicValidation, serverDynamic, clientDynamic) {
		    let syncError;
		    let syncExpression;
		    let syncLogged;
		    if (serverDynamic.syncDynamicErrorWithStack) {
		        syncError = serverDynamic.syncDynamicErrorWithStack;
		        syncExpression = serverDynamic.syncDynamicExpression;
		        syncLogged = serverDynamic.syncDynamicLogged === true;
		    } else if (clientDynamic.syncDynamicErrorWithStack) {
		        syncError = clientDynamic.syncDynamicErrorWithStack;
		        syncExpression = clientDynamic.syncDynamicExpression;
		        syncLogged = clientDynamic.syncDynamicLogged === true;
		    } else {
		        syncError = null;
		        syncExpression = undefined;
		        syncLogged = false;
		    }
		    if (dynamicValidation.hasSyncDynamicErrors && syncError) {
		        if (!syncLogged) {
		            // In dev we already log errors about sync dynamic access. But during builds we need to ensure
		            // the offending sync error is logged before we exit the build
		            console.error(syncError);
		        }
		        // The actual error should have been logged when the sync access ocurred
		        throw new _staticgenerationbailout.StaticGenBailoutError();
		    }
		    const dynamicErrors = dynamicValidation.dynamicErrors;
		    if (dynamicErrors.length) {
		        for(let i = 0; i < dynamicErrors.length; i++){
		            console.error(dynamicErrors[i]);
		        }
		        throw new _staticgenerationbailout.StaticGenBailoutError();
		    }
		    if (!dynamicValidation.hasSuspendedDynamic) {
		        if (dynamicValidation.hasDynamicMetadata) {
		            if (syncError) {
		                console.error(syncError);
		                throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route "${route}" has a \`generateMetadata\` that could not finish rendering before ${syncExpression} was used. Follow the instructions in the error for this expression to resolve.`), "__NEXT_ERROR_CODE", {
		                    value: "E608",
		                    enumerable: false,
		                    configurable: true
		                });
		            }
		            throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route "${route}" has a \`generateMetadata\` that depends on Request data (\`cookies()\`, etc...) or external data (\`fetch(...)\`, etc...) but the rest of the route was static or only used cached data (\`"use cache"\`). If you expected this route to be prerenderable update your \`generateMetadata\` to not use Request data and only use cached external data. Otherwise, add \`await connection()\` somewhere within this route to indicate explicitly it should not be prerendered.`), "__NEXT_ERROR_CODE", {
		                value: "E534",
		                enumerable: false,
		                configurable: true
		            });
		        } else if (dynamicValidation.hasDynamicViewport) {
		            if (syncError) {
		                console.error(syncError);
		                throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route "${route}" has a \`generateViewport\` that could not finish rendering before ${syncExpression} was used. Follow the instructions in the error for this expression to resolve.`), "__NEXT_ERROR_CODE", {
		                    value: "E573",
		                    enumerable: false,
		                    configurable: true
		                });
		            }
		            throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route "${route}" has a \`generateViewport\` that depends on Request data (\`cookies()\`, etc...) or external data (\`fetch(...)\`, etc...) but the rest of the route was static or only used cached data (\`"use cache"\`). If you expected this route to be prerenderable update your \`generateViewport\` to not use Request data and only use cached external data. Otherwise, add \`await connection()\` somewhere within this route to indicate explicitly it should not be prerendered.`), "__NEXT_ERROR_CODE", {
		                value: "E590",
		                enumerable: false,
		                configurable: true
		            });
		        }
		    }
		}

		
	} (dynamicRendering));
	return dynamicRendering;
}

var hasRequiredUnstableRethrow_server;

function requireUnstableRethrow_server () {
	if (hasRequiredUnstableRethrow_server) return unstableRethrow_server.exports;
	hasRequiredUnstableRethrow_server = 1;
	(function (module, exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "unstable_rethrow", {
		    enumerable: true,
		    get: function() {
		        return unstable_rethrow;
		    }
		});
		const _dynamicrenderingutils = requireDynamicRenderingUtils();
		const _ispostpone = requireIsPostpone();
		const _bailouttocsr = requireBailoutToCsr();
		const _isnextroutererror = requireIsNextRouterError();
		const _dynamicrendering = requireDynamicRendering();
		const _hooksservercontext = requireHooksServerContext();
		function unstable_rethrow(error) {
		    if ((0, _isnextroutererror.isNextRouterError)(error) || (0, _bailouttocsr.isBailoutToCSRError)(error) || (0, _hooksservercontext.isDynamicServerError)(error) || (0, _dynamicrendering.isDynamicPostpone)(error) || (0, _ispostpone.isPostpone)(error) || (0, _dynamicrenderingutils.isHangingPromiseRejectionError)(error)) {
		        throw error;
		    }
		    if (error instanceof Error && 'cause' in error) {
		        unstable_rethrow(error.cause);
		    }
		}

		if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
		  Object.defineProperty(exports.default, '__esModule', { value: true });
		  Object.assign(exports.default, exports);
		  module.exports = exports.default;
		}

		
	} (unstableRethrow_server, unstableRethrow_server.exports));
	return unstableRethrow_server.exports;
}

var unstableRethrow_browser = {exports: {}};

var hasRequiredUnstableRethrow_browser;

function requireUnstableRethrow_browser () {
	if (hasRequiredUnstableRethrow_browser) return unstableRethrow_browser.exports;
	hasRequiredUnstableRethrow_browser = 1;
	(function (module, exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "unstable_rethrow", {
		    enumerable: true,
		    get: function() {
		        return unstable_rethrow;
		    }
		});
		const _bailouttocsr = requireBailoutToCsr();
		const _isnextroutererror = requireIsNextRouterError();
		function unstable_rethrow(error) {
		    if ((0, _isnextroutererror.isNextRouterError)(error) || (0, _bailouttocsr.isBailoutToCSRError)(error)) {
		        throw error;
		    }
		    if (error instanceof Error && 'cause' in error) {
		        unstable_rethrow(error.cause);
		    }
		}

		if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
		  Object.defineProperty(exports.default, '__esModule', { value: true });
		  Object.assign(exports.default, exports);
		  module.exports = exports.default;
		}

		
	} (unstableRethrow_browser, unstableRethrow_browser.exports));
	return unstableRethrow_browser.exports;
}

/**
 * This function should be used to rethrow internal Next.js errors so that they can be handled by the framework.
 * When wrapping an API that uses errors to interrupt control flow, you should use this function before you do any error handling.
 * This function will rethrow the error if it is a Next.js error so it can be handled, otherwise it will do nothing.
 *
 * Read more: [Next.js Docs: `unstable_rethrow`](https://nextjs.org/docs/app/api-reference/functions/unstable_rethrow)
 */

var hasRequiredUnstableRethrow;

function requireUnstableRethrow () {
	if (hasRequiredUnstableRethrow) return unstableRethrow.exports;
	hasRequiredUnstableRethrow = 1;
	(function (module, exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "unstable_rethrow", {
		    enumerable: true,
		    get: function() {
		        return unstable_rethrow;
		    }
		});
		const unstable_rethrow = typeof window === 'undefined' ? requireUnstableRethrow_server().unstable_rethrow : requireUnstableRethrow_browser().unstable_rethrow;

		if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
		  Object.defineProperty(exports.default, '__esModule', { value: true });
		  Object.assign(exports.default, exports);
		  module.exports = exports.default;
		}

		
	} (unstableRethrow, unstableRethrow.exports));
	return unstableRethrow.exports;
}

/** @internal */

var hasRequiredNavigation_reactServer;

function requireNavigation_reactServer () {
	if (hasRequiredNavigation_reactServer) return navigation_reactServer.exports;
	hasRequiredNavigation_reactServer = 1;
	(function (module, exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    ReadonlyURLSearchParams: function() {
		        return ReadonlyURLSearchParams;
		    },
		    RedirectType: function() {
		        return _redirecterror.RedirectType;
		    },
		    forbidden: function() {
		        return _forbidden.forbidden;
		    },
		    notFound: function() {
		        return _notfound.notFound;
		    },
		    permanentRedirect: function() {
		        return _redirect.permanentRedirect;
		    },
		    redirect: function() {
		        return _redirect.redirect;
		    },
		    unauthorized: function() {
		        return _unauthorized.unauthorized;
		    },
		    unstable_rethrow: function() {
		        return _unstablerethrow.unstable_rethrow;
		    }
		});
		const _redirect = requireRedirect();
		const _redirecterror = requireRedirectError();
		const _notfound = requireNotFound();
		const _forbidden = requireForbidden();
		const _unauthorized = requireUnauthorized();
		const _unstablerethrow = requireUnstableRethrow();
		class ReadonlyURLSearchParamsError extends Error {
		    constructor(){
		        super('Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams');
		    }
		}
		class ReadonlyURLSearchParams extends URLSearchParams {
		    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ append() {
		        throw new ReadonlyURLSearchParamsError();
		    }
		    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ delete() {
		        throw new ReadonlyURLSearchParamsError();
		    }
		    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ set() {
		        throw new ReadonlyURLSearchParamsError();
		    }
		    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ sort() {
		        throw new ReadonlyURLSearchParamsError();
		    }
		}

		if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
		  Object.defineProperty(exports.default, '__esModule', { value: true });
		  Object.assign(exports.default, exports);
		  module.exports = exports.default;
		}

		
	} (navigation_reactServer, navigation_reactServer.exports));
	return navigation_reactServer.exports;
}

var serverInsertedHtml_sharedRuntime = {};

var _interop_require_wildcard = {};

var hasRequired_interop_require_wildcard;

function require_interop_require_wildcard () {
	if (hasRequired_interop_require_wildcard) return _interop_require_wildcard;
	hasRequired_interop_require_wildcard = 1;

	function _getRequireWildcardCache(nodeInterop) {
	    if (typeof WeakMap !== "function") return null;

	    var cacheBabelInterop = new WeakMap();
	    var cacheNodeInterop = new WeakMap();

	    return (_getRequireWildcardCache = function(nodeInterop) {
	        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
	    })(nodeInterop);
	}
	function _interop_require_wildcard$1(obj, nodeInterop) {
	    if (!nodeInterop && obj && obj.__esModule) return obj;
	    if (obj === null || typeof obj !== "object" && typeof obj !== "function") return { default: obj };

	    var cache = _getRequireWildcardCache(nodeInterop);

	    if (cache && cache.has(obj)) return cache.get(obj);

	    var newObj = { __proto__: null };
	    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

	    for (var key in obj) {
	        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
	            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
	            if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
	            else newObj[key] = obj[key];
	        }
	    }

	    newObj.default = obj;

	    if (cache) cache.set(obj, newObj);

	    return newObj;
	}
	_interop_require_wildcard._ = _interop_require_wildcard$1;
	return _interop_require_wildcard;
}

var hasRequiredServerInsertedHtml_sharedRuntime;

function requireServerInsertedHtml_sharedRuntime () {
	if (hasRequiredServerInsertedHtml_sharedRuntime) return serverInsertedHtml_sharedRuntime;
	hasRequiredServerInsertedHtml_sharedRuntime = 1;
	(function (exports) {
		'use client';
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    ServerInsertedHTMLContext: function() {
		        return ServerInsertedHTMLContext;
		    },
		    useServerInsertedHTML: function() {
		        return useServerInsertedHTML;
		    }
		});
		const _interop_require_wildcard = /*@__PURE__*/ require_interop_require_wildcard();
		const _react = /*#__PURE__*/ _interop_require_wildcard._(require$$0);
		const ServerInsertedHTMLContext = /*#__PURE__*/ _react.default.createContext(null);
		function useServerInsertedHTML(callback) {
		    const addInsertedServerHTMLCallback = (0, _react.useContext)(ServerInsertedHTMLContext);
		    // Should have no effects on client where there's no flush effects provider
		    if (addInsertedServerHTMLCallback) {
		        addInsertedServerHTMLCallback(callback);
		    }
		}

		
	} (serverInsertedHtml_sharedRuntime));
	return serverInsertedHtml_sharedRuntime;
}

var bailoutToClientRendering = {exports: {}};

var hasRequiredBailoutToClientRendering;

function requireBailoutToClientRendering () {
	if (hasRequiredBailoutToClientRendering) return bailoutToClientRendering.exports;
	hasRequiredBailoutToClientRendering = 1;
	(function (module, exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "bailoutToClientRendering", {
		    enumerable: true,
		    get: function() {
		        return bailoutToClientRendering;
		    }
		});
		const _bailouttocsr = requireBailoutToCsr();
		const _workasyncstorageexternal = requireWorkAsyncStorage_external();
		function bailoutToClientRendering(reason) {
		    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
		    if (workStore == null ? void 0 : workStore.forceStatic) return;
		    if (workStore == null ? void 0 : workStore.isStaticGeneration) throw Object.defineProperty(new _bailouttocsr.BailoutToCSRError(reason), "__NEXT_ERROR_CODE", {
		        value: "E394",
		        enumerable: false,
		        configurable: true
		    });
		}

		if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
		  Object.defineProperty(exports.default, '__esModule', { value: true });
		  Object.assign(exports.default, exports);
		  module.exports = exports.default;
		}

		
	} (bailoutToClientRendering, bailoutToClientRendering.exports));
	return bailoutToClientRendering.exports;
}

var hasRequiredNavigation$1;

function requireNavigation$1 () {
	if (hasRequiredNavigation$1) return navigation$1.exports;
	hasRequiredNavigation$1 = 1;
	(function (module, exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    ReadonlyURLSearchParams: function() {
		        return _navigationreactserver.ReadonlyURLSearchParams;
		    },
		    RedirectType: function() {
		        return _navigationreactserver.RedirectType;
		    },
		    ServerInsertedHTMLContext: function() {
		        return _serverinsertedhtmlsharedruntime.ServerInsertedHTMLContext;
		    },
		    forbidden: function() {
		        return _navigationreactserver.forbidden;
		    },
		    notFound: function() {
		        return _navigationreactserver.notFound;
		    },
		    permanentRedirect: function() {
		        return _navigationreactserver.permanentRedirect;
		    },
		    redirect: function() {
		        return _navigationreactserver.redirect;
		    },
		    unauthorized: function() {
		        return _navigationreactserver.unauthorized;
		    },
		    unstable_rethrow: function() {
		        return _navigationreactserver.unstable_rethrow;
		    },
		    useParams: function() {
		        return useParams;
		    },
		    usePathname: function() {
		        return usePathname;
		    },
		    useRouter: function() {
		        return useRouter;
		    },
		    useSearchParams: function() {
		        return useSearchParams;
		    },
		    useSelectedLayoutSegment: function() {
		        return useSelectedLayoutSegment;
		    },
		    useSelectedLayoutSegments: function() {
		        return useSelectedLayoutSegments;
		    },
		    useServerInsertedHTML: function() {
		        return _serverinsertedhtmlsharedruntime.useServerInsertedHTML;
		    }
		});
		const _react = require$$0;
		const _approutercontextsharedruntime = requireAppRouterContext_sharedRuntime();
		const _hooksclientcontextsharedruntime = requireHooksClientContext_sharedRuntime();
		const _getsegmentvalue = requireGetSegmentValue();
		const _segment = requireSegment();
		const _navigationreactserver = requireNavigation_reactServer();
		const _serverinsertedhtmlsharedruntime = requireServerInsertedHtml_sharedRuntime();
		const useDynamicRouteParams = typeof window === 'undefined' ? requireDynamicRendering().useDynamicRouteParams : undefined;
		function useSearchParams() {
		    const searchParams = (0, _react.useContext)(_hooksclientcontextsharedruntime.SearchParamsContext);
		    // In the case where this is `null`, the compat types added in
		    // `next-env.d.ts` will add a new overload that changes the return type to
		    // include `null`.
		    const readonlySearchParams = (0, _react.useMemo)(()=>{
		        if (!searchParams) {
		            // When the router is not ready in pages, we won't have the search params
		            // available.
		            return null;
		        }
		        return new _navigationreactserver.ReadonlyURLSearchParams(searchParams);
		    }, [
		        searchParams
		    ]);
		    if (typeof window === 'undefined') {
		        // AsyncLocalStorage should not be included in the client bundle.
		        const { bailoutToClientRendering } = requireBailoutToClientRendering();
		        // TODO-APP: handle dynamic = 'force-static' here and on the client
		        bailoutToClientRendering('useSearchParams()');
		    }
		    return readonlySearchParams;
		}
		function usePathname() {
		    useDynamicRouteParams == null ? void 0 : useDynamicRouteParams('usePathname()');
		    // In the case where this is `null`, the compat types added in `next-env.d.ts`
		    // will add a new overload that changes the return type to include `null`.
		    return (0, _react.useContext)(_hooksclientcontextsharedruntime.PathnameContext);
		}
		function useRouter() {
		    const router = (0, _react.useContext)(_approutercontextsharedruntime.AppRouterContext);
		    if (router === null) {
		        throw Object.defineProperty(new Error('invariant expected app router to be mounted'), "__NEXT_ERROR_CODE", {
		            value: "E238",
		            enumerable: false,
		            configurable: true
		        });
		    }
		    return router;
		}
		function useParams() {
		    useDynamicRouteParams == null ? void 0 : useDynamicRouteParams('useParams()');
		    return (0, _react.useContext)(_hooksclientcontextsharedruntime.PathParamsContext);
		}
		/** Get the canonical parameters from the current level to the leaf node. */ // Client components API
		function getSelectedLayoutSegmentPath(tree, parallelRouteKey, first, segmentPath) {
		    if (first === void 0) first = true;
		    if (segmentPath === void 0) segmentPath = [];
		    let node;
		    if (first) {
		        // Use the provided parallel route key on the first parallel route
		        node = tree[1][parallelRouteKey];
		    } else {
		        // After first parallel route prefer children, if there's no children pick the first parallel route.
		        const parallelRoutes = tree[1];
		        var _parallelRoutes_children;
		        node = (_parallelRoutes_children = parallelRoutes.children) != null ? _parallelRoutes_children : Object.values(parallelRoutes)[0];
		    }
		    if (!node) return segmentPath;
		    const segment = node[0];
		    let segmentValue = (0, _getsegmentvalue.getSegmentValue)(segment);
		    if (!segmentValue || segmentValue.startsWith(_segment.PAGE_SEGMENT_KEY)) {
		        return segmentPath;
		    }
		    segmentPath.push(segmentValue);
		    return getSelectedLayoutSegmentPath(node, parallelRouteKey, false, segmentPath);
		}
		function useSelectedLayoutSegments(parallelRouteKey) {
		    if (parallelRouteKey === void 0) parallelRouteKey = 'children';
		    useDynamicRouteParams == null ? void 0 : useDynamicRouteParams('useSelectedLayoutSegments()');
		    const context = (0, _react.useContext)(_approutercontextsharedruntime.LayoutRouterContext);
		    // @ts-expect-error This only happens in `pages`. Type is overwritten in navigation.d.ts
		    if (!context) return null;
		    return getSelectedLayoutSegmentPath(context.parentTree, parallelRouteKey);
		}
		function useSelectedLayoutSegment(parallelRouteKey) {
		    if (parallelRouteKey === void 0) parallelRouteKey = 'children';
		    useDynamicRouteParams == null ? void 0 : useDynamicRouteParams('useSelectedLayoutSegment()');
		    const selectedLayoutSegments = useSelectedLayoutSegments(parallelRouteKey);
		    if (!selectedLayoutSegments || selectedLayoutSegments.length === 0) {
		        return null;
		    }
		    const selectedLayoutSegment = parallelRouteKey === 'children' ? selectedLayoutSegments[0] : selectedLayoutSegments[selectedLayoutSegments.length - 1];
		    // if the default slot is showing, we return null since it's not technically "selected" (it's a fallback)
		    // and returning an internal value like `__DEFAULT__` would be confusing.
		    return selectedLayoutSegment === _segment.DEFAULT_SEGMENT_KEY ? null : selectedLayoutSegment;
		}

		if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
		  Object.defineProperty(exports.default, '__esModule', { value: true });
		  Object.assign(exports.default, exports);
		  module.exports = exports.default;
		}

		
	} (navigation$1, navigation$1.exports));
	return navigation$1.exports;
}

var navigation;
var hasRequiredNavigation;

function requireNavigation () {
	if (hasRequiredNavigation) return navigation;
	hasRequiredNavigation = 1;
	navigation = requireNavigation$1();
	return navigation;
}

var navigationExports = requireNavigation();

var server = {exports: {}};

var request = {};

var nextUrl = {};

var detectDomainLocale = {};

var hasRequiredDetectDomainLocale;

function requireDetectDomainLocale () {
	if (hasRequiredDetectDomainLocale) return detectDomainLocale;
	hasRequiredDetectDomainLocale = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "detectDomainLocale", {
		    enumerable: true,
		    get: function() {
		        return detectDomainLocale;
		    }
		});
		function detectDomainLocale(domainItems, hostname, detectedLocale) {
		    if (!domainItems) return;
		    if (detectedLocale) {
		        detectedLocale = detectedLocale.toLowerCase();
		    }
		    for (const item of domainItems){
		        var _item_domain, _item_locales;
		        // remove port if present
		        const domainHostname = (_item_domain = item.domain) == null ? void 0 : _item_domain.split(':', 1)[0].toLowerCase();
		        if (hostname === domainHostname || detectedLocale === item.defaultLocale.toLowerCase() || ((_item_locales = item.locales) == null ? void 0 : _item_locales.some((locale)=>locale.toLowerCase() === detectedLocale))) {
		            return item;
		        }
		    }
		}

		
	} (detectDomainLocale));
	return detectDomainLocale;
}

var formatNextPathnameInfo = {};

var removeTrailingSlash = {};

/**
 * Removes the trailing slash for a given route or page path. Preserves the
 * root page. Examples:
 *   - `/foo/bar/` -> `/foo/bar`
 *   - `/foo/bar` -> `/foo/bar`
 *   - `/` -> `/`
 */

var hasRequiredRemoveTrailingSlash;

function requireRemoveTrailingSlash () {
	if (hasRequiredRemoveTrailingSlash) return removeTrailingSlash;
	hasRequiredRemoveTrailingSlash = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "removeTrailingSlash", {
		    enumerable: true,
		    get: function() {
		        return removeTrailingSlash;
		    }
		});
		function removeTrailingSlash(route) {
		    return route.replace(/\/$/, '') || '/';
		}

		
	} (removeTrailingSlash));
	return removeTrailingSlash;
}

var addPathPrefix = {};

var parsePath = {};

/**
 * Given a path this function will find the pathname, query and hash and return
 * them. This is useful to parse full paths on the client side.
 * @param path A path to parse e.g. /foo/bar?id=1#hash
 */

var hasRequiredParsePath;

function requireParsePath () {
	if (hasRequiredParsePath) return parsePath;
	hasRequiredParsePath = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "parsePath", {
		    enumerable: true,
		    get: function() {
		        return parsePath;
		    }
		});
		function parsePath(path) {
		    const hashIndex = path.indexOf('#');
		    const queryIndex = path.indexOf('?');
		    const hasQuery = queryIndex > -1 && (hashIndex < 0 || queryIndex < hashIndex);
		    if (hasQuery || hashIndex > -1) {
		        return {
		            pathname: path.substring(0, hasQuery ? queryIndex : hashIndex),
		            query: hasQuery ? path.substring(queryIndex, hashIndex > -1 ? hashIndex : undefined) : '',
		            hash: hashIndex > -1 ? path.slice(hashIndex) : ''
		        };
		    }
		    return {
		        pathname: path,
		        query: '',
		        hash: ''
		    };
		}

		
	} (parsePath));
	return parsePath;
}

var hasRequiredAddPathPrefix;

function requireAddPathPrefix () {
	if (hasRequiredAddPathPrefix) return addPathPrefix;
	hasRequiredAddPathPrefix = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "addPathPrefix", {
		    enumerable: true,
		    get: function() {
		        return addPathPrefix;
		    }
		});
		const _parsepath = requireParsePath();
		function addPathPrefix(path, prefix) {
		    if (!path.startsWith('/') || !prefix) {
		        return path;
		    }
		    const { pathname, query, hash } = (0, _parsepath.parsePath)(path);
		    return "" + prefix + pathname + query + hash;
		}

		
	} (addPathPrefix));
	return addPathPrefix;
}

var addPathSuffix = {};

var hasRequiredAddPathSuffix;

function requireAddPathSuffix () {
	if (hasRequiredAddPathSuffix) return addPathSuffix;
	hasRequiredAddPathSuffix = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "addPathSuffix", {
		    enumerable: true,
		    get: function() {
		        return addPathSuffix;
		    }
		});
		const _parsepath = requireParsePath();
		function addPathSuffix(path, suffix) {
		    if (!path.startsWith('/') || !suffix) {
		        return path;
		    }
		    const { pathname, query, hash } = (0, _parsepath.parsePath)(path);
		    return "" + pathname + suffix + query + hash;
		}

		
	} (addPathSuffix));
	return addPathSuffix;
}

var addLocale = {};

var pathHasPrefix = {};

var hasRequiredPathHasPrefix;

function requirePathHasPrefix () {
	if (hasRequiredPathHasPrefix) return pathHasPrefix;
	hasRequiredPathHasPrefix = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "pathHasPrefix", {
		    enumerable: true,
		    get: function() {
		        return pathHasPrefix;
		    }
		});
		const _parsepath = requireParsePath();
		function pathHasPrefix(path, prefix) {
		    if (typeof path !== 'string') {
		        return false;
		    }
		    const { pathname } = (0, _parsepath.parsePath)(path);
		    return pathname === prefix || pathname.startsWith(prefix + '/');
		}

		
	} (pathHasPrefix));
	return pathHasPrefix;
}

var hasRequiredAddLocale;

function requireAddLocale () {
	if (hasRequiredAddLocale) return addLocale;
	hasRequiredAddLocale = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "addLocale", {
		    enumerable: true,
		    get: function() {
		        return addLocale;
		    }
		});
		const _addpathprefix = requireAddPathPrefix();
		const _pathhasprefix = requirePathHasPrefix();
		function addLocale(path, locale, defaultLocale, ignorePrefix) {
		    // If no locale was given or the locale is the default locale, we don't need
		    // to prefix the path.
		    if (!locale || locale === defaultLocale) return path;
		    const lower = path.toLowerCase();
		    // If the path is an API path or the path already has the locale prefix, we
		    // don't need to prefix the path.
		    if (!ignorePrefix) {
		        if ((0, _pathhasprefix.pathHasPrefix)(lower, '/api')) return path;
		        if ((0, _pathhasprefix.pathHasPrefix)(lower, "/" + locale.toLowerCase())) return path;
		    }
		    // Add the locale prefix to the path.
		    return (0, _addpathprefix.addPathPrefix)(path, "/" + locale);
		}

		
	} (addLocale));
	return addLocale;
}

var hasRequiredFormatNextPathnameInfo;

function requireFormatNextPathnameInfo () {
	if (hasRequiredFormatNextPathnameInfo) return formatNextPathnameInfo;
	hasRequiredFormatNextPathnameInfo = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "formatNextPathnameInfo", {
		    enumerable: true,
		    get: function() {
		        return formatNextPathnameInfo;
		    }
		});
		const _removetrailingslash = requireRemoveTrailingSlash();
		const _addpathprefix = requireAddPathPrefix();
		const _addpathsuffix = requireAddPathSuffix();
		const _addlocale = requireAddLocale();
		function formatNextPathnameInfo(info) {
		    let pathname = (0, _addlocale.addLocale)(info.pathname, info.locale, info.buildId ? undefined : info.defaultLocale, info.ignorePrefix);
		    if (info.buildId || !info.trailingSlash) {
		        pathname = (0, _removetrailingslash.removeTrailingSlash)(pathname);
		    }
		    if (info.buildId) {
		        pathname = (0, _addpathsuffix.addPathSuffix)((0, _addpathprefix.addPathPrefix)(pathname, "/_next/data/" + info.buildId), info.pathname === '/' ? 'index.json' : '.json');
		    }
		    pathname = (0, _addpathprefix.addPathPrefix)(pathname, info.basePath);
		    return !info.buildId && info.trailingSlash ? !pathname.endsWith('/') ? (0, _addpathsuffix.addPathSuffix)(pathname, '/') : pathname : (0, _removetrailingslash.removeTrailingSlash)(pathname);
		}

		
	} (formatNextPathnameInfo));
	return formatNextPathnameInfo;
}

var getHostname = {};

var hasRequiredGetHostname;

function requireGetHostname () {
	if (hasRequiredGetHostname) return getHostname;
	hasRequiredGetHostname = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "getHostname", {
		    enumerable: true,
		    get: function() {
		        return getHostname;
		    }
		});
		function getHostname(parsed, headers) {
		    // Get the hostname from the headers if it exists, otherwise use the parsed
		    // hostname.
		    let hostname;
		    if ((headers == null ? void 0 : headers.host) && !Array.isArray(headers.host)) {
		        hostname = headers.host.toString().split(':', 1)[0];
		    } else if (parsed.hostname) {
		        hostname = parsed.hostname;
		    } else return;
		    return hostname.toLowerCase();
		}

		
	} (getHostname));
	return getHostname;
}

var getNextPathnameInfo = {};

var normalizeLocalePath = {};

var hasRequiredNormalizeLocalePath;

function requireNormalizeLocalePath () {
	if (hasRequiredNormalizeLocalePath) return normalizeLocalePath;
	hasRequiredNormalizeLocalePath = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "normalizeLocalePath", {
		    enumerable: true,
		    get: function() {
		        return normalizeLocalePath;
		    }
		});
		/**
		 * A cache of lowercased locales for each list of locales. This is stored as a
		 * WeakMap so if the locales are garbage collected, the cache entry will be
		 * removed as well.
		 */ const cache = new WeakMap();
		function normalizeLocalePath(pathname, locales) {
		    // If locales is undefined, return the pathname as is.
		    if (!locales) return {
		        pathname
		    };
		    // Get the cached lowercased locales or create a new cache entry.
		    let lowercasedLocales = cache.get(locales);
		    if (!lowercasedLocales) {
		        lowercasedLocales = locales.map((locale)=>locale.toLowerCase());
		        cache.set(locales, lowercasedLocales);
		    }
		    let detectedLocale;
		    // The first segment will be empty, because it has a leading `/`. If
		    // there is no further segment, there is no locale (or it's the default).
		    const segments = pathname.split('/', 2);
		    // If there's no second segment (ie, the pathname is just `/`), there's no
		    // locale.
		    if (!segments[1]) return {
		        pathname
		    };
		    // The second segment will contain the locale part if any.
		    const segment = segments[1].toLowerCase();
		    // See if the segment matches one of the locales. If it doesn't, there is
		    // no locale (or it's the default).
		    const index = lowercasedLocales.indexOf(segment);
		    if (index < 0) return {
		        pathname
		    };
		    // Return the case-sensitive locale.
		    detectedLocale = locales[index];
		    // Remove the `/${locale}` part of the pathname.
		    pathname = pathname.slice(detectedLocale.length + 1) || '/';
		    return {
		        pathname,
		        detectedLocale
		    };
		}

		
	} (normalizeLocalePath));
	return normalizeLocalePath;
}

var removePathPrefix = {};

var hasRequiredRemovePathPrefix;

function requireRemovePathPrefix () {
	if (hasRequiredRemovePathPrefix) return removePathPrefix;
	hasRequiredRemovePathPrefix = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "removePathPrefix", {
		    enumerable: true,
		    get: function() {
		        return removePathPrefix;
		    }
		});
		const _pathhasprefix = requirePathHasPrefix();
		function removePathPrefix(path, prefix) {
		    // If the path doesn't start with the prefix we can return it as is. This
		    // protects us from situations where the prefix is a substring of the path
		    // prefix such as:
		    //
		    // For prefix: /blog
		    //
		    //   /blog -> true
		    //   /blog/ -> true
		    //   /blog/1 -> true
		    //   /blogging -> false
		    //   /blogging/ -> false
		    //   /blogging/1 -> false
		    if (!(0, _pathhasprefix.pathHasPrefix)(path, prefix)) {
		        return path;
		    }
		    // Remove the prefix from the path via slicing.
		    const withoutPrefix = path.slice(prefix.length);
		    // If the path without the prefix starts with a `/` we can return it as is.
		    if (withoutPrefix.startsWith('/')) {
		        return withoutPrefix;
		    }
		    // If the path without the prefix doesn't start with a `/` we need to add it
		    // back to the path to make sure it's a valid path.
		    return "/" + withoutPrefix;
		}

		
	} (removePathPrefix));
	return removePathPrefix;
}

var hasRequiredGetNextPathnameInfo;

function requireGetNextPathnameInfo () {
	if (hasRequiredGetNextPathnameInfo) return getNextPathnameInfo;
	hasRequiredGetNextPathnameInfo = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "getNextPathnameInfo", {
		    enumerable: true,
		    get: function() {
		        return getNextPathnameInfo;
		    }
		});
		const _normalizelocalepath = requireNormalizeLocalePath();
		const _removepathprefix = requireRemovePathPrefix();
		const _pathhasprefix = requirePathHasPrefix();
		function getNextPathnameInfo(pathname, options) {
		    var _options_nextConfig;
		    const { basePath, i18n, trailingSlash } = (_options_nextConfig = options.nextConfig) != null ? _options_nextConfig : {};
		    const info = {
		        pathname,
		        trailingSlash: pathname !== '/' ? pathname.endsWith('/') : trailingSlash
		    };
		    if (basePath && (0, _pathhasprefix.pathHasPrefix)(info.pathname, basePath)) {
		        info.pathname = (0, _removepathprefix.removePathPrefix)(info.pathname, basePath);
		        info.basePath = basePath;
		    }
		    let pathnameNoDataPrefix = info.pathname;
		    if (info.pathname.startsWith('/_next/data/') && info.pathname.endsWith('.json')) {
		        const paths = info.pathname.replace(/^\/_next\/data\//, '').replace(/\.json$/, '').split('/');
		        const buildId = paths[0];
		        info.buildId = buildId;
		        pathnameNoDataPrefix = paths[1] !== 'index' ? "/" + paths.slice(1).join('/') : '/';
		        // update pathname with normalized if enabled although
		        // we use normalized to populate locale info still
		        if (options.parseData === true) {
		            info.pathname = pathnameNoDataPrefix;
		        }
		    }
		    // If provided, use the locale route normalizer to detect the locale instead
		    // of the function below.
		    if (i18n) {
		        let result = options.i18nProvider ? options.i18nProvider.analyze(info.pathname) : (0, _normalizelocalepath.normalizeLocalePath)(info.pathname, i18n.locales);
		        info.locale = result.detectedLocale;
		        var _result_pathname;
		        info.pathname = (_result_pathname = result.pathname) != null ? _result_pathname : info.pathname;
		        if (!result.detectedLocale && info.buildId) {
		            result = options.i18nProvider ? options.i18nProvider.analyze(pathnameNoDataPrefix) : (0, _normalizelocalepath.normalizeLocalePath)(pathnameNoDataPrefix, i18n.locales);
		            if (result.detectedLocale) {
		                info.locale = result.detectedLocale;
		            }
		        }
		    }
		    return info;
		}

		
	} (getNextPathnameInfo));
	return getNextPathnameInfo;
}

var hasRequiredNextUrl;

function requireNextUrl () {
	if (hasRequiredNextUrl) return nextUrl;
	hasRequiredNextUrl = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "NextURL", {
		    enumerable: true,
		    get: function() {
		        return NextURL;
		    }
		});
		const _detectdomainlocale = requireDetectDomainLocale();
		const _formatnextpathnameinfo = requireFormatNextPathnameInfo();
		const _gethostname = requireGetHostname();
		const _getnextpathnameinfo = requireGetNextPathnameInfo();
		const REGEX_LOCALHOST_HOSTNAME = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
		function parseURL(url, base) {
		    return new URL(String(url).replace(REGEX_LOCALHOST_HOSTNAME, 'localhost'), base && String(base).replace(REGEX_LOCALHOST_HOSTNAME, 'localhost'));
		}
		const Internal = Symbol('NextURLInternal');
		class NextURL {
		    constructor(input, baseOrOpts, opts){
		        let base;
		        let options;
		        if (typeof baseOrOpts === 'object' && 'pathname' in baseOrOpts || typeof baseOrOpts === 'string') {
		            base = baseOrOpts;
		            options = opts || {};
		        } else {
		            options = opts || baseOrOpts || {};
		        }
		        this[Internal] = {
		            url: parseURL(input, base ?? options.base),
		            options: options,
		            basePath: ''
		        };
		        this.analyze();
		    }
		    analyze() {
		        var _this_Internal_options_nextConfig_i18n, _this_Internal_options_nextConfig, _this_Internal_domainLocale, _this_Internal_options_nextConfig_i18n1, _this_Internal_options_nextConfig1;
		        const info = (0, _getnextpathnameinfo.getNextPathnameInfo)(this[Internal].url.pathname, {
		            nextConfig: this[Internal].options.nextConfig,
		            parseData: !process.env.__NEXT_NO_MIDDLEWARE_URL_NORMALIZE,
		            i18nProvider: this[Internal].options.i18nProvider
		        });
		        const hostname = (0, _gethostname.getHostname)(this[Internal].url, this[Internal].options.headers);
		        this[Internal].domainLocale = this[Internal].options.i18nProvider ? this[Internal].options.i18nProvider.detectDomainLocale(hostname) : (0, _detectdomainlocale.detectDomainLocale)((_this_Internal_options_nextConfig = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n = _this_Internal_options_nextConfig.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n.domains, hostname);
		        const defaultLocale = ((_this_Internal_domainLocale = this[Internal].domainLocale) == null ? void 0 : _this_Internal_domainLocale.defaultLocale) || ((_this_Internal_options_nextConfig1 = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n1 = _this_Internal_options_nextConfig1.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n1.defaultLocale);
		        this[Internal].url.pathname = info.pathname;
		        this[Internal].defaultLocale = defaultLocale;
		        this[Internal].basePath = info.basePath ?? '';
		        this[Internal].buildId = info.buildId;
		        this[Internal].locale = info.locale ?? defaultLocale;
		        this[Internal].trailingSlash = info.trailingSlash;
		    }
		    formatPathname() {
		        return (0, _formatnextpathnameinfo.formatNextPathnameInfo)({
		            basePath: this[Internal].basePath,
		            buildId: this[Internal].buildId,
		            defaultLocale: !this[Internal].options.forceLocale ? this[Internal].defaultLocale : undefined,
		            locale: this[Internal].locale,
		            pathname: this[Internal].url.pathname,
		            trailingSlash: this[Internal].trailingSlash
		        });
		    }
		    formatSearch() {
		        return this[Internal].url.search;
		    }
		    get buildId() {
		        return this[Internal].buildId;
		    }
		    set buildId(buildId) {
		        this[Internal].buildId = buildId;
		    }
		    get locale() {
		        return this[Internal].locale ?? '';
		    }
		    set locale(locale) {
		        var _this_Internal_options_nextConfig_i18n, _this_Internal_options_nextConfig;
		        if (!this[Internal].locale || !((_this_Internal_options_nextConfig = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n = _this_Internal_options_nextConfig.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n.locales.includes(locale))) {
		            throw Object.defineProperty(new TypeError(`The NextURL configuration includes no locale "${locale}"`), "__NEXT_ERROR_CODE", {
		                value: "E597",
		                enumerable: false,
		                configurable: true
		            });
		        }
		        this[Internal].locale = locale;
		    }
		    get defaultLocale() {
		        return this[Internal].defaultLocale;
		    }
		    get domainLocale() {
		        return this[Internal].domainLocale;
		    }
		    get searchParams() {
		        return this[Internal].url.searchParams;
		    }
		    get host() {
		        return this[Internal].url.host;
		    }
		    set host(value) {
		        this[Internal].url.host = value;
		    }
		    get hostname() {
		        return this[Internal].url.hostname;
		    }
		    set hostname(value) {
		        this[Internal].url.hostname = value;
		    }
		    get port() {
		        return this[Internal].url.port;
		    }
		    set port(value) {
		        this[Internal].url.port = value;
		    }
		    get protocol() {
		        return this[Internal].url.protocol;
		    }
		    set protocol(value) {
		        this[Internal].url.protocol = value;
		    }
		    get href() {
		        const pathname = this.formatPathname();
		        const search = this.formatSearch();
		        return `${this.protocol}//${this.host}${pathname}${search}${this.hash}`;
		    }
		    set href(url) {
		        this[Internal].url = parseURL(url);
		        this.analyze();
		    }
		    get origin() {
		        return this[Internal].url.origin;
		    }
		    get pathname() {
		        return this[Internal].url.pathname;
		    }
		    set pathname(value) {
		        this[Internal].url.pathname = value;
		    }
		    get hash() {
		        return this[Internal].url.hash;
		    }
		    set hash(value) {
		        this[Internal].url.hash = value;
		    }
		    get search() {
		        return this[Internal].url.search;
		    }
		    set search(value) {
		        this[Internal].url.search = value;
		    }
		    get password() {
		        return this[Internal].url.password;
		    }
		    set password(value) {
		        this[Internal].url.password = value;
		    }
		    get username() {
		        return this[Internal].url.username;
		    }
		    set username(value) {
		        this[Internal].url.username = value;
		    }
		    get basePath() {
		        return this[Internal].basePath;
		    }
		    set basePath(value) {
		        this[Internal].basePath = value.startsWith('/') ? value : `/${value}`;
		    }
		    toString() {
		        return this.href;
		    }
		    toJSON() {
		        return this.href;
		    }
		    [Symbol.for('edge-runtime.inspect.custom')]() {
		        return {
		            href: this.href,
		            origin: this.origin,
		            protocol: this.protocol,
		            username: this.username,
		            password: this.password,
		            host: this.host,
		            hostname: this.hostname,
		            port: this.port,
		            pathname: this.pathname,
		            search: this.search,
		            searchParams: this.searchParams,
		            hash: this.hash
		        };
		    }
		    clone() {
		        return new NextURL(String(this), this[Internal].options);
		    }
		}

		
	} (nextUrl));
	return nextUrl;
}

var utils$1 = {};

var constants = {};

var hasRequiredConstants;

function requireConstants () {
	if (hasRequiredConstants) return constants;
	hasRequiredConstants = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    ACTION_SUFFIX: function() {
		        return ACTION_SUFFIX;
		    },
		    APP_DIR_ALIAS: function() {
		        return APP_DIR_ALIAS;
		    },
		    CACHE_ONE_YEAR: function() {
		        return CACHE_ONE_YEAR;
		    },
		    DOT_NEXT_ALIAS: function() {
		        return DOT_NEXT_ALIAS;
		    },
		    ESLINT_DEFAULT_DIRS: function() {
		        return ESLINT_DEFAULT_DIRS;
		    },
		    GSP_NO_RETURNED_VALUE: function() {
		        return GSP_NO_RETURNED_VALUE;
		    },
		    GSSP_COMPONENT_MEMBER_ERROR: function() {
		        return GSSP_COMPONENT_MEMBER_ERROR;
		    },
		    GSSP_NO_RETURNED_VALUE: function() {
		        return GSSP_NO_RETURNED_VALUE;
		    },
		    INFINITE_CACHE: function() {
		        return INFINITE_CACHE;
		    },
		    INSTRUMENTATION_HOOK_FILENAME: function() {
		        return INSTRUMENTATION_HOOK_FILENAME;
		    },
		    MATCHED_PATH_HEADER: function() {
		        return MATCHED_PATH_HEADER;
		    },
		    MIDDLEWARE_FILENAME: function() {
		        return MIDDLEWARE_FILENAME;
		    },
		    MIDDLEWARE_LOCATION_REGEXP: function() {
		        return MIDDLEWARE_LOCATION_REGEXP;
		    },
		    NEXT_BODY_SUFFIX: function() {
		        return NEXT_BODY_SUFFIX;
		    },
		    NEXT_CACHE_IMPLICIT_TAG_ID: function() {
		        return NEXT_CACHE_IMPLICIT_TAG_ID;
		    },
		    NEXT_CACHE_REVALIDATED_TAGS_HEADER: function() {
		        return NEXT_CACHE_REVALIDATED_TAGS_HEADER;
		    },
		    NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER: function() {
		        return NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER;
		    },
		    NEXT_CACHE_SOFT_TAG_MAX_LENGTH: function() {
		        return NEXT_CACHE_SOFT_TAG_MAX_LENGTH;
		    },
		    NEXT_CACHE_TAGS_HEADER: function() {
		        return NEXT_CACHE_TAGS_HEADER;
		    },
		    NEXT_CACHE_TAG_MAX_ITEMS: function() {
		        return NEXT_CACHE_TAG_MAX_ITEMS;
		    },
		    NEXT_CACHE_TAG_MAX_LENGTH: function() {
		        return NEXT_CACHE_TAG_MAX_LENGTH;
		    },
		    NEXT_DATA_SUFFIX: function() {
		        return NEXT_DATA_SUFFIX;
		    },
		    NEXT_INTERCEPTION_MARKER_PREFIX: function() {
		        return NEXT_INTERCEPTION_MARKER_PREFIX;
		    },
		    NEXT_META_SUFFIX: function() {
		        return NEXT_META_SUFFIX;
		    },
		    NEXT_QUERY_PARAM_PREFIX: function() {
		        return NEXT_QUERY_PARAM_PREFIX;
		    },
		    NEXT_RESUME_HEADER: function() {
		        return NEXT_RESUME_HEADER;
		    },
		    NON_STANDARD_NODE_ENV: function() {
		        return NON_STANDARD_NODE_ENV;
		    },
		    PAGES_DIR_ALIAS: function() {
		        return PAGES_DIR_ALIAS;
		    },
		    PRERENDER_REVALIDATE_HEADER: function() {
		        return PRERENDER_REVALIDATE_HEADER;
		    },
		    PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER: function() {
		        return PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER;
		    },
		    PUBLIC_DIR_MIDDLEWARE_CONFLICT: function() {
		        return PUBLIC_DIR_MIDDLEWARE_CONFLICT;
		    },
		    ROOT_DIR_ALIAS: function() {
		        return ROOT_DIR_ALIAS;
		    },
		    RSC_ACTION_CLIENT_WRAPPER_ALIAS: function() {
		        return RSC_ACTION_CLIENT_WRAPPER_ALIAS;
		    },
		    RSC_ACTION_ENCRYPTION_ALIAS: function() {
		        return RSC_ACTION_ENCRYPTION_ALIAS;
		    },
		    RSC_ACTION_PROXY_ALIAS: function() {
		        return RSC_ACTION_PROXY_ALIAS;
		    },
		    RSC_ACTION_VALIDATE_ALIAS: function() {
		        return RSC_ACTION_VALIDATE_ALIAS;
		    },
		    RSC_CACHE_WRAPPER_ALIAS: function() {
		        return RSC_CACHE_WRAPPER_ALIAS;
		    },
		    RSC_MOD_REF_PROXY_ALIAS: function() {
		        return RSC_MOD_REF_PROXY_ALIAS;
		    },
		    RSC_PREFETCH_SUFFIX: function() {
		        return RSC_PREFETCH_SUFFIX;
		    },
		    RSC_SEGMENTS_DIR_SUFFIX: function() {
		        return RSC_SEGMENTS_DIR_SUFFIX;
		    },
		    RSC_SEGMENT_SUFFIX: function() {
		        return RSC_SEGMENT_SUFFIX;
		    },
		    RSC_SUFFIX: function() {
		        return RSC_SUFFIX;
		    },
		    SERVER_PROPS_EXPORT_ERROR: function() {
		        return SERVER_PROPS_EXPORT_ERROR;
		    },
		    SERVER_PROPS_GET_INIT_PROPS_CONFLICT: function() {
		        return SERVER_PROPS_GET_INIT_PROPS_CONFLICT;
		    },
		    SERVER_PROPS_SSG_CONFLICT: function() {
		        return SERVER_PROPS_SSG_CONFLICT;
		    },
		    SERVER_RUNTIME: function() {
		        return SERVER_RUNTIME;
		    },
		    SSG_FALLBACK_EXPORT_ERROR: function() {
		        return SSG_FALLBACK_EXPORT_ERROR;
		    },
		    SSG_GET_INITIAL_PROPS_CONFLICT: function() {
		        return SSG_GET_INITIAL_PROPS_CONFLICT;
		    },
		    STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR: function() {
		        return STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR;
		    },
		    UNSTABLE_REVALIDATE_RENAME_ERROR: function() {
		        return UNSTABLE_REVALIDATE_RENAME_ERROR;
		    },
		    WEBPACK_LAYERS: function() {
		        return WEBPACK_LAYERS;
		    },
		    WEBPACK_RESOURCE_QUERIES: function() {
		        return WEBPACK_RESOURCE_QUERIES;
		    }
		});
		const NEXT_QUERY_PARAM_PREFIX = 'nxtP';
		const NEXT_INTERCEPTION_MARKER_PREFIX = 'nxtI';
		const MATCHED_PATH_HEADER = 'x-matched-path';
		const PRERENDER_REVALIDATE_HEADER = 'x-prerender-revalidate';
		const PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER = 'x-prerender-revalidate-if-generated';
		const RSC_PREFETCH_SUFFIX = '.prefetch.rsc';
		const RSC_SEGMENTS_DIR_SUFFIX = '.segments';
		const RSC_SEGMENT_SUFFIX = '.segment.rsc';
		const RSC_SUFFIX = '.rsc';
		const ACTION_SUFFIX = '.action';
		const NEXT_DATA_SUFFIX = '.json';
		const NEXT_META_SUFFIX = '.meta';
		const NEXT_BODY_SUFFIX = '.body';
		const NEXT_CACHE_TAGS_HEADER = 'x-next-cache-tags';
		const NEXT_CACHE_REVALIDATED_TAGS_HEADER = 'x-next-revalidated-tags';
		const NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER = 'x-next-revalidate-tag-token';
		const NEXT_RESUME_HEADER = 'next-resume';
		const NEXT_CACHE_TAG_MAX_ITEMS = 128;
		const NEXT_CACHE_TAG_MAX_LENGTH = 256;
		const NEXT_CACHE_SOFT_TAG_MAX_LENGTH = 1024;
		const NEXT_CACHE_IMPLICIT_TAG_ID = '_N_T_';
		const CACHE_ONE_YEAR = 31536000;
		const INFINITE_CACHE = 0xfffffffe;
		const MIDDLEWARE_FILENAME = 'middleware';
		const MIDDLEWARE_LOCATION_REGEXP = `(?:src/)?${MIDDLEWARE_FILENAME}`;
		const INSTRUMENTATION_HOOK_FILENAME = 'instrumentation';
		const PAGES_DIR_ALIAS = 'private-next-pages';
		const DOT_NEXT_ALIAS = 'private-dot-next';
		const ROOT_DIR_ALIAS = 'private-next-root-dir';
		const APP_DIR_ALIAS = 'private-next-app-dir';
		const RSC_MOD_REF_PROXY_ALIAS = 'private-next-rsc-mod-ref-proxy';
		const RSC_ACTION_VALIDATE_ALIAS = 'private-next-rsc-action-validate';
		const RSC_ACTION_PROXY_ALIAS = 'private-next-rsc-server-reference';
		const RSC_CACHE_WRAPPER_ALIAS = 'private-next-rsc-cache-wrapper';
		const RSC_ACTION_ENCRYPTION_ALIAS = 'private-next-rsc-action-encryption';
		const RSC_ACTION_CLIENT_WRAPPER_ALIAS = 'private-next-rsc-action-client-wrapper';
		const PUBLIC_DIR_MIDDLEWARE_CONFLICT = `You can not have a '_next' folder inside of your public folder. This conflicts with the internal '/_next' route. https://nextjs.org/docs/messages/public-next-folder-conflict`;
		const SSG_GET_INITIAL_PROPS_CONFLICT = `You can not use getInitialProps with getStaticProps. To use SSG, please remove your getInitialProps`;
		const SERVER_PROPS_GET_INIT_PROPS_CONFLICT = `You can not use getInitialProps with getServerSideProps. Please remove getInitialProps.`;
		const SERVER_PROPS_SSG_CONFLICT = `You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps`;
		const STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR = `can not have getInitialProps/getServerSideProps, https://nextjs.org/docs/messages/404-get-initial-props`;
		const SERVER_PROPS_EXPORT_ERROR = `pages with \`getServerSideProps\` can not be exported. See more info here: https://nextjs.org/docs/messages/gssp-export`;
		const GSP_NO_RETURNED_VALUE = 'Your `getStaticProps` function did not return an object. Did you forget to add a `return`?';
		const GSSP_NO_RETURNED_VALUE = 'Your `getServerSideProps` function did not return an object. Did you forget to add a `return`?';
		const UNSTABLE_REVALIDATE_RENAME_ERROR = 'The `unstable_revalidate` property is available for general use.\n' + 'Please use `revalidate` instead.';
		const GSSP_COMPONENT_MEMBER_ERROR = `can not be attached to a page's component and must be exported from the page. See more info here: https://nextjs.org/docs/messages/gssp-component-member`;
		const NON_STANDARD_NODE_ENV = `You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against. Read more: https://nextjs.org/docs/messages/non-standard-node-env`;
		const SSG_FALLBACK_EXPORT_ERROR = `Pages with \`fallback\` enabled in \`getStaticPaths\` can not be exported. See more info here: https://nextjs.org/docs/messages/ssg-fallback-true-export`;
		const ESLINT_DEFAULT_DIRS = [
		    'app',
		    'pages',
		    'components',
		    'lib',
		    'src'
		];
		const SERVER_RUNTIME = {
		    edge: 'edge',
		    experimentalEdge: 'experimental-edge',
		    nodejs: 'nodejs'
		};
		/**
		 * The names of the webpack layers. These layers are the primitives for the
		 * webpack chunks.
		 */ const WEBPACK_LAYERS_NAMES = {
		    /**
		   * The layer for the shared code between the client and server bundles.
		   */ shared: 'shared',
		    /**
		   * The layer for server-only runtime and picking up `react-server` export conditions.
		   * Including app router RSC pages and app router custom routes and metadata routes.
		   */ reactServerComponents: 'rsc',
		    /**
		   * Server Side Rendering layer for app (ssr).
		   */ serverSideRendering: 'ssr',
		    /**
		   * The browser client bundle layer for actions.
		   */ actionBrowser: 'action-browser',
		    /**
		   * The Node.js bundle layer for the API routes.
		   */ apiNode: 'api-node',
		    /**
		   * The Edge Lite bundle layer for the API routes.
		   */ apiEdge: 'api-edge',
		    /**
		   * The layer for the middleware code.
		   */ middleware: 'middleware',
		    /**
		   * The layer for the instrumentation hooks.
		   */ instrument: 'instrument',
		    /**
		   * The layer for assets on the edge.
		   */ edgeAsset: 'edge-asset',
		    /**
		   * The browser client bundle layer for App directory.
		   */ appPagesBrowser: 'app-pages-browser',
		    /**
		   * The browser client bundle layer for Pages directory.
		   */ pagesDirBrowser: 'pages-dir-browser',
		    /**
		   * The Edge Lite bundle layer for Pages directory.
		   */ pagesDirEdge: 'pages-dir-edge',
		    /**
		   * The Node.js bundle layer for Pages directory.
		   */ pagesDirNode: 'pages-dir-node'
		};
		const WEBPACK_LAYERS = {
		    ...WEBPACK_LAYERS_NAMES,
		    GROUP: {
		        builtinReact: [
		            WEBPACK_LAYERS_NAMES.reactServerComponents,
		            WEBPACK_LAYERS_NAMES.actionBrowser
		        ],
		        serverOnly: [
		            WEBPACK_LAYERS_NAMES.reactServerComponents,
		            WEBPACK_LAYERS_NAMES.actionBrowser,
		            WEBPACK_LAYERS_NAMES.instrument,
		            WEBPACK_LAYERS_NAMES.middleware
		        ],
		        neutralTarget: [
		            // pages api
		            WEBPACK_LAYERS_NAMES.apiNode,
		            WEBPACK_LAYERS_NAMES.apiEdge
		        ],
		        clientOnly: [
		            WEBPACK_LAYERS_NAMES.serverSideRendering,
		            WEBPACK_LAYERS_NAMES.appPagesBrowser
		        ],
		        bundled: [
		            WEBPACK_LAYERS_NAMES.reactServerComponents,
		            WEBPACK_LAYERS_NAMES.actionBrowser,
		            WEBPACK_LAYERS_NAMES.serverSideRendering,
		            WEBPACK_LAYERS_NAMES.appPagesBrowser,
		            WEBPACK_LAYERS_NAMES.shared,
		            WEBPACK_LAYERS_NAMES.instrument,
		            WEBPACK_LAYERS_NAMES.middleware
		        ],
		        appPages: [
		            // app router pages and layouts
		            WEBPACK_LAYERS_NAMES.reactServerComponents,
		            WEBPACK_LAYERS_NAMES.serverSideRendering,
		            WEBPACK_LAYERS_NAMES.appPagesBrowser,
		            WEBPACK_LAYERS_NAMES.actionBrowser
		        ]
		    }
		};
		const WEBPACK_RESOURCE_QUERIES = {
		    edgeSSREntry: '__next_edge_ssr_entry__',
		    metadata: '__next_metadata__',
		    metadataRoute: '__next_metadata_route__',
		    metadataImageMeta: '__next_metadata_image_meta__'
		};

		
	} (constants));
	return constants;
}

var hasRequiredUtils$1;

function requireUtils$1 () {
	if (hasRequiredUtils$1) return utils$1;
	hasRequiredUtils$1 = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    fromNodeOutgoingHttpHeaders: function() {
		        return fromNodeOutgoingHttpHeaders;
		    },
		    normalizeNextQueryParam: function() {
		        return normalizeNextQueryParam;
		    },
		    splitCookiesString: function() {
		        return splitCookiesString;
		    },
		    toNodeOutgoingHttpHeaders: function() {
		        return toNodeOutgoingHttpHeaders;
		    },
		    validateURL: function() {
		        return validateURL;
		    }
		});
		const _constants = requireConstants();
		function fromNodeOutgoingHttpHeaders(nodeHeaders) {
		    const headers = new Headers();
		    for (let [key, value] of Object.entries(nodeHeaders)){
		        const values = Array.isArray(value) ? value : [
		            value
		        ];
		        for (let v of values){
		            if (typeof v === 'undefined') continue;
		            if (typeof v === 'number') {
		                v = v.toString();
		            }
		            headers.append(key, v);
		        }
		    }
		    return headers;
		}
		function splitCookiesString(cookiesString) {
		    var cookiesStrings = [];
		    var pos = 0;
		    var start;
		    var ch;
		    var lastComma;
		    var nextStart;
		    var cookiesSeparatorFound;
		    function skipWhitespace() {
		        while(pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))){
		            pos += 1;
		        }
		        return pos < cookiesString.length;
		    }
		    function notSpecialChar() {
		        ch = cookiesString.charAt(pos);
		        return ch !== '=' && ch !== ';' && ch !== ',';
		    }
		    while(pos < cookiesString.length){
		        start = pos;
		        cookiesSeparatorFound = false;
		        while(skipWhitespace()){
		            ch = cookiesString.charAt(pos);
		            if (ch === ',') {
		                // ',' is a cookie separator if we have later first '=', not ';' or ','
		                lastComma = pos;
		                pos += 1;
		                skipWhitespace();
		                nextStart = pos;
		                while(pos < cookiesString.length && notSpecialChar()){
		                    pos += 1;
		                }
		                // currently special character
		                if (pos < cookiesString.length && cookiesString.charAt(pos) === '=') {
		                    // we found cookies separator
		                    cookiesSeparatorFound = true;
		                    // pos is inside the next cookie, so back up and return it.
		                    pos = nextStart;
		                    cookiesStrings.push(cookiesString.substring(start, lastComma));
		                    start = pos;
		                } else {
		                    // in param ',' or param separator ';',
		                    // we continue from that comma
		                    pos = lastComma + 1;
		                }
		            } else {
		                pos += 1;
		            }
		        }
		        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
		            cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
		        }
		    }
		    return cookiesStrings;
		}
		function toNodeOutgoingHttpHeaders(headers) {
		    const nodeHeaders = {};
		    const cookies = [];
		    if (headers) {
		        for (const [key, value] of headers.entries()){
		            if (key.toLowerCase() === 'set-cookie') {
		                // We may have gotten a comma joined string of cookies, or multiple
		                // set-cookie headers. We need to merge them into one header array
		                // to represent all the cookies.
		                cookies.push(...splitCookiesString(value));
		                nodeHeaders[key] = cookies.length === 1 ? cookies[0] : cookies;
		            } else {
		                nodeHeaders[key] = value;
		            }
		        }
		    }
		    return nodeHeaders;
		}
		function validateURL(url) {
		    try {
		        return String(new URL(String(url)));
		    } catch (error) {
		        throw Object.defineProperty(new Error(`URL is malformed "${String(url)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, {
		            cause: error
		        }), "__NEXT_ERROR_CODE", {
		            value: "E61",
		            enumerable: false,
		            configurable: true
		        });
		    }
		}
		function normalizeNextQueryParam(key) {
		    const prefixes = [
		        _constants.NEXT_QUERY_PARAM_PREFIX,
		        _constants.NEXT_INTERCEPTION_MARKER_PREFIX
		    ];
		    for (const prefix of prefixes){
		        if (key !== prefix && key.startsWith(prefix)) {
		            return key.substring(prefix.length);
		        }
		    }
		    return null;
		}

		
	} (utils$1));
	return utils$1;
}

var error = {};

var hasRequiredError;

function requireError () {
	if (hasRequiredError) return error;
	hasRequiredError = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    PageSignatureError: function() {
		        return PageSignatureError;
		    },
		    RemovedPageError: function() {
		        return RemovedPageError;
		    },
		    RemovedUAError: function() {
		        return RemovedUAError;
		    }
		});
		class PageSignatureError extends Error {
		    constructor({ page }){
		        super(`The middleware "${page}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
		    }
		}
		class RemovedPageError extends Error {
		    constructor(){
		        super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
		    }
		}
		class RemovedUAError extends Error {
		    constructor(){
		        super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
		    }
		}

		
	} (error));
	return error;
}

var cookies$1 = {};

var cookies;
var hasRequiredCookies$1;

function requireCookies$1 () {
	if (hasRequiredCookies$1) return cookies;
	hasRequiredCookies$1 = 1;
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __export = (target, all) => {
	  for (var name in all)
	    __defProp(target, name, { get: all[name], enumerable: true });
	};
	var __copyProps = (to, from, except, desc) => {
	  if (from && typeof from === "object" || typeof from === "function") {
	    for (let key of __getOwnPropNames(from))
	      if (!__hasOwnProp.call(to, key) && key !== except)
	        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
	  }
	  return to;
	};
	var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

	// src/index.ts
	var src_exports = {};
	__export(src_exports, {
	  RequestCookies: () => RequestCookies,
	  ResponseCookies: () => ResponseCookies,
	  parseCookie: () => parseCookie,
	  parseSetCookie: () => parseSetCookie,
	  stringifyCookie: () => stringifyCookie
	});
	cookies = __toCommonJS(src_exports);

	// src/serialize.ts
	function stringifyCookie(c) {
	  var _a;
	  const attrs = [
	    "path" in c && c.path && `Path=${c.path}`,
	    "expires" in c && (c.expires || c.expires === 0) && `Expires=${(typeof c.expires === "number" ? new Date(c.expires) : c.expires).toUTCString()}`,
	    "maxAge" in c && typeof c.maxAge === "number" && `Max-Age=${c.maxAge}`,
	    "domain" in c && c.domain && `Domain=${c.domain}`,
	    "secure" in c && c.secure && "Secure",
	    "httpOnly" in c && c.httpOnly && "HttpOnly",
	    "sameSite" in c && c.sameSite && `SameSite=${c.sameSite}`,
	    "partitioned" in c && c.partitioned && "Partitioned",
	    "priority" in c && c.priority && `Priority=${c.priority}`
	  ].filter(Boolean);
	  const stringified = `${c.name}=${encodeURIComponent((_a = c.value) != null ? _a : "")}`;
	  return attrs.length === 0 ? stringified : `${stringified}; ${attrs.join("; ")}`;
	}
	function parseCookie(cookie) {
	  const map = /* @__PURE__ */ new Map();
	  for (const pair of cookie.split(/; */)) {
	    if (!pair)
	      continue;
	    const splitAt = pair.indexOf("=");
	    if (splitAt === -1) {
	      map.set(pair, "true");
	      continue;
	    }
	    const [key, value] = [pair.slice(0, splitAt), pair.slice(splitAt + 1)];
	    try {
	      map.set(key, decodeURIComponent(value != null ? value : "true"));
	    } catch {
	    }
	  }
	  return map;
	}
	function parseSetCookie(setCookie) {
	  if (!setCookie) {
	    return void 0;
	  }
	  const [[name, value], ...attributes] = parseCookie(setCookie);
	  const {
	    domain,
	    expires,
	    httponly,
	    maxage,
	    path,
	    samesite,
	    secure,
	    partitioned,
	    priority
	  } = Object.fromEntries(
	    attributes.map(([key, value2]) => [
	      key.toLowerCase().replace(/-/g, ""),
	      value2
	    ])
	  );
	  const cookie = {
	    name,
	    value: decodeURIComponent(value),
	    domain,
	    ...expires && { expires: new Date(expires) },
	    ...httponly && { httpOnly: true },
	    ...typeof maxage === "string" && { maxAge: Number(maxage) },
	    path,
	    ...samesite && { sameSite: parseSameSite(samesite) },
	    ...secure && { secure: true },
	    ...priority && { priority: parsePriority(priority) },
	    ...partitioned && { partitioned: true }
	  };
	  return compact(cookie);
	}
	function compact(t) {
	  const newT = {};
	  for (const key in t) {
	    if (t[key]) {
	      newT[key] = t[key];
	    }
	  }
	  return newT;
	}
	var SAME_SITE = ["strict", "lax", "none"];
	function parseSameSite(string) {
	  string = string.toLowerCase();
	  return SAME_SITE.includes(string) ? string : void 0;
	}
	var PRIORITY = ["low", "medium", "high"];
	function parsePriority(string) {
	  string = string.toLowerCase();
	  return PRIORITY.includes(string) ? string : void 0;
	}
	function splitCookiesString(cookiesString) {
	  if (!cookiesString)
	    return [];
	  var cookiesStrings = [];
	  var pos = 0;
	  var start;
	  var ch;
	  var lastComma;
	  var nextStart;
	  var cookiesSeparatorFound;
	  function skipWhitespace() {
	    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
	      pos += 1;
	    }
	    return pos < cookiesString.length;
	  }
	  function notSpecialChar() {
	    ch = cookiesString.charAt(pos);
	    return ch !== "=" && ch !== ";" && ch !== ",";
	  }
	  while (pos < cookiesString.length) {
	    start = pos;
	    cookiesSeparatorFound = false;
	    while (skipWhitespace()) {
	      ch = cookiesString.charAt(pos);
	      if (ch === ",") {
	        lastComma = pos;
	        pos += 1;
	        skipWhitespace();
	        nextStart = pos;
	        while (pos < cookiesString.length && notSpecialChar()) {
	          pos += 1;
	        }
	        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
	          cookiesSeparatorFound = true;
	          pos = nextStart;
	          cookiesStrings.push(cookiesString.substring(start, lastComma));
	          start = pos;
	        } else {
	          pos = lastComma + 1;
	        }
	      } else {
	        pos += 1;
	      }
	    }
	    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
	      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
	    }
	  }
	  return cookiesStrings;
	}

	// src/request-cookies.ts
	var RequestCookies = class {
	  constructor(requestHeaders) {
	    /** @internal */
	    this._parsed = /* @__PURE__ */ new Map();
	    this._headers = requestHeaders;
	    const header = requestHeaders.get("cookie");
	    if (header) {
	      const parsed = parseCookie(header);
	      for (const [name, value] of parsed) {
	        this._parsed.set(name, { name, value });
	      }
	    }
	  }
	  [Symbol.iterator]() {
	    return this._parsed[Symbol.iterator]();
	  }
	  /**
	   * The amount of cookies received from the client
	   */
	  get size() {
	    return this._parsed.size;
	  }
	  get(...args) {
	    const name = typeof args[0] === "string" ? args[0] : args[0].name;
	    return this._parsed.get(name);
	  }
	  getAll(...args) {
	    var _a;
	    const all = Array.from(this._parsed);
	    if (!args.length) {
	      return all.map(([_, value]) => value);
	    }
	    const name = typeof args[0] === "string" ? args[0] : (_a = args[0]) == null ? void 0 : _a.name;
	    return all.filter(([n]) => n === name).map(([_, value]) => value);
	  }
	  has(name) {
	    return this._parsed.has(name);
	  }
	  set(...args) {
	    const [name, value] = args.length === 1 ? [args[0].name, args[0].value] : args;
	    const map = this._parsed;
	    map.set(name, { name, value });
	    this._headers.set(
	      "cookie",
	      Array.from(map).map(([_, value2]) => stringifyCookie(value2)).join("; ")
	    );
	    return this;
	  }
	  /**
	   * Delete the cookies matching the passed name or names in the request.
	   */
	  delete(names) {
	    const map = this._parsed;
	    const result = !Array.isArray(names) ? map.delete(names) : names.map((name) => map.delete(name));
	    this._headers.set(
	      "cookie",
	      Array.from(map).map(([_, value]) => stringifyCookie(value)).join("; ")
	    );
	    return result;
	  }
	  /**
	   * Delete all the cookies in the cookies in the request.
	   */
	  clear() {
	    this.delete(Array.from(this._parsed.keys()));
	    return this;
	  }
	  /**
	   * Format the cookies in the request as a string for logging
	   */
	  [Symbol.for("edge-runtime.inspect.custom")]() {
	    return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
	  }
	  toString() {
	    return [...this._parsed.values()].map((v) => `${v.name}=${encodeURIComponent(v.value)}`).join("; ");
	  }
	};

	// src/response-cookies.ts
	var ResponseCookies = class {
	  constructor(responseHeaders) {
	    /** @internal */
	    this._parsed = /* @__PURE__ */ new Map();
	    var _a, _b, _c;
	    this._headers = responseHeaders;
	    const setCookie = (_c = (_b = (_a = responseHeaders.getSetCookie) == null ? void 0 : _a.call(responseHeaders)) != null ? _b : responseHeaders.get("set-cookie")) != null ? _c : [];
	    const cookieStrings = Array.isArray(setCookie) ? setCookie : splitCookiesString(setCookie);
	    for (const cookieString of cookieStrings) {
	      const parsed = parseSetCookie(cookieString);
	      if (parsed)
	        this._parsed.set(parsed.name, parsed);
	    }
	  }
	  /**
	   * {@link https://wicg.github.io/cookie-store/#CookieStore-get CookieStore#get} without the Promise.
	   */
	  get(...args) {
	    const key = typeof args[0] === "string" ? args[0] : args[0].name;
	    return this._parsed.get(key);
	  }
	  /**
	   * {@link https://wicg.github.io/cookie-store/#CookieStore-getAll CookieStore#getAll} without the Promise.
	   */
	  getAll(...args) {
	    var _a;
	    const all = Array.from(this._parsed.values());
	    if (!args.length) {
	      return all;
	    }
	    const key = typeof args[0] === "string" ? args[0] : (_a = args[0]) == null ? void 0 : _a.name;
	    return all.filter((c) => c.name === key);
	  }
	  has(name) {
	    return this._parsed.has(name);
	  }
	  /**
	   * {@link https://wicg.github.io/cookie-store/#CookieStore-set CookieStore#set} without the Promise.
	   */
	  set(...args) {
	    const [name, value, cookie] = args.length === 1 ? [args[0].name, args[0].value, args[0]] : args;
	    const map = this._parsed;
	    map.set(name, normalizeCookie({ name, value, ...cookie }));
	    replace(map, this._headers);
	    return this;
	  }
	  /**
	   * {@link https://wicg.github.io/cookie-store/#CookieStore-delete CookieStore#delete} without the Promise.
	   */
	  delete(...args) {
	    const [name, options] = typeof args[0] === "string" ? [args[0]] : [args[0].name, args[0]];
	    return this.set({ ...options, name, value: "", expires: /* @__PURE__ */ new Date(0) });
	  }
	  [Symbol.for("edge-runtime.inspect.custom")]() {
	    return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
	  }
	  toString() {
	    return [...this._parsed.values()].map(stringifyCookie).join("; ");
	  }
	};
	function replace(bag, headers) {
	  headers.delete("set-cookie");
	  for (const [, value] of bag) {
	    const serialized = stringifyCookie(value);
	    headers.append("set-cookie", serialized);
	  }
	}
	function normalizeCookie(cookie = { name: "", value: "" }) {
	  if (typeof cookie.expires === "number") {
	    cookie.expires = new Date(cookie.expires);
	  }
	  if (cookie.maxAge) {
	    cookie.expires = new Date(Date.now() + cookie.maxAge * 1e3);
	  }
	  if (cookie.path === null || cookie.path === void 0) {
	    cookie.path = "/";
	  }
	  return cookie;
	}
	return cookies;
}

var hasRequiredCookies;

function requireCookies () {
	if (hasRequiredCookies) return cookies$1;
	hasRequiredCookies = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    RequestCookies: function() {
		        return _cookies.RequestCookies;
		    },
		    ResponseCookies: function() {
		        return _cookies.ResponseCookies;
		    },
		    stringifyCookie: function() {
		        return _cookies.stringifyCookie;
		    }
		});
		const _cookies = requireCookies$1();

		
	} (cookies$1));
	return cookies$1;
}

var hasRequiredRequest;

function requireRequest () {
	if (hasRequiredRequest) return request;
	hasRequiredRequest = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    INTERNALS: function() {
		        return INTERNALS;
		    },
		    NextRequest: function() {
		        return NextRequest;
		    }
		});
		const _nexturl = requireNextUrl();
		const _utils = requireUtils$1();
		const _error = requireError();
		const _cookies = requireCookies();
		const INTERNALS = Symbol('internal request');
		class NextRequest extends Request {
		    constructor(input, init = {}){
		        const url = typeof input !== 'string' && 'url' in input ? input.url : String(input);
		        (0, _utils.validateURL)(url);
		        // node Request instance requires duplex option when a body
		        // is present or it errors, we don't handle this for
		        // Request being passed in since it would have already
		        // errored if this wasn't configured
		        if (process.env.NEXT_RUNTIME !== 'edge') {
		            if (init.body && init.duplex !== 'half') {
		                init.duplex = 'half';
		            }
		        }
		        if (input instanceof Request) super(input, init);
		        else super(url, init);
		        const nextUrl = new _nexturl.NextURL(url, {
		            headers: (0, _utils.toNodeOutgoingHttpHeaders)(this.headers),
		            nextConfig: init.nextConfig
		        });
		        this[INTERNALS] = {
		            cookies: new _cookies.RequestCookies(this.headers),
		            nextUrl,
		            url: process.env.__NEXT_NO_MIDDLEWARE_URL_NORMALIZE ? url : nextUrl.toString()
		        };
		    }
		    [Symbol.for('edge-runtime.inspect.custom')]() {
		        return {
		            cookies: this.cookies,
		            nextUrl: this.nextUrl,
		            url: this.url,
		            // rest of props come from Request
		            bodyUsed: this.bodyUsed,
		            cache: this.cache,
		            credentials: this.credentials,
		            destination: this.destination,
		            headers: Object.fromEntries(this.headers),
		            integrity: this.integrity,
		            keepalive: this.keepalive,
		            method: this.method,
		            mode: this.mode,
		            redirect: this.redirect,
		            referrer: this.referrer,
		            referrerPolicy: this.referrerPolicy,
		            signal: this.signal
		        };
		    }
		    get cookies() {
		        return this[INTERNALS].cookies;
		    }
		    get nextUrl() {
		        return this[INTERNALS].nextUrl;
		    }
		    /**
		   * @deprecated
		   * `page` has been deprecated in favour of `URLPattern`.
		   * Read more: https://nextjs.org/docs/messages/middleware-request-page
		   */ get page() {
		        throw new _error.RemovedPageError();
		    }
		    /**
		   * @deprecated
		   * `ua` has been removed in favour of \`userAgent\` function.
		   * Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
		   */ get ua() {
		        throw new _error.RemovedUAError();
		    }
		    get url() {
		        return this[INTERNALS].url;
		    }
		}

		
	} (request));
	return request;
}

var response = {};

var reflect = {};

var hasRequiredReflect;

function requireReflect () {
	if (hasRequiredReflect) return reflect;
	hasRequiredReflect = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "ReflectAdapter", {
		    enumerable: true,
		    get: function() {
		        return ReflectAdapter;
		    }
		});
		class ReflectAdapter {
		    static get(target, prop, receiver) {
		        const value = Reflect.get(target, prop, receiver);
		        if (typeof value === 'function') {
		            return value.bind(target);
		        }
		        return value;
		    }
		    static set(target, prop, value, receiver) {
		        return Reflect.set(target, prop, value, receiver);
		    }
		    static has(target, prop) {
		        return Reflect.has(target, prop);
		    }
		    static deleteProperty(target, prop) {
		        return Reflect.deleteProperty(target, prop);
		    }
		}

		
	} (reflect));
	return reflect;
}

var hasRequiredResponse;

function requireResponse () {
	if (hasRequiredResponse) return response;
	hasRequiredResponse = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "NextResponse", {
		    enumerable: true,
		    get: function() {
		        return NextResponse;
		    }
		});
		const _cookies = requireCookies();
		const _nexturl = requireNextUrl();
		const _utils = requireUtils$1();
		const _reflect = requireReflect();
		const _cookies1 = requireCookies();
		const INTERNALS = Symbol('internal response');
		const REDIRECTS = new Set([
		    301,
		    302,
		    303,
		    307,
		    308
		]);
		function handleMiddlewareField(init, headers) {
		    var _init_request;
		    if (init == null ? void 0 : (_init_request = init.request) == null ? void 0 : _init_request.headers) {
		        if (!(init.request.headers instanceof Headers)) {
		            throw Object.defineProperty(new Error('request.headers must be an instance of Headers'), "__NEXT_ERROR_CODE", {
		                value: "E119",
		                enumerable: false,
		                configurable: true
		            });
		        }
		        const keys = [];
		        for (const [key, value] of init.request.headers){
		            headers.set('x-middleware-request-' + key, value);
		            keys.push(key);
		        }
		        headers.set('x-middleware-override-headers', keys.join(','));
		    }
		}
		class NextResponse extends Response {
		    constructor(body, init = {}){
		        super(body, init);
		        const headers = this.headers;
		        const cookies = new _cookies1.ResponseCookies(headers);
		        const cookiesProxy = new Proxy(cookies, {
		            get (target, prop, receiver) {
		                switch(prop){
		                    case 'delete':
		                    case 'set':
		                        {
		                            return (...args)=>{
		                                const result = Reflect.apply(target[prop], target, args);
		                                const newHeaders = new Headers(headers);
		                                if (result instanceof _cookies1.ResponseCookies) {
		                                    headers.set('x-middleware-set-cookie', result.getAll().map((cookie)=>(0, _cookies.stringifyCookie)(cookie)).join(','));
		                                }
		                                handleMiddlewareField(init, newHeaders);
		                                return result;
		                            };
		                        }
		                    default:
		                        return _reflect.ReflectAdapter.get(target, prop, receiver);
		                }
		            }
		        });
		        this[INTERNALS] = {
		            cookies: cookiesProxy,
		            url: init.url ? new _nexturl.NextURL(init.url, {
		                headers: (0, _utils.toNodeOutgoingHttpHeaders)(headers),
		                nextConfig: init.nextConfig
		            }) : undefined
		        };
		    }
		    [Symbol.for('edge-runtime.inspect.custom')]() {
		        return {
		            cookies: this.cookies,
		            url: this.url,
		            // rest of props come from Response
		            body: this.body,
		            bodyUsed: this.bodyUsed,
		            headers: Object.fromEntries(this.headers),
		            ok: this.ok,
		            redirected: this.redirected,
		            status: this.status,
		            statusText: this.statusText,
		            type: this.type
		        };
		    }
		    get cookies() {
		        return this[INTERNALS].cookies;
		    }
		    static json(body, init) {
		        const response = Response.json(body, init);
		        return new NextResponse(response.body, response);
		    }
		    static redirect(url, init) {
		        const status = typeof init === 'number' ? init : (init == null ? void 0 : init.status) ?? 307;
		        if (!REDIRECTS.has(status)) {
		            throw Object.defineProperty(new RangeError('Failed to execute "redirect" on "response": Invalid status code'), "__NEXT_ERROR_CODE", {
		                value: "E529",
		                enumerable: false,
		                configurable: true
		            });
		        }
		        const initObj = typeof init === 'object' ? init : {};
		        const headers = new Headers(initObj == null ? void 0 : initObj.headers);
		        headers.set('Location', (0, _utils.validateURL)(url));
		        return new NextResponse(null, {
		            ...initObj,
		            headers,
		            status
		        });
		    }
		    static rewrite(destination, init) {
		        const headers = new Headers(init == null ? void 0 : init.headers);
		        headers.set('x-middleware-rewrite', (0, _utils.validateURL)(destination));
		        handleMiddlewareField(init, headers);
		        return new NextResponse(null, {
		            ...init,
		            headers
		        });
		    }
		    static next(init) {
		        const headers = new Headers(init == null ? void 0 : init.headers);
		        headers.set('x-middleware-next', '1');
		        handleMiddlewareField(init, headers);
		        return new NextResponse(null, {
		            ...init,
		            headers
		        });
		    }
		}

		
	} (response));
	return response;
}

var imageResponse = {};

/**
 * @deprecated ImageResponse moved from "next/server" to "next/og" since Next.js 14, please import from "next/og" instead.
 * Migration with codemods: https://nextjs.org/docs/app/building-your-application/upgrading/codemods#next-og-import
 */

var hasRequiredImageResponse;

function requireImageResponse () {
	if (hasRequiredImageResponse) return imageResponse;
	hasRequiredImageResponse = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "ImageResponse", {
		    enumerable: true,
		    get: function() {
		        return ImageResponse;
		    }
		});
		function ImageResponse() {
		    throw Object.defineProperty(new Error('ImageResponse moved from "next/server" to "next/og" since Next.js 14, please import from "next/og" instead'), "__NEXT_ERROR_CODE", {
		        value: "E183",
		        enumerable: false,
		        configurable: true
		    });
		}

		
	} (imageResponse));
	return imageResponse;
}

var userAgent = {};

var uaParser = {exports: {}};

var hasRequiredUaParser;

function requireUaParser () {
	if (hasRequiredUaParser) return uaParser.exports;
	hasRequiredUaParser = 1;
	(()=>{var i={226:function(i,e){(function(o,a){var r="1.0.35",t="",n="?",s="function",b="undefined",w="object",l="string",d="major",c="model",u="name",p="type",m="vendor",f="version",h="architecture",v="console",g="mobile",k="tablet",x="smarttv",_="wearable",y="embedded",q=350;var T="Amazon",S="Apple",z="ASUS",N="BlackBerry",A="Browser",C="Chrome",E="Edge",O="Firefox",U="Google",j="Huawei",P="LG",R="Microsoft",M="Motorola",B="Opera",V="Samsung",D="Sharp",I="Sony",F="Xiaomi",G="Zebra",H="Facebook",L="Chromium OS",Z="Mac OS";var extend=function(i,e){var o={};for(var a in i){if(e[a]&&e[a].length%2===0){o[a]=e[a].concat(i[a]);}else {o[a]=i[a];}}return o},enumerize=function(i){var e={};for(var o=0;o<i.length;o++){e[i[o].toUpperCase()]=i[o];}return e},has=function(i,e){return typeof i===l?lowerize(e).indexOf(lowerize(i))!==-1:false},lowerize=function(i){return i.toLowerCase()},majorize=function(i){return typeof i===l?i.replace(/[^\d\.]/g,t).split(".")[0]:a},trim=function(i,e){if(typeof i===l){i=i.replace(/^\s\s*/,t);return typeof e===b?i:i.substring(0,q)}};var rgxMapper=function(i,e){var o=0,r,t,n,b,l,d;while(o<e.length&&!l){var c=e[o],u=e[o+1];r=t=0;while(r<c.length&&!l){if(!c[r]){break}l=c[r++].exec(i);if(!!l){for(n=0;n<u.length;n++){d=l[++t];b=u[n];if(typeof b===w&&b.length>0){if(b.length===2){if(typeof b[1]==s){this[b[0]]=b[1].call(this,d);}else {this[b[0]]=b[1];}}else if(b.length===3){if(typeof b[1]===s&&!(b[1].exec&&b[1].test)){this[b[0]]=d?b[1].call(this,d,b[2]):a;}else {this[b[0]]=d?d.replace(b[1],b[2]):a;}}else if(b.length===4){this[b[0]]=d?b[3].call(this,d.replace(b[1],b[2])):a;}}else {this[b]=d?d:a;}}}}o+=2;}},strMapper=function(i,e){for(var o in e){if(typeof e[o]===w&&e[o].length>0){for(var r=0;r<e[o].length;r++){if(has(e[o][r],i)){return o===n?a:o}}}else if(has(e[o],i)){return o===n?a:o}}return i};var $={"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"},X={ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2e3:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"};var K={browser:[[/\b(?:crmo|crios)\/([\w\.]+)/i],[f,[u,"Chrome"]],[/edg(?:e|ios|a)?\/([\w\.]+)/i],[f,[u,"Edge"]],[/(opera mini)\/([-\w\.]+)/i,/(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,/(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i],[u,f],[/opios[\/ ]+([\w\.]+)/i],[f,[u,B+" Mini"]],[/\bopr\/([\w\.]+)/i],[f,[u,B]],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,/(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,/(ba?idubrowser)[\/ ]?([\w\.]+)/i,/(?:ms|\()(ie) ([\w\.]+)/i,/(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,/(heytap|ovi)browser\/([\d\.]+)/i,/(weibo)__([\d\.]+)/i],[u,f],[/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],[f,[u,"UC"+A]],[/microm.+\bqbcore\/([\w\.]+)/i,/\bqbcore\/([\w\.]+).+microm/i],[f,[u,"WeChat(Win) Desktop"]],[/micromessenger\/([\w\.]+)/i],[f,[u,"WeChat"]],[/konqueror\/([\w\.]+)/i],[f,[u,"Konqueror"]],[/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],[f,[u,"IE"]],[/ya(?:search)?browser\/([\w\.]+)/i],[f,[u,"Yandex"]],[/(avast|avg)\/([\w\.]+)/i],[[u,/(.+)/,"$1 Secure "+A],f],[/\bfocus\/([\w\.]+)/i],[f,[u,O+" Focus"]],[/\bopt\/([\w\.]+)/i],[f,[u,B+" Touch"]],[/coc_coc\w+\/([\w\.]+)/i],[f,[u,"Coc Coc"]],[/dolfin\/([\w\.]+)/i],[f,[u,"Dolphin"]],[/coast\/([\w\.]+)/i],[f,[u,B+" Coast"]],[/miuibrowser\/([\w\.]+)/i],[f,[u,"MIUI "+A]],[/fxios\/([-\w\.]+)/i],[f,[u,O]],[/\bqihu|(qi?ho?o?|360)browser/i],[[u,"360 "+A]],[/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i],[[u,/(.+)/,"$1 "+A],f],[/(comodo_dragon)\/([\w\.]+)/i],[[u,/_/g," "],f],[/(electron)\/([\w\.]+) safari/i,/(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,/m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i],[u,f],[/(metasr)[\/ ]?([\w\.]+)/i,/(lbbrowser)/i,/\[(linkedin)app\]/i],[u],[/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],[[u,H],f],[/(kakao(?:talk|story))[\/ ]([\w\.]+)/i,/(naver)\(.*?(\d+\.[\w\.]+).*\)/i,/safari (line)\/([\w\.]+)/i,/\b(line)\/([\w\.]+)\/iab/i,/(chromium|instagram)[\/ ]([-\w\.]+)/i],[u,f],[/\bgsa\/([\w\.]+) .*safari\//i],[f,[u,"GSA"]],[/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],[f,[u,"TikTok"]],[/headlesschrome(?:\/([\w\.]+)| )/i],[f,[u,C+" Headless"]],[/ wv\).+(chrome)\/([\w\.]+)/i],[[u,C+" WebView"],f],[/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],[f,[u,"Android "+A]],[/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],[u,f],[/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],[f,[u,"Mobile Safari"]],[/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],[f,u],[/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],[u,[f,strMapper,$]],[/(webkit|khtml)\/([\w\.]+)/i],[u,f],[/(navigator|netscape\d?)\/([-\w\.]+)/i],[[u,"Netscape"],f],[/mobile vr; rv:([\w\.]+)\).+firefox/i],[f,[u,O+" Reality"]],[/ekiohf.+(flow)\/([\w\.]+)/i,/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,/(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,/(firefox)\/([\w\.]+)/i,/(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,/(links) \(([\w\.]+)/i,/panasonic;(viera)/i],[u,f],[/(cobalt)\/([\w\.]+)/i],[u,[f,/master.|lts./,""]]],cpu:[[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],[[h,"amd64"]],[/(ia32(?=;))/i],[[h,lowerize]],[/((?:i[346]|x)86)[;\)]/i],[[h,"ia32"]],[/\b(aarch64|arm(v?8e?l?|_?64))\b/i],[[h,"arm64"]],[/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],[[h,"armhf"]],[/windows (ce|mobile); ppc;/i],[[h,"arm"]],[/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],[[h,/ower/,t,lowerize]],[/(sun4\w)[;\)]/i],[[h,"sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i],[[h,lowerize]]],device:[[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],[c,[m,V],[p,k]],[/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,/samsung[- ]([-\w]+)/i,/sec-(sgh\w+)/i],[c,[m,V],[p,g]],[/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],[c,[m,S],[p,g]],[/\((ipad);[-\w\),; ]+apple/i,/applecoremedia\/[\w\.]+ \((ipad)/i,/\b(ipad)\d\d?,\d\d?[;\]].+ios/i],[c,[m,S],[p,k]],[/(macintosh);/i],[c,[m,S]],[/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],[c,[m,D],[p,g]],[/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],[c,[m,j],[p,k]],[/(?:huawei|honor)([-\w ]+)[;\)]/i,/\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i],[c,[m,j],[p,g]],[/\b(poco[\w ]+)(?: bui|\))/i,/\b; (\w+) build\/hm\1/i,/\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,/\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,/\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i],[[c,/_/g," "],[m,F],[p,g]],[/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],[[c,/_/g," "],[m,F],[p,k]],[/; (\w+) bui.+ oppo/i,/\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i],[c,[m,"OPPO"],[p,g]],[/vivo (\w+)(?: bui|\))/i,/\b(v[12]\d{3}\w?[at])(?: bui|;)/i],[c,[m,"Vivo"],[p,g]],[/\b(rmx[12]\d{3})(?: bui|;|\))/i],[c,[m,"Realme"],[p,g]],[/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,/\bmot(?:orola)?[- ](\w*)/i,/((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i],[c,[m,M],[p,g]],[/\b(mz60\d|xoom[2 ]{0,2}) build\//i],[c,[m,M],[p,k]],[/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],[c,[m,P],[p,k]],[/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,/\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,/\blg-?([\d\w]+) bui/i],[c,[m,P],[p,g]],[/(ideatab[-\w ]+)/i,/lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i],[c,[m,"Lenovo"],[p,k]],[/(?:maemo|nokia).*(n900|lumia \d+)/i,/nokia[-_ ]?([-\w\.]*)/i],[[c,/_/g," "],[m,"Nokia"],[p,g]],[/(pixel c)\b/i],[c,[m,U],[p,k]],[/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],[c,[m,U],[p,g]],[/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i],[c,[m,I],[p,g]],[/sony tablet [ps]/i,/\b(?:sony)?sgp\w+(?: bui|\))/i],[[c,"Xperia Tablet"],[m,I],[p,k]],[/ (kb2005|in20[12]5|be20[12][59])\b/i,/(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],[c,[m,"OnePlus"],[p,g]],[/(alexa)webm/i,/(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,/(kf[a-z]+)( bui|\)).+silk\//i],[c,[m,T],[p,k]],[/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],[[c,/(.+)/g,"Fire Phone $1"],[m,T],[p,g]],[/(playbook);[-\w\),; ]+(rim)/i],[c,m,[p,k]],[/\b((?:bb[a-f]|st[hv])100-\d)/i,/\(bb10; (\w+)/i],[c,[m,N],[p,g]],[/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],[c,[m,z],[p,k]],[/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],[c,[m,z],[p,g]],[/(nexus 9)/i],[c,[m,"HTC"],[p,k]],[/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,/(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,/(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i],[m,[c,/_/g," "],[p,g]],[/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],[c,[m,"Acer"],[p,k]],[/droid.+; (m[1-5] note) bui/i,/\bmz-([-\w]{2,})/i],[c,[m,"Meizu"],[p,g]],[/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i,/(hp) ([\w ]+\w)/i,/(asus)-?(\w+)/i,/(microsoft); (lumia[\w ]+)/i,/(lenovo)[-_ ]?([-\w]+)/i,/(jolla)/i,/(oppo) ?([\w ]+) bui/i],[m,c,[p,g]],[/(kobo)\s(ereader|touch)/i,/(archos) (gamepad2?)/i,/(hp).+(touchpad(?!.+tablet)|tablet)/i,/(kindle)\/([\w\.]+)/i,/(nook)[\w ]+build\/(\w+)/i,/(dell) (strea[kpr\d ]*[\dko])/i,/(le[- ]+pan)[- ]+(\w{1,9}) bui/i,/(trinity)[- ]*(t\d{3}) bui/i,/(gigaset)[- ]+(q\w{1,9}) bui/i,/(vodafone) ([\w ]+)(?:\)| bui)/i],[m,c,[p,k]],[/(surface duo)/i],[c,[m,R],[p,k]],[/droid [\d\.]+; (fp\du?)(?: b|\))/i],[c,[m,"Fairphone"],[p,g]],[/(u304aa)/i],[c,[m,"AT&T"],[p,g]],[/\bsie-(\w*)/i],[c,[m,"Siemens"],[p,g]],[/\b(rct\w+) b/i],[c,[m,"RCA"],[p,k]],[/\b(venue[\d ]{2,7}) b/i],[c,[m,"Dell"],[p,k]],[/\b(q(?:mv|ta)\w+) b/i],[c,[m,"Verizon"],[p,k]],[/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],[c,[m,"Barnes & Noble"],[p,k]],[/\b(tm\d{3}\w+) b/i],[c,[m,"NuVision"],[p,k]],[/\b(k88) b/i],[c,[m,"ZTE"],[p,k]],[/\b(nx\d{3}j) b/i],[c,[m,"ZTE"],[p,g]],[/\b(gen\d{3}) b.+49h/i],[c,[m,"Swiss"],[p,g]],[/\b(zur\d{3}) b/i],[c,[m,"Swiss"],[p,k]],[/\b((zeki)?tb.*\b) b/i],[c,[m,"Zeki"],[p,k]],[/\b([yr]\d{2}) b/i,/\b(dragon[- ]+touch |dt)(\w{5}) b/i],[[m,"Dragon Touch"],c,[p,k]],[/\b(ns-?\w{0,9}) b/i],[c,[m,"Insignia"],[p,k]],[/\b((nxa|next)-?\w{0,9}) b/i],[c,[m,"NextBook"],[p,k]],[/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],[[m,"Voice"],c,[p,g]],[/\b(lvtel\-)?(v1[12]) b/i],[[m,"LvTel"],c,[p,g]],[/\b(ph-1) /i],[c,[m,"Essential"],[p,g]],[/\b(v(100md|700na|7011|917g).*\b) b/i],[c,[m,"Envizen"],[p,k]],[/\b(trio[-\w\. ]+) b/i],[c,[m,"MachSpeed"],[p,k]],[/\btu_(1491) b/i],[c,[m,"Rotor"],[p,k]],[/(shield[\w ]+) b/i],[c,[m,"Nvidia"],[p,k]],[/(sprint) (\w+)/i],[m,c,[p,g]],[/(kin\.[onetw]{3})/i],[[c,/\./g," "],[m,R],[p,g]],[/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],[c,[m,G],[p,k]],[/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],[c,[m,G],[p,g]],[/smart-tv.+(samsung)/i],[m,[p,x]],[/hbbtv.+maple;(\d+)/i],[[c,/^/,"SmartTV"],[m,V],[p,x]],[/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],[[m,P],[p,x]],[/(apple) ?tv/i],[m,[c,S+" TV"],[p,x]],[/crkey/i],[[c,C+"cast"],[m,U],[p,x]],[/droid.+aft(\w)( bui|\))/i],[c,[m,T],[p,x]],[/\(dtv[\);].+(aquos)/i,/(aquos-tv[\w ]+)\)/i],[c,[m,D],[p,x]],[/(bravia[\w ]+)( bui|\))/i],[c,[m,I],[p,x]],[/(mitv-\w{5}) bui/i],[c,[m,F],[p,x]],[/Hbbtv.*(technisat) (.*);/i],[m,c,[p,x]],[/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,/hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i],[[m,trim],[c,trim],[p,x]],[/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],[[p,x]],[/(ouya)/i,/(nintendo) ([wids3utch]+)/i],[m,c,[p,v]],[/droid.+; (shield) bui/i],[c,[m,"Nvidia"],[p,v]],[/(playstation [345portablevi]+)/i],[c,[m,I],[p,v]],[/\b(xbox(?: one)?(?!; xbox))[\); ]/i],[c,[m,R],[p,v]],[/((pebble))app/i],[m,c,[p,_]],[/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],[c,[m,S],[p,_]],[/droid.+; (glass) \d/i],[c,[m,U],[p,_]],[/droid.+; (wt63?0{2,3})\)/i],[c,[m,G],[p,_]],[/(quest( 2| pro)?)/i],[c,[m,H],[p,_]],[/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],[m,[p,y]],[/(aeobc)\b/i],[c,[m,T],[p,y]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i],[c,[p,g]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],[c,[p,k]],[/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],[[p,k]],[/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],[[p,g]],[/(android[-\w\. ]{0,9});.+buil/i],[c,[m,"Generic"]]],engine:[[/windows.+ edge\/([\w\.]+)/i],[f,[u,E+"HTML"]],[/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],[f,[u,"Blink"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,/ekioh(flow)\/([\w\.]+)/i,/(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,/(icab)[\/ ]([23]\.[\d\.]+)/i,/\b(libweb)/i],[u,f],[/rv\:([\w\.]{1,9})\b.+(gecko)/i],[f,u]],os:[[/microsoft (windows) (vista|xp)/i],[u,f],[/(windows) nt 6\.2; (arm)/i,/(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,/(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i],[u,[f,strMapper,X]],[/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i],[[u,"Windows"],[f,strMapper,X]],[/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,/ios;fbsv\/([\d\.]+)/i,/cfnetwork\/.+darwin/i],[[f,/_/g,"."],[u,"iOS"]],[/(mac os x) ?([\w\. ]*)/i,/(macintosh|mac_powerpc\b)(?!.+haiku)/i],[[u,Z],[f,/_/g,"."]],[/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],[f,u],[/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,/(blackberry)\w*\/([\w\.]*)/i,/(tizen|kaios)[\/ ]([\w\.]+)/i,/\((series40);/i],[u,f],[/\(bb(10);/i],[f,[u,N]],[/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],[f,[u,"Symbian"]],[/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i],[f,[u,O+" OS"]],[/web0s;.+rt(tv)/i,/\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],[f,[u,"webOS"]],[/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],[f,[u,"watchOS"]],[/crkey\/([\d\.]+)/i],[f,[u,C+"cast"]],[/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],[[u,L],f],[/panasonic;(viera)/i,/(netrange)mmh/i,/(nettv)\/(\d+\.[\w\.]+)/i,/(nintendo|playstation) ([wids345portablevuch]+)/i,/(xbox); +xbox ([^\);]+)/i,/\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,/(mint)[\/\(\) ]?(\w*)/i,/(mageia|vectorlinux)[; ]/i,/([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,/(hurd|linux) ?([\w\.]*)/i,/(gnu) ?([\w\.]*)/i,/\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,/(haiku) (\w+)/i],[u,f],[/(sunos) ?([\w\.\d]*)/i],[[u,"Solaris"],f],[/((?:open)?solaris)[-\/ ]?([\w\.]*)/i,/(aix) ((\d)(?=\.|\)| )[\w\.])*/i,/\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,/(unix) ?([\w\.]*)/i],[u,f]]};var UAParser=function(i,e){if(typeof i===w){e=i;i=a;}if(!(this instanceof UAParser)){return new UAParser(i,e).getResult()}var r=typeof o!==b&&o.navigator?o.navigator:a;var n=i||(r&&r.userAgent?r.userAgent:t);var v=r&&r.userAgentData?r.userAgentData:a;var x=e?extend(K,e):K;var _=r&&r.userAgent==n;this.getBrowser=function(){var i={};i[u]=a;i[f]=a;rgxMapper.call(i,n,x.browser);i[d]=majorize(i[f]);if(_&&r&&r.brave&&typeof r.brave.isBrave==s){i[u]="Brave";}return i};this.getCPU=function(){var i={};i[h]=a;rgxMapper.call(i,n,x.cpu);return i};this.getDevice=function(){var i={};i[m]=a;i[c]=a;i[p]=a;rgxMapper.call(i,n,x.device);if(_&&!i[p]&&v&&v.mobile){i[p]=g;}if(_&&i[c]=="Macintosh"&&r&&typeof r.standalone!==b&&r.maxTouchPoints&&r.maxTouchPoints>2){i[c]="iPad";i[p]=k;}return i};this.getEngine=function(){var i={};i[u]=a;i[f]=a;rgxMapper.call(i,n,x.engine);return i};this.getOS=function(){var i={};i[u]=a;i[f]=a;rgxMapper.call(i,n,x.os);if(_&&!i[u]&&v&&v.platform!="Unknown"){i[u]=v.platform.replace(/chrome os/i,L).replace(/macos/i,Z);}return i};this.getResult=function(){return {ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}};this.getUA=function(){return n};this.setUA=function(i){n=typeof i===l&&i.length>q?trim(i,q):i;return this};this.setUA(n);return this};UAParser.VERSION=r;UAParser.BROWSER=enumerize([u,f,d]);UAParser.CPU=enumerize([h]);UAParser.DEVICE=enumerize([c,m,p,v,g,x,k,_,y]);UAParser.ENGINE=UAParser.OS=enumerize([u,f]);if(typeof e!==b){if(i.exports){e=i.exports=UAParser;}e.UAParser=UAParser;}else {if(typeof o!==b){o.UAParser=UAParser;}}var Q=typeof o!==b&&(o.jQuery||o.Zepto);if(Q&&!Q.ua){var Y=new UAParser;Q.ua=Y.getResult();Q.ua.get=function(){return Y.getUA()};Q.ua.set=function(i){Y.setUA(i);var e=Y.getResult();for(var o in e){Q.ua[o]=e[o];}};}})(typeof window==="object"?window:this);}};var e={};function __nccwpck_require__(o){var a=e[o];if(a!==undefined){return a.exports}var r=e[o]={exports:{}};var t=true;try{i[o].call(r.exports,r,r.exports,__nccwpck_require__);t=false;}finally{if(t)delete e[o];}return r.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var o=__nccwpck_require__(226);uaParser.exports=o;})();
	return uaParser.exports;
}

var hasRequiredUserAgent;

function requireUserAgent () {
	if (hasRequiredUserAgent) return userAgent;
	hasRequiredUserAgent = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    isBot: function() {
		        return isBot;
		    },
		    userAgent: function() {
		        return userAgent;
		    },
		    userAgentFromString: function() {
		        return userAgentFromString;
		    }
		});
		const _uaparserjs = /*#__PURE__*/ _interop_require_default(requireUaParser());
		function _interop_require_default(obj) {
		    return obj && obj.__esModule ? obj : {
		        default: obj
		    };
		}
		function isBot(input) {
		    return /Googlebot|Mediapartners-Google|AdsBot-Google|googleweblight|Storebot-Google|Google-PageRenderer|Google-InspectionTool|Bingbot|BingPreview|Slurp|DuckDuckBot|baiduspider|yandex|sogou|LinkedInBot|bitlybot|tumblr|vkShare|quora link preview|facebookexternalhit|facebookcatalog|Twitterbot|applebot|redditbot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|ia_archiver/i.test(input);
		}
		function userAgentFromString(input) {
		    return {
		        ...(0, _uaparserjs.default)(input),
		        isBot: input === undefined ? false : isBot(input)
		    };
		}
		function userAgent({ headers }) {
		    return userAgentFromString(headers.get('user-agent') || undefined);
		}

		
	} (userAgent));
	return userAgent;
}

var urlPattern = {};

var hasRequiredUrlPattern;

function requireUrlPattern () {
	if (hasRequiredUrlPattern) return urlPattern;
	hasRequiredUrlPattern = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "URLPattern", {
		    enumerable: true,
		    get: function() {
		        return GlobalURLPattern;
		    }
		});
		const GlobalURLPattern = // @ts-expect-error: URLPattern is not available in Node.js
		typeof URLPattern === 'undefined' ? undefined : URLPattern;

		
	} (urlPattern));
	return urlPattern;
}

var after$1 = {};

var after = {};

var hasRequiredAfter$1;

function requireAfter$1 () {
	if (hasRequiredAfter$1) return after;
	hasRequiredAfter$1 = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "after", {
		    enumerable: true,
		    get: function() {
		        return after;
		    }
		});
		const _workasyncstorageexternal = requireWorkAsyncStorage_external();
		function after(task) {
		    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
		    if (!workStore) {
		        // TODO(after): the linked docs page talks about *dynamic* APIs, which after soon won't be anymore
		        throw Object.defineProperty(new Error('`after` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context'), "__NEXT_ERROR_CODE", {
		            value: "E468",
		            enumerable: false,
		            configurable: true
		        });
		    }
		    const { afterContext } = workStore;
		    return afterContext.after(task);
		}

		
	} (after));
	return after;
}

var hasRequiredAfter;

function requireAfter () {
	if (hasRequiredAfter) return after$1;
	hasRequiredAfter = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		_export_star(requireAfter$1(), exports);
		function _export_star(from, to) {
		    Object.keys(from).forEach(function(k) {
		        if (k !== "default" && !Object.prototype.hasOwnProperty.call(to, k)) {
		            Object.defineProperty(to, k, {
		                enumerable: true,
		                get: function() {
		                    return from[k];
		                }
		            });
		        }
		    });
		    return from;
		}

		
	} (after$1));
	return after$1;
}

var connection = {};

var utils = {};

var afterTaskAsyncStorage_external = {};

var afterTaskAsyncStorageInstance = {};

var hasRequiredAfterTaskAsyncStorageInstance;

function requireAfterTaskAsyncStorageInstance () {
	if (hasRequiredAfterTaskAsyncStorageInstance) return afterTaskAsyncStorageInstance;
	hasRequiredAfterTaskAsyncStorageInstance = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "afterTaskAsyncStorageInstance", {
		    enumerable: true,
		    get: function() {
		        return afterTaskAsyncStorageInstance;
		    }
		});
		const _asynclocalstorage = requireAsyncLocalStorage();
		const afterTaskAsyncStorageInstance = (0, _asynclocalstorage.createAsyncLocalStorage)();

		
	} (afterTaskAsyncStorageInstance));
	return afterTaskAsyncStorageInstance;
}

var hasRequiredAfterTaskAsyncStorage_external;

function requireAfterTaskAsyncStorage_external () {
	if (hasRequiredAfterTaskAsyncStorage_external) return afterTaskAsyncStorage_external;
	hasRequiredAfterTaskAsyncStorage_external = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "afterTaskAsyncStorage", {
		    enumerable: true,
		    get: function() {
		        return _aftertaskasyncstorageinstance.afterTaskAsyncStorageInstance;
		    }
		});
		const _aftertaskasyncstorageinstance = requireAfterTaskAsyncStorageInstance();

		
	} (afterTaskAsyncStorage_external));
	return afterTaskAsyncStorage_external;
}

var hasRequiredUtils;

function requireUtils () {
	if (hasRequiredUtils) return utils;
	hasRequiredUtils = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    isRequestAPICallableInsideAfter: function() {
		        return isRequestAPICallableInsideAfter;
		    },
		    throwForSearchParamsAccessInUseCache: function() {
		        return throwForSearchParamsAccessInUseCache;
		    },
		    throwWithStaticGenerationBailoutError: function() {
		        return throwWithStaticGenerationBailoutError;
		    },
		    throwWithStaticGenerationBailoutErrorWithDynamicError: function() {
		        return throwWithStaticGenerationBailoutErrorWithDynamicError;
		    }
		});
		const _staticgenerationbailout = requireStaticGenerationBailout();
		const _aftertaskasyncstorageexternal = requireAfterTaskAsyncStorage_external();
		function throwWithStaticGenerationBailoutError(route, expression) {
		    throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route ${route} couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
		        value: "E576",
		        enumerable: false,
		        configurable: true
		    });
		}
		function throwWithStaticGenerationBailoutErrorWithDynamicError(route, expression) {
		    throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route ${route} with \`dynamic = "error"\` couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
		        value: "E543",
		        enumerable: false,
		        configurable: true
		    });
		}
		function throwForSearchParamsAccessInUseCache(workStore) {
		    const error = Object.defineProperty(new Error(`Route ${workStore.route} used "searchParams" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "searchParams" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
		        value: "E634",
		        enumerable: false,
		        configurable: true
		    });
		    workStore.invalidUsageError ??= error;
		    throw error;
		}
		function isRequestAPICallableInsideAfter() {
		    const afterTaskStore = _aftertaskasyncstorageexternal.afterTaskAsyncStorage.getStore();
		    return (afterTaskStore == null ? void 0 : afterTaskStore.rootTaskSpawnPhase) === 'action';
		}

		
	} (utils));
	return utils;
}

var hasRequiredConnection;

function requireConnection () {
	if (hasRequiredConnection) return connection;
	hasRequiredConnection = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "connection", {
		    enumerable: true,
		    get: function() {
		        return connection;
		    }
		});
		const _workasyncstorageexternal = requireWorkAsyncStorage_external();
		const _workunitasyncstorageexternal = requireWorkUnitAsyncStorage_external();
		const _dynamicrendering = requireDynamicRendering();
		const _staticgenerationbailout = requireStaticGenerationBailout();
		const _dynamicrenderingutils = requireDynamicRenderingUtils();
		const _utils = requireUtils();
		function connection() {
		    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
		    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
		    if (workStore) {
		        if (workUnitStore && workUnitStore.phase === 'after' && !(0, _utils.isRequestAPICallableInsideAfter)()) {
		            throw Object.defineProperty(new Error(`Route ${workStore.route} used "connection" inside "after(...)". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but "after(...)" executes after the request, so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", {
		                value: "E186",
		                enumerable: false,
		                configurable: true
		            });
		        }
		        if (workStore.forceStatic) {
		            // When using forceStatic we override all other logic and always just return an empty
		            // headers object without tracking
		            return Promise.resolve(undefined);
		        }
		        if (workUnitStore) {
		            if (workUnitStore.type === 'cache') {
		                throw Object.defineProperty(new Error(`Route ${workStore.route} used "connection" inside "use cache". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but caches must be able to be produced before a Request so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
		                    value: "E111",
		                    enumerable: false,
		                    configurable: true
		                });
		            } else if (workUnitStore.type === 'unstable-cache') {
		                throw Object.defineProperty(new Error(`Route ${workStore.route} used "connection" inside a function cached with "unstable_cache(...)". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but caches must be able to be produced before a Request so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", {
		                    value: "E1",
		                    enumerable: false,
		                    configurable: true
		                });
		            }
		        }
		        if (workStore.dynamicShouldError) {
		            throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route ${workStore.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`connection\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
		                value: "E562",
		                enumerable: false,
		                configurable: true
		            });
		        }
		        if (workUnitStore) {
		            if (workUnitStore.type === 'prerender') {
		                // dynamicIO Prerender
		                // We return a promise that never resolves to allow the prender to stall at this point
		                return (0, _dynamicrenderingutils.makeHangingPromise)(workUnitStore.renderSignal, '`connection()`');
		            } else if (workUnitStore.type === 'prerender-ppr') {
		                // PPR Prerender (no dynamicIO)
		                // We use React's postpone API to interrupt rendering here to create a dynamic hole
		                (0, _dynamicrendering.postponeWithTracking)(workStore.route, 'connection', workUnitStore.dynamicTracking);
		            } else if (workUnitStore.type === 'prerender-legacy') {
		                // Legacy Prerender
		                // We throw an error here to interrupt prerendering to mark the route as dynamic
		                (0, _dynamicrendering.throwToInterruptStaticGeneration)('connection', workStore, workUnitStore);
		            }
		        }
		        // We fall through to the dynamic context below but we still track dynamic access
		        // because in dev we can still error for things like using headers inside a cache context
		        (0, _dynamicrendering.trackDynamicDataInDynamicRender)(workStore, workUnitStore);
		    }
		    return Promise.resolve(undefined);
		}

		
	} (connection));
	return connection;
}

var rootParams = {};

var invariantError = {};

var hasRequiredInvariantError;

function requireInvariantError () {
	if (hasRequiredInvariantError) return invariantError;
	hasRequiredInvariantError = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "InvariantError", {
		    enumerable: true,
		    get: function() {
		        return InvariantError;
		    }
		});
		class InvariantError extends Error {
		    constructor(message, options){
		        super("Invariant: " + (message.endsWith('.') ? message : message + '.') + " This is a bug in Next.js.", options);
		        this.name = 'InvariantError';
		    }
		}

		
	} (invariantError));
	return invariantError;
}

var reflectUtils = {};

var hasRequiredReflectUtils;

function requireReflectUtils () {
	if (hasRequiredReflectUtils) return reflectUtils;
	hasRequiredReflectUtils = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    describeHasCheckingStringProperty: function() {
		        return describeHasCheckingStringProperty;
		    },
		    describeStringPropertyAccess: function() {
		        return describeStringPropertyAccess;
		    },
		    wellKnownProperties: function() {
		        return wellKnownProperties;
		    }
		});
		const isDefinitelyAValidIdentifier = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
		function describeStringPropertyAccess(target, prop) {
		    if (isDefinitelyAValidIdentifier.test(prop)) {
		        return "`" + target + "." + prop + "`";
		    }
		    return "`" + target + "[" + JSON.stringify(prop) + "]`";
		}
		function describeHasCheckingStringProperty(target, prop) {
		    const stringifiedProp = JSON.stringify(prop);
		    return "`Reflect.has(" + target + ", " + stringifiedProp + ")`, `" + stringifiedProp + " in " + target + "`, or similar";
		}
		const wellKnownProperties = new Set([
		    'hasOwnProperty',
		    'isPrototypeOf',
		    'propertyIsEnumerable',
		    'toString',
		    'valueOf',
		    'toLocaleString',
		    // Promise prototype
		    // fallthrough
		    'then',
		    'catch',
		    'finally',
		    // React Promise extension
		    // fallthrough
		    'status',
		    // React introspection
		    'displayName',
		    // Common tested properties
		    // fallthrough
		    'toJSON',
		    '$$typeof',
		    '__esModule'
		]);

		
	} (reflectUtils));
	return reflectUtils;
}

var hasRequiredRootParams;

function requireRootParams () {
	if (hasRequiredRootParams) return rootParams;
	hasRequiredRootParams = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "unstable_rootParams", {
		    enumerable: true,
		    get: function() {
		        return unstable_rootParams;
		    }
		});
		const _invarianterror = requireInvariantError();
		const _dynamicrendering = requireDynamicRendering();
		const _workasyncstorageexternal = requireWorkAsyncStorage_external();
		const _workunitasyncstorageexternal = requireWorkUnitAsyncStorage_external();
		const _dynamicrenderingutils = requireDynamicRenderingUtils();
		const _reflectutils = requireReflectUtils();
		const CachedParams = new WeakMap();
		async function unstable_rootParams() {
		    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
		    if (!workStore) {
		        throw Object.defineProperty(new _invarianterror.InvariantError('Missing workStore in unstable_rootParams'), "__NEXT_ERROR_CODE", {
		            value: "E615",
		            enumerable: false,
		            configurable: true
		        });
		    }
		    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
		    if (!workUnitStore) {
		        throw Object.defineProperty(new Error(`Route ${workStore.route} used \`unstable_rootParams()\` in Pages Router. This API is only available within App Router.`), "__NEXT_ERROR_CODE", {
		            value: "E641",
		            enumerable: false,
		            configurable: true
		        });
		    }
		    switch(workUnitStore.type){
		        case 'unstable-cache':
		        case 'cache':
		            {
		                throw Object.defineProperty(new Error(`Route ${workStore.route} used \`unstable_rootParams()\` inside \`"use cache"\` or \`unstable_cache\`. Support for this API inside cache scopes is planned for a future version of Next.js.`), "__NEXT_ERROR_CODE", {
		                    value: "E642",
		                    enumerable: false,
		                    configurable: true
		                });
		            }
		        case 'prerender':
		        case 'prerender-ppr':
		        case 'prerender-legacy':
		            return createPrerenderRootParams(workUnitStore.rootParams, workStore, workUnitStore);
		        default:
		            return Promise.resolve(workUnitStore.rootParams);
		    }
		}
		function createPrerenderRootParams(underlyingParams, workStore, prerenderStore) {
		    const fallbackParams = workStore.fallbackRouteParams;
		    if (fallbackParams) {
		        let hasSomeFallbackParams = false;
		        for(const key in underlyingParams){
		            if (fallbackParams.has(key)) {
		                hasSomeFallbackParams = true;
		                break;
		            }
		        }
		        if (hasSomeFallbackParams) {
		            // params need to be treated as dynamic because we have at least one fallback param
		            if (prerenderStore.type === 'prerender') {
		                // We are in a dynamicIO (PPR or otherwise) prerender
		                const cachedParams = CachedParams.get(underlyingParams);
		                if (cachedParams) {
		                    return cachedParams;
		                }
		                const promise = (0, _dynamicrenderingutils.makeHangingPromise)(prerenderStore.renderSignal, '`unstable_rootParams`');
		                CachedParams.set(underlyingParams, promise);
		                return promise;
		            }
		            // remaining cases are prerender-ppr and prerender-legacy
		            // We aren't in a dynamicIO prerender but we do have fallback params at this
		            // level so we need to make an erroring params object which will postpone
		            // if you access the fallback params
		            return makeErroringRootParams(underlyingParams, fallbackParams, workStore, prerenderStore);
		        }
		    }
		    // We don't have any fallback params so we have an entirely static safe params object
		    return Promise.resolve(underlyingParams);
		}
		function makeErroringRootParams(underlyingParams, fallbackParams, workStore, prerenderStore) {
		    const cachedParams = CachedParams.get(underlyingParams);
		    if (cachedParams) {
		        return cachedParams;
		    }
		    const augmentedUnderlying = {
		        ...underlyingParams
		    };
		    // We don't use makeResolvedReactPromise here because params
		    // supports copying with spread and we don't want to unnecessarily
		    // instrument the promise with spreadable properties of ReactPromise.
		    const promise = Promise.resolve(augmentedUnderlying);
		    CachedParams.set(underlyingParams, promise);
		    Object.keys(underlyingParams).forEach((prop)=>{
		        if (_reflectutils.wellKnownProperties.has(prop)) ; else {
		            if (fallbackParams.has(prop)) {
		                Object.defineProperty(augmentedUnderlying, prop, {
		                    get () {
		                        const expression = (0, _reflectutils.describeStringPropertyAccess)('unstable_rootParams', prop);
		                        // In most dynamic APIs we also throw if `dynamic = "error"` however
		                        // for params is only dynamic when we're generating a fallback shell
		                        // and even when `dynamic = "error"` we still support generating dynamic
		                        // fallback shells
		                        // TODO remove this comment when dynamicIO is the default since there
		                        // will be no `dynamic = "error"`
		                        if (prerenderStore.type === 'prerender-ppr') {
		                            // PPR Prerender (no dynamicIO)
		                            (0, _dynamicrendering.postponeWithTracking)(workStore.route, expression, prerenderStore.dynamicTracking);
		                        } else {
		                            // Legacy Prerender
		                            (0, _dynamicrendering.throwToInterruptStaticGeneration)(expression, workStore, prerenderStore);
		                        }
		                    },
		                    enumerable: true
		                });
		            } else {
		                promise[prop] = underlyingParams[prop];
		            }
		        }
		    });
		    return promise;
		}

		
	} (rootParams));
	return rootParams;
}

var hasRequiredServer;

function requireServer () {
	if (hasRequiredServer) return server.exports;
	hasRequiredServer = 1;
	(function (module, exports) {
		const serverExports = {
		  NextRequest: requireRequest()
		    .NextRequest,
		  NextResponse: requireResponse()
		    .NextResponse,
		  ImageResponse: requireImageResponse()
		    .ImageResponse,
		  userAgentFromString: requireUserAgent()
		    .userAgentFromString,
		  userAgent: requireUserAgent()
		    .userAgent,
		  URLPattern: requireUrlPattern()
		    .URLPattern,
		  after: requireAfter().after,
		  connection: requireConnection().connection,
		  unstable_rootParams: requireRootParams()
		    .unstable_rootParams,
		};

		// https://nodejs.org/api/esm.html#commonjs-namespaces
		// When importing CommonJS modules, the module.exports object is provided as the default export
		module.exports = serverExports;

		// make import { xxx } from 'next/server' work
		exports.NextRequest = serverExports.NextRequest;
		exports.NextResponse = serverExports.NextResponse;
		exports.ImageResponse = serverExports.ImageResponse;
		exports.userAgentFromString = serverExports.userAgentFromString;
		exports.userAgent = serverExports.userAgent;
		exports.URLPattern = serverExports.URLPattern;
		exports.after = serverExports.after;
		exports.connection = serverExports.connection;
		exports.unstable_rootParams = serverExports.unstable_rootParams; 
	} (server, server.exports));
	return server.exports;
}

var serverExports = requireServer();

/**
 * Server-side helper to get authentication status
 * This should be used in your API route or server components
 */
async function getAuthStatus(options) {
    try {
        const session = await getServerSession(options);
        return !!(session === null || session === void 0 ? void 0 : session.user);
    }
    catch (error) {
        console.error('Error checking auth status:', error);
        return false;
    }
}
/**
 * Helper to create a standardized auth status API response
 */
function createAuthStatusResponse(isAuthenticated) {
    return {
        isAuthenticated,
    };
}
/**
 * Middleware helper to check if user is authenticated
 */
function requireAuth(isAuthenticated, redirectUrl) {
    if (!isAuthenticated) {
        if (redirectUrl) {
            return {
                redirect: {
                    destination: redirectUrl,
                    permanent: false,
                },
            };
        }
        throw new Error('Authentication required');
    }
    return null;
}
/**
 * Server component helper that automatically redirects if not authenticated
 */
async function requireAuthOrRedirect(options, redirectTo = '/signin') {
    const isAuthenticated = await getAuthStatus(options);
    if (!isAuthenticated) {
        navigationExports.redirect(redirectTo);
    }
}
/**
 * Creates a middleware function for protecting routes
 */
function createAuthMiddleware(protectedPaths, loginPath = '/signin') {
    return async function middleware(request) {
        const { pathname } = request.nextUrl;
        // Check if the current path should be protected
        const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path) || pathname === path);
        if (!isProtectedPath) {
            return serverExports.NextResponse.next();
        }
        // Check authentication status by calling the auth status API
        try {
            const authResponse = await fetch(new URL('/api/auth/status', request.url));
            const { isAuthenticated } = await authResponse.json();
            if (!isAuthenticated) {
                const loginUrl = new URL(loginPath, request.url);
                loginUrl.searchParams.set('callbackUrl', pathname);
                return serverExports.NextResponse.redirect(loginUrl);
            }
        }
        catch (error) {
            console.error('Auth middleware error:', error);
            // If we can't check auth status, redirect to login for security
            const loginUrl = new URL(loginPath, request.url);
            loginUrl.searchParams.set('callbackUrl', pathname);
            return serverExports.NextResponse.redirect(loginUrl);
        }
        return serverExports.NextResponse.next();
    };
}

export { SecureSessionContext, SecureSessionProvider, createAuthMiddleware, createAuthStatusResponse, getAuthStatus, requireAuth, requireAuthOrRedirect, useAuthStatus, useSecureSession };
//# sourceMappingURL=index.esm.js.map
