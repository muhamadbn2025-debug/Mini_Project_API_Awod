# Mini Project API Awod

REST API untuk manajemen produk digital dengan fitur Authentication, Authorization, Caching, dan Advanced Query.

---

## Tech Stack

- **Runtime**: Node.js v24
- **Framework**: Express.js v5
- **Database**: MySQL2
- **Cache**: Redis + Node-Cache
- **Auth**: JWT (jsonwebtoken) + Bcrypt
- **Validation**: Express-Validator

---

## Fitur

- Register & Login dengan JWT Authentication
- Password hashing menggunakan Bcrypt
- Proteksi endpoint dengan middleware JWT
- Validasi input request
- Global error handling
- Caching dengan Redis (TTL 60 detik)
- CRUD Products
- Advanced Query (JOIN multi-tabel)

---

## Struktur Project

```
Mini_Project_API_Awod/
├── app.js
├── config/
│   ├── database.js
│   ├── cache.js
│   └── redis.js
├── controllers/
│   ├── auth.js
│   ├── products.js
│   ├── product_category.js
│   └── Users.js
├── middleware/
│   ├── errorHandler.js
│   ├── validateAuth.js
│   └── validateProducts.js
├── models/
│   ├── products.js
│   ├── product_category.js
│   └── users.js
├── routes/
│   ├── auth.js
│   ├── products.js
│   ├── product_category.js
│   └── users.js
└── utils/
    └── AppError.js
```

---

## Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/[username]/Mini_Project_API_Awod.git
cd Mini_Project_API_Awod
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Buat file `.env`

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database
JWT_SECRET_KEY=your_jwt_secret
JWT_EXPIRES_IN=1d
REDIS_URL=redis://localhost:6379
MODE=Development
```

### 4. Jalankan Server

```bash
# Development (dengan nodemon)
npm run dev

# Production
npm start
```

Server berjalan di `http://localhost:3000`

---

## Endpoints

### Auth

| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| POST | /auth/registration | Register user baru | X |
| POST | /auth/login | Login user | X |
| GET | /auth/profile | Lihat profile | V |
| PUT | /auth/profile | Update profile | V |

#### Register

```
POST /auth/registration
```

Request Body:
```json
{
  "name": "Awod",
  "email": "awod@gmail.com",
  "password": "test123"
}
```

Response:
```json
{
  "code": 201,
  "message": "Successfully registration",
  "data": {
    "token": "eyJhbGci..."
  }
}
```

#### Login

```
POST /auth/login
```

Request Body:
```json
{
  "email": "awod@gmail.com",
  "password": "test123"
}
```

Response:
```json
{
  "code": 200,
  "message": "Successfully login",
  "data": {
    "token": "eyJhbGci...",
    "user": {
      "name": "Awod",
      "email": "awod@gmail.com"
    }
  }
}
```

---

### Products

> Semua endpoint Products memerlukan Bearer Token di Authorization Header

| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| GET | /products | Get semua products (dengan Redis cache) | V |
| GET | /products/:id | Get product by ID | V |
| GET | /products/with-category | Get products dengan JOIN category | V |
| POST | /products | Tambah product baru | V |
| PUT | /products/:id | Update product | V |
| DELETE | /products/:id | Hapus product | V |

#### Get All Products

```
GET /products
```

Response (dari database):
```json
{
  "code": 200,
  "source": "database",
  "message": "Successfully get products",
  "data": [...]
}
```

Response (dari Redis cache):
```json
{
  "code": 200,
  "source": "redis",
  "message": "Successfully get products",
  "data": [...]
}
```

#### Get Products with Category (JOIN)

```
GET /products/with-category
```

Response:
```json
[
  {
    "product_id": 1,
    "product_name": "Ebook JavaScript",
    "price": 50000,
    "category_name": "Ebook"
  }
]
```

#### Create Product

```
POST /products
```

Request Body:
```json
{
  "product_name": "Ebook React",
  "price": 75000,
  "stock": 100,
  "user_id": 1,
  "category_id": 1
}
```

#### Update Product

```
PUT /products/:id
```

Request Body (partial update diperbolehkan):
```json
{
  "product_name": "Ebook React Updated",
  "price": 80000,
  "stock": 50
}
```

---

## Validasi Input

### Auth

| Field | Aturan |
|-------|--------|
| name | Tidak boleh kosong |
| email | Harus format email valid |
| password | Minimal 6 karakter |

### Products

| Field | Aturan |
|-------|--------|
| product_name | Tidak boleh kosong |
| price | Tidak boleh kosong, harus angka |
| stock | Tidak boleh kosong, harus angka |

---

## Error Handling

Semua error dihandle oleh global error handler dengan format response yang konsisten:

| Status Code | Keterangan |
|-------------|-----------|
| 400 | Bad Request — validasi gagal atau input salah |
| 401 | Unauthorized — token tidak ditemukan |
| 403 | Forbidden — token tidak valid atau expired |
| 404 | Not Found — data tidak ditemukan |
| 500 | Internal Server Error |

Contoh response error:
```json
{
  "code": 401,
  "message": "Token not found"
}
```

---

## Caching

Endpoint `GET /products` menggunakan Redis cache dengan TTL 60 detik.

- Request pertama → data diambil dari MySQL, disimpan ke Redis
- Request selanjutnya → data diambil dari Redis (lebih cepat)
- Setiap kali ada POST atau DELETE product → cache dihapus otomatis agar data selalu up to date

---

## API Testing

Testing dilakukan menggunakan Postman dengan flow:

1. Register user → dapat token
2. Login user → dapat token
3. Get All Products (pertama kali) → `source: database`
4. Get All Products (kedua kali) → `source: redis` (cache aktif)
5. Get Products with Category → data JOIN
6. Create Product (dengan token)
7. Update Product (dengan token)
8. Delete Product (dengan token)
9. Test tanpa token → 401 Unauthorized
10. Test token invalid → 403 Forbidden

---

## Cara Penggunaan Token di Postman

1. Jalankan request Login
2. Copy token dari response
3. Di request yang butuh auth, pilih tab **Authorization**
4. Pilih type **Bearer Token**
5. Paste token

Atau gunakan **Postman Variables** — simpan token ke variable `{{token}}` dan gunakan di semua request secara otomatis.