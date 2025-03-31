// components/StarBackground.js
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from '../styles/StarBackground.module.css';

export default function StarBackground() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const starsRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create stars
    const starGeometry = new THREE.SphereGeometry(0.02, 8, 8);
    const starMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffffff,
      transparent: true,
      opacity: 0.8
    });

    const starCount = 200;
    for (let i = 0; i < starCount; i++) {
      const star = new THREE.Mesh(starGeometry, starMaterial);
      
      // Random position
      star.position.x = (Math.random() - 0.5) * 10;
      star.position.y = (Math.random() - 0.5) * 10;
      star.position.z = (Math.random() - 0.5) * 10;
      
      // Random size
      const scale = 0.5 + Math.random() * 0.5;
      star.scale.set(scale, scale, scale);
      
      // Random opacity
      star.material.opacity = 0.2 + Math.random() * 0.8;
      
      scene.add(star);
      starsRef.current.push(star);
    }

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate stars
      starsRef.current.forEach((star, index) => {
        star.rotation.x += 0.001 * (index % 2 ? 1 : -1);
        star.rotation.y += 0.001 * (index % 3 ? 1 : -1);
        
        // Twinkle effect
        star.material.opacity = 0.2 + Math.sin(Date.now() * 0.001 + index) * 0.3;
      });

      // Rotate camera
      camera.position.x = Math.sin(Date.now() * 0.0005) * 0.5;
      camera.position.y = Math.cos(Date.now() * 0.0005) * 0.5;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  return <div ref={containerRef} className={styles['star-background']} />;
}