import BlurText from '../lib/BlurText.jsx'

export default function Cta() {
  return (
    <section className="cta" id="mulai">
      <div className="ripples" aria-hidden="true"><span /><span /><span /></div>
      <div className="wrap">
        <BlurText as="h2">Siap sebelum <em>air naik.</em></BlurText>
        <p className="rv">Buka SIRANDU dan ketahui risiko, posko, dan jalur evakuasi di sekitar Anda.</p>
        <a className="btn pri rv" href="#top">Buka peta SIRANDU <span className="arr">→</span></a>
      </div>
    </section>
  )
}
