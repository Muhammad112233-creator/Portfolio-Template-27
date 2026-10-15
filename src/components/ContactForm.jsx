import { useState } from 'react'
import { contact } from '../data/content'
import { usePageTransition } from '../hooks/useTransition.jsx'
import RollButton from './RollButton.jsx'

// Two-step submit: CONFIRM validates and morphs into SEND.
// Wire `onSend` to Formspree / EmailJS / your own endpoint (see README).
export default function ContactForm() {
  const go = usePageTransition()
  const [budget, setBudget] = useState(0)
  const [confirmed, setConfirmed] = useState(false)
  const [errors, setErrors] = useState({})
  const [f, setF] = useState({ name: '', email: '', msg: '' })

  const set = (k) => (e) => { setF({ ...f, [k]: e.target.value }); setErrors({ ...errors, [k]: false }) }

  const confirm = (e) => {
    e.preventDefault()
    const err = {
      name: !f.name.trim(),
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email),
      msg: f.msg.trim().length < 5,
    }
    setErrors(err)
    if (!Object.values(err).some(Boolean)) setConfirmed(true)
  }

  const send = async () => {
    // Example: await fetch('https://formspree.io/f/XXXX', { method:'POST', headers:{Accept:'application/json'}, body: new FormData(...) })
    go('/sent', 'sent')
  }

  return (
    <form className="cf" onSubmit={confirm} noValidate>
      {[
        ['name', 'Your name*', 'text'],
        ['email', 'Your email*', 'email'],
      ].map(([k, l, t]) => (
        <label className={`cf__f ${errors[k] ? 'is-err' : ''} ${f[k] ? 'is-filled' : ''}`} key={k}>
          <span>{l}</span>
          <input type={t} value={f[k]} onChange={set(k)} autoComplete={k} disabled={confirmed} />
          <i />
        </label>
      ))}
      <label className={`cf__f cf__f--area ${errors.msg ? 'is-err' : ''} ${f.msg ? 'is-filled' : ''}`}>
        <span>Tell me about the project*</span>
        <textarea rows="3" value={f.msg} onChange={set('msg')} disabled={confirmed} />
        <i />
      </label>

      <div className="cf__budget">
        <p>Budget (USD)</p>
        <div className="cf__opts" role="radiogroup">
          {contact.budgets.map((b, i) => (
            <button type="button" role="radio" aria-checked={budget === i} key={b}
              className={budget === i ? 'is-on' : ''} onClick={() => setBudget(i)} data-cursor="link">{b}</button>
          ))}
        </div>
      </div>

      <div className={`cf__submit ${confirmed ? 'is-confirmed' : ''}`}>
        {!confirmed ? (
          <RollButton type="submit">CONFIRM</RollButton>
        ) : (
          <div className="cf__send">
            <button type="button" className="cf__edit" onClick={() => setConfirmed(false)} data-cursor="link">edit</button>
            <RollButton dark onClick={send}>SEND IT</RollButton>
          </div>
        )}
      </div>
    </form>
  )
}
