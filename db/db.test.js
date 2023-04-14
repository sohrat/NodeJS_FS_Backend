const {connect, disconnect, findUser, saveUser} = require('./db');
const User = require('../models/userModel');
const mongoose = require('mongoose');

jest.mock('./db');
beforeAll(async() => {
    return await connect();
});

describe('User Test Suite', ()=>{
    test('As a user I want to save a user to the database', async () => {
        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            firstName: 'Sohrat',
            lastName: 'Permanov',
            address: '123 Main st',
            city: 'Austin',
            state: 'TX',
            zipCode: '424252',
            email: 'sohrat@gmail.com',
            password: '123',
        });

        const user = await saveUser(newUser);
        expect(user.firstName).toEqual('Sohrat');
        expect(user.lastName).toEqual('Permanov');
        expect(user.address).toEqual('123 Main st');
        expect(user.city).toEqual('Austin');
        expect(user.state).toEqual('TX');
        expect(user.zipCode).toEqual('424252');
        expect(user.email).toEqual('sohrat@gmail.com');
        expect(user.password).toEqual('123');
    });
});

test('As a user I want to find a user by any property', async()=>{
    const obj = {email:'sohrat@gmail.com'};

    await findUser(obj)
    .then(user => {
        expect(user.firstName).toEqual('Sohrat');
        expect(user.lastName).toEqual('Permanov');
        expect(user.address).toEqual('123 Main st');
        expect(user.city).toEqual('Austin');
        expect(user.state).toEqual('TX');
        expect(user.zipCode).toEqual('424252');
        expect(user.email).toEqual('sohrat@gmail.com');
        expect(user.password).toEqual('123');
    })
    .catch((err) =>{
        console.log('Error' + err.message);   
    });
});

afterAll(async() => {
    return await disconnect();
});