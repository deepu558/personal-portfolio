import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Developer 2 (IC2)</h4>
                <h5>Oracle · Kansas City, MO</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Healthcare scheduling platform with Oracle JET, TypeScript, and React;
              semantic objects and vector DB–backed AI search; OpenAPI integrations;
              Revenue Cycle modernization with React, Oracle APEX, and WCAG compliance.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Senior Software Engineer</h4>
                <h5>Cerner · Kansas City, MO</h5>
              </div>
              <h3>2018–22</h3>
            </div>
            <p>
              Enhanced global healthcare applications; React and Ruby on Rails web
              components for appointment workflows; partnered with product and UX;
              root-cause analysis and reliability improvements.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer</h4>
                <h5>Vista / Cerner client · Kansas City</h5>
              </div>
              <h3>2015–18</h3>
            </div>
            <p>
              PHYSDOC and Revenue Cycle features; Ruby on Rails APIs with React-Redux;
              WebSockets between React and Spring Boot; auth, RBAC, and responsive UI.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer</h4>
                <h5>Vista / Deloitte · Camp Hill, PA</h5>
              </div>
              <h3>2015</h3>
            </div>
            <p>
              Maryland Health Information Exchange (ACA); Spring MVC, Hibernate, SOAP/REST;
              Oracle PL/SQL; Kentucky Health Department claims POC.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
