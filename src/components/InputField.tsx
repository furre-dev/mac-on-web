import MagnifyingGlass from "./svgs/MagnifyingGlass";

export default function InputField() {
  return (
    <div className="w-full h-7 rounded-md bg-[#00000011] border border-[#0000001a] flex items-center px-[6px]">
      <MagnifyingGlass />
      <input
        maxLength={20}
        className="ml-[6px] w-full h-full bg-transparent outline-none text-xs placeholder:text-[#6E646D] font-medium"
        placeholder="Search" />
    </div>
  )
}