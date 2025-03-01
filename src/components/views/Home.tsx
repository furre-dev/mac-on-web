"use client";
import AppDock from "../AppDock";
import Applications from "../applications/Applications";
import { ApplicationsProvider } from "../context/ApplicationsContext";

export default function Home() {
  return (
    <ApplicationsProvider>
      <Applications />
      <AppDock />
    </ApplicationsProvider>
  );
}
