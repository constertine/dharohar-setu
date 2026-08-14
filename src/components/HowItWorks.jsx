export default function HowItWorks() {
  return (
    <>
<section className="trail-section" id="how">
    <div className="wrap">
      <div className="trail-head reveal">
        <div className="eyebrow">How Dharohar Setu works</div>
        <h2>One visit, guided from the gate to the final stop.</h2>
        <p>Dharohar Setu follows the site as it unfolds: it recognises where you are, starts the right trip, and keeps every next step in context.</p>
      </div>
      <div className="trail">
        <svg className="trail-route" viewBox="0 0 220 900" preserveAspectRatio="none" aria-hidden="true">
          <path className="trail-line" d="M62 32 C62 84 158 98 158 182 S62 248 62 332 S158 398 158 482 S62 548 62 632 S158 698 158 782 S92 838 92 892" />
          <path className="trail-line-fill" id="trailFill" d="M62 32 C62 84 158 98 158 182 S62 248 62 332 S158 398 158 482 S62 548 62 632 S158 698 158 782 S92 838 92 892" />
        </svg>

        <div className="trail-node reveal" data-step="1" style={{'--pin': '-176px'}}>
          <div className="trail-marker">1</div>
          <h3>Visit a heritage site</h3>
          <p>Arrive at a mapped location — a fort, a campus, a monument — with the Dharohar app open.</p>
        </div>
        <div className="trail-node reveal trail-node-right" data-step="2" style={{'--pin': '-80px'}}>
          <div className="trail-marker">2</div>
          <h3>Dharohar detects your location</h3>
          <p>GPS geofencing confirms you're on-site and surfaces the right guide automatically — no search required.</p>
        </div>
        <div className="trail-node reveal" data-step="3" style={{'--pin': '-176px'}}>
          <div className="trail-marker">3</div>
          <h3>Scan the King node to begin</h3>
          <p>At the main entrance, a QR scan starts your trip and unlocks the route through the site.</p>
        </div>
        <div className="trail-node reveal trail-node-right" data-step="4" style={{'--pin': '-80px'}}>
          <div className="trail-marker">4</div>
          <h3>Track each stop as you move</h3>
          <p>The live map shows visited and upcoming nodes, so your progress is always clear.</p>
        </div>
        <div className="trail-node reveal" data-step="5" style={{'--pin': '-176px'}}>
          <div className="trail-marker">5</div>
          <h3>Get contextual AI guidance</h3>
          <p>Ask anything about where you're standing. The AI guide answers with context specific to that exact node.</p>
        </div>
        <div className="trail-node reveal trail-node-right" data-step="6" style={{'--pin': '-146px'}}>
          <div className="trail-marker">6</div>
          <h3>Complete your trip, then discover more</h3>
          <p>Finish with a quick review and get nearby recommendations for places worth seeing next.</p>
        </div>
      </div>
    </div>
  </section>
    </>
  )
}
