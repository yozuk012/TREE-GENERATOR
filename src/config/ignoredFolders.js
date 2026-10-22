// src/config/ignoredFolders.js

/**
 * Konfigurasi daftar folder dan file yang akan diabaikan (di-ignore)
 * saat proses generate tree project berlangsung.
 * 
 * Anda bisa menambahkan atau menghapus item di bawah ini sesuai kebutuhan.
 */
const ignoredItems = [
    // ==========================================
    // 1. Package Managers & Dependencies
    // ==========================================
    'node_modules',       // JavaScript / Node.js
    'bower_components',   // Bower (Legacy JS)
    'vendor',             // PHP (Composer) / Go
    'venv',               // Python (Virtual Environment)
    '.venv',              // Python (Virtual Environment)
    'env',                // Python / Ruby
    '__pycache__',        // Python
    'site-packages',      // Python
    'Pods',               // iOS (CocoaPods)
    '.gradle',            // Java / Kotlin (Gradle)
    '.m2',                // Java (Maven)

    // ==========================================
    // 2. Version Control Systems (VCS)
    // ==========================================
    '.git',               // Git
    '.svn',               // Subversion
    '.hg',                // Mercurial

    // ==========================================
    // 3. Build, Output & Cache Directories
    // ==========================================
    'dist',               // General build output
    'build',              // General build output
    'out',                // General build output
    '.next',              // Next.js
    '.nuxt',              // Nuxt.js
    '.cache',             // Gatsby / General cache
    'target',             // Rust / Java (Maven)
    'bin',                // C# / Go
    'obj',                // C#
    '.turbo',             // Turborepo

    // ==========================================
    // 4. IDE & Editor Configurations
    // ==========================================
    '.idea',              // JetBrains IDEs (IntelliJ, WebStorm, PyCharm)
    '.vscode',            // VS Code
    '.vs',                // Visual Studio

    // ==========================================
    // 5. OS Generated Files
    // ==========================================
    '.DS_Store',          // macOS
    'Thumbs.db',          // Windows
    'desktop.ini',        // Windows

    // ==========================================
    // 6. Logs & Temporary Files
    // ==========================================
    'logs',
    '*.log',
    'npm-debug.log*',
    'yarn-debug.log*',
    'yarn-error.log*',
    'pnpm-debug.log*'
];

// Mengekspor array agar bisa di-import di file lain (seperti treeService)
module.exports = ignoredItems;