//import Galaxy from "@/components/Galaxy";
import { SpotLight } from "three";
//import Navbar from "./Navbar";
import SpotLightSlider from "../components/anime/Spotlight";
import Trending  from "../components/anime/Treanding"
const page = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        background: "#201f31",
      }}
    >
      {/* <Galaxy
        mouseRepulsion={true}
        mouseInteraction={true}
        density={1.5}
        glowIntensity={0.5}
        saturation={0.8}
        hueShift={240}
      /> */}

      {/* <Navbar /> */}
      <SpotLightSlider spotlight={[]} />
      <Trending trending={[]} />
    </div>
  );
};

export default page;
