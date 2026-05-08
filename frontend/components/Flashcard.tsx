"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

interface FlashcardProps {
  front: string;
  back: string;
}

export function Flashcard({ front, back }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = () => {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  };

  return (
    <div 
      className="relative w-full h-64 cursor-pointer perspective-1000"
      onClick={handleFlip}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        onAnimationComplete={() => setIsAnimating(false)}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <Card 
          className="absolute w-full h-full p-8 flex items-center justify-center text-center glass bg-background/80 border-primary/30"
          style={{ backfaceVisibility: "hidden" }}
        >
          <h3 className="text-2xl font-bold text-foreground">{front}</h3>
          <p className="absolute bottom-4 text-sm text-muted-foreground">Click to flip</p>
        </Card>

        {/* Back */}
        <Card 
          className="absolute w-full h-full p-8 flex flex-col items-center justify-center text-center glass bg-primary/10 border-primary/50"
          style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
        >
          <div className="text-lg text-foreground overflow-y-auto">{back}</div>
          <p className="absolute bottom-4 text-sm text-primary">Click to flip back</p>
        </Card>
      </motion.div>
    </div>
  );
}
