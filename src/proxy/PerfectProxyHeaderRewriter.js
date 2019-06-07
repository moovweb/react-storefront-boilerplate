import cloneDeep from 'lodash/clonedeep'
import isEmpty from 'lodash/isempty'
import map from 'lodash/map'
import merge from 'lodash/merge'
import url from 'url'

const PROXY_TO_UPSTREAM = 1;
const UPSTREAM_TO_PROXY = 2;
const CATCH_ALL = '.moovapp.com';

const HeaderAccessControlAllowOrigin = 'access-control-allow-origin';
const HeaderHost = 'host';
const HeaderLocation = 'location';
const HeaderOrigin = 'origin';
const HeaderReferer = 'referer';
const HeaderSetCookie = 'set-cookie';

/**
 * Objects of this class are responsible for rewriting headers
 * on request and response path of perfect proxy.
 */
export default class PerfectProxyHeaderRewriter {
    /**
     * @param {Object} headers Node.JS compatible headers object
     */
    constructor(headers, options) {
        this._headers = cloneDeep(headers);
        this._options = merge({
            rewriteRequestHeaders: false,
            domainModel: null,
            secure: false,
            rewriteCookies: false,
            host: null,
            sourceHost: null,
            cookieReplacement: null,
            cookieDomain: null,
            rules: []
        }, options);
    }

    /**
     * Returns rewritten headers.
     */
    get headers() {
        return this._headers;
    }

    /**
     * Rewrites headers on the request path.
     * 
     * Notes:
     * - Rewrites `Host` header to match upstream target.
     * - `Cookie` header does not need to be rewritten as it doesn't have domain information.
     */
    rewriteRequestHeaders() {
        this._rewriteHeaderToUpstream(HeaderHost);
        this._rewriteHeaderToUpstream(HeaderOrigin);
        this._rewriteHeaderToUpstream(HeaderLocation);
    }

    /**
     * Rewrites headers on the response path.
     * 
     * Notes:
     * - Rewrites `Location` header for redirects.
     * - Rewrites CORS header.
     * - Rewrites all `Set-Cookie` headers.
     */
    rewriteResponseHeaders() {
        this._rewriteLocationHeader();
        this._rewriteCorsHeader();
        this._rewriteSetCookieHeaders();
    }

    /**
     * Rewrites set-cookie headers.
     * 
     * Notes:
     * - Copied from moov_rewriter.
     */
    _rewriteSetCookieHeaders() {
        if (this._options.rewriteCookies) {
            // Add ;domain=<domain> to cookies in the set-cookie: header which don't have one.
            // E.g. set-cookie: a=b => set-cookie: a=b;http://mydomain.com
            const cookieReplacement = this._options.cookieReplacement;
            const cookieHost = this._options.cookieHost;
            let domainReplacement = this._rewriteSetCookie(cookieReplacement || cookieHost);
            if (domainReplacement) {
                this._allCookies(function (_, __, attrs) {
                    // If there is no cookie domain, or the cookie domain is our upstream domain, replace
                    // the value of the domain attribute for the cookie. Special case, Domain=.domain.com
                    //  We ignore the . immediately after the Domain=. (See Set-Cookie: RFC for details)
                    if (!attrs.domain || attrs.domain.replace(/^\./, '') === cookieHost) {
                        attrs.domain = domainReplacement;
                    }
                });
            }
        }
    }

    /**
     * Rewrites `set-cookie` header.
     * 
     * Notes:
     * - Copied from moov_rewriter.
     */
    _rewriteSetCookie(domain) {
        if (!domain) {
            return domain;
        }

        const secure = this._options.secure;
        // This regex matches: http://, https:// or // at the beginning of the domain.
        const prefix = domain.match(/^(?:https?:)?\/\//);
        let missing = '';
        if (!prefix) {
            missing = secure ? 'https://' : 'http://';
        } else if (prefix[0] === '//') {
            missing = secure ? 'https:' : 'http:';
        }
        let key = missing + domain;

        let newDomain = domain;
        for (let i = 0, len = this._options.rules.length; i < len; i++) {
            let rule = this._options.rules[i];
            if (rule.Direction !== PROXY_TO_UPSTREAM && key === rule.Upstream) {
                newDomain = rule.Cookiedomain;
                if (newDomain.substring(newDomain.length - domain.length) === domain || domain.replace(/^\./, '') === newDomain.replace(/^\./, '')) {
                    // http://en.wikipedia.org/wiki/HTTP_cookie#Domain_and_Path explains why the dot is prefixed to the domain.
                    newDomain = domain[0] === '.' ? domain : '.' + domain;
                }
                if (this._options.catchAllEnabled) {
                    newDomain += this._options.catchAllDomain;
                }
                return newDomain;
            }
        }

        return domain;
    }

    /**
     * Rewrites set-cookie headers.
     * 
     * Notes:
     * - Copied from moov_rewriter.
     */
    _allCookies(callback) {
        for (let key of Object.keys(this._headers)) {
            if (key === HeaderSetCookie) {
                const values = this._headers[key];

                this._headers[key] = map(values, (value) => {
                    const parts = value.split(';');
                    const nv = parts[0].split('=');
                    const attrs = {};
    
                    // parse the cookie and create the attribs structure to represent each part of the cookie and lower cases the key.
                    // e.g. set-cookie: a=b;Expires=Tue, 15-Jan-2013 21:47:38 GMT; Path=/
                    // attrs= { a: 'b', expires: 'Tue, 15-Jan-2013 21:47:38 GMT', path: '/'
                    for (let i = 1; i < parts.length; i++) {
                        const kv = parts[i].split('=');
                        const n = kv[0];
                        attrs[n.trim().toLowerCase()] = kv[1];
                    }
    
                    // This is an emit, not really a callback because we call it multiple times
                    // eslint-disable-next-line callback-return
                    callback(nv[0], nv[1], attrs);
    
                    let join = parts[0];
                    const attrnames = Object.keys(attrs);
                    for (let i = 0; i < attrnames.length; i++) {
                        const k = attrnames[i];
                        // According to the RFC for cookies, the space after the ; is required
                        join += '; ' + k;
                        const val = attrs[k.trim().toLowerCase()];
                        if (val) {
                            join += '=' + val;
                        }
                    }

                    return join;
                });
            }
        }
    }

    _rewriteLocationHeader() {
        if (this._headers[HeaderLocation]) {
            this._headers[HeaderLocation] = this._rewriteLink(this._headers[HeaderLocation]);
        }
    }

    _rewriteCorsHeader() {
        if (this._headers[HeaderAccessControlAllowOrigin]) {
            this._headers[HeaderAccessControlAllowOrigin] = this._rewriteLink(this._headers[HeaderAccessControlAllowOrigin]);
        }
    }

    /**
     * Rewrites a URI link to 
     * 
     * Notes:
     * - Copied from moov_rewriter.
     * 
     * @param {String} link URI that needs to be rewritten
     */
    _rewriteLink(link) {
        if (!link) {
            return link;
        }
        link = link.trim();
        if (/^mailto:/.test(link)) {
            return link;
        }
        // eslint-disable-next-line no-useless-escape
        return link.replace(
            /((?:(?:(?:http(?:s?)):)?(?:\/\/)?(?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]*)(?:\.[\.a-zA-Z0-9\-]*)|localhost))(?:\:[0-9]+)?)/gi,
            (hostHH) => {
                const rewritten = this._rewriteToDownstreamProxy(
                    hostHH,
                    this._options.secure,
                    this._options.catchAllDomain
                );
                return rewritten;
            }
        );
    }

    /**
     * Rewrites a link to downstream proxy.
     * 
     * Notes:
     * - Copied from moov_rewriter.
     * 
     * @param {String} link URI that needs to be rewritten
     */
    _rewriteToDownstreamProxy(hostHH, secure, catchAllDomain) {
        let parsedHost,
            sanitizedHost,
            prefix,
            missing = '',
            ctxRules,
            result;

        // fixup links that have been passed in with no protocol, or begin with forward slashes
        // parsing a bad url before doing this will lead to a Url object with unset keys
        prefix = hostHH.match(/^(?:https?:)?\/\//);
        if (!prefix) {
            missing = secure ? "https://" : "http://";
        } else if (prefix[0] === "//") {
            missing = secure ? "https:" : "http:";
        }
        sanitizedHost = missing + hostHH;

        // parse the sanitized host into a url object
        parsedHost = url.parse(sanitizedHost);
        if (
            parsedHost.port !== null &&
            !(parsedHost.port === "443" || parsedHost.port === "80")
        ) {
            // skip rewriting links using nonstandard ports
            return hostHH;
        }
        // Prevent adding the trailing slash when formatting
        parsedHost.pathname = '';

        // load the rules or interpolate them if they are missing from the context
        ctxRules = !isEmpty(this._options.rules) ? this._options.rules : [
            {
                Proxy: "http://" + this._options.host,
                Upstream: "http://" + this._options.sourceHost
            },
            {
                Proxy: "https://" + this._options.host,
                Upstream: "https://" + this._options.sourceHost
            },
            {
                Proxy: "http://" + this._options.host,
                Upstream: "http://" + this._options.sourceHost.replace(/^www\./, '')
            },
            {
                Proxy: "https://" + this._options.host,
                Upstream: "https://" + this._options.sourceHost.replace(/^www\./, '')
            }
        ];

        if (ctxRules[0]) {
            for (let i = 0; i < ctxRules.length; i++) {
                let rr = ctxRules[i];
                let match = sanitizedHost.match(rr.Upstream);
                if (rr.Direction !== 1 && match !== null && match.index === 0) {
                    // We found a match
                    let proxy = url.parse(rr.Proxy);
                    // Prevent adding the trailing slash when formatting
                    proxy.pathname = '';

                    if (this._options.catchAllEnabled) {
                        if (!proxy.host.match(catchAllDomain)) {
                            // The host should have the catchall appended, but doesn't yet
                            proxy.hostname = proxy.hostname + catchAllDomain;
                            // unsetting host will reformat the url for us
                            proxy.host = undefined;
                        }
                    }

                    result = url.format(proxy);
                    if (result.substring(0, missing.length) === missing) {
                        result = result.substring(missing.length);
                    }

                    return result;
                }
            }
        }
        return hostHH;
    }

    /**
     * Rewrites downstream host header to upstream if needed.
     * 
     * Notes:
     * - Copied from moov_rewriter.
     */
    _rewriteHostHeader() {
        if (!this._options.rewriteRequestHeaders) {
            return;
        }

        const host = this._headers[HeaderHost];
        if (isEmpty(host)) {
            return;
        }
    
        const rewrittenHost = this._rewriteHeaderValueToUpstream(host, this._options.secure, CATCH_ALL);
        this._headers[HeaderHost] = rewrittenHost;
    }

    _rewriteHeaderToUpstream(headerName) {
        if (!this._options.rewriteRequestHeaders) {
            return;
        }

        const value = this._headers[headerName] || '';
        const rewrittenValue = value.replace(/((?:https?:)?\/\/)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]*)(?:\.[\.a-zA-Z0-9\-]*)|localhost)(?:\:[0-9]+)?)/gi, (_, $1, $2) => {
            return ($1 || '') + this._rewriteHeaderValueToUpstream($2, this._options.secure, CATCH_ALL);
        });
        this._headers[headerName] = rewrittenValue;
    }

    _rewriteHeaderValueToUpstream(headerValue, secure, catchAll) {
        let _host = headerValue;
        headerValue = headerValue.toLowerCase();
        // strip off catchAll
        if (headerValue.substring(headerValue.length - catchAll.length) === catchAll) {
            headerValue = headerValue.substring(0, headerValue.length - catchAll.length);
        }
        let prefix = headerValue.match(/^(?:https?:)?\/\//);
        let missing = '';
        if (!prefix) {
            missing = secure === 'true' ? 'https://' : 'http://';
        } else if (prefix[0] === '//') {
            missing = secure === 'true' ? 'https:' : 'http:';
        }
        let key = missing + headerValue;
        if (this._options.rules) {
            for (let i = 0, len = this._options.rules.length; i < len; i++) {
                let rule = this._options.rules[i];
                if (rule.Direction !== UPSTREAM_TO_PROXY && key === rule.Proxy) {
                    let upstream = rule.Upstream;
                    if (upstream.substring(0, missing.length) === missing) {
                        upstream = upstream.substring(missing.length);
                    }
                    return upstream;
                }
            }
        }

        return _host;
    }
}