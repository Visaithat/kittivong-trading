import { Composition } from "remotion";
import { HeroKinetic } from "./HeroKinetic";
import { PharmaAmbient } from "./PharmaAmbient";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HeroKinetic"
        component={HeroKinetic}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          brand: "kittivong-trading",
          tagline: "TRUSTED  /  CLEAN  /  PHARMACY-GRADE",
        }}
      />
      <Composition
        id="PharmaAmbient"
        component={PharmaAmbient}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
