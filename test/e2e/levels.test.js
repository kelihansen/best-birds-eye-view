const { assert } = require('chai');
const request = require('./request');
const { dropCollection, createAdminToken } = require('./db');


describe.only('Level API', () => {
    before(() => dropCollection('users'));
    before(() => dropCollection('levels'));
    before(() => dropCollection('squares'));

    let adminToken = '';
    before(() => createAdminToken().then(t => adminToken = t));
    
    let square = {
        coords: {
            x: 1,
            y: 0
        },
        squareDesc: 'You are here. You see things.'
    };
    
    let level1 = {
        levelNum: 1,
        squares: [{
            squareId: square._id
        }]
    };
    
    before(() => {
        return request.post('/api/squares')
            .set('Authorization', adminToken)
            .send(square)
            .then(({ body }) => {
                square._id = body._id;
                return request.post('/api/levels');
            })
            .set('Authorization', adminToken)
            .send(level1)
            .then();
    });
    
    
    it('posts a level', () => {
        let level2 = {
            levelNum: 2,
            squares: [{
                squareId: square._id
            }]
        };
        return request.post('/api/levels')
            .set('Authorization', adminToken)
            .send(level2)
            .then(({ body }) => {
                level2.squares[0]._id = body.squares[0]._id;
                const { _id, __v } = body;
                assert.ok(_id);
                assert.strictEqual(__v, 0);
                assert.deepEqual(body, {
                    _id,
                    __v,
                    ...level2
                });
            });
    });
});

it('gets specified square information of level', () => {

    return request.get(`/api/levels/${level1._id}/squares/${square}`)
        .then(({ body }) => {
            assert.ok;
        })
});