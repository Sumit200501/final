"use client";

import Image from "next/image";


import { useState, useEffect, useRef } from "react";

export default function Home() {
  // Admin panel state
  const [showSignIn, setShowSignIn] = useState(false);
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({ email: "", password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [profile, setProfile] = useState({ email: "", password: "" });
  const [showProfile, setShowProfile] = useState(false);
  const [admin, setAdmin] = useState({ email: "admin@example.com", password: "admin123" });

  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [search, setSearch] = useState("");
  const searchButtonRef = useRef(null);
  const [showSearchClicked, setShowSearchClicked] = useState(false);
  const [showAddMessage, setShowAddMessage] = useState(false);
  const [addedItemName, setAddedItemName] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderHistory, setOrderHistory] = useState([]);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [quickViewVeg, setQuickViewVeg] = useState(null);

  const addToCart = (veg) => {
    setCart((prev) => [...prev, veg]);
    setAddedItemName(veg.name);
    setShowAddMessage(true);
    setTimeout(() => setShowAddMessage(false), 1200);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const getTotal = () => cart.reduce((sum, item) => sum + item.price, 0);

  const handlePayment = () => {
    setPaymentSuccess(true);
    setShowPayment(false);
    setOrderHistory([
      ...orderHistory,
      { items: cart, total: getTotal(), date: new Date().toLocaleString() },
    ]);
    setCart([]);
    setTimeout(() => setPaymentSuccess(false), 2000);
  };

  // Featured vegetables data
  const featuredList = [
    {
      img: "/ridge-gourd.jpg",
      name: "Ridge Gourd (तुरई)",
      desc: "Low in calories, high in fiber, and great for digestion and skin health!",
    },
    {
      img: "/fenugreek-leaves.jpg",
      name: "Fenugreek Leaves (मेथी)",
      desc: "Rich in iron and vitamins, great for immunity and digestion!",
    },
    {
      img: "/carrot.jpeg",
      name: "Carrot (गाजर)",
      desc: "Excellent for eyesight, rich in beta-carotene and antioxidants!",
    },
    {
      img: "/spinach.jpeg",
      name: "Spinach (पालक)",
      desc: "Packed with iron and vitamins, supports strong bones and immunity!",
    },
    {
      img: "/tomato.jpeg",
      name: "Tomato (टमाटर)",
      desc: "Loaded with lycopene, good for heart health and skin!",
    },
  ];
  const [featuredIdx, setFeaturedIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedIdx((idx) => (idx + 1) % featuredList.length);
    }, 2000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, [featuredList.length]);

  // Admin panel handlers
  const handleSignIn = (e) => {
    e.preventDefault();
    if (signInData.email === admin.email && signInData.password === admin.password) {
      setIsAuthenticated(true);
      setProfile({ email: admin.email, password: admin.password });
      setMessage("");
    } else {
      setMessage("Invalid email or password.");
    }
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    if (!signUpData.email || !signUpData.password) {
      setMessage("Please fill all fields.");
    } else if (signUpData.password !== signUpData.confirmPassword) {
      setMessage("Passwords do not match.");
    } else {
      setAdmin({ email: signUpData.email, password: signUpData.password });
      setMessage("Account created for " + signUpData.email);
      setShowSignIn(true); // Switch to sign in after sign up
    }
  };
  const handleForgot = (e) => {
    e.preventDefault();
    if (forgotEmail === admin.email) {
      setMessage("Password reset link sent to " + forgotEmail + " (demo only)");
    } else {
      setMessage("Email not found.");
    }
  };
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    if (!profile.email || !profile.password) {
      setMessage("Please fill all fields.");
      return;
    }
    setAdmin({ email: profile.email, password: profile.password });
    setMessage("Profile updated.");
  };

  // If not authenticated, show admin panel
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">Admin Panel</h1>
          <div className="flex justify-center mb-6 gap-4">
            <button
              className={`px-6 py-2 rounded-lg font-semibold transition text-lg ${showSignIn && !showForgot ? 'bg-green-700 text-white' : 'bg-green-100 text-green-800'}`}
              onClick={() => { setShowSignIn(true); setShowForgot(false); setMessage(""); }}
            >
              Sign In
            </button>
            <button
              className={`px-6 py-2 rounded-lg font-semibold transition text-lg ${!showSignIn && !showForgot ? 'bg-green-700 text-white' : 'bg-green-100 text-green-800'}`}
              onClick={() => { setShowSignIn(false); setShowForgot(false); setMessage(""); }}
            >
              Sign Up
            </button>
          </div>
          {showForgot ? (
            <form onSubmit={handleForgot} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-green-900 placeholder:text-green-700 bg-green-50"
                value={forgotEmail}
                onChange={e => setForgotEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-green-700 text-white py-2 rounded-lg font-bold hover:bg-green-800 transition"
              >
                Send Reset Link
              </button>
              <button
                type="button"
                className="text-green-700 underline mt-2"
                onClick={() => { setShowForgot(false); setShowSignIn(true); setMessage(""); }}
              >
                Back to Sign In
              </button>
            </form>
          ) : showSignIn ? (
            <form onSubmit={handleSignIn} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-green-900 placeholder:text-green-700 bg-green-50"
                value={signInData.email}
                onChange={e => setSignInData({ ...signInData, email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-green-900 placeholder:text-green-700 bg-green-50"
                value={signInData.password}
                onChange={e => setSignInData({ ...signInData, password: e.target.value })}
                required
              />
              <button
                type="submit"
                className="bg-green-700 text-white py-2 rounded-lg font-bold hover:bg-green-800 transition"
              >
                Sign In
              </button>
              <button
                type="button"
                className="text-green-700 underline mt-2"
                onClick={() => { setShowForgot(true); setShowSignIn(false); setMessage(""); }}
              >
                Forgot Password?
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignUp} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-green-900 placeholder:text-green-700 bg-green-50"
                value={signUpData.email}
                onChange={e => setSignUpData({ ...signUpData, email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-green-900 placeholder:text-green-700 bg-green-50"
                value={signUpData.password}
                onChange={e => setSignUpData({ ...signUpData, password: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-green-900 placeholder:text-green-700 bg-green-50"
                value={signUpData.confirmPassword}
                onChange={e => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                required
              />
              <button
                type="submit"
                className="bg-green-700 text-white py-2 rounded-lg font-bold hover:bg-green-800 transition"
              >
                Sign Up
              </button>
            </form>
          )}
          {message && <div className="mt-4 text-center text-green-700 font-semibold">{message}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-between p-8 mt-12 ${darkMode ? 'bg-gray-900 text-white' : 'bg-green-50'}`}>
      {/* Dark Mode Toggle */}
      <button
        className="fixed top-4 right-4 z-50 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-2 rounded shadow hover:bg-gray-300 dark:hover:bg-gray-700 transition"
        onClick={() => setDarkMode((d) => !d)}
      >
        {darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>
      {/* Payment Success Message */}
      {paymentSuccess && (
        <div className="fixed top-28 left-1/2 transform -translate-x-1/2 z-50 bg-green-700 text-white px-6 py-2 rounded shadow-lg text-lg font-semibold animate-bounce">
          Payment successful! Thank you for your order.
        </div>
      )}
      {/* Order History Modal */}
      {showOrderHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white text-green-900 rounded-xl shadow-lg p-8 w-full max-w-lg relative">
            <button className="absolute top-2 right-2 text-2xl" onClick={() => setShowOrderHistory(false)}>✖️</button>
            <h2 className="text-2xl font-bold mb-4">Order History</h2>
            {orderHistory.length === 0 ? (
              <p>No orders yet.</p>
            ) : (
              <ul className="space-y-4 max-h-80 overflow-y-auto">
                {orderHistory.map((order, idx) => (
                  <li key={idx} className="border-b pb-2">
                    <div className="font-semibold">Order on {order.date}</div>
                    <ul className="text-sm ml-2">
                      {order.items.map((item, i) => (
                        <li key={i}>{item.name} - ₹{item.price}</li>
                      ))}
                    </ul>
                    <div className="font-bold mt-1">Total: ₹{order.total}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
      {/* Quick View Modal */}
      {quickViewVeg && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white text-green-900 rounded-xl shadow-lg p-8 w-full max-w-md relative">
            <button className="absolute top-2 right-2 text-2xl" onClick={() => setQuickViewVeg(null)}>✖️</button>
            <Image
              src={quickViewVeg.img}
              alt={quickViewVeg.name}
              width={256}
              height={256}
              className="w-64 h-64 object-cover rounded mb-4 mx-auto"
            />
            <h2 className="text-2xl font-bold mb-2">{quickViewVeg.name}</h2>
            <p className="mb-2">Price: ₹{quickViewVeg.price} / kg</p>
            <button className="bg-green-700 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-800 transition" onClick={() => { addToCart(quickViewVeg); setQuickViewVeg(null); }}>Add to Cart</button>
          </div>
        </div>
      )}
      <header className="w-full max-w-4xl mx-auto flex flex-col items-center gap-4 py-6">
        {/* Show add-to-cart message */}
        {showAddMessage && (
          <div className="fixed top-28 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-2 rounded shadow-lg text-lg font-semibold animate-bounce">
            {addedItemName} added to cart!
          </div>
        )}
        <Image src="/next.svg" alt="Next.js logo" width={120} height={30} />
        <h1 className="text-4xl font-bold text-green-800">Jay Maa Vegetable Shop</h1>
        <p className="text-lg text-green-700">
          Your one-stop shop for fresh vegetables delivered to your door!
        </p>
        {/* Daily Deal Banner */}
        <div className="w-full bg-pink-100 text-pink-900 rounded-lg p-2 text-center font-semibold mt-2 animate-bounce">
          🌟 Today&apos;s Deal: Get 10% off on all leafy greens! Use code{' '}
          <span className="font-bold">FRESH10</span>
        </div>
        {/* Search Bar */}
        <div className="w-full flex justify-center mt-4">
          <input
            type="text"
            placeholder="Search vegetable..."
            className="w-full max-w-xs px-3 py-2 border border-green-300 rounded-l focus:outline-none placeholder:font-bold placeholder:text-green-900"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (searchButtonRef.current) searchButtonRef.current.focus();
              }
            }}
          />
          <button
            ref={searchButtonRef}
            className={`px-4 py-2 bg-green-700 text-white rounded-r hover:bg-green-800 transition flex items-center justify-center focus:ring-4 focus:ring-green-400 ${search ? 'ring-4 ring-green-400' : ''}`}
            onClick={() => {
              if (searchButtonRef.current) searchButtonRef.current.focus();
              // Show a quick visual feedback for click
              setShowSearchClicked(true);
              setTimeout(() => setShowSearchClicked(false), 400);
            }}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
              className="w-5 h-5"
            >
              <path d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
          </button>
        </div>
        <div className="mt-2 text-green-900 font-semibold flex items-center gap-4">
          Cart: {cart.length} item{cart.length !== 1 ? "s" : ""}
          <button
            className="ml-2 px-3 py-1 bg-green-700 text-white rounded hover:bg-green-800 transition text-sm"
            onClick={() => setShowCart((s) => !s)}
          >
            {showCart ? "Hide Cart" : "View Cart"}
          </button>
          <button
            className="ml-2 px-3 py-1 bg-blue-700 text-white rounded hover:bg-blue-800 transition text-sm"
            onClick={() => setShowOrderHistory(true)}
          >
            Order History
          </button>
        </div>
      </header>
      {/* Featured Section */}
      <section className="w-full max-w-4xl mx-auto mt-4 mb-2">
        <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 rounded shadow flex items-center gap-4 transition-all duration-500">
          <Image
            src={featuredList[featuredIdx].img}
            alt={featuredList[featuredIdx].name}
            width={60}
            height={60}
            className="rounded"
          />
          <div>
            <h3 className="font-bold text-yellow-800">
              Featured: {featuredList[featuredIdx].name}
            </h3>
            <p className="text-yellow-700 text-sm">
              {featuredList[featuredIdx].desc}
            </p>
          </div>
        </div>
      </section>
      {/* Payment Page */}
      {showPayment && (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow p-6 mb-8 z-40 border-4 border-green-700">
          <h2 className="text-3xl font-extrabold mb-4 text-green-800 text-center">Payment</h2>
          <p className="mb-4 text-green-800 text-lg font-bold text-center">Total Amount: <span className="font-extrabold text-green-900">₹{getTotal()}</span></p>
          <div className="mb-4">
            <label className="block mb-2 font-bold text-green-900 text-lg">Select Payment Method</label>
            <div className="flex flex-wrap gap-4 mb-4 justify-center">
              <label className="flex items-center gap-2 text-green-800 font-semibold">
                <input type="radio" name="paymentMethod" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                <span>Credit/Debit Card</span>
              </label>
              <label className="flex items-center gap-2 text-green-800 font-semibold">
                <input type="radio" name="paymentMethod" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} />
                <span>UPI</span>
              </label>
              <label className="flex items-center gap-2 text-green-800 font-semibold">
                <input type="radio" name="paymentMethod" value="netbanking" checked={paymentMethod === 'netbanking'} onChange={() => setPaymentMethod('netbanking')} />
                <span>Net Banking</span>
              </label>
              <label className="flex items-center gap-2 text-green-800 font-semibold">
                <input type="radio" name="paymentMethod" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                <span>Cash on Delivery</span>
              </label>
            </div>
            {/* Card Details */}
            {paymentMethod === 'card' && (
              <div className="mb-4">
                <label className="block mb-1 font-semibold text-green-900">Card Number</label>
                <input type="text" className="w-full border px-3 py-2 rounded mb-2" placeholder="1234 5678 9012 3456" maxLength={19} />
                <label className="block mb-1 font-semibold text-green-900">Expiry</label>
                <input type="text" className="w-1/2 border px-3 py-2 rounded mb-2" placeholder="MM/YY" maxLength={5} />
                <label className="block mb-1 font-semibold text-green-900">CVV</label>
                <input type="password" className="w-1/3 border px-3 py-2 rounded mb-4" placeholder="123" maxLength={3} />
              </div>
            )}
            {/* UPI Details */}
            {paymentMethod === 'upi' && (
              <div className="mb-4 flex flex-col items-center">
                <label className="block mb-1 font-semibold text-green-900">UPI ID</label>
                <input type="text" className="w-full border px-3 py-2 rounded mb-2" placeholder="yourname@upi" />
                {/* UPI QR Code - dynamic and personal */}
                <div className="mt-2 flex flex-col items-center">
                  <span className="text-green-800 font-semibold mb-1">Or scan to pay:</span>
                  <Image
                    src="/payment qr.jpg"
                    alt="Personal UPI QR Code"
                    width={280}
                    height={280}
                    className="rounded shadow border border-green-200"
                    style={{ maxWidth: '90vw', maxHeight: '90vw', objectFit: 'contain' }}
                  />
                  <span className="text-green-700 text-xs mt-2">Scan this QR with any UPI app to pay directly</span>
                </div>
              </div>
            )}
            {/* Net Banking Details */}
            {paymentMethod === 'netbanking' && (
              <div className="mb-4">
                <label className="block mb-1 font-semibold text-green-900">Select Bank</label>
                <select className="w-full border px-3 py-2 rounded mb-2">
                  <option>SBI</option>
                  <option>HDFC</option>
                  <option>ICICI</option>
                  <option>Axis</option>
                  <option>Kotak</option>
                  <option>Other</option>
                </select>
              </div>
            )}
            {/* COD Info */}
            {paymentMethod === 'cod' && (
              <div className="mb-4">
                <span className="text-green-700">Pay with cash when your order is delivered.</span>
              </div>
            )}
          </div>
          <button
            className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition font-bold text-lg w-full mt-2"
            onClick={() => {
              setPaymentSuccess(true);
              setShowPayment(false);
              setOrderHistory([
                ...orderHistory,
                { items: cart, total: getTotal(), date: new Date().toLocaleString() },
              ]);
              setCart([]);
              setTimeout(() => setPaymentSuccess(false), 2000);
            }}
          >
            Pay Now
          </button>
          <button
            className="mt-4 px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition font-bold text-lg w-full"
            onClick={() => setShowPayment(false)}
          >
            Cancel
          </button>
        </div>
      )}
      {/* Cart Section */}
      {!showPayment && showCart && (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-green-800">Your Cart</h2>
          {cart.length === 0 ? (
            <p className="text-green-700">Your cart is empty.</p>
          ) : (
            <ul className="divide-y divide-green-100 mb-4">
              {cart.map((item, idx) => (
                <li key={idx} className="flex items-center justify-between py-2">
                  <span className="text-green-900 font-semibold">
                    {item.name} - <span className="text-green-700">₹{item.price}</span>
                  </span>
                  <button
                    className="text-red-700 hover:underline text-sm font-semibold"
                    onClick={() => removeFromCart(idx)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="font-bold text-green-900 mb-2">
            Total: <span className="text-green-700">₹{getTotal()}</span>
          </div>
          <button
            className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition disabled:opacity-50 font-semibold"
            disabled={cart.length === 0}
            onClick={() => { setShowPayment(true); setShowCart(false); }}
          >
            Checkou
          </button>
        </div>
      )}
      <main className="flex-1 w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 py-12">
        {/* Vegetable cards with Hindi/English names and images, filtered by search */}
        {[
          { name: "टमाटर / Tomatoes", price: 40, img: "/tomato.jpeg" },
          { name: "पालक / Spinach", price: 20, img: "/spinach.jpeg" },
          { name: "गाजर / Carrots", price: 35, img: "/carrot.jpeg" },
          { name: "फूलगोभी / Cauliflower", price: 45, img: "/cauliflower.jpeg" },
          { name: "आलू / Potatoes", price: 30, img: "/pumpkin.jpeg" },
          { name: "प्याज़ / Onions", price: 25, img: "/onion.jpeg" },
          { name: "पत्ता गोभी / Cabbage", price: 30, img: "/cabbage.jpeg" },
          { name: "मिर्च / Chillies", price: 60, img: "/chillies.jpeg" },
          { name: "बैंगन / Brinjal", price: 38, img: "/brinjal.jpeg" },
          { name: "लौकी / Bottle Gourd", price: 28, img: "/bottle-gourd.jpeg" },
          { name: "भिंडी / Lady Finger", price: 32, img: "/lady-finger.jpeg" },
          { name: "मटर / Green Peas", price: 60, img: "/green-peas.jpeg" },
          { name: "धनिया / Coriander", price: 100, img: "/coriander.jpeg" },
          { name: "लहसुन / Garlic", price: 60, img: "/garlic.jpeg" },
          { name: "अदरक / Ginger", price: 55, img: "/ginger.jpeg" },
          { name: "स्वीट कॉर्न / Sweet Corn", price: 40, img: "/sweet-corn.jpeg" },
          { name: "मूली / Radish", price: 22, img: "/radish.jpeg" },
          { name: "शलजम / Turnip", price: 30, img: "/turnip.jpeg" },
          { name: "चुकंदर / Beetroot", price: 33, img: "/beetroot.jpeg" },
          { name: "कद्दू / Pumpkin", price: 25, img: "/pumpkin.jpeg" },
          { name: "करेला / Bitter Melon", price: 55, img: "/bitter-melon.jpeg" },
          { name: "सेम / Broad Beans", price: 45, img: "/broad-beans.jpeg" },
          { name: "अरबी / Colocasia", price: 42, img: "/colocasia.jpeg" },
          { name: "टिंडा / Apple Gourd", price: 30, img: "/apple-gourd.jpeg" },
        ]
          .filter((veg) => veg.name.toLowerCase().includes(search.toLowerCase()))
          .map((veg) => (
            <div
              key={veg.name}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-200 border-2 border-green-100 hover:border-green-400 group relative"
            >
              <Image
                src={veg.img}
                alt={veg.name}
                width={240}
                height={240}
                className="mb-4 object-cover rounded-xl w-[240px] h-[240px] shadow-md border border-green-200 group-hover:border-green-500"
              />
              <h2 className="text-2xl font-bold text-green-900 mb-1 text-center">
                {veg.name}
              </h2>
              <p className="text-green-700 font-semibold text-lg mb-2">₹{veg.price} / kg</p>
              <div className="flex gap-2">
                <button
                  className="mt-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-lg font-semibold shadow group-hover:scale-105"
                  onClick={() => addToCart(veg)}
                >
                  Add to Cart
                </button>
                <button
                  className="mt-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg font-semibold shadow group-hover:scale-105"
                  onClick={() => setQuickViewVeg(veg)}
                >
                  Quick View
                </button>
              </div>
            </div>
          ))}
      </main>
      <footer className="w-full max-w-4xl mx-auto py-6 flex flex-col items-center gap-2 text-green-800">
        <div className="mb-2 text-sm text-green-700">
          🌱 Eat fresh, stay healthy! | Follow us on{" "}
          <a href="#" className="underline hover:text-green-900">
            Instagram
          </a>
        </div>
        <div className="mb-2 text-sm text-blue-700">
          📦 Free delivery on orders above ₹200!
        </div>
        <div className="mb-2 text-sm text-orange-700">
          ⭐ Customer Reviews: &apos;Super fresh veggies!&apos; - Priya | &apos;Fast delivery!&apos; - Rahul
        </div>
        <div className="mb-2 text-sm text-green-800">
          📍 Location: shop no 4 / kanhaiya meadows building Palghar Maharashtra | 📞 Contact: 9356742543 | ✉️ Email: chaurasiyasumit25539@gmail.com
        </div>
        <p>
          &copy; {new Date().getFullYear()} Fresh Veggie Shop. All rights
          reserved.
        </p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">
            Contact
          </a>
          <a href="#" className="hover:underline">
            About
          </a>
        </div>
      </footer>
      {/* Add a modern sticky navbar, category bar, and floating cart button for Amazon/Flipkart-like features */}
      <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-green-700 to-green-500 shadow-lg z-50 flex items-center justify-between px-8 py-3 text-white font-bold text-lg">
        <div className="flex items-center gap-4">
          <Image src="/next.svg" alt="Logo" width={50} height={30} />
          <span className="text-2xl font-extrabold tracking-wide">Jay Maa Vegetable Shop</span>
        </div>
        <div className="flex gap-6 items-center">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Deals</a>
          <a href="#" className="hover:underline">Categories</a>
          <a href="#" className="hover:underline">Contact</a>
          <a href="/admin" className="hover:underline text-yellow-300">Admin Panel</a>
          <button
            className="ml-4 px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 transition text-sm font-bold shadow"
            onClick={() => {
              setIsAuthenticated(false);
              setShowSignIn(true);
              setMessage("");
            }}
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="h-20" />
      {/* Floating Cart Button */}
      <button
        className="fixed bottom-8 right-8 bg-green-700 text-white rounded-full shadow-lg p-5 text-2xl font-bold z-50 hover:bg-green-800 transition flex items-center gap-2"
        onClick={() => {
          setShowCart(true);
          setShowPayment(false); // Ensure payment modal is closed
          setShowOrderHistory(false); // Ensure order history modal is closed
        }}
        style={{ boxShadow: '0 4px 24px 0 rgba(34,197,94,0.3)' }}
      >
        🛒
        <span className="ml-2">{cart.length}</span>
      </button>
    </div>
  );
}
