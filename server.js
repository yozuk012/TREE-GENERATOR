// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk membaca JSON body (Sangat penting untuk POST request)
app.use(express.json());

// Import Routes
const treeRoutes = require('./src/routes/treeRoutes');

// Gunakan Routes dengan prefix '/api'
// Jadi endpoint lengkapnya menjadi: POST /api/generate-tree
app.use('/api', treeRoutes);

// Route dasar untuk cek server
app.get('/', (req, res) => {
    res.json({ 
        message: 'Project Tree Generator API is running!',
        endpoints: {
            'Generate Tree': 'POST /api/generate-tree'
        }
    });
});

// Menjalankan Server
app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});