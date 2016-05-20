## Ysera

This is a re-written package of [micro-core](https://github.com/zeit/micro-core)
to follow [mushu](https://www.npmjs.com/package/generator-mushu) style.

```js
import Ysera from '../lib';
const { boot, send } = Ysera,
    fn = async (req, res) => {
        send(res, 200, 'OK');
    };

boot(fn, 3000);
```
To run the prepared example,

```
$ npm install
$ npm run build
$ node build/examples/app.js
```

## Credits

Copyright © 2016 HOOQ Digital Pte. Ltd. and project authors.
