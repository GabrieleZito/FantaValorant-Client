import { AstraModel } from "@/components/models/Astra";
import { BreachModel } from "@/components/models/Breach";
import { BrimstoneModel } from "@/components/models/Brimstone";
import { ChamberModel } from "@/components/models/Chamber";
import { CypherModel } from "@/components/models/Cypher";
import { FadeModel } from "@/components/models/Fade";
import { GekkoModel } from "@/components/models/Gekko";
import { HarborModel } from "@/components/models/Harbor";
import { JettModel } from "@/components/models/Jett";
import { KayoModel } from "@/components/models/Kayo";
import { KilljoyModel } from "@/components/models/Killjoy";
import { NeonModel } from "@/components/models/Neon";
import { OmenModel } from "@/components/models/Omen";
import { PhoenixModel } from "@/components/models/Phoenix";
import { RazeModel } from "@/components/models/Raze";
import { ReynaModel } from "@/components/models/Reyna";
import { SageModel } from "@/components/models/Sage";
import { SkyeModel } from "@/components/models/Skye";
import { SovaModel } from "@/components/models/Sova";
import { ViperModel } from "@/components/models/Viper";
import { YoruModel } from "@/components/models/Yoru";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { useParams } from "react-router";
import { SRGBColorSpace } from "three";
import { Environment } from "@react-three/drei";
const agentModelMap: Record<string, React.FC> = {
    Astra: AstraModel,
    Breach: BreachModel,
    BrimStone: BrimstoneModel,
    Chamber: ChamberModel,
    Cypher: CypherModel,
    Fade: FadeModel,
    Gekko: GekkoModel,
    Harbor: HarborModel,
    Jett: JettModel,
    Kayo: KayoModel,
    Killjoy: KilljoyModel,
    Neon: NeonModel,
    Omen: OmenModel,
    Phoenix: PhoenixModel,
    Raze: RazeModel,
    Reyna: ReynaModel,
    Sage: SageModel,
    Skye: SkyeModel,
    Sova: SovaModel,
    Viper: ViperModel,
    Yoru: YoruModel,
};
export function AgentDetail() {
    const { name = "" } = useParams();
    const ModelComponent = agentModelMap[name] || (() => <div>Model not found</div>);
    function CameraSetup() {
        const { camera } = useThree();

        useEffect(() => {
            //camera.position.set(0, 1.5, 2);
            //camera.lookAt(0, 0, 0); // point camera at a specific spot
        }, []);

        return null;
    }
    return (
        <div className="h-full">
            <Canvas id="canvas" gl={{ outputColorSpace: SRGBColorSpace }} camera={{ position: [0.08, 1, 2.64], fov: 50 }}>
                <OrbitControls
                    target={[0, 1.5, 0]}
                    makeDefault
                    onChange={(e) => {
                        console.log(e?.target.object.position);
                    }}
                />
                {/* <CameraSetup /> */}
                {/* <Environment preset="city" background  /> */}

                <directionalLight position={[10, 10, 5]} intensity={3} />
                <directionalLight position={[-10, 10, 5]} intensity={3} />
                <directionalLight position={[-10, 10, -5]} intensity={4} />
                <directionalLight position={[10, 10, -5]} intensity={4} />
                <directionalLight position={[0, 0, 5]} intensity={4} />
                <directionalLight position={[0, 0, -5]} intensity={4} />
                <ModelComponent />
            </Canvas>
        </div>
    );
}
