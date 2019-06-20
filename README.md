```
  _____   _____     ___                       
  \_   \ /__   \   / __\___  _ __ _ __   ___  
   / /\/   / /\/  / /  / _ \| '__| '_ \ / _ \ 
/\/ /_    / /    / /__| (_) | |  | |_) | (_) |
\____/    \/     \____/\___/|_|  | .__/ \___/ 
                                 |_|          
```

![REST](REST.png)

# mocked RESTful API used for IT Corpo Domain

    npm install
    npm start
    # OR
    npm start -- -p <PORT> -t true -d <baseDelay>
    npm start -- -p 3010 -t true -d 3000
    # localhost:3010, tenant: required, delay: 3000 miliseconds

## CLI options

- `p` / `port` (*number*) - well... the port

- `d` / `delay` (*number*, milliseconds) - determines minimum delay. Some random length delay will take place additionally.

- `f` / `fail` (*number from range 0..1*) - probability of random fails on processing requests. Useful for testing error handling, optimistic updates, etc. Defaults to `0` (no random fails). If `fu` not set, all requests are considered to randomly fail.

- `failUrls` - (*comma-separated string*, list of URL patterns) - if `f` option is on, the requests that match any of the URL pattern in this list might potentially fail. Useful when you want to choose certain resources to be unstable temporarily. Example: `-fu employees,offices` - `employees*` and `offices*` are unstable, rest is stable

- `t` / `tenantRequired` (*boolean*) - determines whether the `TenantID` header will be required for most resources (see [Tenants](#Tenants)). By default, this API is more permissive (header not required).

# manual

 * see [`json-server`](https://github.com/typicode/json-server) docs for standard commands
 * this API also supports each collection command `...count` subresource
 * this API limits all page sizes to 50 (unless you specify a smaller page size)
 * example calls:
    * /employees
    * /employees/count
    * /employees?skills_like=html
    * /employees/count?skills_like=html

# resources:

 * license (requires `Accept` to be `text/plain`)
 * benefits
 * departments
 * employees
 * geo
 * offices
 * projects

# Tenants

When `t` is on, most resources require the `TenantID` header to be set. Just set this header value to `E2B31329-8818-428A-90DC-8F065318C052`.
