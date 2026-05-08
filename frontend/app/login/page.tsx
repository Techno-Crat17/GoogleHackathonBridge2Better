"use client";

import { useState, useEffect } from "react";
import { login, saveToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Brain } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  // Check if we were redirected after a successful registration
  const [showSuccess, setShowSuccess] = useState(false);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("registered") === "true") {
        setShowSuccess(true);
      }
    }
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setShowSuccess(false);
    setLoading(true);
    try {
      const token = await login(email, password);
      saveToken(token.access_token);
      window.dispatchEvent(new Event("auth-change"));
      router.push("/dashboard/student"); // Default redirect, adapt as needed
    } catch (e: any) {
      setErr(e?.message ?? "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
        className="w-full max-w-md z-10"
      >
        <Card className="p-8 backdrop-blur-xl border-white/10 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back</h1>
            <p className="text-muted-foreground text-sm text-center">
              Sign in to your Bridge2Better account to continue your mentorship journey.
            </p>
          </div>

          {showSuccess && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }} 
              className="text-sm text-green-600 bg-green-500/10 p-4 rounded-md border border-green-500/20 mb-6 font-medium text-center"
            >
              Registration successful! Please sign in with your new account.
            </motion.div>
          )}

          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground ml-1">Email address</label>
              <Input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background/50 h-12"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-medium text-foreground">Password</label>
                <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-background/50 h-12"
              />
            </div>

            {err && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                className="text-sm text-red-400 bg-red-400/10 p-3 rounded-md border border-red-400/20"
              >
                {err}
              </motion.div>
            )}

            <Button
              disabled={loading}
              type="submit"
              variant="glow"
              className="w-full h-12 text-base font-semibold mt-2"
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <a href="/register" className="text-primary hover:underline font-medium">
              Create one now
            </a>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}