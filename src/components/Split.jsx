// Splits a string into word > char spans so GSAP can animate each glyph.
// Words wrapped in [brackets] receive the `is-ghost` class.
export default function Split({ text, className = '', charClass = 'ch', as: Tag = 'span' }) {
  const words = text.split(' ')
  return (
    <Tag className={className}>
      {words.map((raw, wi) => {
        const ghost = raw.startsWith('[') || raw.endsWith(']')
        const w = raw.replace(/[\[\]]/g, '')
        return (
          <span className={`w${ghost ? ' is-ghost' : ''}`} key={wi}>
            {w.split('').map((c, ci) => (
              <span className={charClass} key={ci}>{c}</span>
            ))}
            {wi < words.length - 1 && <span className="sp">&nbsp;</span>}
          </span>
        )
      })}
    </Tag>
  )
}
