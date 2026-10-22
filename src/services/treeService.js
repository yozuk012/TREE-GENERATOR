// src/services/treeService.js

const fs = require('fs').promises;
const path = require('path');
const ignoredItems = require('../config/ignoredFolders');

/**
 * Helper function untuk mengecek apakah sebuah file/folder harus diabaikan.
 * Mendukung exact match (contoh: 'node_modules') dan wildcard sederhana (contoh: '*.log').
 */
function isIgnored(name) {
    return ignoredItems.some(pattern => {
        if (pattern.startsWith('*')) {
            // Cek akhiran nama file (contoh: *.log)
            return name.endsWith(pattern.slice(1)); 
        }
        if (pattern.endsWith('*')) {
            // Cek awalan nama file (contoh: npm-debug.log*)
            return name.startsWith(pattern.slice(0, -1)); 
        }
        // Exact match untuk nama folder/file
        return name === pattern; 
    });
}

/**
 * Fungsi rekursif untuk membaca isi folder dan membangun string tree.
 * @param {string} dirPath - Path absolut dari folder yang sedang dibaca.
 * @param {string} prefix - String indentasi untuk menjaga struktur visual tree.
 */
async function buildTreeContent(dirPath, prefix) {
    let treeString = '';

    let items;
    try {
        // Membaca isi direktori dan mengambil tipe filenya sekaligus
        items = await fs.readdir(dirPath, { withFileTypes: true });
    } catch (error) {
        return treeString + prefix + '[Error: Permission denied or inaccessible]\n';
    }

    // 1. Filter: Buang item yang ada di daftar ignore
    items = items.filter(item => !isIgnored(item.name));

    // 2. Sorting: Urutkan agar Folder muncul di atas, lalu File, dan secara alfabetis
    items.sort((a, b) => {
        const aIsDir = a.isDirectory();
        const bIsDir = b.isDirectory();
        
        if (aIsDir && !bIsDir) return -1; // Folder dulu
        if (!aIsDir && bIsDir) return 1;  // File setelahnya
        return a.name.localeCompare(b.name); // Alfabetis
    });

    // 3. Loop dan bangun string tree
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const isLast = i === items.length - 1;
        
        // Karakter penghubung (L-shape untuk terakhir, T-shape untuk yang lain)
        const connector = isLast ? '└── ' : '├── ';
        
        treeString += prefix + connector + item.name + '\n';

        // Jika item adalah folder, panggil fungsi ini lagi (rekursif)
        if (item.isDirectory()) {
            // Update prefix: jika ini item terakhir, beri spasi kosong. Jika bukan, beri garis vertikal.
            const newPrefix = prefix + (isLast ? '    ' : '│   ');
            const subTree = await buildTreeContent(path.join(dirPath, item.name), newPrefix);
            treeString += subTree;
        }
    }

    return treeString;
}

/**
 * Fungsi utama yang akan dipanggil oleh Controller.
 * @param {string} targetPath - Path absolut yang diberikan oleh user.
 */
async function generateTree(targetPath) {
    // Validasi apakah path benar-benar ada dan merupakan sebuah folder
    try {
        const stats = await fs.stat(targetPath);
        if (!stats.isDirectory()) {
            throw new Error('Path yang diberikan bukan sebuah direktori/folder.');
        }
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('Path tidak ditemukan. Pastikan path yang dimasukkan benar.');
        }
        throw error;
    }

    // Ambil nama folder paling akhir sebagai root tree
    const rootName = path.basename(targetPath);
    let finalTree = rootName + '\n';
    
    // Panggil fungsi rekursif untuk mengisi isi di bawah root
    finalTree += await buildTreeContent(targetPath, '');
    
    return finalTree;
}

module.exports = {
    generateTree
};