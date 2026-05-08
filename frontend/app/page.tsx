"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Sparkles, ArrowRight, Brain, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import Link from "next/link";

export default function Home() {
  const [backendStatus, setBackendStatus] = useState<string>("Checking backend connection...");

  useEffect(() => {
    apiFetch<{status: string, message: string}>("/health")
      .then(data => setBackendStatus(`Connected: ${data.message}`))
      .catch(err => setBackendStatus("Backend disconnected"));
  }, []);
  return (
    <div className="flex flex-col items-center overflow-hidden">
      {/* Hero Section */}
      <section className="w-full relative py-32 flex items-center justify-center min-h-[90vh]">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px]" />
        </div>

        <div className="z-10 text-center max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-sky-400">
              Bidirectional <br /> Mentorship
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            Connecting underserved youth with retired professionals. Learn wisdom, teach technology. Powered by AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/register">
              <Button size="lg" variant="glow" className="gap-2 w-full sm:w-auto">
                Join as Student <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                Join as Mentor <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-sm text-muted-foreground flex items-center justify-center gap-2"
          >
            <div className={`w-2 h-2 rounded-full ${backendStatus.includes('Connected') ? 'bg-green-500' : backendStatus.includes('Checking') ? 'bg-yellow-500' : 'bg-red-500'}`} />
            {backendStatus}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-7xl px-4 py-24 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="p-8 h-full flex flex-col">
              <Brain className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">AI Matchmaking</h3>
              <p className="text-muted-foreground mb-6 flex-grow">Our deep learning engine pairs mentors and students based on highly contextual skill profiles and learning styles.</p>
              <Link href="/dashboard/student" className="mt-auto">
                <Button variant="outline" className="w-full">Try Matchmaking</Button>
              </Link>
            </Card>
          </motion.div>

          <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="p-8 h-full relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-[40px] -mr-16 -mt-16" />
              <Users className="w-12 h-12 text-secondary mb-6 relative z-10" />
              <h3 className="text-2xl font-bold mb-4 relative z-10">Reverse Mentorship</h3>
              <p className="text-muted-foreground relative z-10 mb-6 flex-grow">Professionals teach life experience, science, and math. Students teach modern AI tools and digital productivity.</p>
              <Link href="/register" className="mt-auto relative z-10">
                <Button variant="glow" className="w-full">Join Community</Button>
              </Link>
            </Card>
          </motion.div>

          <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="p-8 h-full flex flex-col">
              <Sparkles className="w-12 h-12 text-yellow-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Knowledge RAG</h3>
              <p className="text-muted-foreground mb-6 flex-grow">Every session is privately analyzed by our LangGraph agents to generate flashcards, summaries, and growth metrics.</p>
              <Link href="/chat" className="mt-auto">
                <Button variant="outline" className="w-full">Chat with AI</Button>
              </Link>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
