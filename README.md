# **TheraConnect - AI-Powered Therapy Booking Platform**

## **Overview**
TheraConnect is a web application that allows clients to search for therapists, book video sessions, and make payments seamlessly. This project was developed using the MERN stack (MongoDB, Express, React, Node.js) with AI-powered enhancements.

---

## **AI Tools and APIs Used**
### **1. OpenAI API (Optional / Mock Data Used)**
- Initially planned for generating therapist profiles dynamically.
- Due to API key constraints, we used manually created mock therapist data.

### **2. Jitsi Meet API**
- Used to generate unique video session links for each booking.
- Ensures secure and seamless video conferencing between clients and therapists.

### **3. Stripe API**
- Integrated to handle payments securely.
- Clients can pay for their session via Stripe's checkout system.

---

## **Approach**
### **Step 1: Backend Setup**
- Initialized **Express.js server** and connected it to **MongoDB Atlas**.
- Created **Mongoose models** for therapists and bookings.
- Developed **REST API endpoints** for fetching therapists, making bookings, and processing payments.

### **Step 2: Frontend Development**
- Built the UI using **React and Bootstrap**.
- Implemented **search functionality** to filter therapists by specialty and availability.
- Designed a **booking system** with a modal form.

### **Step 3: Video Call & Payments Integration**
- Generated **Jitsi Meet video links** upon successful booking.
- Integrated **Stripe payments**, redirecting users to a checkout page.
- Displayed a **confirmation message** after successful payment.

### **Step 4: UI Enhancements**
- Implemented **Bootstrap styling, loading animations, and hover effects**.
- Added **success/error notifications** using `react-toastify`.
- Used **FontAwesome icons** for a more polished UI.

---

## **Shortcuts and Assumptions**
### **1. AI-Generated Data Was Replaced With Mock Data**
- Due to OpenAI API constraints, we manually created therapist profiles.

### **2. Simplified Authentication**
- No user authentication system was implemented due to time constraints.
- In a production environment, we would use **JWT authentication**.

### **3. Limited Payment Flow**
- The system assumes a **flat fee of $50 per session**.
- A more flexible approach would allow **custom pricing per therapist**.

### **4. Deployment Not Included**
- The app is currently running locally.
- Future steps include deploying the **backend on Render/Heroku** and the **frontend on Vercel/Netlify**.

---

## **How to Run the Project**
### **1. Clone the Repository**
```sh
git clone <repo-link>
cd TheraConnect

### **2. Backend Setup**
cd backend
npm install
npm run dev

### **3. Frontend Setup**

cd ../frontend
npm install
npm start

### **4. Testing Features**
-Open http://localhost:3000/ in your browser.
-Search for therapists and book a session.
-Proceed to payment and test with a Stripe test card (4242 4242 4242 4242).
-Join the video session via Jitsi Meet.
