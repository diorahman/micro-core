import test from 'ava';
import Ysera from '../lib';
import tester from 'supertest-as-promised';

const { serve, send, parse } = Ysera;

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
