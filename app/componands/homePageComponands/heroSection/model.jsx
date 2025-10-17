"use client";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Model() {
  const { scene } = useGLTF("/models/model.glb");
  return <primitive object={scene} scale={1.5} position={[0, -1.5, 0]} />;
}

export default function ThreeDModel() {
  const [contextLost, setContextLost] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="size-full relative">
      {!contextLost ? (
        <Canvas
          frameloop="demand"
          camera={{ position: [0, 1, 5], fov: 50 }}
          onCreated={({ gl }) => {
            const handleLost = (e) => {
              e.preventDefault();
              console.warn("⚠️ WebGL context lost!");
              setContextLost(true);
              setTimeout(() => setContextLost(false), 500);
            };

            const handleRestore = () => {
              console.log(" WebGL context restored!");
              setContextLost(false);
            };

            gl.domElement.addEventListener("webglcontextlost", handleLost);
            gl.domElement.addEventListener("webglcontextrestored", handleRestore);

            return () => {
              gl.domElement.removeEventListener("webglcontextlost", handleLost);
              gl.domElement.removeEventListener("webglcontextrestored", handleRestore);
              gl.dispose(); 
              try {
                gl.forceContextLoss();
              } catch (err) {
                console.warn("Force context loss failed:", err);
              }
            };
          }}
        >
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={1} />

          <Model />

          <OrbitControls
            enableZoom={false}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
      ) : (
        <div className="text-center text-red-500 text-sm">
           تم فقدان الـ WebGL Context - إعادة تحميل المشهد...
        </div>
      )}
    </div>
  );
}
