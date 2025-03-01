import { applications } from "@/utils/applications";

export default function Applications() {
  const apps = applications.map((application) => {
    return (
      <application.component key={application.application_name} />
    )
  });

  return apps ?? null
}