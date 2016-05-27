## Ysera

This is a re-written package of [micro-core](https://github.com/zeit/micro-core)
to follow [mushu](https://www.npmjs.com/package/generator-mushu) style.

```js
import { boot, send } from 'ysera';
const fn = async (req, res) => {
    send(res, 200, 'OK');
};

boot(fn, 3000);
```
To run the prepared example,

```
$ npm run example
```

## Credits

Copyright © 2016 HOOQ Digital Pte. Ltd. and project authors.
