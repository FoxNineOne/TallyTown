# TallyTown

> A simple loyalty and local discovery platform connecting customers with independent businesses.

TallyTown is a full-stack web application currently under development.

The idea is to create a simple, image-focused platform where customers can discover local businesses, follow their favourites, and collect digital loyalty stamps. Businesses can publish updates and manage customer loyalty campaigns through a dedicated staff interface.

The project is also being used as a practical way to develop my skills in **React, TypeScript, Node.js, Express, MongoDB and AWS** while building something from the ground up.

---

## 🚧 Project Status

**Currently in active development.**

The customer-facing side of the application is currently being developed, with the digital loyalty-card experience forming the core of the current prototype.

### Currently working

* React frontend writtein in TypeScript
* Vite development environment
* Customer login flow
* Customer loyalty progress page
* Retrieving loyalty campaign progress from the backend API
* Digital loyalty cards
* Stamp progress and completed campaigns
* Redeemed loyalty cards
* Merchant information associated with campaigns
* Development/mock data for testing different loyalty states
* Node.js / Express backend
* MongoDB database using Mongoose

### In development

* Merchant/staff interface
* QR-code based customer stamping
* Campaign selection for staff
* Customer campaign-progress creation
* Authentication and user permissions
* Merchant profiles
* Business images and information
* Opening hours and location information
* Customer discovery/search
* Nearby business discovery
* Merchant updates
* Following/favouriting businesses

---

## 🎯 Project Goals

TallyTown is designed around a deliberately simple concept:

**Customers discover businesses → collect stamps → complete loyalty campaigns → redeem rewards.**

The customer experience is intended to be more visual than text-heavy, with businesses represented through images, cards and simple interactions.

Unlike a traditional social network, customers do not create posts or comments. Instead, businesses are the source of updates and content.

### Customer experience

Customers will eventually be able to:

* Discover TallyTown businesses
* Search for businesses
* Find nearby businesses
* See which businesses are currently open
* View merchant information
* Follow or favourite businesses
* View merchant updates
* Collect digital loyalty stamps
* Track active loyalty campaigns
* View completed campaigns
* View redeemed loyalty rewards

### Merchant experience

Merchant staff will eventually be able to:

* Select a loyalty campaign
* Scan a customer's QR code
* Add a loyalty stamp
* Automatically create a customer's campaign progress when required
* Manage their campaigns
* Publish business updates

The intention is for the staff workflow to be deliberately quick and simple:

```text
Select campaign
      ↓
Scan customer QR code
      ↓
Backend checks campaign progress
      ↓
Create or update loyalty card
      ↓
Add stamp
```

---

## 🏗️ Current Architecture

TallyTown is being developed as a full-stack JavaScript/TypeScript application.

```text
┌─────────────────────┐
│     React / Vite    │
│     TypeScript      │
└──────────┬──────────┘
           │
           │ HTTP / REST API
           ▼
┌─────────────────────┐
│   Node.js / Express │
│       Backend       │
└──────────┬──────────┘
           │
           │ Mongoose
           ▼
┌─────────────────────┐
│       MongoDB       │
└─────────────────────┘
```

The frontend communicates with the backend through REST API endpoints.

For example, the customer loyalty page retrieves campaign progress through an endpoint similar to:

```http
GET /api/v1/campaignprogress/user/:userId
```

The backend uses Mongoose models to manage MongoDB documents.

---

## 🛠️ Technology Stack

### Frontend

* React
* TypeScript
* Vite
* React Router
* CSS

### Backend

* Node.js
* Express
* TypeScript
* REST API

### Database

* MongoDB
* Mongoose

### Development

* Git / GitHub
* ESLint
* Development seed/mock data

---

## 💳 Loyalty System

The core of TallyTown is the digital loyalty card.

A campaign contains a required number of stamps. A customer receives stamps as they make qualifying purchases at the merchant.

A simplified campaign-progress record contains information such as:

```text
Campaign
Merchant
User
Required stamps
Completed stamps
Stamp records
Redeemed
Redeemed at
Redeemed by
```

This allows the application to distinguish between:

* An active loyalty card
* A partially completed campaign
* A completed campaign
* A redeemed campaign

The current frontend prototype supports displaying these different states visually.

---

## 🖥️ Development

The project currently contains development data and mock scenarios to make it easier to test the customer experience.

These are intentionally part of the development workflow at this stage and are not intended to represent the eventual production data flow.

The project is being developed incrementally, with the frontend and backend being built alongside each other rather than attempting to implement the entire platform at once.

---

## 🚀 Getting Started

### Prerequisites

You will need:

* Node.js
* npm
* MongoDB
* Git

### Clone the repository

```bash
git clone <repository-url>
cd TallyTown
```

### Install dependencies

Install the dependencies for the relevant application directories:

```bash
npm install
```

If the frontend and backend are maintained as separate applications, install their dependencies within each directory.

### Environment variables

Create the required environment configuration for the backend.

For example:

```env
MONGODB_URI=your_mongodb_connection_string
```

> The exact environment variables required may change as authentication and deployment are implemented.

### Run the application

Start the backend and frontend development servers using the project's configured npm scripts.

The application can then be accessed through the local Vite development server.

---

## 🗺️ Roadmap

TallyTown is being built incrementally.

### Customer platform

* [x] Customer login prototype
* [x] Loyalty progress API
* [x] Loyalty card prototype
* [x] Stamp progress display
* [x] Completed campaign state
* [x] Redeemed campaign state
* [ ] Merchant discovery
* [ ] Search
* [ ] Nearby businesses
* [ ] Business profiles
* [ ] Favourites/following
* [ ] Merchant updates

### Merchant platform

* [ ] Merchant/staff login
* [ ] Campaign selection
* [ ] Customer QR scanning
* [ ] Stamp customers
* [ ] Campaign management
* [ ] Merchant updates

### Platform

* [ ] Authentication
* [ ] Role-based permissions
* [ ] Production data flow
* [ ] Image storage
* [ ] Deployment
* [ ] Production security


---

## 📚 Why I'm Building TallyTown

TallyTown started as a way to build a complete application rather than isolated tutorials and small coding exercises.

The project gives me an opportunity to work across the full stack, including:

* Designing a relational-style data model in MongoDB
* Building REST APIs
* Connecting a React frontend to a backend
* TypeScript
* Managing application state
* Designing user interfaces
* Handling authentication and permissions
* Working with geospatial business data
* Exploring cloud deployment and AWS
* Structuring a larger application as it grows

The goal is not just to build a loyalty app, but to use the project to understand how the different parts of a modern web application fit together.

---

## 📌 Current Focus

The immediate focus is on completing the core customer loyalty experience before expanding the application into the merchant/staff side.

The next major workflow is the merchant stamping process:

```text
Merchant staff
     │
     ▼
Select campaign
     │
     ▼
Scan customer QR code
     │
     ▼
Backend finds existing campaign progress
     │
     ├── Exists ──► Add stamp
     │
     └── Doesn't exist
              │
              ▼
       Create campaign progress
              │
              ▼
          Add stamp
```

This will establish the basic end-to-end loyalty workflow before additional discovery and merchant features are added.

---

## 📄 License

This project is currently a personal development project.

License information will be added when the project is ready for wider distribution.
