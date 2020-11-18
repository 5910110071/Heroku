const express = require('express')
const app = express()
const morgan = require('morgan');
const PORT = process.env.PORT || 8080

// const mongoose = require('mongoose')
// const Product = require('./models/product')
app.use(express.json())
// mongoose.connect('mongodb://localhost:27017/node-api-101', { useNewUrlParser: true, useFindAndModify: false })
const {
    WebhookClient
  } = require('dialogflow-fulfillment');
  
  app.use(morgan('dev'))
  
  app.get('/', (req, res) => {
    res.send({
      success: true
    });
  })
  
  app.post('/webhook', (req, res) => {
    console.log('POST: /');
    console.log('Body: ',req.body);
  
    //Create an instance
    const agent = new WebhookClient({
      request: req,
      response: res
    });
  
    //Test get value of WebhookClient
    console.log('agentVersion: ' + agent.agentVersion);
    console.log('intent: ' + agent.intent);
    console.log('locale: ' + agent.locale);
    console.log('query: ', agent.query);
    console.log('session: ', agent.session);
  
    //Function Location
    function insurance(agent) {
      agent.add('Welcome to Thailand.');
    }
  
    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    intentMap.set('insurance - custom - yes', insurance);  // "insurance - custom - yes" is once Intent Name of Dialogflow Agent
    agent.handleRequest(intentMap);
  });

// app.post('/products', async (req, res) => {
//     const payload = req.body
//     const product = new Product(payload)
//     await product.save()
//     res.status(201).end()
// })

// app.get('/products', async (req, res) => {
//     const products = await Product.find({})
//     res.json(products)
// })

// app.get('/products/:id', async (req, res) => {
//     const { id } = req.params
//     const product = await Product.findById(id)
//     res.json(product)
// })

// app.put('/products/:id', async (req, res) => {
//     const payload = req.body
//     const { id } = req.params
//     const product = await Product.findByIdAndUpdate(id, { $set: payload })
//     res.json(product)
// })

// app.delete('/products/:id', async (req, res) => {
//     const { id } = req.params
//     await Product.findByIdAndDelete(id)
//     res.status(204).end()
// })

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});