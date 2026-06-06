'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useSpring, useMotionValueEvent } from 'framer-motion';

interface ScrollytellingCanvasProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  onLoadingProgress: (progress: number) => void;
  onLoaded: () => void;
}

export default function ScrollytellingCanvas({
  containerRef,
  onLoadingProgress,
  onLoaded,
}: ScrollytellingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isPreloaded, setIsPreloaded] = useState(false);

  // Bind scroll progress to the scrolling container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth out the scroll input with a spring config
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 35,
    stiffness: 120,
    mass: 0.8,
    restDelta: 0.0001,
  });

  // Preload all 240 frames
  useEffect(() => {
    const totalFrames = 240;
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    const checkAllLoaded = () => {
      loadedCount++;
      const percent = Math.round((loadedCount / totalFrames) * 100);
      onLoadingProgress(percent);

      if (loadedCount === totalFrames) {
        setImages(loadedImages);
        setIsPreloaded(true);
        onLoaded();
      }
    };

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      // Format number to 3 digits (e.g. 1 -> 001)
      const frameNum = String(i).padStart(3, '0');
      img.src = `/frames/ezgif-frame-${frameNum.toString()}.png`;
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded; // don't block load on individual missing/corrupt frames
      loadedImages.push(img);
    }
  }, [onLoadingProgress, onLoaded]);

  // Function to draw a frame on the canvas
  const drawFrame = (progress: number) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Map progress (0 to 1) to frame index (0 to 239)
    const frameIndex = Math.min(
      images.length - 1,
      Math.max(0, Math.floor(progress * images.length))
    );

    const img = images[frameIndex];
    if (!img) return;

    // Handle high DPI (Retina) scaling
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    // Aspect ratio fitting logic (Cover/Contain style)
    // We want to center the vehicle image
    const imgRatio = img.width / img.height;
    const canvasRatio = width / height;

    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      // Canvas is wider than image aspect ratio (letterbox top/bottom)
      // So height dictates the sizing
      drawHeight = height;
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
    } else {
      // Canvas is narrower than image aspect ratio (letterbox sides)
      // So width dictates sizing
      drawWidth = width;
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) / 2;
    }

    // Draw the image
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Redraw when images load or viewport is resized
  useEffect(() => {
    if (!isPreloaded || images.length === 0) return;

    const handleResize = () => {
      drawFrame(smoothProgress.get());
    };

    window.addEventListener('resize', handleResize);
    // Draw initial frame
    drawFrame(smoothProgress.get());

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isPreloaded, images]);

  // Subscribe to spring scroll progress and redraw
  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    drawFrame(latest);
  });

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="block w-full h-full object-cover select-none pointer-events-none"
      />
    </div>
  );
}
