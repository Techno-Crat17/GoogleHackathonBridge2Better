"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from "recharts";
import { Activity, Target, Zap, BookOpen, Star, Users, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MOCK_MENTORS } from "@/lib/mockMentors";

const STUDENT_NAMES = [
  "Aarav Verma", "Neha Gupta", "Rahul Singh", "Priya Sharma", 
  "Rohan Das", "Kavya Iyer", "Ananya Reddy", "Vikram Patel", 
  "Sneha Joshi", "Aditya Nair", "Arjun Kumar", "Meera Desai"
];

const globalEngagement = [
  { name: 'Mon', hours: 120 }, { name: 'Tue', hours: 150 }, { name: 'Wed', hours: 180 }, { name: 'Thu', hours: 140 }, { name: 'Fri', hours: 200 }, { name: 'Sat', hours: 350 }, { name: 'Sun', hours: 300 },
];

const globalSkills = [
  { subject: 'Physics', A: 120, fullMark: 150 }, { subject: 'Math', A: 98, fullMark: 150 }, { subject: 'Programming', A: 140, fullMark: 150 }, { subject: 'Communication', A: 85, fullMark: 150 }, { subject: 'AI Tools', A: 130, fullMark: 150 },
];
const COLORS = ['#8b5cf6', '#06b6d4', '#f59e0b', '#ec4899'];

// Dynamic Generators
const generateStudentProgress = (index: number) => [
  { week: 'Week 1', score: 30 + (index % 20) }, 
  { week: 'Week 2', score: 45 + (index % 15) }, 
  { week: 'Week 3', score: 60 + (index % 10) }, 
  { week: 'Week 4', score: 75 + (index % 15) }, 
  { week: 'Week 5', score: Math.min(100, 85 + (index % 10)) },
];

const generateStudentSubjects = (index: number) => [
  { name: 'Physics', value: 200 + (index * 40) % 200 }, 
  { name: 'Math', value: 150 + (index * 30) % 150 }, 
  { name: 'Chemistry', value: 100 + (index * 20) % 100 }, 
  { name: 'Computer Sci', value: 250 + (index * 50) % 250 },
];

const generateMentorImpact = (id: number) => [
  { month: 'Jan', students: 2 + (id % 5) }, 
  { month: 'Feb', students: 5 + (id % 8) }, 
  { month: 'Mar', students: 9 + (id % 12) }, 
  { month: 'Apr', students: 14 + (id % 15) }, 
  { month: 'May', students: 20 + (id % 20) },
];

export default function AnalyticsPage() {
  const [viewMode, setViewMode] = useState<"global" | "student" | "mentor">("global");
  const [selectedStudentIdx, setSelectedStudentIdx] = useState<number>(0);
  const [selectedMentorId, setSelectedMentorId] = useState<number>(MOCK_MENTORS[0].id);

  const studentName = STUDENT_NAMES[selectedStudentIdx];
  const mentor = MOCK_MENTORS.find(m => m.id === selectedMentorId) || MOCK_MENTORS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
      >
        <div>
          <h1 className="text-4xl font-bold mb-2">
            {viewMode === "global" ? "Global Platform Analytics" : viewMode === "student" ? "Student Learning Analytics" : "Mentor Impact Analytics"}
          </h1>
          <p className="text-muted-foreground">
            {viewMode === "global" ? "Track platform-wide mentorship engagement and AI activity." : viewMode === "student" ? "Track your personal learning velocity and knowledge retention." : "Track your teaching impact, ratings, and student growth."}
          </p>
        </div>
        
        <div className="flex bg-background/50 p-1 rounded-lg border border-border">
          <Button variant={viewMode === "global" ? "glow" : "ghost"} size="sm" onClick={() => setViewMode("global")}>Global</Button>
          <Button variant={viewMode === "student" ? "glow" : "ghost"} size="sm" onClick={() => setViewMode("student")}>Student View</Button>
          <Button variant={viewMode === "mentor" ? "glow" : "ghost"} size="sm" onClick={() => setViewMode("mentor")}>Mentor View</Button>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {viewMode === "global" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6">
                  <div className="flex items-center gap-4 mb-4"><div className="p-3 bg-blue-500/20 rounded-full text-blue-500"><Activity className="w-6 h-6" /></div><h3 className="font-semibold text-muted-foreground">Total Engagement</h3></div>
                  <p className="text-3xl font-bold">1,245 <span className="text-sm font-normal text-muted-foreground">hours</span></p>
                  <p className="text-sm text-green-400 mt-2">+12% from last month</p>
                </Card>
                <Card className="p-6">
                  <div className="flex items-center gap-4 mb-4"><div className="p-3 bg-purple-500/20 rounded-full text-purple-500"><Target className="w-6 h-6" /></div><h3 className="font-semibold text-muted-foreground">Matches Made</h3></div>
                  <p className="text-3xl font-bold">342</p>
                  <p className="text-sm text-green-400 mt-2">+5% from last month</p>
                </Card>
                <Card className="p-6">
                  <div className="flex items-center gap-4 mb-4"><div className="p-3 bg-yellow-500/20 rounded-full text-yellow-500"><Zap className="w-6 h-6" /></div><h3 className="font-semibold text-muted-foreground">AI Summaries Gen</h3></div>
                  <p className="text-3xl font-bold">8,902</p>
                  <p className="text-sm text-muted-foreground mt-2">Powered by LangGraph</p>
                </Card>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Weekly Platform Engagement</h3>
                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%"><BarChart data={globalEngagement}><XAxis dataKey="name" stroke="#525252" /><YAxis stroke="#525252" /><Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#262626' }} /><Bar dataKey="hours" fill="#06b6d4" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer>
                  </div>
                </Card>
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Global Skill Distribution</h3>
                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%"><RadarChart cx="50%" cy="50%" outerRadius="80%" data={globalSkills}><PolarGrid stroke="#262626" /><PolarAngleAxis dataKey="subject" tick={{ fill: '#a3a3a3' }} /><PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} /><Radar name="Platform Average" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.4} /><Tooltip contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#262626' }} /></RadarChart></ResponsiveContainer>
                  </div>
                </Card>
              </div>
            </>
          )}

          {viewMode === "student" && (
            <>
              <div className="flex justify-end mb-6">
                <select 
                  className="h-10 px-3 py-2 rounded-md border border-border bg-background/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm min-w-[200px]"
                  value={selectedStudentIdx}
                  onChange={(e) => setSelectedStudentIdx(Number(e.target.value))}
                >
                  {STUDENT_NAMES.map((name, idx) => (
                    <option key={idx} value={idx}>Analyze: {name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6 border-primary/20 bg-primary/5">
                  <div className="flex items-center gap-4 mb-4"><div className="p-3 bg-primary/20 rounded-full text-primary"><Clock className="w-6 h-6" /></div><h3 className="font-semibold text-muted-foreground">Hours Learned</h3></div>
                  <p className="text-3xl font-bold">{30 + (selectedStudentIdx * 7) % 50}</p>
                  <p className="text-sm text-primary mt-2">Top {(selectedStudentIdx % 20) + 5}% of students</p>
                </Card>
                <Card className="p-6">
                  <div className="flex items-center gap-4 mb-4"><div className="p-3 bg-secondary/20 rounded-full text-secondary"><BookOpen className="w-6 h-6" /></div><h3 className="font-semibold text-muted-foreground">Flashcards Mastered</h3></div>
                  <p className="text-3xl font-bold">{80 + (selectedStudentIdx * 13) % 100}</p>
                  <p className="text-sm text-green-400 mt-2">{(selectedStudentIdx % 10) + 5} added this week</p>
                </Card>
                <Card className="p-6">
                  <div className="flex items-center gap-4 mb-4"><div className="p-3 bg-green-500/20 rounded-full text-green-500"><Award className="w-6 h-6" /></div><h3 className="font-semibold text-muted-foreground">Current Streak</h3></div>
                  <p className="text-3xl font-bold">{(selectedStudentIdx % 14) + 2} <span className="text-sm font-normal text-muted-foreground">days</span></p>
                  <p className="text-sm text-muted-foreground mt-2">Keep it up!</p>
                </Card>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Learning Velocity</h3>
                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%"><LineChart data={generateStudentProgress(selectedStudentIdx)}><XAxis dataKey="week" stroke="#525252" /><YAxis stroke="#525252" /><Tooltip contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#262626' }} /><Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={3} dot={{r: 6}} /></LineChart></ResponsiveContainer>
                  </div>
                </Card>
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Knowledge Focus</h3>
                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={generateStudentSubjects(selectedStudentIdx)} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                          {generateStudentSubjects(selectedStudentIdx).map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#262626' }} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-4 mt-2">
                      {generateStudentSubjects(selectedStudentIdx).map((s, i) => <div key={i} className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[i]}}></div>{s.name}</div>)}
                    </div>
                  </div>
                </Card>
              </div>
            </>
          )}

          {viewMode === "mentor" && (
            <>
              <div className="flex justify-end mb-6">
                <select 
                  className="h-10 px-3 py-2 rounded-md border border-border bg-background/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm min-w-[200px]"
                  value={selectedMentorId}
                  onChange={(e) => setSelectedMentorId(Number(e.target.value))}
                >
                  {MOCK_MENTORS.map((m) => (
                    <option key={m.id} value={m.id}>Analyze: {m.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6 border-secondary/20 bg-secondary/5">
                  <div className="flex items-center gap-4 mb-4"><div className="p-3 bg-secondary/20 rounded-full text-secondary"><Users className="w-6 h-6" /></div><h3 className="font-semibold text-muted-foreground">Total Students</h3></div>
                  <p className="text-3xl font-bold">{(mentor.id % 20) + 5}</p>
                  <p className="text-sm text-green-400 mt-2">+{(mentor.id % 5) + 1} this month</p>
                </Card>
                <Card className="p-6">
                  <div className="flex items-center gap-4 mb-4"><div className="p-3 bg-yellow-500/20 rounded-full text-yellow-500"><Star className="w-6 h-6" /></div><h3 className="font-semibold text-muted-foreground">Average Rating</h3></div>
                  <p className="text-3xl font-bold">{(4.2 + (mentor.id % 8) / 10).toFixed(1)}</p>
                  <p className="text-sm text-muted-foreground mt-2">Based on {(mentor.id * 3) % 50 + 10} reviews</p>
                </Card>
                <Card className="p-6">
                  <div className="flex items-center gap-4 mb-4"><div className="p-3 bg-blue-500/20 rounded-full text-blue-500"><Clock className="w-6 h-6" /></div><h3 className="font-semibold text-muted-foreground">Hours Taught</h3></div>
                  <p className="text-3xl font-bold">{(mentor.id * 14) % 300 + 40}</p>
                  <p className="text-sm text-blue-400 mt-2">Top {(mentor.id % 15) + 1}% of mentors</p>
                </Card>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Student Growth Over Time</h3>
                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%"><BarChart data={generateMentorImpact(selectedMentorId)}><XAxis dataKey="month" stroke="#525252" /><YAxis stroke="#525252" /><Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#262626' }} /><Bar dataKey="students" fill="#ec4899" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer>
                  </div>
                </Card>
                <Card className="p-6 flex flex-col justify-center items-center text-center">
                  <Target className="w-16 h-16 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-2">High Impact Area</h3>
                  <p className="text-muted-foreground max-w-sm">Your AI summaries show that your students perform {(mentor.id % 30) + 15}% better on exams after completing your <strong>{mentor.expertise.split(',')[0]}</strong> modules compared to the platform average.</p>
                </Card>
              </div>
            </>
          )}

        </motion.div>
      </AnimatePresence>
    </div>
  );
}
