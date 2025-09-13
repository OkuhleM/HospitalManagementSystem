# 🏥 Hospital Management System  

A full-stack **Hospital Management System (HMS)** designed to streamline patient care, staff coordination, billing, and reporting. Built with **React + Redux** (frontend) and **Node.js + Express + MySQL + Sequelize** (backend).  

---

## ✨ Features  
### 👩‍⚕️ Core Modules  
- **User Roles**: Admin, Doctor, Nurse, Matron, Receptionist  
- **Patient Management**: Registration, medical history, demographics  
- **Doctor & Nurse Management**: Assignments, schedules, wards  
- **Reception Management**: Current & historical receptionist logs  
- **Prescriptions**: Link doctors, patients, and medications  
- **Invoices & Payments**: Track billing, outstanding balances  
- **Insurance Claims**: Submit and manage claims  
- **Reports & Analytics**:  
  - Daily revenue  
  - Outstanding balances  
  - Top prescribed medications  
  - Patient demographics  

### 🛡 Technical  
- Token-based authentication & role-based access control  
- Sequelize ORM with MySQL database  
- API validation with Joi  
- Soft deletes (`deletedAt` with paranoid mode)  
- Unit & integration tests (Jest + Supertest)  

---

## 🏗 Tech Stack  
**Frontend**: React, Redux Toolkit, React Router, TailwindCSS  
**Backend**: Node.js, Express.js, Sequelize, MySQL  
**Testing**: Jest, Supertest  
**Other**: Axios, JWT, Bcrypt  

---

## ⚙️ Installation  

### 1. Clone the repo  
```bash
git clone https://github.com/your-username/hospital-management-system.git
cd hospital-management-system
```

### 2. Backend Setup  
```bash
cd Backend
npm install
```

Create a `.env` file:  
```env
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=hospital_db
JWT_SECRET=your_secret
PORT=5000
```

Run migrations/seeders (if using Sequelize CLI):  
```bash
npx sequelize db:migrate
```

Start the backend:  
```bash
npm run dev
```

### 3. Frontend Setup  
```bash
cd Client
npm install
npm run dev
```

---

## 📡 API Endpoints (Sample)  
- `POST /auth/login` → User login  
- `GET /patients` → Get all patients  
- `POST /prescriptions` → Create prescription (Doctor/Nurse only)  
- `POST /invoices` → Create invoice  
- `POST /payments` → Record payment  
- `GET /reports/revenue` → Daily revenue  

---

## 📊 Future Improvements  
- Appointment & scheduling module  
- Lab tests & results  
- Inventory & pharmacy stock management  
- File uploads (e.g., patient scans, reports)  
- Dockerization for easy deployment  

---

## 🤝 Contributing  
Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.  

---

## 📜 License  
MIT License  
