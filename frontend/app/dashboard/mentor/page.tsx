"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Users, Star, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { MOCK_MENTORS } from "@/lib/mockMentors";

const STUDENT_NAMES = [
  "Aarav Verma", "Neha Gupta", "Rahul Singh", "Priya Sharma", 
  "Rohan Das", "Kavya Iyer", "Ananya Reddy", "Vikram Patel", 
  "Sneha Joshi", "Aditya Nair", "Arjun Kumar", "Meera Desai"
];

const generateUpcomingSessions = (mentor: any) => {
  const topics = mentor.expertise.split(',').map((t: string) => t.trim());
  const sessions = [];
  const numSessions = (mentor.id % 3) + 2; // 2 to 4 sessions
  
  for(let i=0; i<numSessions; i++) {
    const studentIdx = (mentor.id * 7 + i * 13) % STUDENT_NAMES.length;
    const topicIdx = (mentor.id + i) % topics.length;
    
    sessions.push({
      name: STUDENT_NAMES[studentIdx],
      topic: topics[topicIdx],
      time: i === 0 ? "Today, 4:00 PM" : i === 1 ? "Today, 5:30 PM" : i === 2 ? "Tomorrow, 10:00 AM" : "Tomorrow, 2:00 PM"
    });
  }
  return sessions;
};

export default function MentorDashboard() {
  const [currentMentorId, setCurrentMentorId] = useState<number>(MOCK_MENTORS[0].id);
  const mentor = MOCK_MENTORS.find(m => m.id === currentMentorId) || MOCK_MENTORS[0];

  // Deterministically generate stats based on mentor ID so it feels real
  const activeStudents = (mentor.id % 20) + 5;
  const rating = (4.2 + (mentor.id % 8) / 10).toFixed(1);
  const hoursMentored = (mentor.id * 14) % 300 + 40;
  
  const dynamicSessions = generateUpcomingSessions(mentor);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4"
      >
        <div>
          <h1 className="text-4xl font-bold mb-2">Mentor Portal</h1>
          <p className="text-muted-foreground">Welcome, {mentor.name}. Your impact score is growing.</p>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <select 
            className="h-10 px-3 py-2 rounded-md border border-border bg-background/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm max-w-[250px]"
            value={currentMentorId}
            onChange={(e) => setCurrentMentorId(Number(e.target.value))}
          >
            {MOCK_MENTORS.map(m => (
              <option key={m.id} value={m.id}>View as: {m.name}</option>
            ))}
          </select>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/20 rounded-full text-primary">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">{activeStudents}</p>
              <p className="text-sm text-muted-foreground">Active Students</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-secondary/10 to-transparent border-secondary/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary/20 rounded-full text-secondary">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">{rating}</p>
              <p className="text-sm text-muted-foreground">Mentorship Rating</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-yellow-500/10 to-transparent border-yellow-500/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-500/20 rounded-full text-yellow-500">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">{hoursMentored}</p>
              <p className="text-sm text-muted-foreground">Hours Mentored</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-6">Upcoming Sessions</h3>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {dynamicSessions.map((session, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-secondary/40 border border-border hover:bg-white/10 transition-colors">
                <div>
                  <p className="font-bold">{session.name}</p>
                  <p className="text-sm text-muted-foreground">{session.topic}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-primary">{session.time}</p>
                  <Link href="/chat">
                    <Button size="sm" variant="ghost" className="mt-2 text-xs">Prepare Notes</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-6">Recent AI Summaries</h3>
          <p className="text-sm text-muted-foreground mb-4">Our LangGraph agents automatically generated these insights from your past sessions.</p>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-secondary/40 border border-border">
              <p className="font-medium text-secondary mb-2">Session with {dynamicSessions[0].name.split(' ')[0]} ({dynamicSessions[0].topic})</p>
              <p className="text-sm text-muted-foreground">{dynamicSessions[0].name.split(' ')[0]} successfully grasped the basics of {dynamicSessions[0].topic}. They struggled slightly with advanced applications, which might be a good focus area for your next session.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
