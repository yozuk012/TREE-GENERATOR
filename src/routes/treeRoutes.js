// src/routes/treeRoutes.js

const express = require('express');
const router = express.Router();
const treeController = require('../controllers/treeController');

/**
 * Definisi Endpoint API
 * 
 * Kita menggunakan method POST karena kita mengirimkan data (path) 
 * di dalam body request. Ini lebih aman dan fleksibel dibandingkan GET, 
 * terutama jika path yang dikirimkan sangat panjang atau memiliki karakter khusus.
 */

// Endpoint: POST /api/generate-tree
router.post('/generate-tree', treeController.generateProjectTree);

// Anda bisa menambahkan endpoint lain di sini di masa depan, contoh:
// router.get('/history', treeController.getHistory);

// Mengekspor router agar bisa digunakan di server.js
module.exports = router;