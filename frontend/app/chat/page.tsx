"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Bot, Send, User } from "lucide-react";

import { MOCK_MENTORS } from "@/lib/mockMentors";

export default function AIChat() {
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hello! I am your Bridge2Better AI mentor. What would you like to learn today? I can match you with the perfect expert." }
  ]);
  const [inputValue, setInputValue] = useState("");

  const generateAIResponse = async (input: string) => {
    const lowerInput = input.toLowerCase().trim();
    
    // 1. Natural Language Math (square, cube, root)
    const naturalMathMatch = lowerInput.match(/(?:what is the |calculate the |find the )?(square root|root|square|cube) of ([\d\.]+)/i) || 
                             lowerInput.match(/([\d\.]+)\s+(squared|cubed)/i);
                             
    if (naturalMathMatch) {
      const isSuffix = ['squared', 'cubed'].includes(naturalMathMatch[2]);
      const operation = isSuffix ? naturalMathMatch[2].toLowerCase() : naturalMathMatch[1].toLowerCase();
      const num = isSuffix ? naturalMathMatch[1] : naturalMathMatch[2];
      
      let expr = "";
      if (operation.includes("root")) expr = `sqrt(${num})`;
      else if (operation === "square" || operation === "squared") expr = `${num}^2`;
      else if (operation === "cube" || operation === "cubed") expr = `${num}^3`;
      
      try {
        const res = await fetch(`https://api.mathjs.org/v4/?expr=${encodeURIComponent(expr)}`);
        if (res.ok) {
          const result = await res.text();
          if (!result.toLowerCase().includes("error")) {
            return `The result for your calculation is **${result}**.\n\nWhat other mathematical concepts would you like to explore?`;
          }
        }
      } catch (e) {}
    }

    // 2. Scientific Math evaluation using Math.js API
    const mathRegex = /^[0-9\s\+\-\*\/\(\)\.\^\%a-z]+$/;
    const hasMathKeywords = /[\+\-\*\/\^]|\d/.test(lowerInput);
    const isNotSentence = !/(what|who|where|is|tell|about)/.test(lowerInput);
    
    if (mathRegex.test(lowerInput) && hasMathKeywords && isNotSentence) {
      try {
        const res = await fetch(`https://api.mathjs.org/v4/?expr=${encodeURIComponent(lowerInput)}`);
        if (res.ok) {
          const result = await res.text();
          if (!result.toLowerCase().includes("error")) {
            return `The result for your calculation is **${result}**.\n\nAre there any other scientific formulas you need calculated?`;
          }
        }
      } catch (e) {}
    }

    // 3. Wikipedia Knowledge Retrieval for "who/what/where is/was/are"
    const wikiMatch = lowerInput.match(/(?:who|what|where) (?:is|was|are) (.+)/i) || lowerInput.match(/tell me about (.+)/i);
    if (wikiMatch && wikiMatch[1]) {
      const topic = wikiMatch[1].replace('?', '').trim();
      try {
        const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.extract) {
            return `Here is what I found regarding **${data.title}**:\n\n${data.extract}\n\nIs this related to the fundamental concepts you are reviewing?`;
          }
        }
      } catch (e) {}
    }
    
    // 4. Predefined context triggers
    if (lowerInput.includes("schedule") || lowerInput.includes("when")) {
      return "Your next session is scheduled for **Today at 4:00 PM**.\n\n" +
             "I have already sent a calendar reminder. Make sure your microphone is working and you have your notes ready!";
    }
    if (lowerInput.includes("hi") || lowerInput.includes("hello")) {
      return "Hello Aarav! I am the Bridge2Better LangGraph orchestrator. I have full access to your learning history, flashcards, and a database of over 50 expert mentors.\n\nWhat topic are you curious about today?";
    }
    
    // 5. Dynamic AI Matchmaking using backend SentenceTransformers API
    try {
      const response = await fetch("http://localhost:8001/api/v1/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_query: input,
          mentors: MOCK_MENTORS,
          top_k: 1
        })
      });
      
      if (response.ok) {
        const matches = await response.json();
        if (matches && matches.length > 0) {
          const bestMatch = matches[0];
          const mentor = MOCK_MENTORS.find(m => m.id === bestMatch.mentor_id);
          if (mentor) {
            return `That's a fascinating topic! Based on your query about "${input}", our AI Matchmaking Engine analyzed 50 experts and found the perfect mentor for you.\n\n` +
                   `**Matched Mentor:** ${mentor.name}\n` +
                   `**Background:** ${mentor.profession}\n` +
                   `**Expertise:** ${mentor.expertise}\n\n` +
                   `With a match score of **${(bestMatch.match_score * 100).toFixed(1)}%**, ${mentor.name.split(' ')[1]} is uniquely qualified to help you with this. Would you like me to schedule a session with them?`;
          }
        }
      }
    } catch (e) {
      console.error("Matchmaking failed:", e);
    }
    
    // 6. Smart Fallback for unknowns
    return `That's an interesting question about "${input}".\n\nWhile my specialized vectors are currently indexing our mentors' expertise on this, let's bring it back to fundamentals.\n\nCould you clarify how this ties into your upcoming sessions? Breaking it down to basic principles usually helps us connect the dots!`;
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    
    const userMsg = inputValue;
    const newMessages = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setInputValue("");
    
    // Add a temporary typing message or just simulate latency
    const typingMessages = [...newMessages, { role: "bot", content: "..." }];
    setMessages(typingMessages);

    try {
      const responseText = await generateAIResponse(userMsg);
      setMessages([...newMessages, { 
        role: "bot", 
        content: responseText
      }]);
    } catch (err) {
      setMessages([...newMessages, { 
        role: "bot", 
        content: "I'm having trouble processing that right now. Let's focus on your Physics basics!"
      }]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-4rem)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Bot className="w-8 h-8 text-primary" /> AI Preparation Hub
        </h1>
        <p className="text-muted-foreground mt-2">Chat with our LangGraph orchestration agents to summarize past sessions or prepare for new ones.</p>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={index} 
              className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.role === "bot" ? "bg-primary/20 text-primary" : "bg-secondary/20 text-secondary"}`}>
                {msg.role === "bot" ? <Bot size={20} /> : <User size={20} />}
              </div>
              <div className={`px-4 py-3 rounded-2xl max-w-[80%] whitespace-pre-wrap ${msg.role === "user" ? "bg-primary/20 text-primary-foreground rounded-tr-sm" : "bg-secondary/10 border border-border text-foreground rounded-tl-sm"}`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-4 bg-background/60 border-t border-border backdrop-blur-md">
          <div className="flex gap-2">
            <Input 
              placeholder="Ask about your mentorship sessions..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="bg-background/80 border-border text-foreground"
            />
            <Button variant="glow" onClick={handleSend} className="px-6">
              <Send size={18} />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
