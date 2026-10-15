// Pill button whose label rolls up on hover, letter by letter.
export default function RollButton({ children, onClick, href, type = 'button', className = '', dark = false, ...rest }) {
  const label = String(children)
  const inner = (
    <span className="rb__inner" aria-hidden="true">
      <span className="rb__row">
        {label.split('').map((c, i) => (
          <span className="rb__c" style={{ '--i': i }} key={i}>{c === ' ' ? '\u00a0' : c}</span>
        ))}
      </span>
      <span className="rb__row rb__row--b">
        {label.split('').map((c, i) => (
          <span className="rb__c" style={{ '--i': i }} key={i}>{c === ' ' ? '\u00a0' : c}</span>
        ))}
      </span>
    </span>
  )
  const cls = `rb ${dark ? 'rb--dark' : ''} ${className}`
  if (href)
    return (
      <a className={cls} href={href} target="_blank" rel="noreferrer" aria-label={label} data-cursor="link" {...rest}>{inner}</a>
    )
  return (
    <button className={cls} type={type} onClick={onClick} aria-label={label} data-cursor="link" {...rest}>{inner}</button>
  )
}
