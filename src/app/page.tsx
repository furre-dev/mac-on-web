"use client";
import { useMessage } from "@/components/context/MessagesContext";
import LowBattery from "@/components/svgs/LowBatter";
import Home from "@/components/views/Home";
import LoadingScreen from "@/components/views/LoadingScreen";
import SmallDeviceError from "@/components/views/SmallDeviceError";
import useWindowWidth from "@/hooks/useWindowWidth";
import { AnimatePresence } from "framer-motion";

export default function Page() {
  const { loading } = useMessage();
  const { smallDevice } = useWindowWidth();

  return !smallDevice ? (
    <AnimatePresence mode="wait">
      {loading ?
        <LoadingScreen key="loading" /> :
        <Home key="home" />}
    </AnimatePresence>
  ) : (
    <SmallDeviceError />
  )
}
