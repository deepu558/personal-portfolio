import "./styles/TechStack.css";
import { techStackGroups } from "../data/techStackData";

const TechStack = () => {
  return (
    <section
      className="techstack section-container"
      aria-labelledby="techstack-heading"
    >
      <p className="techstack-eyebrow">Design &amp; delivery</p>
      <h2 id="techstack-heading" className="techstack-heading">
        Tools I design with
      </h2>
      <p className="techstack-lead">
        Stack for building polished interfaces, resilient services, and
        accessible healthcare experiences — organized by how I use them day to
        day.
      </p>

      <div className="techstack-groups">
        {techStackGroups.map((group) => (
          <div key={group.title} className="techstack-group">
            <h3 className="techstack-group-title">{group.title}</h3>
            <ul className="techstack-grid" role="list">
              {group.items.map(({ name, Icon }) => (
                <li key={name} className="techstack-card">
                  <Icon className="techstack-icon" aria-hidden />
                  <p className="techstack-name">{name}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
