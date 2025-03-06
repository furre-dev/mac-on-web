"use client";
import { applications } from "@/utils/applications";
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