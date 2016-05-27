/* eslint-disable one-var */
import { boot, send } from '../lib';

const delay = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
};

const fn = async (req, res) => {
    await delay();
    send(res, 200, { OK: '1' });
};

boot(fn, 3000);
