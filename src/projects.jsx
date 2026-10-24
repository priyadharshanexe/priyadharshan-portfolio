import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import FlexCarousel from './carousel/FlexCarousel.jsx';

const stage = document.querySelector('.project-stage');
const images = [...stage.querySelectorAll('.project-slide')];
const items = images.map((image, index) => ({
  src: image.getAttribute('src'),
  alt: image.alt,
  title: `Project preview ${String(index + 1).padStart(2, '0')}`,
  subtitle: 'Details coming soon'
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

if (supported) {
  createRoot(document.getElementById('project-gallery')).render(
    <CarouselBoundary>
      <FlexCarousel
        items={items}
        onChange={index => {
          stage.classList.add('is-enhanced');
          stage.dataset.active = String(index);
        }}
      />
    </CarouselBoundary>
  );
} else {
  enableFallback();
}
