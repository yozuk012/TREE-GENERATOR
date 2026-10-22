#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const treeService = require('./src/services/treeService');

async function runCLI() {
    const args = process.argv.slice(2);
    
    // Fitur Help
    if (args.includes('-h') || args.includes('--help') || args.length === 0) {
        console.log(`
🌳 Project Tree Generator CLI 🌳

Penggunaan:
  tree-gen <path> [options]

Options:
  -h, --help       Tampilkan bantuan ini
  -o, --output     Simpan hasil ke nama file spesifik (default: tree.txt)

Contoh:
  tree-gen .                          (Otomatis buat file 'tree.txt' di folder ini)
  tree-gen C:/Users/Name/project      (Otomatis buat file 'tree.txt' di folder tersebut)
  tree-gen . -o struktur.md           (Simpan dengan nama custom 'struktur.md')
        `);
        process.exit(0);
    }

    // Parse argumen
    let targetPath = '';
    let customOutputFile = '';
    
    for (let i = 0; i < args.length; i++) {
        if (args[i] === '-o' || args[i] === '--output') {
            customOutputFile = args[i + 1];
            i++; 
        } else if (!targetPath) {
            targetPath = args[i];
        }
    }

    if (!targetPath) {
        console.error('❌ Error: Path direktori wajib diisi.');
        process.exit(1);
    }

    // Resolve path menjadi Absolute Path (Folder Target)
    const absolutePath = path.resolve(process.cwd(), targetPath);

    try {
        console.log(`\n🔄 Sedang memindai folder: ${absolutePath}...\n`);
        
        // 1. Generate Tree menggunakan Service
        const treeResult = await treeService.generateTree(absolutePath);

        // 2. Tentukan nama dan lokasi file output
        // Jika user pakai -o, pakai nama itu. Jika tidak, default ke 'tree.txt' di dalam folder target
        const finalFilePath = customOutputFile 
            ? path.resolve(process.cwd(), customOutputFile) 
            : path.join(absolutePath, 'tree.txt');

        // 3. Simpan ke file
        fs.writeFileSync(finalFilePath, treeResult, 'utf8');
        console.log(`✅ SUKSES! File tree berhasil dibuat di:`);
        console.log(`   📄 ${finalFilePath}\n`);

        // 4. Tampilkan preview di console (opsional, tapi sangat membantu)
        console.log('--- Preview Struktur Tree ---');
        console.log(treeResult);

    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
}

runCLI();