import Product from './product.js';
import Service from './service.js';
import assert from 'assert';

const callTracker = new assert.CallTracker()

// quando o programa terminar, valida todas as chamadas
process.on('exit', () => callTracker.verify());

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
   // MOCK => o que precisamos para o teste funcionar
    const params = { 
        description: 'my Product', 
        id: 1, 
        price: 1000
     }

     // serviceStub => impedir que seja ONLINE
     const spySave = callTracker.calls(1);
     const serviceStub = {
      async save(params){
         // SPY: espiona a função
         spySave(params)
         return `${params.id} saved with success!`
      }
     }

     // spyOncreate => impedir que a chamada seja ONLINE
     const fn = (msg) => {
        assert.deepStrictEqual(msg.id, params.id, 'id should be the same!')
        assert.deepStrictEqual(msg.price, params.price, 'price should be the same!')
        assert.deepStrictEqual(msg.description, params.description.toUpperCase(), 'description should be the same!')
      }
      

     const spyOncreate = callTracker.calls(fn, 1);
     const product = new Product({
        onCreate: spyOncreate,
        // aqui fizemos o STUB
        service: serviceStub
     })
     const result = await product.create(params)
     assert.deepStrictEqual(result, `${params.id} SAVED WITH SUCCESS!`)
     
}