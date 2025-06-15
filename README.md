# Blogify 📝

A powerful full-stack **MERN blog platform** with secure ** authentication**, **role-based access**, **CRUD operations for blogs and categories**, **image uploads via Cloudinary**, and **optimized APIs using caching**. It includes password recovery via OTP, user profile management, and admin-level controls.

---

## 🌐 Live Demo

> Hosted on Vercel: [Link](https://blogify-ten-pearl.vercel.app/)

---

## 🚀 Features

- 🔐 **Role-Based Authentication** (Login / Signup / Logout)
- 👤 **User Roles** (Admin & User)
- 📝 **Blog CRUD** (Create, Read, Update, Delete)
- 📁 **Category CRUD** (Admin-only)
- 🔍 **Search Blogs** by Heading
- ⚡ **Caching** for Faster API Responses
- 🌥️ **Cloudinary** for Optimized Image Storage
- 📚 View:
  - All Blogs
  - My Blogs
  - Single Blog
  - Suggested Blogs
- 🔄 **Password Management**:
  - Change Password
  - Forgot Password with OTP on Contact Number
- 📬 **Contact Support**
- 🛡️ **Admin Dashboard**:
  - Manage Users
  - Manage Support Queries
  - Manage Roles

---

## 📁 Folder Structure
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
├── validators/
├── config/
├── uploads/
├── app.js
├── server.js
└── .env



---

## 🧪 Tech Stack

- **Frontend**: React.js, Redux, Redux Toolkit, Axios, Material UI
- **Backend**: Node.js, Express.js
- **Database**: MySQL (via Sequelize ORM)
- **Image Upload**: Cloudinary
- **Caching**: Node-cache / Redis
- **Authentication**: JWT + password hashing
- **Password Recovery**: OTP via Phone Number

---

## 📦 Backend API Endpoints

### 🔑 Auth Routes

| Method | Endpoint                 | Description                       |
|--------|--------------------------|-----------------------------------|
| POST   | `/api/register`          | Register a new user               |
| POST   | `/api/login`             | User login                        |
| POST   | `/api/logout`            | User logout                       |
| PUT    | `/api/password/change`   | Change current password           |
| GET    | `/api/user/me`           | Get current user profile          |
| PUT    | `/api/user`              | Update user profile               |
| DELETE | `/api/user/:id`          | Delete user (self or admin)       |

### 👤 User Routes

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | `/api/my-blog`        | Get blogs by logged-in user |
| GET    | `/api/view-blogs`     | View all public blogs    |
| GET    | `/api/view-blog/:id`  | View a single blog       |

### ✍️ Blog Routes

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| POST   | `/api/blogs`          | Create blog (with image) |
| PUT    | `/api/blog/:id`       | Update blog (with image) |
| DELETE | `/api/blog/:id`       | Delete a blog            |

### 🗂️ Category Routes (Admin Only)

| Method | Endpoint                       | Description                  |
|--------|--------------------------------|------------------------------|
| GET    | `/api/admin/category`          | Get all categories           |
| GET    | `/api/admin/category/:id`      | Get single category          |
| POST   | `/api/admin/category`          | Create new category          |
| PUT    | `/api/admin/category/:id`      | Update category              |
| DELETE | `/api/admin/category/:id`      | Delete category              |

### 🔁 Forgot Password

| Method | Endpoint                   | Description                      |
|--------|----------------------------|----------------------------------|
| POST   | `/api/genrate/otp`         | Generate OTP for verification    |
| POST   | `/api/verify/otp`          | Verify OTP                       |
| POST   | `/api/forget/password`     | Reset password using OTP         |

### 🛎️ Support

| Method | Endpoint               | Description                      |
|--------|------------------------|----------------------------------|
| POST   | `/api/contact`         | Submit a support request         |
| GET    | `/api/contact`         | Admin fetch all support queries  |
| GET    | `/api/contact/:id`     | Admin get a single support query |
| PATCH  | `/api/contact/:id`     | Admin update support status      |

### 👑 Admin User Controls

| Method | Endpoint           | Description          |
|--------|--------------------|----------------------|
| GET    | `/api/users`       | Get all users        |
| GET    | `/api/user/:id`    | Get single user      |
| PATCH  | `/api/user/:id`    | Update user role     |

---

## 🛠️ Setup Instructions

# Install dependencies
npm install

# Create a .env file and add your credentials

# Start server
npm run dev



🔐 Environment Variables

PORT=5001
MYSQL_DB_HOST=your_mysql_host
MYSQL_DB_USER=your_mysql_user
MYSQL_DB_PASSWORD=your_mysql_password
MYSQL_DB_NAME=your_mysql_db_name

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


📸 Blog Image Format - 

Images are stored in Cloudinary, each image is saved in the following JSON format:

{
  "publicId": "cloudinary-file-id",
  "publicUrl": "https://res.cloudinary.com/your-cloud-name/image/upload/..."
}
## 📷 Demo Screenshots

> 💬 Ui Interface  
> 🔐 Registration | Login| Logout | Profile | blog Post | Admin Dashbord| user query list | category list | Home Screen | Blog Screen | about Screen and other's
> For more visite website - 
![Screenshot (116)](https://github.com/user-attachments/assets/5d332bdc-c742-49b7-b0c2-d188c559a024)
![Screenshot (115)](https://github.com/user-attachments/assets/78979966-ac02-4257-bff3-62a99b9f1622)
![Screenshot (113)](https://github.com/user-attachments/assets/37f65110-1924-4385-a04b-bc5f992df860)
![Screenshot (112)](https://github.com/user-attachments/assets/8d9440ec-0272-43ec-b94e-985c4e24d152)
![Screenshot (111)](https://github.com/user-attachments/assets/53cdbc24-b730-4a1b-a903-2d43f19f634d)
![Screenshot (110)](https://github.com/user-attachments/assets/0ebae102-4366-4e7a-bdd1-3f59f5da8531)
![Screenshot (109)](https://github.com/user-attachments/assets/82c14202-f5dc-438a-9c2a-36bd4b0962c0)
![Screenshot (108)](https://github.com/user-attachments/assets/676b4775-a70b-4d25-9798-41dd2bf4c0cf)
![Screenshot (107)](https://github.com/user-attachments/assets/d9362f19-8d1e-4f30-917e-97e520cdf781)
![Screenshot (105)](https://github.com/user-attachments/assets/a0c5aad2-1b8d-4684-a18b-a6790c0eec0f)
![Screenshot (104)](https://github.com/user-attachments/assets/8e6ae3df-8886-4c2c-ac74-90785fdf2ec8)
![Screenshot (102)](https://github.com/user-attachments/assets/3d1c0257-8801-42a2-8b11-4eafe6a012cf)



> Built by : Ritik Dubey  
> <a href="https://www.ritik.top" target="_blank">Website</a> | <a href="https://github.com/Hritik-22" target="_blank">GitHub</a> |<a href="https://www.linkedin.com/in/theritikdubey" target="_blank">Linked in </a>
