# 🏥 Role-Based Hospital Appointment Management System

A full-stack Hospital Appointment Management System built using React.js, Spring Boot, Java, JWT Authentication, and MySQL.  

This application allows patients to book appointments based on doctor availability while providing secure role-based access for Admins, Doctors, and Patients.

---

# 🚀 Features

## 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control
- Secure login & registration
- Protected frontend routes
- Persistent login using JWT

---

## 👨‍⚕️ Patient Features
- Register/Login
- View available doctors
- Search and filter doctors
- Book appointments
- View booked appointments
- Cancel appointments

---

## 🩺 Doctor Features
- Login securely
- View scheduled appointments
- Update availability status

---

## 🛠️ Admin Features
- Manage doctors
- View all appointments
- Role-based dashboard access

---

# 🏗️ Tech Stack

## Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Context API

## Backend
- Spring Boot
- Java
- Spring Security
- JWT Authentication
- REST APIs

## Database
- MySQL

---

# 📂 Project Structure

## Backend Structure

```bash
hospital-backend/
 ├── controller/
 ├── service/
 ├── repository/
 ├── entity/
 ├── security/
 ├── dto/
 └── config/
#frontend

hospital-frontend/
 ├── src/
 │    ├── api/
 │    ├── components/
 │    ├── context/
 │    ├── layouts/
 │    ├── pages/
 │    ├── routes/
 │    ├── services/
 │    ├── utils/
 │    └── styles/

```



BACKEND SETUP
1️⃣ Clone Repository
git clone <repository-url>

2️⃣ Navigate to Backend Folder
cd hospital-backend

3️⃣ Configure MySQL Database

Create database in MySQL:
CREATE DATABASE hospital_db;

4️⃣ Configure application.properties

spring.datasource.url=jdbc:mysql://localhost:3306/hospital_db
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

5️⃣ Run Backend
mvn spring-boot:run

Backend runs on:
http://localhost:8080

FRONTEND SETUP
1️⃣ Navigate to Frontend Folder
cd hospital-frontend

2️⃣ Install Dependencies
npm install

3️⃣ Start Frontend
npm start
OR for Vite:
npm run dev
Frontend runs on:
http://localhost:3000



TESTING
Backend APIs were tested using:
Postman

Frontend tested for:
•Authentication
•Role-based routing
•Appointment booking
•Responsive UI



🎯 FUTURE ENHANCEMENTS
Email notifications
Video consultation
Payment gateway integration
Appointment reminders
Admin analytics dashboard
Docker deployment
Cloud hosting



👨‍💻 Author Bhanu Kandregula
GitHub: https://github.com/bhanukandregula2023
