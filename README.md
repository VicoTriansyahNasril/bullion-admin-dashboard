## 🛠 Tech Stack

- **Framework:** ReactJS (Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** TanStack Query (React Query)
- **Forms:** React Hook Form + Yup Validation
- **HTTP Client:** Axios (Interceptors configured)
- **Security:** Crypto-JS (SHA-256 Password Hashing)

## 📂 Struktur Folder

```text
src/
├── assets/         # Aset gambar (Background, Logo, Icon SVG)
├── components/     # Komponen UI Reusable (Button, Input, Modal, dll)
├── features/       # Komponen fitur spesifik (UserForm, UserTable, DetailView)
├── layouts/        # Layout utama aplikasi (DashboardLayout dengan Sidebar)
├── lib/            # Konfigurasi library (Axios Instance, Utils, Security)
├── pages/          # Halaman utama (Login, Register, Dashboard)
├── routes/         # Konfigurasi routing & proteksi halaman (PrivateRoute)
├── schemas/        # Skema validasi form (Yup Schema)
├── services/       # Logika pemanggilan API (Auth & User Service)
└── types/          # Definisi Tipe Data TypeScript (Interfaces)
```

## 📦 Cara Menjalankan

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Jalankan server development:**
    ```bash
    npm run dev
    ```

3.  **Buka di browser:** `http://localhost:5173`
