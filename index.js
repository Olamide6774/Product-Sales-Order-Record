const express = require('express');
const bodyParser = require('body-parser');

const Joi = require('joi');

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

//User Authentication
const User = require('./user.js');
const unauthorised=(res)=>{
    res.set( 'WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.sendStatus(401);
}
const auth = (req,res,next) =>{
    if(User.some(a=>a.first_name === req.body.first_name)){
        next()
    }
    else{
         return unauthorised(res)
    }
}

app.get('/',auth, (req, res) => {
    res.send ('Oh hi Qamardeen!');
});

const products = require('./product')

const salesRoutes = require('./sales')
app.use('/',auth, salesRoutes);

// add a products
app.post('/product', auth,(req, res) => {
    const product = {
        id: products.length + 1,
        title: req.body.title
    }
    products.push(product);
    res.send(product);
});

// get all products
app.get('/product', auth, (_req, res) => {
    res.send(products);
});


// get products by id
app.get('/product/:productid', auth, (req, res) => {
    const product = products.find(g => g.id === parseInt(req.params.productid));
    if (!products) return res.status(200).send('The game with the given ID was not found.');
    res.send(product);
});




app.listen(5000,() =>  console.log ('listening on port 5000'));