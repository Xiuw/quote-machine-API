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
		connectionString:process.env.DATABASE_URL,
		ssl:true,
	}
})

app.get('/',(req,res)=>{
	res.send('It worked');
})

app.get('/getQuote',(req,res)=>{
	db.select('*').from('quote')
	.then(data => {
	res.send(data);
	})
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


app.listen(process.env.PORT || 3000,()=>{
	console.log(`Running on Port ${process.env.port}`);
})

