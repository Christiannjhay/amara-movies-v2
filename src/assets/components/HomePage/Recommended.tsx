import RecommendedIcon from "@/icons/RecommendedIcon";

export default function Recommended() {
  return (
    <div className="h-[1000px] w-full bg-[#181818]">
      <div className="text-white text-2xl font-bold ml-10 flex ">
        <div className="h-7 w-5 bg-red-500 rounded-sm text-white items-center justify-center mt-4">
          <div className=" mt-[7px] ml-[2px]">
            <RecommendedIcon />
          </div>
        </div>
        <h1 className="ml-2 mt-3 tracking-widest">RECOMMENDED</h1>
      </div>
    </div>
  );
}
