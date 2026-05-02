import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I&apos;m</h2>
            <h1>
              MANIDEEP
              <br />
              <span>GRANDHE</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>Senior Software Engineer ·</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Healthcare</div>
              <div className="landing-h2-2">IT</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Full-stack</div>
              <div className="landing-h2-info-1">Delivery</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
