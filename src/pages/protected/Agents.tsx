import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { useLocation } from "react-router";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { SRGBColorSpace } from "three";

import { SovaModel } from "@/components/models/Sova";
import { ViperModel } from "@/components/models/Viper";
import { YoruModel } from "@/components/models/Yoru";

export function Agents() {
    const locator = useLocation();
    useBreadcrumb(locator.pathname);
    return (
        <div className=" h-full">
            <Canvas id="canvas" gl={{ outputColorSpace: SRGBColorSpace }}>
                <ambientLight intensity={1} />
                <hemisphereLight args={[0xffffff, 0xffffff, 3]} />
                <directionalLight position={[10, 10, 5]} intensity={3} />
                <directionalLight position={[-10, 10, 5]} intensity={3} />
                <directionalLight position={[-10, 10, -5]} intensity={4} />
                <directionalLight position={[10, 10, -5]} intensity={4} />
                <directionalLight position={[0, 0, 5]} intensity={4} />
                <directionalLight position={[0, 0, -5]} intensity={4} />
                <YoruModel />
                <OrbitControls />
            </Canvas>
        </div>
    );
}
