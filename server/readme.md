# BASCOM - Backend for Web Alumni Project

This is the backend server for **BASCOM** (Web Alumni Project) built with **Express.js**, **Prisma**, **MySQL**, **Redis**, and **MinIO**.

---

## 🚀 Tech Stack

* **Backend:** Node.js + Express.js
* **Database:** MySQL (via Prisma ORM)
* **Cache / Session:** Redis
* **File Storage:** MinIO (S3-compatible object storage)
* **Environment:** Windows / Linux (native), optionally Docker
* **Language:** JavaScript (ES6+)

---

## 📁 Project Structure

```
S:.
|   .env
|   package.json
|   package-lock.json
|   readme.md
|
+---docker/
|   +---dev/
|   +---prod/
|   \---scripts/
+---prisma/
|       schema.prisma
+---public/
+---script/
+---src/
|   |   app.js
|   |   server.js
|   |
|   +---config/
|   |       env.js
|   |       prisma.js
|   +---controller/
|   +---middleware/
|   +---routes/
|   +---services/
|   |   +---alumni/
|   |   \---auth/
|   \---utils/
\---test/
```

---

## ⚡ Setup & Installation

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd BASCOM/server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure `.env`

Create a `.env` file at root:

```env
# MySQL
DATABASE_URL="mysql://Bascom:LnDJr@localhost:3306/BascomDB"

# Redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

# MinIO
MINIO_ENDPOINT=127.0.0.1:9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET=alumni-files
```

### 4. Setup Database

```bash
npx prisma migrate dev --name init
```

### 5. Run Backend

```bash
node src/server.js
```

---

## 🔧 Services

* **MySQL:** `BascomDB`
* **Redis:** cache/session storage
* **MinIO:** object storage for file uploads (`bascom-files` bucket)

---

## 🛠 Project Scripts

* `script/` → utility scripts (DB seed, automation, migrations)
* `docker/` → Docker setup for dev & prod

---

## 📦 Usage

* Access **API**: `http://localhost:3000`
* Access **MinIO Web Console**: `http://localhost:9001` (default `minioadmin:minioadmin`)

---

## 💡 Notes

* Make sure all services (MySQL, Redis, MinIO) are running before starting backend.
* Recommended to change default credentials for security in production.
* This project is structured for **easy migration** to server or Docker deployment.

---

## 📜 License

Licensed under **GNU AGPLv3** for MinIO usage; other parts of the project are MIT (update if needed).
