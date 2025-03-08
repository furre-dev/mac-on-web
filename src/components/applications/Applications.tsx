"use client";
import { applications } from "@/utils/applications";
import { useApplications } from "../context/ApplicationsContext";
import AppDoesNotExist from "./AppDoesNotExist";

export default function Applications() {
  const { appsOpen } = useApplications();

  const apps = applications.map(({ application_name, component: Component }) => {
    const appIsOpen = appsOpen?.includes(application_name);

    if (!appIsOpen) {
      return null
    }

    // If the application has no component bound to it, we render the AppDoesNotExist as default
    if (!Component) {
      return (
        <AppDoesNotExist application_name={application_name} />
      )
    }

    return (
      <Component key={application_name} />
    )
  });

  return apps ?? null
}