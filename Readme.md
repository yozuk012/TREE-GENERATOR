Baik, ini **full code README.md** dalam satu blok kode yang bisa langsung Anda copy-paste seluruhnya:

```markdown
# 🌳 Project Tree Generator

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-blue?logo=express)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20Mac%20%7C%20Linux-lightgrey)

**Tools ringan & modular untuk generate struktur direktori project Anda secara otomatis.**

[Fitur](#-fitur-utama) • [Instalasi](#-instalasi--setup) • [Penggunaan CLI](#-cara-penggunaan-cli) • [Penggunaan API](#-cara-penggunaan-api-server) • [Struktur Project](#-struktur-project)

</div>

---

## 📖 Deskripsi

**Project Tree Generator** adalah tools yang dirancang untuk membantu developer mendokumentasikan struktur folder project mereka dengan cepat. Tools ini secara otomatis memindai direktori dan menghasilkan visualisasi tree yang rapi, sambil **mengabaikan folder-folder berat** seperti `node_modules`, `.git`, `venv`, `build`, dan sejenisnya.

Dibangun dengan arsitektur **modular**, tools ini memiliki dua mode penggunaan:
- 💻 **CLI (Command Line Interface)**: Untuk penggunaan cepat di terminal sehari-hari.
- 🌐 **REST API (Express.js)**: Untuk integrasi dengan aplikasi web atau automation.

---

## ✨ Fitur Utama

- 🚀 **Super Cepat** — Menggunakan modul native `fs.promises` Node.js untuk pembacaan folder secara asynchronous.
- 🛡️ **Smart Ignore** — Otomatis melewati folder packages, cache, dan VCS dari berbagai bahasa pemrograman.
- 💻 **Dual Mode** — Bisa dipakai via Terminal (CLI) atau sebagai API Server.
- 💾 **Auto-Save** — Secara default langsung membuat file `tree.txt` di dalam folder yang di-scan.
- 🎨 **Preview di Console** — Menampilkan hasil tree langsung di terminal sekaligus menyimpannya ke file.
- 🧩 **Modular Architecture** — Kode dipisah rapi (Routes, Controllers, Services, Config) sehingga mudah dikembangkan.
- 🔄 **Recursive & Sorted** — Membaca folder secara rekursif dengan urutan Folder di atas File, lalu alfabetis.

---

## 🚀 Instalasi & Setup

### 1. Clone Repository

```bash
git clone https://github.com/username-anda/project-tree-generator.git
cd project-tree-generator
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Command Global (Agar bisa dipakai di mana saja)

#### 🪟 Untuk Windows (Paling Stabil)

Buat file bernama `tree-gen.bat` di folder:
```
C:\Users\NamaAnda\AppData\Roaming\npm
```
*(Buat folder `npm` jika belum ada)*

Isi file `tree-gen.bat` dengan kode berikut:
```bat
@echo off
node "E:\Tools\Tree-Generator\cli.js" %*
```
> ⚠️ **Penting:** Ganti path `E:\Tools\Tree-Generator\cli.js` dengan **path absolut** folder project Anda di komputer.

#### 🍎 Untuk Mac / Linux / Git Bash

Cukup jalankan perintah berikut di dalam folder project:
```bash
npm link
```

---

## 💻 Cara Penggunaan (CLI)

Setelah setup selesai, Anda bisa menjalankan command `tree-gen` dari terminal mana saja (CMD, PowerShell, Git Bash, dll).

### 1. Generate tree di folder saat ini (Otomatis buat `tree.txt`)

```bash
tree-gen .
```

**Output:**
- File `tree.txt` akan dibuat di dalam folder tersebut.
- Preview struktur tree akan ditampilkan di terminal.

### 2. Generate tree di folder spesifik

```bash
# Windows
tree-gen C:/Users/Name/MyProject

# Mac/Linux
tree-gen /home/user/my-project
```

### 3. Generate dengan nama file kustom (misal: format Markdown)

```bash
tree-gen . -o struktur-folder.md
```

### 4. Lihat panduan bantuan

```bash
tree-gen --help
```

**Output bantuan:**
```
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
```

---

## 🌐 Cara Penggunaan (API Server)

Jika Anda ingin menggunakan ini sebagai backend service atau integrasi web:

### 1. Jalankan Server

```bash
npm start
# atau
node server.js
```

Server akan berjalan di: `http://localhost:3000`

### 2. Kirim Request

Kirim request **POST** ke endpoint:
```
POST http://localhost:3000/api/generate-tree
```

**Headers:**
```
Content-Type: application/json
```

**Request Body (JSON):**
```json
{
  "path": "E:/Tools/Tree-Generator"
}
```

> 💡 **Tips untuk Windows:** Gunakan forward slash `/` atau double backslash `\\` untuk path.

**Contoh Response Sukses:**
```json
{
  "success": true,
  "message": "Tree project berhasil di-generate.",
  "data": {
    "targetPath": "E:/Tools/Tree-Generator",
    "tree": "Tree-Generator\n├── cli.js\n├── package.json\n├── server.js\n└── src\n    ├── config\n    │   └── ignoredFolders.js\n    ├── controllers\n    │   └── treeController.js\n    ├── routes\n    │   └── treeRoutes.js\n    └── services\n        └── treeService.js\n"
  }
}
```

**Contoh Response Error:**
```json
{
  "success": false,
  "message": "Path tidak ditemukan. Pastikan path yang dimasukkan benar."
}
```

---

## ⚙️ Kustomisasi Folder yang Diabaikan

Jika Anda ingin menambahkan atau menghapus folder yang tidak boleh di-generate, buka file:

📂 **`src/config/ignoredFolders.js`**

File ini mendukung 3 jenis pencocokan:

| Tipe | Contoh | Keterangan |
|------|--------|------------|
| **Exact Match** | `'node_modules'`, `'.git'` | Nama folder/file harus sama persis |
| **Wildcard Akhir** | `'*.log'` | Mengabaikan semua file berakhiran `.log` |
| **Wildcard Awal** | `'npm-debug*'` | Mengabaikan semua file berawalan `npm-debug` |

**Daftar default yang sudah di-ignore:**
- 📦 **Package Managers**: `node_modules`, `vendor`, `venv`, `__pycache__`, `.gradle`, `.m2`, dll.
- 🔒 **Version Control**: `.git`, `.svn`, `.hg`
- 🏗️ **Build & Cache**: `dist`, `build`, `out`, `.next`, `.nuxt`, `.cache`, `target`, dll.
- 💻 **IDE Config**: `.idea`, `.vscode`, `.vs`
- 🖥️ **OS Files**: `.DS_Store`, `Thumbs.db`, `desktop.ini`
- 📝 **Logs**: `*.log`, `npm-debug.log*`, `yarn-debug.log*`, dll.

---

## 📂 Struktur Project

```text
project-tree-generator/
│
├── cli.js                      # Entry point untuk Command Line Interface
├── server.js                   # Entry point untuk Express API Server
├── package.json                # Konfigurasi project & dependencies
├── README.md                   # Dokumentasi project (file ini)
│
└── src/
    ├── config/
    │   └── ignoredFolders.js   # Daftar folder/file yang diabaikan
    │
    ├── controllers/
    │   └── treeController.js   # Penanganan request & response API
    │
    ├── routes/
    │   └── treeRoutes.js       # Definisi endpoint API
    │
    └── services/
        └── treeService.js      # Logika inti pembacaan folder (rekursif)
```

---

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/) (v18+)
- **Framework API**: [Express.js](https://expressjs.com/)
- **Modul Native**: `fs.promises`, `path`
- **Arsitektur**: Modular (Controller-Service-Config pattern)

---

## 📸 Screenshot

### Contoh Output di Terminal

```
🔄 Sedang memindai folder: E:\Github\basrengholic...

✅ SUKSES! File tree berhasil dibuat di:
   📄 E:\Github\basrengholic\tree.txt

--- Preview Struktur Tree ---
basrengholic
├── public
│   ├── css
│   │   └── style.css
│   ├── js
│   │   └── main.js
│   └── images
│       └── logo.png
├── src
│   ├── controllers
│   │   └── authController.js
│   ├── models
│   │   └── User.js
│   └── routes
│       └── apiRoutes.js
├── .env
├── .gitignore
├── package.json
├── server.js
└── tree.txt
```

---

## 🤝 Kontribusi

Kontribusi sangat diterima! Jika Anda punya ide fitur baru atau menemukan bug:

1. Fork repository ini
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

---

## 📝 Lisensi

Project ini dilisensikan di bawah [MIT License](LICENSE). Silakan gunakan, modifikasi, dan distribusikan secara bebas.

---

## 👨‍💻 Author

Dibuat dengan ❤️ oleh **[Nama Anda / Username GitHub Anda]**

- GitHub: [@username-anda](https://github.com/username-anda)
- Email: email-anda@example.com

---

<div align="center">

**⭐ Jika project ini bermanfaat, jangan lupa berikan bintang di repository ini! ⭐**

[⬆ Kembali ke Atas](#-project-tree-generator)

</div>
```

Sekarang Anda tinggal **copy seluruh isi di atas** dan paste ke file `README.md` Anda. Jangan lupa ganti bagian `username-anda`, `Nama Anda`, dan path di contoh Windows sesuai dengan data Anda! 🎉