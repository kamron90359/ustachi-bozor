// Deterministic demo QR-like pattern generated from `value`.
// Architecture allows swapping this for a real QR generator later without
// changing the component's public API.
function generatePattern(value, cells) {
  let seed = 0;
  for (let i = 0; i < value.length; i++) seed = seed * 31 + value.charCodeAt(i) >>> 0;
  const cellsArr = [];
  for (let i = 0; i < cells * cells; i++) {
    seed = seed * 1103515245 + 12345 >>> 0;
    cellsArr.push((seed >> 16) % 3 !== 0);
  }
  return cellsArr;
}
export default function QRCodeCard({
  value,
  title,
  description,
  size = 96
}) {
  const cells = 11;
  const pattern = generatePattern(value, cells);
  const cellSize = size / cells;
  return <div className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-white p-3">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={title || 'QR kod'} className="shrink-0 rounded-lg">
        <rect width={size} height={size} fill="white" />
        {pattern.map((on, i) => {
        if (!on) return null;
        const x = i % cells * cellSize;
        const y = Math.floor(i / cells) * cellSize;
        return <rect key={i} x={x} y={y} width={cellSize} height={cellSize} fill="#071A3D" />;
      })}
        {/* finder-pattern-style corners for a QR feel */}
        {[[0, 0], [size - cellSize * 3, 0], [0, size - cellSize * 3]].map(([fx, fy], i) => <g key={i}>
            <rect x={fx} y={fy} width={cellSize * 3} height={cellSize * 3} fill="#071A3D" />
            <rect x={fx + cellSize * 0.6} y={fy + cellSize * 0.6} width={cellSize * 1.8} height={cellSize * 1.8} fill="white" />
            <rect x={fx + cellSize} y={fy + cellSize} width={cellSize * 1} height={cellSize} fill="#071A3D" />
          </g>)}
      </svg>
      {(title || description) && <div className="min-w-0">
          {title && <p className="text-xs font-semibold text-[var(--color-navy)]">{title}</p>}
          {description && <p className="mt-0.5 text-[11px] text-[var(--color-muted)]">{description}</p>}
        </div>}
    </div>;
}
