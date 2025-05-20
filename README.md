# 🛍️ React + Vite E-Commerce App

This is a modern **E-Commerce Single Page Application** built with **React**, **Vite**, and **Redux Toolkit**. The app supports advanced features such as language switching, dynamic cart handling, responsive layout, and more.

---

## 📦 Tech Stack

- ⚛️ React + Vite
- 🧠 Redux Toolkit (with slices)
- 🌐 React Router DOM
- 📦 Context API
- 🎨 CSS + Bootstrap
- ⚙️ Code Splitting with React Lazy/Suspense
- 🔁 Hooks: `useState`, `useEffect`, `useSelector`, `useDispatch`, `useContext`

---

## 🚀 Features

- 🛒 Add to Cart with quantity and total price
- 🧭 Routing: product details, cart, auth, 404
- 🌍 Language switcher (EN/AR) with LTR/RTL layout
- 🖼️ Product Cards with image, name, price
- 🛍️ Cart page with:
  - Quantity control
  - Unit/Total price
  - Remove item
- 🔐 Register & Login with validation
- 📦 Code splitting
- ⚠️ 404 NotFound page
- 💬 Global language state using Context
- 🎨 Responsive design with Bootstrap

---

## 📁 Pages

| Page              | Description                                     |
|-------------------|-------------------------------------------------|
| `ProductList`     | Displays all available products                 |
| `ProductDetails`  | Product info + add to cart                      |
| `ProductCard`     | Reusable UI for individual product              |
| `Cart`            | View/update cart                                |
| `Register`        | New user registration                          |
| `Login`           | User login page                                |
| `NotFound`        | 404 fallback                                   |

---

## 🛠️ Installation & Running

```bash
git clone https://github.com/yourusername/react-ecommerce-app
cd react-ecommerce-app
npm install
npm run dev


🌍 Language Support
🌐 Language dropdown in navbar

ar = RTL layout

en = LTR layout

Language state stored in Context API