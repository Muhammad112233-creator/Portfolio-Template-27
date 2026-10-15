import RollButton from '../components/RollButton.jsx'
import { usePageTransition } from '../hooks/useTransition.jsx'

export default function NotFound() {
  const go = usePageTransition()
  return (
    <section className="nf">
      <h1 className="nf__t">404</h1>
      <p>This page wandered off. The rest of the site is still here.</p>
      <RollButton dark onClick={() => go('/', 'home')}>TAKE ME HOME</RollButton>
    </section>
  )
}
