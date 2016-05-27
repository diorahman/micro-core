import { boot, send } from '../lib';

const fn = async (req, res) => {
    send(res, 200, { OK: '1' });
};

boot(fn, 3000);
