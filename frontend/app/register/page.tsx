"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { useState } from "react";
import { registerUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "mentor">("student");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await registerUser({
        full_name: fullName,
        email,
        password,
        role,
      });
      // Registration successful, redirect to login
      router.push("/login?registered=true");
    } catch (error: any) {
      setErr(error?.bodyText ?? error?.message ?? "Failed to register.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative">
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px]" />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-md"
      >
        <Card className="p-8 backdrop-blur-xl bg-background/60 border-border">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Join Bridge2Better</h1>
            <p className="text-muted-foreground">Create an account to start your journey</p>
          </div>
          
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Full Name</label>
              <Input required type="text" placeholder="Rahul Sharma" value={fullName} onChange={e => setFullName(e.target.value)} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Email Address</label>
              <Input required type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Password</label>
              <Input required type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">I want to join as a:</label>
              <select required value={role} onChange={e => setRole(e.target.value as "student" | "mentor")} className="flex h-10 w-full rounded-md border border-border glass bg-background/80 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all">
                <option value="student">Student</option>
                <option value="mentor">Mentor</option>
              </select>
            </div>
            
            {err && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                className="text-sm text-red-500 bg-red-100 p-3 rounded-md border border-red-200"
              >
                {err}
              </motion.div>
            )}

            <Button disabled={loading} className="w-full" variant="glow" type="submit">
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-secondary hover:text-foreground transition-colors">
              Sign In here
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
