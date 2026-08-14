import { useState } from 'react'

export default function Hero() {
  const moments = [
    { label: 'At the gate', detail: 'Site recognised · Your first story is ready' },
    { label: 'At a node', detail: 'Scan the marker · Hear what happened here' },
    { label: 'Keep walking', detail: 'Nearby moments appear as the site unfolds' },
  ]
  const [moment, setMoment] = useState(0)

  return (
    <>
<section className="hero">
    <div className="wrap hero-grid">
      <div>
        <div className="eyebrow">Dharohar Setu · a field companion</div>
        <h1 className="hero-title"><span className="hero-initial">W</span>alk in.<br />Let the place <em>speak.</em></h1>
        <p className="lead">Open Dharohar Setu at the gate. It recognises the site, leads you to the next node, and keeps each story close as you move.</p>
        <div className="hero-context" aria-label="Explore the Dharohar journey">
          <div className="hero-context-tabs">
            {moments.map((item, index) => (
              <button key={item.label} className={moment === index ? 'is-selected' : ''} onClick={() => setMoment(index)} type="button">{item.label}</button>
            ))}
          </div>
          <p><span className="context-dot"></span>{moments[moment].detail}</p>
        </div>
        <div className="hero-ctas">
          <a href="#how" className="btn btn-primary">Explore Dharohar Setu</a>
          <a href="/downloads/dharohar-app.apk" download="Dharohar.apk" className="btn btn-ghost">Download App</a>
        </div>
        <div className="hero-tags"><span>Location-aware</span><span>Made for walking</span><span>Listen in your language</span></div>
      </div>
      <div className="phone-stage">
        <div className="radar r1"></div>
        <div className="radar r2"></div>
        <div className="radar r3"></div>
        <div className="phone">
          <div className="notch"></div>
          <div className="screen"><img src="/assets/app-preview-1.jpg" alt="Dharohar app showing the Main Entrance Gate node with an AI Ask assistant" /></div>
        </div>
        <div className="floaty floaty-1"><span className="ico">📍</span>Node detected</div>
        <div className="floaty floaty-2"><span className="ico">🎧</span>Guide ready</div>
      </div>
    </div>
  </section>
    </>
  )
}
