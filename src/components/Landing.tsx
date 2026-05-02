import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <p className="landing-eyebrow">UI · Product · Healthcare</p>
            <h2>Hello! I&apos;m</h2>
            <h1>
              MANIDEEP
              <br />
              <span className="landing-name-accent">GRANDHE</span>
            </h1>
            <ul className="landing-badges" aria-label="Focus areas">
              <li>Interfaces &amp; design systems</li>
              <li>Accessible, WCAG-aware UI</li>
              <li>Complex workflows made clear</li>
            </ul>
          </div>
          <div className="landing-info">
            <h3>Senior engineer · interface-led delivery ·</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Healthcare</div>
              <div className="landing-h2-2">IT</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Product</div>
              <div className="landing-h2-info-1">UI</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
