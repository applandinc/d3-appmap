import d3 from 'd3';

import Momentum from './momentum.js';

export default function momentum(zoom, selection) {
  const m = new Momentum(zoom, selection);
  const onZoom = zoom.on('zoom');
  const onBlur = window.onblur;

  selection
    .on('mousedown', () => m.hold())
    .on('mouseup', () => m.release())
    .on('pointerdown', () => m.hold())
    .on('pointerup', () => m.release())
    .on('touchstart', () => m.hold())
    .on('touchend', () => m.release())
    .on('touchcancel', () => m.release());

  window.addEventListener('mouseup', () => m.release());
  window.addEventListener('pointerup', () => m.release());
  window.onblur = () => {
    if (onBlur) {
      onBlur();
    }

    m.cancel();
  };

  zoom.on('zoom', () => {
    m.updateTransform(d3.event.transform);
    if (onZoom) {
      onZoom();
    }
  });

  const translateTo = zoom.translateTo;
  zoom.translateTo = (...args) => {
    m.cancel();
    return translateTo(...args);
  };

  const translate = zoom.translate;
  zoom.translate = (...args) => {
    m.cancel();
    return translate(...args);
  };

  return zoom;
}
