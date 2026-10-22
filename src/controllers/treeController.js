// src/controllers/treeController.js

const treeService = require('../services/treeService');

/**
 * Controller untuk menangani request generate tree project.
 * Akan dipanggil oleh route saat ada request POST.
 */
async function generateProjectTree(req, res) {
    try {
        // 1. Ambil path dari body request (kita akan gunakan method POST)
        const { path: targetPath } = req.body;

        // 2. Validasi input dasar
        if (!targetPath) {
            return res.status(400).json({
                success: false,
                message: 'Path direktori wajib diisi di dalam body request.',
                example: { path: 'C:/Users/Name/project-anda' }
            });
        }

        if (typeof targetPath !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'Path harus berupa format string.'
            });
        }

        // 3. Panggil service untuk memproses dan membaca folder
        const treeResult = await treeService.generateTree(targetPath);

        // 4. Kirim response sukses
        return res.status(200).json({
            success: true,
            message: 'Tree project berhasil di-generate.',
            data: {
                targetPath: targetPath,
                tree: treeResult
            }
        });

    } catch (error) {
        // 5. Handle error yang dilempar dari service
        console.error('Error generating tree:', error.message);

        // Mapping error message dari service ke HTTP Status Code yang sesuai
        if (error.message.includes('bukan sebuah direktori')) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        if (error.message.includes('tidak ditemukan')) {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }

        // Error umum / Internal Server Error (500)
        return res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan internal pada server.',
            error: error.message
        });
    }
}

// Ekspor fungsi agar bisa dipakai di routes
module.exports = {
    generateProjectTree
};