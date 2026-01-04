# 🛍️ Tailoré - Order & Sales Service

Layanan mikroservice untuk manajemen transaksi dan penjualan dalam sistem e-commerce Tailoré. Service ini merupakan implementasi dari **Order & Sales Bounded Context** yang menangani pemrosesan pesanan, kalkulasi tagihan, dan pencatatan riwayat transaksi.

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

## 📋 Deskripsi

**Tailoré Order Service** adalah layanan backend yang bertanggung jawab untuk:
- **Direct Ordering**: Menangani permintaan pembelian barang secara langsung (Customer + Product + Qty).
- **Billing Engine**: Melakukan kalkulasi total harga tagihan secara otomatis.
- **Transaction Logging**: Mencatat setiap transaksi ke dalam database persisten.
- **Micro Frontend**: Menyediakan antarmuka web ringan untuk simulasi user.

Service ini dibangun menggunakan:
- **Node.js** & **Express.js** untuk backend framework
- **SQLite** untuk database (Embedded & Zero-configuration)
- **Docker** untuk containerization (Multi-architecture support)

---

## 🏗️ Arsitektur

### Domain-Driven Design
Service ini mengimplementasikan **Order & Sales Bounded Context** dengan fokus pada subdomain:
- **Transaction Processing** (Core Domain)
- **Sales History** (Supporting Subdomain)

### Database Schema
Data disimpan menggunakan **SQLite** pada tabel `orders`:
- `id` - Primary Key (Auto Increment)
- `customer_name` - Nama pelanggan yang melakukan pemesanan
- `product_id` - ID produk yang dibeli
- `quantity` - Jumlah barang
- `total_price` - Total tagihan
- `status` - Status pesanan (DEFAULT: 'PENDING')
- `created_at` - Timestamp waktu transaksi

---

## 🚀 Instalasi & Setup

### Prerequisites
- Node.js v18 atau lebih tinggi
- Docker Desktop (Optional, tapi direkomendasikan)
- Git

### 1. Clone Repository
```bash
git clone https://github.com/florecita24/Tailore_OrderService.git
cd Tailore_OrderService
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Jalankan Service (Local)
```bash
node server.js
```
Service akan berjalan di `http://localhost:3000`

### 4. Jalankan dengan Docker
```bash
# Build image
docker build -t tailore-order .

# Run container
docker run -p 3000:3000 tailore-order
```

---

## 🔌 API Endpoints

### 1. Create Order
**POST** `/api/orders`

**Headers:**
```json
{
  "x-secret-key": "rahasia123"
}
```

**Request Body:**
```json
{
  "customer_name": "John Doe",
  "product_id": 101,
  "quantity": 2,
  "total_price": 500000
}
```

**Response:**
```json
{
  "message": "Order berhasil dibuat",
  "order_id": 1,
  "data": {
    "customer_name": "John Doe",
    "product_id": 101,
    "quantity": 2,
    "total_price": 500000
  }
}
```

### 2. Get All Orders
**GET** `/api/orders`

**Headers:**
```json
{
  "x-secret-key": "rahasia123"
}
```

**Response:**
```json
{
  "message": "Data Orders",
  "data": [
    {
      "id": 1,
      "customer_name": "John Doe",
      "product_id": 101,
      "quantity": 2,
      "total_price": 500000,
      "status": "PENDING",
      "created_at": "2026-01-04 10:30:00"
    }
  ]
}
```

### 3. Web Interface
**GET** `/`

Membuka halaman web interface untuk simulasi pembuatan order.

---

## 🔒 Authentication

Service ini menggunakan **simple header-based authentication**:
- Semua request API membutuhkan header `x-secret-key: rahasia123`
- Jika tidak disertakan, akan menerima response `401 Unauthorized`

---

## 🐳 Docker Hub

Image tersedia di Docker Hub:
```bash
docker pull felowrii/tailore-order:latest
```

**Repository:** [docker.io/felowrii/tailore-order](https://hub.docker.com/r/felowrii/tailore-order)

---

## 📦 Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js 18 | Runtime environment |
| Express.js 5.x | Web framework |
| SQLite3 | Embedded database |
| Body-Parser | Request parsing |
| CORS | Cross-origin resource sharing |
| Docker | Containerization |

---

## 📂 Struktur Project

```
Tailore_OrderService/
├── server.js          # Main application file
├── index.html         # Frontend interface
├── package.json       # Dependencies & scripts
├── Dockerfile         # Docker configuration
├── orders.db          # SQLite database (auto-generated)
└── README.md          # Documentation
```

---

## 🧪 Testing API dengan cURL

### Create Order
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -H "x-secret-key: rahasia123" \
  -d '{
    "customer_name": "Jane Smith",
    "product_id": 202,
    "quantity": 1,
    "total_price": 250000
  }'
```

### Get All Orders
```bash
curl -X GET http://localhost:3000/api/orders \
  -H "x-secret-key: rahasia123"
```

---

## 🚧 Roadmap & Future Improvements

- [ ] Integrasi dengan Catalog Service untuk validasi stok.
- [ ] Order status management (PENDING → PROCESSING → COMPLETED)
- [ ] Order cancellation endpoint
- [ ] Menambahkan Payment Gateway API.
- [ ] Endpoint GET /orders untuk melihat riwayat transaksi (Admin Dashboard).
- [ ] Implementasi JWT Authentication.
- [ ] Unit Testing dengan Jest.

---

## 👥 Author

**Florecita Natawirya - 18223040**
- GitHub: [@florecita24](https://github.com/florecita24)
- Repository: [Tailore_OrderService](https://github.com/florecita24/Tailore_OrderService)
- Docker Hub: [felowrii](https://hub.docker.com/u/felowrii)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support

Jika ada pertanyaan atau issue, silakan buka [GitHub Issues](https://github.com/florecita24/Tailore_OrderService/issues)

---

⭐ **Star this repository if you find it helpful!**
