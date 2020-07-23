const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {


const searchQuery = `SELECT * FROM favorite;`;

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
router.put('/:favId', (req, res) => {
  // req.body should contain a category_id to add to this favorite image
  res.sendStatus(200);
});

// delete a favorite
router.delete('/', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
