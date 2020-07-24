const express = require('express');
const pool = require('../modules/pool');
const { default: Axios } = require('axios');
const { query } = require('../modules/pool');
const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {


const searchQuery = `SELECT * FROM favorite ORDER BY id ASC;`;

//pool is our connection to the database
//we are going to query a queryString command to pool (database)
pool.query(searchQuery)
.then(response=>{
  console.log('Sending response:', response.rows)
  res.send(response.rows);
}).catch(error =>{
  console.log('Error in get:', error)
  res.sendStatus(500)
})

});

// add a new favorite 
router.post('/', (req, res) => {
  res.sendStatus(200);
});

// update given favorite with a category id
router.put('/', (req, res) => {
  //we want to see information
  console.log('In favorite Put')
  console.log('req.body', req.body);

  const category_id = Number(req.body.value);
  const id = req.body.id;

  console.log(category_id);
  console.log(id);

  let queryString = `UPDATE favorite SET category_id=$1 WHERE id=$2;`;
  pool.query(queryString, [category_id, id])
    .then(response=>{
      console.log('Response from db', response)
      res.sendStatus(201);
    })
    .catch(err=>{
      console.log('Error from db', err)
      res.sendStatus(500);
    })
});

// delete a favorite
router.delete('/', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
