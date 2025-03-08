"use client";
import { applications } from "@/utils/applications";
import { useApplications } from "../context/ApplicationsContext";

export default function Applications() {
  const { appsOpen } = useApplications();

  const apps = applications.map(({ application_name, component: Component }) => {
    const appIsOpen = appsOpen?.includes(application_name);

    if (!appIsOpen || !Component) {
      return null
    }

    return (
      <Component key={application_name} />
    )
  });

  return apps ?? null
}