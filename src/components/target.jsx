import {useGLTF} from "@react-three/drei";


const Target = () => {
    const { scene } = useGLTF('/models/mac-draco.glb')

    return (
        <div>Target</div>
    )
}
export default Target
