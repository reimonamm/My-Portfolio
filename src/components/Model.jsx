import * as THREE from 'three';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { a as three } from '@react-spring/three'; // For spring animation
import { useSpring } from '@react-spring/core'; // For spring animation

function Model(props) {
    const group = useRef();
    const { nodes, materials } = useGLTF('/models/mac-draco.glb'); // Ensure the path is correct

    // This state controls whether the laptop is open or closed
    const [open, setOpen] = useState(false);

    // Spring animation for the hinge (laptop lid)
    const { hinge } = useSpring({
        hinge: open ? -0.425 : 1.575, // Controls the rotation of the laptop lid
        config: { mass: 1, tension: 170, friction: 26 }, // Tweak for smoothness
    });

    // Handle the floating animation and rotation
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, open ? Math.cos(t / 10) / 10 + 0.25 : 0, 0.1);
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, open ? Math.sin(t / 10) / 4 : 0, 0.1);
        group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, open ? Math.sin(t / 10) / 10 : 0, 0.1);
        group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, open ? (-2 + Math.sin(t)) / 3 : -4.3, 0.1);
    });

    return (
        <group
            ref={group}
            {...props}
            dispose={null}
            onClick={() => setOpen(!open)} // Toggle open/close on click
            scale={[0.6, 0.6, 0.6]}
            // Set the scale to reduce size (adjust these values as needed)
        >
            <three.group rotation-x={hinge} position={[0, -0.04, 0.41]}>
                <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
                    <mesh material={materials.aluminium} geometry={nodes['Cube008'].geometry} />
                    <mesh material={materials['matte.001']} geometry={nodes['Cube008_1'].geometry} />
                    <mesh material={materials['screen.001']} geometry={nodes['Cube008_2'].geometry} />
                </group>
            </three.group>
            <mesh material={materials.keys} geometry={nodes.keyboard.geometry} position={[1.79, 0, 3.45]} />
            <group position={[0, -0.1, 3.39]}>
                <mesh material={materials.aluminium} geometry={nodes['Cube002'].geometry} />
                <mesh material={materials.trackpad} geometry={nodes['Cube002_1'].geometry} />
            </group>
            <mesh material={materials.touchbar} geometry={nodes.touchbar.geometry} position={[0, -0.03, 1.2]} />
        </group>
    );
}

export default Model;