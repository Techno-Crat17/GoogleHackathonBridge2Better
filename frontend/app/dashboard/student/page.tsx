"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BookOpen, Calendar, TrendingUp } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import Link from "next/link";
import { useState } from "react";
import { MOCK_MENTORS } from "@/lib/mockMentors";

const generateGraphData = (mentorId: number) => {
  const baseScore = 30 + (mentorId % 30);
  return [
    { name: 'Week 1', score: baseScore },
    { name: 'Week 2', score: Math.min(100, baseScore + 12 + (mentorId % 8)) },
    { name: 'Week 3', score: Math.min(100, baseScore + 28 - (mentorId % 5)) },
    { name: 'Week 4', score: Math.min(100, baseScore + 45 + (mentorId % 12)) },
    { name: 'Week 5', score: Math.min(100, baseScore + 55 + (mentorId % 7)) },
  ];
};

export default function StudentDashboard() {
  const [selectedMentorId, setSelectedMentorId] = useState<number>(MOCK_MENTORS[0].id);
  const [selectedFlashcardMentorId, setSelectedFlashcardMentorId] = useState<number>(MOCK_MENTORS[0].id);
  const [selectedGraphMentorId, setSelectedGraphMentorId] = useState<number>(MOCK_MENTORS[0].id);
  const [selectedSessionMentorId, setSelectedSessionMentorId] = useState<number>(MOCK_MENTORS[0].id);
  
  const selectedMentor = MOCK_MENTORS.find(m => m.id === selectedMentorId);
  const flashcardMentor = MOCK_MENTORS.find(m => m.id === selectedFlashcardMentorId) || MOCK_MENTORS[0];
  const sessionMentor = MOCK_MENTORS.find(m => m.id === selectedSessionMentorId) || MOCK_MENTORS[0];
  
  const flashcardTopics = flashcardMentor.expertise.split(',').map(t => t.trim()).slice(0, 2);
  const sessionTopic = sessionMentor.expertise.split(',')[0].trim();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-4xl font-bold mb-2">Student Portal</h1>
        <p className="text-muted-foreground">Welcome back, Aarav. You have 2 upcoming sessions.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Chart Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <TrendingUp className="text-primary" /> Learning Velocity
              </h3>
              <select 
                className="h-9 px-3 py-1 rounded-md border border-border bg-background/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm max-w-[200px]"
                value={selectedGraphMentorId}
                onChange={(e) => setSelectedGraphMentorId(Number(e.target.value))}
              >
                {MOCK_MENTORS.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={generateGraphData(selectedGraphMentorId)}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#525252" />
                  <YAxis stroke="#525252" />
                  <Tooltip contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#262626' }} />
                  <Area type="monotone" dataKey="score" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* AI Memories Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <BookOpen className="text-secondary" /> AI Generated Flashcards
              </h3>
              <Link href="/flashcards">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>
            
            <div className="mb-6">
              <select 
                className="w-full h-10 px-3 py-2 rounded-md border border-border bg-background/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                value={selectedFlashcardMentorId}
                onChange={(e) => setSelectedFlashcardMentorId(Number(e.target.value))}
              >
                {MOCK_MENTORS.map(m => (
                  <option key={m.id} value={m.id}>{m.name} ({m.profession})</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {flashcardTopics.map((topic, idx) => (
                <Link href="/flashcards" key={idx}>
                  <div className="p-4 rounded-lg bg-secondary/40 border border-border hover:bg-white/10 transition-colors cursor-pointer h-full">
                    <p className="text-sm text-secondary mb-2">{flashcardMentor.name}</p>
                    <p className="font-medium">{topic}</p>
                  </div>
                </Link>
              ))}
              {flashcardTopics.length === 0 && (
                <p className="text-sm text-muted-foreground">No specific topics found for this mentor.</p>
              )}
            </div>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Upcoming Sessions */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Calendar className="text-foreground" /> Upcoming
              </h3>
            </div>
            
            <div className="mb-4">
              <select 
                className="w-full h-10 px-3 py-2 rounded-md border border-border bg-background/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                value={selectedSessionMentorId}
                onChange={(e) => setSelectedSessionMentorId(Number(e.target.value))}
              >
                {MOCK_MENTORS.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-gradient-to-br from-primary/20 to-transparent border border-primary/30">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-bold">{sessionMentor.name}</p>
                    <p className="text-sm text-muted-foreground">{sessionTopic}</p>
                  </div>
                  <span className="text-xs bg-primary/30 text-primary-foreground px-2 py-1 rounded-full">Today</span>
                </div>
                <p className="text-sm mt-4 text-muted-foreground">4:00 PM - 5:00 PM</p>
                <Link href="/chat">
                  <Button className="w-full mt-4" size="sm" variant="glow">Join Session</Button>
                </Link>
              </div>
            </div>
          </Card>

          {/* Browse Mentors Dropdown */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-6">
              <BookOpen className="text-foreground" /> Find an Expert
            </h3>
            <div className="space-y-4">
              <select 
                className="w-full h-10 px-3 py-2 rounded-md border border-border bg-background/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                value={selectedMentorId}
                onChange={(e) => setSelectedMentorId(Number(e.target.value))}
              >
                {MOCK_MENTORS.map(m => (
                  <option key={m.id} value={m.id}>{m.name} - {m.profession}</option>
                ))}
              </select>

              {selectedMentor && (
                <div className="p-4 rounded-lg bg-secondary/10 border border-border">
                  <p className="font-bold">{selectedMentor.name}</p>
                  <p className="text-xs text-primary mb-2">{selectedMentor.profession}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{selectedMentor.expertise}</p>
                  
                  <Link href="/chat">
                    <Button variant="outline" className="w-full mt-4" size="sm">Ask AI Matchmaker</Button>
                  </Link>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
