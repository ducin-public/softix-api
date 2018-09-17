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
    npm start -- -p <PORT>

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

 * benefits
 * departments
 * employees
 * geo
 * offices
 * projects
