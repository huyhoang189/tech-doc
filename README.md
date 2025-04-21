# 🚀 TECH-DOC – Hệ thống tài liệu kỹ thuật số 3D

Một hệ thống quản lý thiết bị, tài liệu kỹ thuật, mô hình 3D, video... sử dụng công nghệ web hiện đại:

- ✨ Frontend: **React + Vite + Ant Design**
- 🛠️ Backend: **Node.js + Express + Prisma (MySQL)**
- 🔐 Authentication: JWT + Role-based (ADMIN/USER)

---

## 📁 Cấu trúc dự án

````bash
TECH-DOC/
├── be/               # Backend (API + Prisma)
│   ├── prisma/       # Cấu hình DB với Prisma
│   ├── src/          # Controllers, routes, services, middlewares
│   ├── storage/      # Tệp media (PDF, GLB, video...)
│   ├── .env
│   └── package.json
├── fe/               # Frontend (React + Ant Design + Vite)
│   ├── src/
│   ├── public/
│   ├── .env
│   └── package.json
```bash

`🔙 Thiết lập backend (/be)`

⚙️ Cấu hình .env
DATABASE_URL="mysql://root:password@localhost:3306/techdocdb"
JWT_SECRET="your_jwt_secret"
PORT=3000


🧱 Prisma setup
npx prisma migrate dev --name init
npx prisma generate

▶️ Chạy backend
yarn dev
# hoặc npm run dev


🌐 Thiết lập frontend (/fe)

⚙️ Cấu hình .env
VITE_API_URL=http://localhost:3001/api

▶️ Chạy frontend
yarn dev
# hoặc npm run dev


✅ Tài khoản mặc định (nếu seed)
Username: admin
Password: 123456
Role: ADMIN

Thêm dữ liệu vào database
INSERT INTO `users` VALUES (1,'admin','$2b$10$PA8yy/0VdUWS2VLFElxiRuSMJHpL3hm90BS22jmZQpQ/QioV4OYZ2','ADMIN','2025-04-19 14:59:12.950','2025-04-19 14:59:12.950'),(2,'user','$2b$10$a/ggNCy7iyfiPGu6GfwKvunj94LF4EMlGFfXAAobTwNMwxLGmWmnq','USER','2025-04-21 02:32:10.072','2025-04-21 02:32:10.072');
````
