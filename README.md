# Petshop Management

## Deskripsi

**Petshop Management** adalah sistem manajemen web untuk mempermudah operasional harian petshop. Aplikasi ini dirancang untuk membantu pemilik petshop mengelola data pelanggan, hewan peliharaan, inventaris, dan jadwal booking layanan.

## Teknologi yang Digunakan

Proyek ini dibangun menggunakan teknologi berikut:

* **Framework:** Next.js
* **Bahasa Pemrograman:** TypeScript
* **Database:** Firebase Firestore (untuk menyimpan data pelanggan, hewan, inventaris, dan booking)
* **Autentikasi:** Firebase Auth (untuk login pengguna)
* **Desain & UI:**
    * Tailwind CSS
    * Shadcn UI (komponen seperti Card, Button, Input, Table, Dialog, Select, Popover, Calendar, dan Sidebar)
    * `clsx` dan `tailwind-merge` untuk utilitas class
    * `lucide-react` untuk ikon
* **Lain-lain:**
    * `next/font` untuk mengoptimalkan font Geist
    * Middleware Next.js untuk proteksi rute dashboard

## Fitur-fitur Utama

Sistem ini memiliki beberapa fitur utama untuk membantu manajemen petshop:

* **Manajemen Pelanggan:** Menambah, melihat, dan menghapus data pelanggan seperti nama, jenis kelamin, alamat, dan kontak.
* **Manajemen Hewan:** Menambah, melihat, dan menghapus data hewan peliharaan yang terdaftar, termasuk nama, jenis, ras, jenis kelamin, usia, dan pemiliknya.
* **Manajemen Inventaris:** Menambah, melihat, dan menghapus data stok barang, seperti nama, kategori, jumlah, dan harga.
* **Manajemen Booking:** Menjadwalkan, melihat, dan menghapus booking untuk berbagai layanan, seperti grooming, penitipan, dan kesehatan.
* **Sistem Autentikasi:** Fitur login untuk memastikan hanya pengguna yang memiliki otorisasi yang dapat mengakses dashboard manajemen.

## Cara Instalasi

Untuk menjalankan proyek ini di lingkungan lokal Anda, ikuti langkah-langkah berikut:

1.  Pastikan Anda memiliki Node.js dan npm (atau package manager lain seperti Yarn/pnpm/bun) terinstal.
2.  Clone repositori proyek ini.
3.  Instal semua dependensi yang diperlukan:

    ```bash
    npm install
    # atau
    yarn install
    # atau
    pnpm install
    # atau
    bun install
    ```

4.  **Siapkan Firebase**
*   Buat proyek baru di Firebase Console.
*   Aktifkan **Firestore** dan **Authentication**.
*   Di halaman Authentication, aktifkan metode masuk **Email/Password**.
*   Tambahkan aplikasi web ke proyek Anda dan salin konfigurasi Firebase.
*   Buat file `.env.local` di root proyek.
*   Tambahkan konfigurasi Firebase yang telah Anda salin ke dalam file `.env.local` dengan format seperti di bawah ini:
    ```
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    ```
*   Setelah itu, Anda perlu membuat akun pengguna melalui Firebase Authentication Console agar bisa login ke aplikasi.

5.  Jalankan server pengembangan:

    ```bash
    npm run dev
    # atau
    yarn dev
    # atau
    pnpm dev
    # atau
    bun dev
    ```

6.  Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat hasilnya.

## AI Support

Dalam pengembangan proyek ini, AI digunakan sebagai asisten untuk mempercepat dan meningkatkan kualitas proses pengerjaan, termasuk:

* **Integrasi Teknologi**: Membantu mempermudah integrasi antara Next.js dan Firebase.
* **Pengembangan Logika**: Membantu menangani logika dari beberapa fungsi, seperti operasi CRUD data di Firestore.
* **Debugging**: Menganalisis dan membantu memperbaiki error dalam kode.
* **Refactoring Kode**: Mengubah kode dari JavaScript ke TypeScript untuk meningkatkan *type safety* dan *maintainability*.
* **Dokumentasi**: Membantu menyusun dokumentasi proyek ini agar lebih terstruktur dan mudah dipahami.