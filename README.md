# Petshop Management

## Description

**Petshop Management** is a web-based management system designed to streamline the daily operations of a pet shop. This application helps pet shop owners manage customer data, pet information, inventory, and service booking schedules.

## Technologies Used

This project is built with the following technologies:

* **Framework:** Next.js
* **Library:** React
* **Programming Language:** TypeScript
* **Database:** Firebase Firestore (for storing customer, animal, inventory, and booking data)
* **Authentication:** Firebase Auth (for user login)
* **Design & UI:**
    * Tailwind CSS
    * Shadcn UI (components such as Card, Button, Input, Table, Dialog, Select, Popover, Calendar, and Sidebar)
    * `clsx` and `tailwind-merge` for class utilities
    * `lucide-react` for icons
* **Others:**
    * `next/font` for optimizing the Geist font
    * Next.js Middleware for protecting dashboard routes

## Key Features

The system offers several key features to assist with pet shop management:

* **Customer Management:** Add, view, and delete customer data including name, gender, address, and contact information.
* **Animal Management:** Add, view, and delete registered pet data, including their name, species, breed, gender, age, and owner.
* **Inventory Management:** Add, view, and delete inventory stock data, such as item name, category, quantity, and price.
* **Booking Management:** Schedule, view, and delete bookings for various services like grooming, boarding, and health check-ups.
* **Authentication System:** A login feature ensures that only authorized users can access the management dashboard.

## Setup Instructions

To run this project on your local machine, follow these steps:

1.  Make sure you have Node.js and a package manager like npm (or Yarn/pnpm/Bun) installed.
2.  Clone this project repository.
3.  Install all the required dependencies:

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

4.  Set Up Firebase
    * Create a new project in the Firebase Console.
    * Enable **Firestore** and **Authentication**.
    * In the Authentication section, enable the **Email/Password** sign-in method.
    * Add a web app to your project and copy the Firebase configuration.
    * Create a `.env.local` file in the project's root directory.
    * Add your Firebase configuration to the `.env.local` file using the following format:
    ```
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    ```
    * After that, you need to create a user account through the Firebase Authentication Console to be able to log into the application.

5.  Run the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

6.  Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## AI Support

During the development of this project, AI was used as an assistant to accelerate and improve the quality of the process, including:

* **Technology Integration**: Helping to streamline the integration between Next.js and Firebase.
* **Logic Development**: Assisting in handling the logic of several key functions, such as CRUD operations on Firestore data.
* **Debugging**: Analyzing and helping to fix errors in the code.
* **Code Refactoring**: Converting code from JavaScript to TypeScript to improve type safety and maintainability.
* **Documentation**: Helping to structure and create this project documentation.

## Active Account

**Account 1**
* Email : admin1@gmail.com
* Password : admin1234
**Account 2**
* Email admin2@gmail.com
* Password : admin4567
**Account 3**
* Email : admin3@gmail.com
* Password : admin1357