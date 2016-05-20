import Ysera from '../lib';
const { boot, send } = Ysera,
    fn = async (req, res) => {
        send(res, 200, 'OK');
    };

boot(fn, 3000);
