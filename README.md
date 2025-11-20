# GoMarket – Full-Stack eCommerce Platform

**GoMarket** is a full-featured eCommerce platform built with **Next.js**. It provides customers with a smooth shopping experience — from browsing products to secure checkout — and gives administrators full control over product, user, and order management.

## Features

- **Product Catalog**: Dynamic product listings with category and search filters.
- **Product Details**: Individual product pages with descriptions, pricing, and stock info.
- **Shopping Cart**: Add, remove, and update product quantities in real time.
- **Checkout Flow**: Secure checkout and order summary pages.
- **User Authentication**: Register, log in, and manage profiles using NextAuth + bcrypt.
- **Admin Dashboard**: Manage products, categories, and orders from a secure panel.
- **Optimized Rendering**: Server-side rendering (SSR) and static generation for speed and SEO.
- **Responsive Design**: Fully mobile-friendly UI built with TailwindCSS and Shadcn/UI.

## Technologies Used

The technologies employed in the development of GoMarket are as follows:

- JavaScript
- React/Next.js
- MongoDB + Mongoose
- TailwindCSS + Shadcn/UI
- NextAuth (Credentials Provider + bcrypt)
- Stripe Checkout

## Getting Started

To get started with GoMarket, please follow the instructions below.

## Installation

1. Clone the repository: `git clone https://github.com/CDTREVINO1/GoMarket.git`
2. Change into the project directory: `cd gomarket`
3. Install the dependencies: `npm install`

## Configuration

Create a `.env.local` file in the root of the project and add the following environment variables:

```bash
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_public_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL=your_next_public_cloudinary_upload_url
NEXT_PUBLIC_CLOUDINARY_DESTROY_URL=your_next_public_cloudinary_destroy_url
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_next_public_cloudinary_cloud_name
NEXT_PUBLIC_CLOUDINARY_KEY=your_next_public_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
```

## Usage

To start the development server, run the following command:

```
npm run dev
```

This will compile the TypeScript code, bundle the React components, and start the server. You can access the GoMarket application in your browser at `http://localhost:3000`.

## License

GoMarket is released under the [MIT License](https://opensource.org/licenses/MIT).
