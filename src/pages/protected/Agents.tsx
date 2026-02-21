import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { useLocation } from "react-router";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { SRGBColorSpace } from "three";

import { YoruModel } from "@/components/models/Yoru";
import { useQuery } from "@tanstack/react-query";
import extAPI from "@/API/extAPI";

export function Agents() {
    const locator = useLocation();
    useBreadcrumb(locator.pathname);

    const agents = useQuery({
        queryFn: extAPI.getAgents,
        queryKey: ["agents"],
    });

    return (
        agents.isSuccess && (
            <>
                <div className="flex m-3">
                    <div className="flex flex-wrap gap-2">
                        {agents.data.map((a) => (
                            <div>
                                <img className="h-30" src={a.displayIcon} />
                            </div>
                        ))}
                    </div>
                </div>
            </>
        )
    );

    /* return (
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
    ); */
}
