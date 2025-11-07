"use client";
import { motion } from "motion/react";
import { Layers, LucideHome, UserRound } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function SlidingMenu() {
  const [isSelected, setIsSelected] = useState<number>(1);

  const data = [
    { icon: <LucideHome />, text: "Home" },
    { icon: <UserRound />, text: "User" },
    { icon: <Layers />, text: "Data" },
  ];

  return (
    <div className="flex w-[300px] items-center rounded-2xl bg-white px-2.5 py-2.5">
      <div className="flex w-full items-center justify-between rounded-2xl bg-black px-1.5 py-1.5">
        {data.map((elem, idx) => (
          <SlidingMenuButton
            isSelected={isSelected === idx + 1}
            onClick={() => setIsSelected(idx + 1)}
            key={idx}
            {...elem}
          />
        ))}
      </div>
    </div>
  );
}

const SlidingMenuButton = ({
  icon,
  text,
  onClick,
  isSelected,
}: {
  icon: React.ReactNode;
  text: string;
  isSelected: boolean;
  onClick: () => void;
}) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <motion.button
      onTapStart={() => setIsPressed(true)}
      onTapCancel={() => setIsPressed(false)}
      onTap={() => setIsPressed(false)}
      animate={{
        scale: isPressed ? 0.9 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 12,
      }}
      onClick={onClick}
      className={cn(
        "flex cursor-pointer items-center gap-1.5 rounded-2xl px-3 py-1.5 transition-all duration-300",
        isSelected
          ? "bg-white font-semibold text-black shadow-sm"
          : "bg-transparent text-white hover:bg-white/10",
      )}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isPressed ? -5 : 0,
          transition: { type: "spring", stiffness: 500, damping: 15 },
        }}
      >
        {icon}
      </motion.div>

      {isSelected && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {text}
        </motion.span>
      )}
    </motion.button>
  );
};
