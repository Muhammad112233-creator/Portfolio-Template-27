// Inline text link: characters flip upward one after another on hover.
export default function RollLink({ label, onClick, className = '', href }) {
  const chars = label.split('')
  const body = (
    <>
      <span className="rl__sr">{label}</span>
      <span className="rl__wrap" aria-hidden="true">
        {chars.map((c, i) => (
          <span className="rl__c" key={i} style={{ '--i': i }}>
            <span className="rl__t">{c === ' ' ? '\u00a0' : c}</span>
            <span className="rl__b">{c === ' ' ? '\u00a0' : c}</span>
          </span>
        ))}
      </span>
    </>
  )
  if (href) return <a className={`rl ${className}`} href={href} target="_blank" rel="noreferrer" data-cursor="link">{body}</a>
  return <button type="button" className={`rl ${className}`} onClick={onClick} data-cursor="link">{body}</button>
}
