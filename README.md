# 🌦️ Klimate – Real-Time Weather Dashboard

A modern weather forecasting web app that provides real-time weather data, hourly trends, and 5-day forecasts based on your location.  
Built using **React**, **Tailwind CSS**, and **OpenWeather API**.

---

<img width="1613" height="835" alt="image" src="https://github.com/user-attachments/assets/c8e0adfe-f485-4b1c-bc4a-f8754d040e47" />

---

## 🧠 Features

- 📍 **Auto-detects your current city** using Geolocation API  
- 🌡️ Displays **current temperature**, condition, humidity, pressure, visibility, and wind speed  
- 📊 Interactive **hourly temperature graph**  
- 📅 **5-day forecast** with detailed weather data  
- ⚙️ Error handling for invalid location or failed fetch  
- 🧭 Clean, responsive UI designed with **Tailwind CSS**

---

## 🛠️ Tech Stack

**Frontend:** React, Typescript, Tailwind CSS  
**API:** OpenWeather API  
**Data Visualization:** Chart.js 
**State Management:** React Hooks & Context API  

---

## ⚙️ Setup Instructions

```bash
# 1️⃣ Clone the repository
git clone https://github.com/devSharma14/Dynamic-Weather-App.git

# 2️⃣ Move into the project folder
cd Climate-App

# 3️⃣ Install dependencies
npm install

# 4️⃣ Add environment variables
# Create a .env file in the root folder and add:
VITE_WEATHER_API_KEY=your_openweather_api_key

# 5️⃣ Run the app
npm run dev
