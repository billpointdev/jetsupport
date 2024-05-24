import JetSupportImage from "../assets/jetsupportcropped.jpg"

const JetSupportLogo = () => {
  return (
    <div className="flex ">
      <img src={JetSupportImage} alt="logo" className="w-[56px] h-[49px]" />
      <div className="text-start leading-[0.5px] ml-1 ">
        <p className="font-bold text-xl mt-[5.5px]">JetPay</p>
        <p className="text-[8px] font-bold">Your trusted crypto partner</p>
      </div>
    </div>
  );
}

export default JetSupportLogo