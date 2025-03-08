"use client";
import { applications } from "@/utils/applications";
import { useApplications } from "../context/ApplicationsContext";
import AppDoesNotExist from "./AppDoesNotExist";

export default function Applications() {
  const { appsOpen, setNewTimestamp } = useApplications();

  const apps = applications.map(({ application_name, component: Component }) => {
    const appIsOpen = appsOpen?.find(app => app.application_name === application_name) || false;

    if (!appIsOpen) {
      return null
    }

    const normalizedZIndex = appIsOpen.timestamp % 10000;

    // If the application has no component bound to it, we render the AppDoesNotExist as default

    return (
      <div
        onMouseDown={() => setNewTimestamp(application_name)}
        key={application_name}
        style={{ zIndex: normalizedZIndex }}>
        {Component ? <Component /> : <AppDoesNotExist application_name={application_name} />}
      </div>
    )
  });

  return apps ?? null
}