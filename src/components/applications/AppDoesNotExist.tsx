import { capitalize } from "@/utils/capitalize";
import { useApplications } from "../context/ApplicationsContext";
import Alert from "../svgs/Alert";
import useDrag from "@/hooks/useDrag";
import { useRef } from "react";

export default function AppDoesNotExist({ application_name }: { application_name: string }) {
  const { handleMouseClick, position } = useDrag(true);
  const { closeApp } = useApplications();

  const appNameCapital = capitalize(application_name);

  return (
    <div
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`
      }}
      className="bg-[#E4E4E4] w-[450px] h-[166px] rounded-[13px] overflow-hidden flex flex-col absolute top-24 shadow-2xl">
      <div onMouseDown={handleMouseClick} className="bg-gradient-to-b from-[#DEDDDE] to-[#CBC9CC] h-[15%] border-b-2 border-[#A8A8A8]" />
      <div className="flex px-5 pt-5 pb-3">
        <Alert />
        <div className="ml-10 h-full">
          <h5 className="font-black text-base">"{appNameCapital}" is still under development.</h5>
          <p className="text-sm">This app needs to be updated by its developer to improve compatibility.</p>
        </div>
      </div>
      <button
        onClick={() => closeApp(application_name)}
        className="bg-gradient-to-b from-[#6BA6EC] to-[#2F7CEE] border border-[#3D80EB] w-max px-8 text-white rounded-[7px] ml-auto mr-8">OK</button>
    </div>
  )
}