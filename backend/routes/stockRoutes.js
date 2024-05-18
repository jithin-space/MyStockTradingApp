const express = require('express');
const Stock = require('../models/Stock');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new stock
router.post('/stocks', authenticateToken, async (req, res) => {
  const { symbol, name, price } = req.body;

  try {
    const newStock = await Stock.query().insert({
      symbol,
      name,
      price
    });

    res.status(201).json(newStock);
  } catch (error) {
    console.error('Error creating stock:', error);
    res.status(500).send('Error creating stock');
  }
});

// Get all stocks
router.get('/stocks', authenticateToken, async (req, res) => {
  try {
    const stocks = await Stock.query();
    res.json(stocks);
  } catch (error) {
    console.error('Error fetching stocks:', error);
    res.status(500).send('Error fetching stocks');
  }
});

// Get a single stock by ID
router.get('/stocks/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const stock = await Stock.query().findById(id);
    if (!stock) {
      return res.status(404).send('Stock not found');
    }
    res.json(stock);
  } catch (error) {
    console.error('Error fetching stock:', error);
    res.status(500).send('Error fetching stock');
  }
});

// Update a stock by ID
router.put('/stocks/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { symbol, name, price } = req.body;

  try {
    const updatedStock = await Stock.query().patchAndFetchById(id, {
      symbol,
      name,
      price
    });
    if (!updatedStock) {
      return res.status(404).send('Stock not found');
    }
    res.json(updatedStock);
  } catch (error) {
    console.error('Error updating stock:', error);
    res.status(500).send('Error updating stock');
  }
});

// Delete a stock by ID
router.delete('/stocks/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const rowsDeleted = await Stock.query().deleteById(id);
    if (rowsDeleted === 0) {
      return res.status(404).send('Stock not found');
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting stock:', error);
    res.status(500).send('Error deleting stock');
  }
});

module.exports = router;
