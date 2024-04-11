import bgbanner from "../assets/banner2.jpg";
import { Hero } from "./Hero";

export const Banner = () => {
  return (
    <div
      className="bg-fixed pb-24"
      style={{ backgroundImage: `url(${bgbanner})` }}
    >
      <div className="h-[400px] flex flex-col pt-10 justify-around items-center">
        <div className="font-bold text-6xl mb-7">Crypto Hunter</div>
        <div className="text-gray-400 capitalize">
          Get all the info regarding your favorite Crypto Currency
        </div>
        <Hero></Hero>
      </div>
    </div>
  );
};
