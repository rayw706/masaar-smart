Masaar Smart — مسار
Riyadh Intelligent Mobility Platform

---

Why I Built This

Riyadh is one of the fastest-growing cities in the world. Anyone who has driven on King Fahd Road at 8am or tried to find parking near Tahlia Street on a Thursday night knows the problem firsthand. Traffic is not just an inconvenience — it costs time, fuel, money, and mental energy at city scale.

I built Masaar Smart as my attempt to answer a simple question: what would it look like if a city's mobility data was actually useful to the people living in it?

This is a React-based intelligent mobility dashboard for Riyadh that brings together traffic prediction, metro network status, EV charging availability, and smart route optimization — all in one place, designed to be readable by a commuter, not just a data scientist.

---

What It Does

Live Traffic Dashboard
A real-time overview of congestion levels, average city speed, active incidents, and EV charger availability across Riyadh. The dashboard updates based on time of day and surfaces the data that actually matters at a glance.

Traffic Congestion Prediction
Hourly forecasts showing congestion percentage, average speed, and incident count across the day. District-level breakdowns show which neighborhoods are moving and which are gridlocked — with color-coded risk levels so you know immediately where to avoid.

Riyadh Metro Network
All six metro lines with operational status, station counts, and line lengths. A side-by-side comparison shows how much time metro travel saves versus driving on the same routes — the numbers are often surprising.

EV Charging Stations
Live availability across six major charging stations in Riyadh, from KAFD to the East Ring Road. Each station shows charger type, current availability, and a visual availability bar. As EV adoption accelerates under Vision 2030, this kind of real-time awareness becomes critical infrastructure.

Smart Route Optimizer
Select a starting point and destination and get three route options: Fastest, Recommended, and Eco. Each option shows travel time, distance, transport mode, and current traffic conditions. The system recommends metro or bus alternatives when road congestion is high — not because it is forced to, but because the data supports it.

---

Tech Stack

Frontend: React 18
Charts and Visualization: Recharts
Styling: Custom CSS with CSS variables
Data: Synthetic dataset modeled on real Riyadh infrastructure
Deployment: GitHub Pages / Vercel

---

Vision 2030 Alignment

This project directly addresses three pillars of Saudi Vision 2030:

Smart Cities — Riyadh and NEOM are investing heavily in intelligent infrastructure. Masaar Smart models what citizen-facing mobility intelligence could look like.

Sustainability — The EV charging dashboard and eco route recommendations support the Kingdom's push toward clean transportation.

Quality of Life — Reducing commute friction is one of the highest-leverage improvements to daily life in any growing city.

HUMAIN and SDAIA have both identified autonomous mobility and smart infrastructure as priority sectors. This project is my hands-on contribution to understanding that space.

---

Running Locally

git clone https://github.com/rayw706/masaar-smart.git
cd masaar-smart
npm install
npm start

Open http://localhost:3000 in your browser.

---

What I Would Build Next

Integration with Riyadh's live traffic API when available
Actual GPS-based route suggestions using OpenStreetMap
Predictive ML model trained on historical Riyadh congestion patterns
Arabic language toggle with full RTL support
Mobile-responsive redesign for on-the-go use

---

About

Built by Raghad Saleem Almutairi — AI track, Al Majmaah University.

This project is part of a portfolio of AI and data projects built to solve real problems in the Saudi context. If you are working on smart city infrastructure, mobility, or Vision 2030 initiatives and want to connect, reach out on LinkedIn: linkedin.com/in/raghad-almut7airi-a3693b410

Masaar means route or path in Arabic.