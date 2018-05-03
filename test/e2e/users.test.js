const { assert } = require('chai');
const request = require('./request');
const { dropCollection, createAdminToken } = require('./db');


describe.only('User API', () => {

    before(() => dropCollection('squares'));
    before(() => dropCollection('levels'));
    before(() => dropCollection('users'));
    
    let adminToken = '';
    before(() => createAdminToken().then(t => adminToken = t));


    let square1 = {
        coords: {
            x: 0,
            y: 0
        },
        squareDesc: 'Never was a figure so lovingly wrought in stone.'
    };
    
    before(() => {
        return request.post('/api/squares')
            .set('Authorization', adminToken)
            .send(square1)
            .then(({ body }) => {
                square1 = body;
            });
    });

    let token = '';

    let user = {
        name: 'Master Blaster',
        password: 'bartertown',
    };

    it('posts a level', () => {
        let level = {
            levelNum: 1,
            squares: [{
                squareId: square1._id
            }]
        };
        return request.post('/api/levels')
            .set('Authorization', adminToken)
            .send(level)
            .then(({ body }) => {
                level = body;
            });
    });

    it('saves user and assigns starting square', () => {
        return request.post('/api/auth/signup')
            .send(user)
            .then(({ body }) => {
                user.id = body.userId;
                token = body.token;
            });
    });





    // it('adds an item to inventory', () => {
    //     return request.post(`/api/users/${user.id}/inventory`)
    //         .set('Authorization', token)
    //         .send(task1.requiredItem)
    //         .then(({ body }) => {
    //             assert.deepEqual([task1.requiredItem.type], body.inventory);
    //         });
    // });

    // it('gets inventory', () => {
    //     return request.get(`/api/users/${user.id}/inventory`)
    //         .set('Authorization', token)
    //         .then(({ body }) => {
    //             assert.deepEqual([task1.requiredItem.type], body.inventory);
    //         });
    // });

    // it('gets an option (corresponding to one of 4 directions) and populates it with information', () => {
    //     const direction = 'n';
    //     return request.get(`/api/users/${user.id}/options/${direction}`)
    //         .set('Authorization', token)
    //         .then(({ body }) => {
    //             assert.ok(body.action);
    //             assert.ok(body.info);
    //         });
    // });

    // it('deletes an item from inventory', () => {
    //     return request.delete(`/api/users/${user.id}/inventory`)
    //         .set('Authorization', token)
    //         .then(({ body }) => {
    //             assert.deepEqual([], body.inventory);
    //         });
    // });
    
    // it('gets a user\'s current task number', () => {
    //     return request.get(`/api/users/${user.id}/level`)
    //         .set('Authorization', token)
    //         .then(({ body }) => {
    //             assert.isNumber(body.level);
    //         });
    // });

    // it('updates a user\'s current task number', () => {
    //     const task2 = {
    //         number: 2,
    //         startingDesc: 'Different desc.',
    //         requiredItem: { 
    //             type: 'something',
    //             itemDesc: 'Different desc.'
    //         },
    //         endpoint: {
    //             desc: 'Different desc.',
    //             unresolved: 'Nope, not yet.',
    //             resolved: 'Yay, you.'
    //         }
    //     };

    //     return request.post('/api/tasks')
    //         .set('Authorization', adminToken)
    //         .send(task2)
    //         .then(({ body }) => {
    //             task2._id = body._id;
    //             return request.put(`/api/users/${user.id}/level`)
    //                 .set('Authorization', token)
    //                 .send({ level: 2 });
    //         })
    //         .then(({ body }) => {
    //             assert.equal(body.currentTask, task2._id);
    //             assert.equal(body._id, user.id);
    //         });
    // });

});