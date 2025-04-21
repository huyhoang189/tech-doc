import React, { useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Html } from '@react-three/drei';
import * as THREE from 'three';

const Model = ({ url }) => {
  const { scene } = useGLTF(url);
  const { camera, controls } = useThree();
  const group = useRef();

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(size);

    scene.position.sub(center);
    camera.position.set(0, 0, size.length() * 1.2);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();

    if (controls) {
      controls.target.set(0, 0, 0);
      controls.update();
    }
  }, [scene, camera, controls]);

  return <primitive ref={group} object={scene} />;
};

const ModelViewer = ({ modelUrl }) => {
  const containerRef = useRef();

  return (
    <div
      ref={containerRef}
      style={{ width: '800px', height: '600px', overflow: 'hidden', position: 'relative' }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        style={{ background: '#888', width: '94%', height: '100%' }}
        resize={{ scroll: false, debounce: 0 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={<Html center>Đang tải...</Html>}>
          <Model url={modelUrl} />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls enablePan enableZoom enableRotate makeDefault />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
