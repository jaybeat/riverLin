import { useEffect, useRef, useState } from 'react'

export interface GalleryImage {
  src: string
  alt?: string
  orientation?: 'portrait' | 'landscape'
  caption?: string
}

interface Row {
  idxs: number[]
  height: number
}

/** 把图片按宽高比打包成「每行铺满容器宽度、行高等比」的 justified 相册，点击可看大图。 */
export default function ShowcaseGallery({
  images,
  gap = 14,
  baseHeight = 230,
  showCaptions = false,
  fallbackAlt = '',
}: {
  images: GalleryImage[]
  gap?: number
  baseHeight?: number
  showCaptions?: boolean
  fallbackAlt?: string
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [width, setWidth] = useState(0)
  const [ratios, setRatios] = useState<number[]>(() =>
    images.map((img) => (img.orientation === 'portrait' ? 9 / 16 : 16 / 9))
  )
  const [lightbox, setLightbox] = useState<string | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    setWidth(el.clientWidth)
    const ro = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  const setRatio = (idx: number, r: number) => {
    setRatios((prev) => {
      if (Math.abs(prev[idx] - r) < 0.001) return prev
      const next = [...prev]
      next[idx] = r
      return next
    })
  }

  const rows: Row[] = []
  if (width > 0) {
    let cur: number[] = []
    let sum = 0
    for (let i = 0; i < ratios.length; i++) {
      const r = ratios[i]
      if (cur.length) {
        const wIfAdd = (sum + r) * baseHeight + gap * cur.length
        if (wIfAdd > width) {
          rows.push({ idxs: cur, height: (width - gap * (cur.length - 1)) / sum })
          cur = [i]
          sum = r
          continue
        }
      }
      cur.push(i)
      sum += r
    }
    if (cur.length) {
      // 末行同样铺满整行；单图时限一个上限，避免被撑得过大
      const h = (width - gap * (cur.length - 1)) / sum
      rows.push({ idxs: cur, height: Math.min(h, baseHeight * 1.7) })
    }
  }

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      {rows.map((row, ri) => (
        <div
          key={ri}
          style={{
            display: 'flex',
            gap: `${gap}px`,
            marginBottom: ri < rows.length - 1 ? `${gap}px` : 0,
          }}
        >
          {row.idxs.map((idx) => {
            const img = images[idx]
            return (
              <figure
                key={idx}
                style={{ margin: 0, width: ratios[idx] * row.height }}
              >
                <img
                  src={img.src}
                  alt={img.alt || fallbackAlt}
                  loading="lazy"
                  onLoad={(e) => {
                    const el = e.currentTarget
                    if (el.naturalWidth && el.naturalHeight) {
                      setRatio(idx, el.naturalWidth / el.naturalHeight)
                    }
                  }}
                  onClick={() => setLightbox(img.src)}
                  style={{
                    width: '100%',
                    height: `${row.height}px`,
                    objectFit: 'cover',
                    borderRadius: '16px',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow)',
                    display: 'block',
                    cursor: 'zoom-in',
                  }}
                />
                {showCaptions && img.caption && (
                  <figcaption
                    style={{
                      fontSize: '13px',
                      color: 'var(--text-muted)',
                      marginTop: '10px',
                      lineHeight: 1.5,
                    }}
                  >
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            )
          })}
        </div>
      ))}

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px',
            cursor: 'zoom-out',
          }}
        >
          <img
            src={lightbox}
            alt=""
            style={{
              maxWidth: '92vw',
              maxHeight: '92vh',
              borderRadius: '12px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              display: 'block',
            }}
          />
        </div>
      )}
    </div>
  )
}
