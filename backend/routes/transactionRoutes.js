const express = require('express');
const Transaction = require('../models/Transaction');
const router = express.Router();

// Buy stock
router.post('/buy', async (req, res) => {
  const { user_id, stock_id, quantity, price } = req.body;
  try {
    const transaction = await Transaction.query().insert({
      user_id,
      stock_id,
      quantity,
      price,
      type: 'buy'
    });

    res.status(201).json(transaction);
  } catch (error) {
    console.error('Error buying stock:', error);
    res.status(500).send('Error buying stock');
  }
});

// Sell stock
router.post('/sell', async (req, res) => {
  const { user_id, stock_id, quantity, price } = req.body;
  try {
    const transaction = await Transaction.query().insert({
      user_id,
      stock_id,
      quantity,
      price,
      type: 'sell'
    });

    res.status(201).json(transaction);
  } catch (error) {
    console.error('Error selling stock:', error);
    res.status(500).send('Error selling stock');
  }
});

module.exports = router;
