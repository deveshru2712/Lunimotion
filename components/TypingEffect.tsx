"use client";

import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  Variants,
} from "motion/react";
import { useEffect } from "react";

const cursorVariant: Variants = {
  blinking: {
    opacity: [0, 0, 1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatDelay: 0,
      ease: "linear",
      times: [0, 0.5, 0.5, 1],
    },
  },
};

export default function TypingEffect() {
  const baseText =
    "Dear Hiring Manager, my name is Devesh Chandra, and I am 100x Deves. Hire me before anyone else does, or you are going to regret that." as string;
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.slice(0, latest),
  );

  useEffect(() => {
    const controls = animate(count, baseText.length, {
      type: "tween",
      duration: 6,
      ease: "easeInOut",
    });
    return controls.stop;
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-rose-400 py-20 text-3xl font-semibold text-white">
      <main className="h-full w-full max-w-6xl">
        <span className="">
          <motion.span>{displayText}</motion.span>
          <CursorBlinker />
        </span>
      </main>
    </div>
  );
}

const CursorBlinker = () => {
  return (
    <motion.div
      animate="blinking"
      variants={cursorVariant}
      className="inline-block h-5 w-0.5 translate-y-1 bg-slate-900"
    ></motion.div>
  );
};
