// Materiality classification logic (product-spec.md Section 9).
// Classifications are evaluated top-down; the highest matching classification
// always applies. A strong score on one axis cannot be overridden by a weak one.

export const CLASSIFICATIONS = {
  HIGHLY_MATERIAL: {
    key: 'HIGHLY_MATERIAL',
    label: 'Highly Material',
    fill: '#f6d5d0', // red-tinted
    swatch: '#e0b4ac',
  },
  MATERIAL: {
    key: 'MATERIAL',
    label: 'Material',
    fill: '#fbe6cf', // orange-tinted
    swatch: '#f2c79a',
  },
  WATCH_LIST: {
    key: 'WATCH_LIST',
    label: 'Watch List',
    fill: '#e8e8ea', // light gray
    swatch: '#d4d4d8',
  },
  NOT_MATERIAL: {
    key: 'NOT_MATERIAL',
    label: 'Not Material',
    fill: '#d4d4d8', // gray
    swatch: '#a1a1aa',
  },
}

// x = Financial Risk, y = Impact, both on a 1.0–5.0 scale.
export function classify(x, y) {
  if (x >= 3.5 && y >= 3.5) return CLASSIFICATIONS.HIGHLY_MATERIAL
  if (x >= 3.0 || y >= 3.0) return CLASSIFICATIONS.MATERIAL
  if ((x >= 2.0 && x < 3.0) || (y >= 2.0 && y < 3.0)) return CLASSIFICATIONS.WATCH_LIST
  return CLASSIFICATIONS.NOT_MATERIAL
}
