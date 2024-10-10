import { useGLTF } from '@react-three/drei';
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Cassette = (props) => {
    const { nodes, materials } = useGLTF('/models/cassette.glb');
    const cassetteRef = useRef();

    useFrame(() => {
        if (!cassetteRef.current) return;
        // Use props.targetRotationY to access the passed target rotation
        cassetteRef.current.rotation.y += (props.targetRotationY - cassetteRef.current.rotation.y) * 0.03; // Smooth transition
    });

    return (
        <group ref={cassetteRef} {...props} dispose={null} scale={30}> {/* Attach ref to group for rotation */}
            <group rotation={[-Math.PI, 0, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_2.geometry}
                    material={materials.Opacity}  // Restoring original material
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_3.geometry}
                    material={materials.Magnetic_Tape}  // Restoring original material
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_4.geometry}
                    material={materials.Music_Cassette}  // Restoring original material
                />
            </group>
        </group>
    );
};

useGLTF.preload('/models/cassette.glb');
export default Cassette;