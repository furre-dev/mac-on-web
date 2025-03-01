"use client";
import { Application } from "@/types/applicationTypes";
import { applications } from "@/utils/applications";
import { useState } from "react";
import { useApplications } from "../context/ApplicationsContext";

export default function Applications() {
  const { appsOpen } = useApplications();

  const apps = applications.map((application) => {
    const appIsOpen = appsOpen?.includes(application.application_name);

    if (!appIsOpen || !application.component) {
      return null
    }

    return (
      <application.component key={application.application_name} />
    )
  });

  return apps ?? null
}