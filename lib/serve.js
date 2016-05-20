/* eslint-disable no-console */
import Ysera from './ysera';

export default (fn, port) => {
    Ysera.serve(fn).listen(port, (error) => {
        if (error) {
            throw error;
        }
        console.log(`> \u001b[96mYsera!\u001b[39m Listening on ${port}.`);
    });
};
