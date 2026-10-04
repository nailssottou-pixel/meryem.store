# 👕 Clothing Store - Interactive E-Commerce Platform

A full-stack interactive clothing store with admin panel and shopping cart functionality.

## 🎯 Features

✅ **Customer View**
- Browse clothing products in an interactive grid
- Add items to shopping cart
- Adjust quantities
- Checkout and place orders
- Real-time stock updates

✅ **Admin Panel**
- Add new clothing products
- Edit product details (name, price, description, image, stock)
- Change product prices
- Delete products
- View all products in a management table
- Real-time inventory management

✅ **Backend API**
- RESTful API with Express.js
- MongoDB database for persistence
- Product CRUD operations
- Order processing with stock validation
- CORS enabled for frontend integration

✅ **Frontend**
- React.js with modern UI
- Responsive design (mobile-friendly)
- Real-time cart management
- Modal-based shopping cart
- Admin/Customer mode toggle

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Axios for API calls
- CSS3 with modern styling

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- CORS for cross-origin requests
- Dotenv for environment management

## 📁 Project Structure

```
├── server/
│   ├── server.js          # Express server & API routes
│   ├── package.json       # Backend dependencies
│   └── .env              # Environment variables (MongoDB URI)
│
├── client/
│   ├── src/
│   │   ├── App.js        # Main app component
│   │   ├── index.js      # React entry point
│   │   ├── index.css     # Global styles
│   │   └── components/
│   │       ├── ProductList.js   # Customer view
│   │       ├── AdminPanel.js    # Admin dashboard
│   │       └── Cart.js          # Shopping cart modal
│   ├── public/
│   │   └── index.html    # HTML template
│   └── package.json      # Frontend dependencies
│
├── DEPLOYMENT.md         # Deployment guide
├── README.md            # This file
├── .gitignore           # Git ignore file
└── Procfile             # Deployment configuration
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone/Download the project**
```bash
cd portfolio-site-qh93
```

2. **Install backend dependencies**
```bash
cd server
npm install
```

3. **Install frontend dependencies**
```bash
cd ../client
npm install
```

4. **Configure environment**

Create `server/.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/clothing-store
```

### Running Locally

**Terminal 1 - Start Backend:**
```bash
cd server
npm start
```
Backend runs on `http://localhost:5000`

**Terminal 2 - Start Frontend:**
```bash
cd client
npm start
```
Frontend opens on `http://localhost:3000`

## 📖 Usage

### Customer Mode
1. Browse products on the home page
2. Click "Add to Cart" for items you want
3. Click cart icon to view shopping cart
4. Adjust quantities or remove items
5. Click "Checkout" to place order
6. Stock updates automatically

### Admin Mode
1. Click "Admin" button in top-right
2. Fill in product form to add new clothing
3. View all products in the table below
4. Click "Edit" to modify existing products
5. Click "Delete" to remove products
6. Switch back to "Customer" mode to see changes

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Add new product (Admin) |
| PUT | `/api/products/:id` | Update product (Admin) |
| DELETE | `/api/products/:id` | Delete product (Admin) |
| POST | `/api/checkout` | Process order & reduce stock |

### Example: Add Product
```javascript
POST /api/products
{
  "name": "Blue Jeans",
  "description": "Classic blue denim",
  "price": 49.99,
  "image": "https://example.com/jeans.jpg",
  "stock": 100,
  "category": "men"
}
```

## 📦 Database Schema

**Product Document:**
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  image: String (URL),
  stock: Number,
  category: String,
  createdAt: Date
}
```

## 🌐 Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for complete deployment instructions.

**Quick Summary:**
1. Push code to GitHub
2. Deploy to Railway (auto-detect & build)
3. Add MongoDB database
4. Set environment variables
5. Get live URL - Done! 🎉

## 🔒 Security Notes

⚠️ **Important for Production:**
- Add authentication for admin panel (currently no password protection)
- Implement payment processing for real transactions
- Add request validation & sanitization
- Use environment variables for secrets
- Enable HTTPS/SSL
- Add rate limiting
- Implement order tracking & notifications

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Start MongoDB service or use MongoDB Atlas connection string

### CORS Error
Already configured in `server.js` with `app.use(cors())`

### Port Already in Use
Change PORT in `.env` or kill process using port 5000

### Frontend can't reach backend
Check proxy in `client/package.json` points to correct server URL

## 📈 Future Enhancements

- [ ] User authentication & signup
- [ ] Order history & tracking
- [ ] Product reviews & ratings
- [ ] Search & filter products
- [ ] Wishlist functionality
- [ ] Payment integration (Stripe)
- [ ] Email notifications
- [ ] Admin analytics dashboard
- [ ] Multiple image uploads
- [ ] Product variants (sizes, colors)

## 📝 License

This project is open source and available for personal use.

## 💬 Support

For deployment help, visit [Railway Documentation](https://docs.railway.app)

---

**Built with ❤️ by Copilot**

Happy selling! 🛍️
