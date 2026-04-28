import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Connect</h4>
            <p>
              <a
                href="mailto:manideepgrandhe@gmail.com"
                data-cursor="disable"
              >
                manideepgrandhe@gmail.com
              </a>
            </p>
            <p>
              <a href="tel:+17036231121" data-cursor="disable">
                (703) 623-1121
              </a>
            </p>
            <p>Northlake, TX</p>
            <h4>Education</h4>
            <p>
              M.S. Computer Science (GPA 3.33), University of Central Missouri — 2014
            </p>
            <p>
              B.Tech Computer Science, JNTU Hyderabad, India — 2013
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
            <a
              href="/Manideep_Grandhe_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Resume (PDF) <MdArrowOutward />
            </a>
            <a
              href="mailto:manideepgrandhe@gmail.com"
              data-cursor="disable"
              className="contact-social"
            >
              Email <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              3D portfolio template by <span>Akash Malhotra</span>
              <br />
              Content by <span>Manideep Grandhe</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
