/**
 * Structured profile chunks for the $0 local chat matcher + markdown export.
 * Keep aligned with your site and CV.
 */
export const PROFILE_CHUNKS: readonly { title: string; body: string }[] = [
  {
    title: "Contact",
    body: `Email: manideepgrandhe@gmail.com
Phone: (703) 623-1121
Location: Northlake, TX 76226
LinkedIn: linkedin.com/in/manideep-grandhe`,
  },
  {
    title: "Professional summary",
    body: `Senior software engineer with 11+ years in Healthcare IT.
Leads with UI clarity and systems thinking; ships full-stack healthcare products.
Strong in React, TypeScript, Oracle JET (OJET), Java, Ruby on Rails.
Focus: scheduling and revenue-cycle UIs, modular components, OpenAPI integrations, WCAG/accessibility, design patterns, agile delivery across the SDLC.
Testing: JUnit, RSpec, Playwright, Selenium.`,
  },
  {
    title: "Education",
    body: `M.S. Computer Science, GPA 3.33/4.0 — University of Central Missouri, Warrensburg, MO — 2014
B.Tech Computer Science — Jawaharlal Nehru Technological University, Hyderabad, India — 2013`,
  },
  {
    title: "Oracle — Software Developer 2 (IC2), Kansas City, MO (current)",
    body: `Modular healthcare scheduling platform with Oracle JET, TypeScript, and React: reusable components, information architecture, fast appointment flows.
OpenAPI-based integrations for real-time appointment actions.
Modernized Revenue Cycle apps with React and Oracle APEX; improved performance and WCAG compliance.`,
  },
  {
    title: "Cerner — Senior Software Engineer, Kansas City, MO (2018–2022)",
    body: `Enhanced healthcare applications for global markets.
Web components for appointment workflows with React and Ruby on Rails.
Partnered with product and UX; code reviews and technical discussions.
Root-cause analysis and reliability improvements for critical defects.`,
  },
  {
    title: "Vista / Cerner client — Software Engineer, Kansas City, MO (2015–2018)",
    body: `PHYSDOC and Revenue Cycle features for major hospital systems.
Ruby on Rails APIs with React-Redux front ends; token-based auth and RBAC.
React foundations for new clients; WebSockets between React and Spring Boot for real-time sync.
Responsive UI with strong unit test coverage.`,
  },
  {
    title: "Vista / Deloitte client — Software Engineer, Camp Hill, PA (2015)",
    body: `Maryland Health Information Exchange web application (ACA).
Hibernate, Spring MVC, SOAP/REST services to insurance carriers.
PL/SQL on Oracle for performance tuning.
Kentucky Health Department claims processing proof of concept.`,
  },
  {
    title: "Technical skills",
    body: `Languages: Java, TypeScript, JavaScript, Ruby
Frontend: React, Oracle JET, Node.js, HTML5, CSS3
Backend & APIs: Spring Boot, Ruby on Rails, REST, OpenAPI/Swagger
Data & platforms: Oracle DB, PostgreSQL, MySQL, Docker, Kubernetes, Jenkins, Git`,
  },
  {
    title: "Portfolio work highlights",
    body: `1. Healthcare scheduling & access — Oracle, OJET, React, TypeScript — modular scheduling UI, component libraries, OpenAPI, WCAG modernization.
2. Global healthcare applications — Cerner, React, Ruby on Rails — appointment workflows, web components, product/UX partnership, reliability.
3. PHYSDOC & revenue cycle — Vista/Cerner client, Rails, React, Spring — APIs, React-Redux, WebSockets with Spring Boot, auth/RBAC, tested responsive UI.
4. Health information exchange — Vista/Deloitte client, Spring, Hibernate, Oracle — enterprise MVC, SOAP/REST to carriers, PL/SQL, state HIE programs.`,
  },
];

/** Full markdown block (e.g. for exports); chat uses PROFILE_CHUNKS. */
export const RESUME_KNOWLEDGE = [
  "# Manideep Grandhe — profile",
  ...PROFILE_CHUNKS.map((c) => `## ${c.title}\n${c.body}`),
].join("\n\n");
