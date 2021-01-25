const MongoClient = require('mongodb').MongoClient;
const express =require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
require('dotenv').config()






const uri = `mongodb+srv://MODULE50:MUtBvTEh3mXIfthW@cluster0.lqicv.mongodb.net/emaStores?retryWrites=true&w=majority`;

const app=express();
app.use(bodyParser.json());
app.use(cors());



const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology:true });



client.connect(err => {
  const collection = client.db('emaStores').collection('products');
  const ordersCollection = client.db('emaStores').collection('orders');

  app.get('/',(req,res)=>{
    res.status(200).send(`<h1>Hello world</h1>`);
})

  console.log(err);

  app.post('/addProducts',(req,res)=>{
    const products=req.body;
    collection.insertOne(products)
    .then(result => { 
      res.send('Documet update successfully')
    })
  })

  app.post('/addOrders',(req,res)=>{
    const order=req.body;
    ordersCollection.insertOne(order)
    .then(result => {
      res.send(result)
    })
  })

  app.get('/products',(req,res)=>{
    collection.find({}).limit(20)
    .toArray((err,docs)=>{
      res.send(docs)
    })
  })

  app.get('/product/:key',(req,res)=>{
    collection.find({key:req.params.key})
    .toArray((err,docs)=>{
      res.send(docs[0])
    })
  })

  app.post('/productByKeys',(req,res)=>{
        const productKeys=req.body;
        collection.find({key:{ $in : productKeys}})
        .toArray((err,docs)=>{
          res.send(docs)
        })
  })
});







app.listen(process.env.PORT || 4001)