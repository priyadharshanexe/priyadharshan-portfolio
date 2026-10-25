import React, { Component, useLayoutEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import FlexCarousel from './carousel/FlexCarousel.jsx';

const stage = document.querySelector('.project-stage');
const images = [...stage.querySelectorAll('.project-slide')];
const items = images.map(image => ({
  src: image.getAttribute('src'),
  alt: image.alt,
  title: image.dataset.title || 'Updating Project Soon',
  subtitle: image.dataset.description || 'Project details, source code, and demos will be shared here soon.'
}));

function enableFallback() {
  stage.classList.remove('is-enhanced');
  if (stage.dataset.fallbackReady) return;
  stage.dataset.fallbackReady = 'true';
  stage.tabIndex = 0;
  stage.setAttribute('aria-label', 'Project previews. Use the left and right arrow keys to browse.');
  let current = 0;
  let startX = null;
  const show = index => {
    current = (index + images.length) % images.length;
    images.forEach((image, i) => { image.hidden = i !== current; });
    stage.dataset.active = String(current);
  };
  stage.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'ArrowLeft') show(current - 1);
    if (event.key === 'ArrowRight') show(current + 1);
    if (event.key === 'Home') show(0);
    if (event.key === 'End') show(images.length - 1);
  });
  stage.addEventListener('pointerdown', event => { startX = event.clientX; });
  stage.addEventListener('pointerup', event => {
    if (startX !== null && Math.abs(event.clientX - startX) > 35) {
      show(current + (event.clientX < startX ? 1 : -1));
    }
    startX = null;
  });
  show(0);
}

class CarouselBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { enableFallback(); }
  render() { return this.state.failed ? null : this.props.children; }
}

let supported = false;
try {
  const gl = document.createElement('canvas').getContext('webgl2');
  supported = Boolean(gl);
  gl?.getExtension('WEBGL_lose_context')?.loseContext();
} catch { /* Keep the accessible image fallback. */ }

function ProjectGallery() {
  const [cardHeight, setCardHeight] = useState(0.65);
  useLayoutEffect(() => {
    const resize = () => {
      // Keep the original image size while the taller canvas accommodates the liquid bend.
      const baseHeight = Math.min(800, Math.max(540, window.innerHeight * 0.75));
      const imageHeight = Math.min(baseHeight * 0.65, stage.clientWidth * 0.88 / 1.5);
      setCardHeight(imageHeight / stage.clientHeight);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(stage);
    resize();
    return () => observer.disconnect();
  }, []);
  return (
      <FlexCarousel
        items={items}
        cardHeight={cardHeight}
        renderCaption={(item, index) => (
          <div key={index} className="project-caption project-caption--active" data-project-index={index}>
            <h2>{item.title}</h2>
            <p>{item.subtitle}</p>
            <div className="project-actions">
              <button className="github-button" type="button" disabled>GitHub · Soon</button>
              <button type="button" disabled>Demo · Soon</button>
            </div>
          </div>
        )}
        onChange={index => {
          stage.classList.add('is-enhanced');
          stage.dataset.active = String(index);
        }}
      />
  );
}

if (supported) {
  createRoot(document.getElementById('project-gallery')).render(
    <CarouselBoundary>
      <ProjectGallery />
    </CarouselBoundary>
  );
} else {
  enableFallback();
}
