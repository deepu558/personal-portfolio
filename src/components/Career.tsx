import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <p className="career-eyebrow">Shipped in production</p>
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
                <h5>Oracle Corporation · Kansas City, MO</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Architected a modular healthcare scheduling platform with Oracle JET
              (OJET), TypeScript, and React. Designed semantic objects and
              metadata for vector database storage with AI-powered semantic
              search. OpenAPI-based integrations for real-time appointment
              actions. Modernized Revenue Cycle apps with React and Oracle APEX,
              improving performance and WCAG compliance.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Senior Software Engineer</h4>
                <h5>Cerner Corporation · Kansas City, MO</h5>
              </div>
              <h3>2018–22</h3>
            </div>
            <p>
              Enhanced healthcare applications for global markets. Built web
              components for appointment workflows with React and Ruby on Rails.
              Partnered with product and UX; led code reviews and technical
              discussions. Root-cause analysis and reliability improvements for
              critical defects.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer</h4>
                <h5>Vista Applied Solutions (Client: Cerner) · Kansas City, MO</h5>
              </div>
              <h3>2015–18</h3>
            </div>
            <p>
              PHYSDOC and Revenue Cycle features for major hospital systems.
              Ruby on Rails APIs with React-Redux front ends, token-based auth,
              and RBAC. React foundations for new clients; WebSockets between
              React and Spring Boot for real-time sync. Responsive UI with
              strong unit test coverage.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer</h4>
                <h5>Vista Applied Solutions (Client: Deloitte) · Camp Hill, PA</h5>
              </div>
              <h3>2015</h3>
            </div>
            <p>
              Maryland Health Information Exchange web application (ACA).
              Enterprise stack with Hibernate, Spring MVC, and SOAP/REST
              services to insurance carriers. PL/SQL on Oracle for performance.
              Kentucky Health Department claims processing POC.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
