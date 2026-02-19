import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { useLocation } from "react-router";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { AstraModel } from "@/components/models/AstraModel.js";
import { BreachModel } from "@/components/models/Breach";
import { SRGBColorSpace } from "three";

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
                <BreachModel />
                <OrbitControls />
            </Canvas>
        </div>
    );
}
