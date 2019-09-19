const express = require('express');
const salesRoutes = express.Router();

const bodyParser = require('body-parser');

const Joi = require('joi');



const sales = [{
    
    "id": 1,
    "title": 'Dano',
    "price": 600,
},
{
    "id": 2,
    "title": 'Peak',
    "price": 500,
},
{
    "id": 3,
    "title": 'Coast',
    "price" :700
},
{
    "id": 4,
    "title": '3 crown',
     "price" :800,
},
{
    "id": 5,
    "title": 'Hollandia',
    "price": 200,
}
];

// add a sales order
salesRoutes.post('/sales', (req, res) => {
    const order = {
        "id": sales.length + 1,
        "title": req.body.title
    }
    sales.push(order);
    res.send(sales);
});


// get all sales order
salesRoutes.get('/sales', (req, res) => {
    res.send(sales);
});


//get a sales by Id
salesRoutes.get('/sales/:id', (req, res) => {
    const sale =sales.find(g => g.id === parseInt(req.params.id));
    if (!sale) return res.status(200).send('The game with the given ID was not found.');
    res.send(sale);
});



module.exports= salesRoutes;            