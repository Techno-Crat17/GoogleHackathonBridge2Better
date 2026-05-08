"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { loadToken, clearToken, getMe } from "@/lib/auth";

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<{full_name?: string, email?: string, role?: string} | null>(null);

  const fetchProfile = async () => {
    const token = loadToken();
    setIsLoggedIn(!!token);
    if (token) {
      try {
        const data = await getMe(token);
        setUserProfile(data);
      } catch (err) {
        console.error("Failed to fetch user profile", err);
        clearToken();
        setIsLoggedIn(false);
        setUserProfile(null);
      }
    } else {
      setUserProfile(null);
    }
  };

  useEffect(() => {
    fetchProfile();

    const handleStorageChange = () => {
      fetchProfile();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("auth-change", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("auth-change", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    clearToken();
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("auth-change"));
    // Optionally redirect
    window.location.href = "/";
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 glass border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-gradient-to-tr from-primary to-secondary flex items-center justify-center">
                <span className="text-foreground font-bold text-xl">B</span>
              </div>
              <span className="text-xl font-bold text-white">
                Bridge2Better
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/dashboard/student" className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors">Students</Link>
              <Link href="/dashboard/mentor" className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors">Mentors</Link>
              <Link href="/analytics" className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors">Analytics</Link>
              <Link href="/chat" className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors">AI Hub</Link>
              {isLoggedIn ? (
                <div className="flex items-center gap-4 border-l border-border pl-4 ml-2">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground leading-tight">
                      {userProfile?.full_name || userProfile?.email || "Student"}
                    </p>
                    <p className="text-xs text-primary capitalize leading-tight">
                      {userProfile?.role || "Student"} Account
                    </p>
                  </div>
                  <button onClick={handleLogout} className="bg-white/10 hover:bg-white/20 border border-border text-foreground px-4 py-2 rounded-full text-sm font-medium transition-all">Sign Out</button>
                </div>
              ) : (
                <Link href="/login" className="bg-white/10 hover:bg-white/20 border border-border text-foreground px-4 py-2 rounded-full text-sm font-medium transition-all ml-2">Sign In</Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
