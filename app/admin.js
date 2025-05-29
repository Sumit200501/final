// This file is deprecated. The admin panel now lives in src/app/admin/page.js for Next.js App Router compatibility.
// You can safely delete this file.

"use client";
import { useState } from "react";

export default function AdminPanel() {
  const [showSignIn, setShowSignIn] = useState(true);
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({ email: "", password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [profile, setProfile] = useState({ email: "", password: "" });
  const [showProfile, setShowProfile] = useState(false);
  // Demo: store a single admin user in-memory
  const [admin, setAdmin] = useState({ email: "admin@example.com", password: "admin123" });

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
      setShowSignIn(true);
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
                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
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
                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                value={signInData.email}
                onChange={e => setSignInData({ ...signInData, email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
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
                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                value={signUpData.email}
                onChange={e => setSignUpData({ ...signUpData, email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                value={signUpData.password}
                onChange={e => setSignUpData({ ...signUpData, password: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
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

  // Authenticated view
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">Admin Panel</h1>
        <div className="flex justify-between mb-6">
          <span className="font-semibold text-green-900">Welcome, {profile.email}</span>
          <button className="text-red-600 underline" onClick={() => { setIsAuthenticated(false); setMessage("Logged out."); }}>Logout</button>
        </div>
        <button
          className="mb-4 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition font-semibold w-full"
          onClick={() => setShowProfile((s) => !s)}
        >
          {showProfile ? "Hide Profile" : "Edit Profile"}
        </button>
        {showProfile && (
          <form onSubmit={handleProfileUpdate} className="flex flex-col gap-4 mb-4">
            <input
              type="email"
              placeholder="Email"
              className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={profile.email}
              onChange={e => setProfile({ ...profile, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={profile.password}
              onChange={e => setProfile({ ...profile, password: e.target.value })}
              required
            />
            <button
              type="submit"
              className="bg-green-700 text-white py-2 rounded-lg font-bold hover:bg-green-800 transition"
            >
              Update Profile
            </button>
          </form>
        )}
        {message && <div className="mt-4 text-center text-green-700 font-semibold">{message}</div>}
      </div>
    </div>
  );
}
