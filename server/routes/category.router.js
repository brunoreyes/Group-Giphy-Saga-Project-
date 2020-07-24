const express = require('express');
const pool = require('../modules/pool');
const { default: Axios } = require('axios');
const router = express.Router();
require('dotenv').config();

// router.get('/', (req, res) => {
//   // return all categories
//   const queryText = `SELECT * FROM category ORDER BY name ASC`;
//   pool
//     .query(queryText)
//     .then((result) => {
//       res.send(result.rows);
//     })
//     .catch((error) => {
//       console.log(`Error on query ${error}`);
//       res.sendStatus(500);
//     });
// });

// Go to Giphy to get searched images
router.get('/search', (req, res) => {
  console.log('Hit server to get searched gifs...', req.query.searchName);
  console.log(
    `this is the link`,
    `http://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&limit=2&rating=g&q=${req.query.searchName}`
  );

  // req.query.searchName is coming from the index.js
  Axios.get(
    `http://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&limit=2&rating=g&q=${req.query.searchName}`
  )
    // api.giphy.com/v1/gifs/search?api_key=DCCQVL9Wnov2WkrU0Mzm3429Fy3ck0lQ&limit=5&rating=g&q=cheeseburger

    .then((response) => {
      // Remember 1st put in 'http://' then insert the rest of the link
      //   res.sendStatus(200); //okay status
      // you can't res.send twice so make sure to comment out sendStatus(200)
      console.log('Sending back data:', response.data);
      res.send(response.data.data);
    })
    .catch((error) => {
      console.log('Error getting searched', error);
      res.sendStatus(500); //not okay status
    });
});

module.exports = router;
