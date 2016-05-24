import test from 'ava';
import Ysera from '../lib';
import { HttpError } from '../lib/error';
import tester from 'supertest-as-promised';

const { serve, send, sendError, parse, parseMeta } = Ysera;

test('Yay!', async (t) => {
    const fn = async (req, res) => {
        send(res, 200, 'OK');
    };
    await tester(serve(fn))
        .get('/')
        .expect(200)
        .expect((res) => {
            t.deepEqual(res.text, 'OK');
        });
});

test('Yay pathname and query!', async (t) => {
    const fn = async (req, res) => {
        try {
            const parsed = await parse(req);
            t.deepEqual(parsed.pathname, '/test');
            t.deepEqual(parsed.query, {
                handler: 1
            });
            send(res, 200, 'OK');
        } catch (error) {
            t.falsy(error);
        }
    };
    await tester(serve(fn))
        .get('/test?handler=1')
        .expect(200)
        .expect((res) => {
            t.deepEqual(res.text, 'OK');
        });
});

test('Yay params!', async (t) => {
    const fn = async (req, res) => {
        const parsed = await parse(req, { pattern: '/test/:version/:hihi' });
        t.deepEqual(parsed.params, { version: 1, hihi: 'hoho' });
        send(res, 200, 'OK');
    };
    await tester(serve(fn))
        .get('/test/1/hoho')
        .expect(200)
        .expect((res) => {
            t.deepEqual(res.text, 'OK');
        });
});

test('Path and query only', async (t) => {
    const fn = async (req, res) => {
        const parsed = parseMeta(req, { pattern: '/haha/:id/hehe/:anotherId' });
        t.true(parsed.hasPattern);
        t.deepEqual(parsed.pattern, '/haha/:id/hehe/:anotherId');
        t.false(parsed.matched);
        send(res, 200, 'OK');
    };
    await tester(serve(fn))
        .get('/huhu/id/hehe/anotherId?yes=1')
        .expect(200)
        .expect((res) => {
            t.deepEqual(res.text, 'OK');
        });
});

test('Yet another path and query only', async (t) => {
    const fn = async (req, res) => {
        const parsed = parseMeta(req, { pattern: '/haha/:id/hehe/:anotherId' });
        t.true(parsed.hasPattern);
        t.deepEqual(parsed.pattern, '/haha/:id/hehe/:anotherId');
        t.true(parsed.matched);
        t.deepEqual(parsed.params, {
            id: 'id',
            anotherId: 'anotherId'
        });
        t.deepEqual(parsed.query, {
            yes: 1
        });
        send(res, 200, 'OK');
    };
    await tester(serve(fn))
        .get('/haha/id/hehe/anotherId?yes=1')
        .expect(200)
        .expect((res) => {
            t.deepEqual(res.text, 'OK');
        });
});

test('Yay urlencoded!', async (t) => {
    const fn = async (req, res) => {
        const parsed = await parse(req);
        t.deepEqual(parsed.body, {
            haha: 'hihi',
            hehe: 'hoho'
        });
        send(res, 200, 'OK');
    };
    await tester(serve(fn))
        .post('/')
        .type('form')
        .send({
            haha: 'hihi',
            hehe: 'hoho'
        })
        .expect(200)
        .expect((res) => {
            t.deepEqual(res.text, 'OK');
        });
});

test('Yay json!', async (t) => {
    const fn = async (req, res) => {
        const parsed = await parse(req);
        t.deepEqual(parsed.body, {
            haha: 'hihi',
            hehe: 'hoho'
        });
        send(res, 200, 'OK');
    };
    await tester(serve(fn))
        .post('/')
        .send({
            haha: 'hihi',
            hehe: 'hoho'
        })
        .expect(200)
        .expect((res) => {
            t.deepEqual(res.text, 'OK');
        });
});

test('Send error', async (t) => {
    const fn = async (req, res) => {
            try {
                await p(req, res);
            } catch (error) {
                sendError(req, res, error);
            }
        },
        p = async (req, res) => {
            throw new Error('Error');
        };

    await tester(serve(fn))
        .post('/')
        .send({
            haha: 'hihi',
            hehe: 'hoho'
        })
        .expect(500)
        .expect((res) => {
            t.deepEqual(res.text, 'Internal Server Error');
        });
});

test('Send error', async (t) => {
    const fn = async (req, res) => {
            try {
                await p(req, res);
            } catch (error) {
                sendError(req, res, error);
            }
        },
        p = async (req, res) => {
            throw new HttpError('Haha', 400, new Error('Haha'));
        };

    await tester(serve(fn))
        .post('/')
        .send({
            haha: 'hihi',
            hehe: 'hoho'
        })
        .expect(400)
        .expect((res) => {
            t.deepEqual(res.body, { message: 'Haha (50001)', code: 50001 });
        });
});
