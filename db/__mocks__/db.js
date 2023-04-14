const connect = async () => {
    console.log('MongoDB is mocked connection');
};

const disconnect = async () => {
    console.log('Mocked Disconnection');
};

// obj {email: req.body.email}
const findUser = async (obj) => {
    return Promise.resolve({
        firstName: 'Sohrat',
        lastName: 'Permanov',
        address: '123 Main st',
        city: 'Austin',
        state: 'TX',
        zipCode: '424252',
        email: 'sohrat@gmail.com',
        password: '123',
    });
};

const saveUser = async (newUser) => {
    return Promise.resolve({
        firstName: 'Sohrat',
        lastName: 'Permanov',
        address: '123 Main st',
        city: 'Austin',
        state: 'TX',
        zipCode: '424252',
        email: 'sohrat@gmail.com',
        password: '123',
    });
};

module.exports = { connect, disconnect, findUser, saveUser };