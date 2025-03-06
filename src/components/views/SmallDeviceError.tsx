import LowBattery from "../svgs/LowBatter";

export default function SmallDeviceError() {
  return (
    <main className="absolute w-screen h-screen bg-black flex flex-col justify-center items-center text-center">
      <p className="text-base text-[#404040] max-w-[80%] absolute top-40">
        It looks like your device's screen is a bit too small to display this content properly. <br />
        For the best experience, we recommend using a device with a larger screen.
      </p>
      <LowBattery />
    </main>
  )
}