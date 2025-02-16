"use client";
import { useMessage } from "@/components/context/MessagesContext";
import Home from "@/components/views/Home";
import LoadingScreen from "@/components/views/LoadingScreen";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function Page() {
  const { loading } = useMessage();

  return (
    <AnimatePresence mode="wait">
      {loading ? <LoadingScreen key="loading" /> : <Home key="home" />}
    </AnimatePresence>
  )
}
