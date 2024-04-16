import { Html } from '@react-three/drei';

const Annotation = ({ position, content, onClick }) => {
  return (
    <mesh position={position} onClick={onClick}>
      <Html scaleFactor={10}>
        <div className="annotation">{content}</div>
      </Html>
    </mesh>
  );
};

export default Annotation;