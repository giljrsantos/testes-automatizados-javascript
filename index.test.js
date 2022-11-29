import Product from './product.js';
import Service from './service.js';
import assert from 'assert';

// should throw an error when description is less than 5 characters long
{
    const params = { 
        description: 'my P', 
        id: 1, 
        price: 1000
     }

     const product = new Product({
        onCreate: () => {},
        service: new Service()
     })
     assert.rejects(
        () => product.create(params),
        { message: 'description must be higher than 5'},
        'it should throw an error with wrong description'
     )
     
}

// should save product successfully
{
    const params = { 
        description: 'my Product', 
        id: 1, 
        price: 1000
     }

     const product = new Product({
        onCreate: (msg) => console.log('chamou esse carinha', msg),
        service: new Service()
     })
     const result = await product.create(params)
     
}