# 🗺️ Local Guide Platform

[Live Demo]([https://your-live-url.com](https://meet-my-guide-frontend.vercel.app/))  
Client Live Deployment: https://meet-my-guide-frontend.vercel.app

Server Live Deployment: https://meetmyguide.onrender.com

Local Guide Platform connects travelers with passionate local experts who can offer authentic, personalized experiences. Travelers can explore hidden gems, cultural hotspots, and unique activities, while locals can monetize their knowledge and skills.

---

## Table of Contents

- [Project Overview](#project-overview)  
- [Core Features](#core-features)  
- [Technology Stack](#technology-stack)  
- [Setup & Usage](#setup--usage)  
- [Deployment](#deployment)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Project Overview

This platform empowers locals to share their city’s hidden gems and culture, while travelers can find guides that match their interests — from food tours to photography walks or historical tours. The platform ensures unique, off-the-beaten-path experiences with secure bookings and payments.

---

## Core Features (Main Points)

- **User Roles & Authentication**: JWT-based login/register for Tourists, Guides, and Admins.  
- **Profile Management**: View and update profile, including bio, languages, expertise, and preferences.  
- **Tour Listing Management**: Create, edit, and deactivate tour listings with title, itinerary, fee, duration, images, and meeting point.  
- **Search & Filter**: Explore tours by destination, language, category, and price.  
- **Booking System**: Request tours, accept/decline bookings, and track status (Pending, Confirmed, Completed, Cancelled).  
- **Reviews & Ratings**: Post-tour feedback to help travelers make informed decisions.  
- **Payment Integration**: Securely process payments using Stripe / SSLCommerz or other gateways.  
- **Responsive UI**: Built with **Next.js** and **Tailwind CSS** for seamless frontend experience.  

---

## Technology Stack

| Category       | Technologies                               |
|----------------|--------------------------------------------|
| Frontend       | Next.js, Tailwind CSS                       |
| Backend        | Node.js, Express.js, Mongoose     |
| Database       | MongoDB                        |
| Authentication | JWT                                         |
| Payment        | Stripe       |
| Deployment     | Vercel                 |
| Others         | Cloudinary, Other npm packages      |

---

## Setup & Usage

### Prerequisites
- Node.js  
- npm 
- MongoDB  
- Payment gateway credentials (optional)  

### Installation
```bash
git clone https://github.com/your-username/local-guide-platform.git
cd local-guide-platform
npm install
# or
yarn install
```
Setup .env file
```bash
NEXT_PUBLIC_BASE_API_URL=https://
NODE_ENV=development
SALT_ROUND=10
JWT_SECRET=your_jwt_secret_here
EXPIRES_IN=10h
REFRESH_TOKEN_SECRET=your_refresh_secret_here
REFRESH_TOKEN_EXPIRES_IN=7d
```
npm run dev
