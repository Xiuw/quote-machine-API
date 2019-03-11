const express = require('express');//framework for node.js
const knex = require('knex'); //SQL builder for pg(and some other database)
const bodyParser = require('body-parser') // parse the incoming input and validate before trusting
const cors = require('cors'); 

const app = express();
app.use(cors());
app.use(bodyParser.json())
const db = knex({
	client:'pg',
	connection:{
		host:'127.0.0.1',
		user:'Xiuneh',
		password:'',
		database:'db'
	}
})
db.select('*').from('quote').then(data => {
	console.log(data);
})
app.get('/',(req,res)=>{
	res.send('It worked');
})

app.post('/submitQuote',(req,res) =>{
	db('quote')
	.returning('*')
	.insert({
		quote:req.body.quote,
		author:req.body.author
	})
	.then(response=>{
		res.json(response);
	})
	.catch(err=>console.log)
})


app.listen(3000,()=>{
	console.log('Running on Port 3000');
})

