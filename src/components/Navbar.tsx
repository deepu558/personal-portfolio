import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { FaLinkedinIn } from "react-icons/fa6";
import { IoClose, IoMenu } from "react-icons/io5";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const LINKEDIN_URL = "https://www.linkedin.com/in/manideep-grandhe/";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          smoother.scrollTo(section, true, "top top");
        }
      });
    });
    window.addEventListener("resize", () => {
      ScrollSmoother.refresh(true);
    });
  }, []);

  useEffect(() => {
    const closeOnWide = () => {
      if (window.innerWidth >= 900) setMenuOpen(false);
    };
    window.addEventListener("resize", closeOnWide);
    return () => window.removeEventListener("resize", closeOnWide);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className={`header${menuOpen ? " header--menu-open" : ""}`}>
        <span className="navbar-title" data-cursor="disable">
          MG
        </span>
        <a
          href={LINKEDIN_URL}
          className="navbar-connect"
          data-cursor="disable"
          target="_blank"
          rel="noopener noreferrer"
        >
          linkedin.com/in/manideep-grandhe
        </a>

        <div className="header-actions">
          <a
            href={LINKEDIN_URL}
            className="navbar-linkedin-mobile"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="disable"
          >
            <FaLinkedinIn aria-hidden size={18} />
            <span>LinkedIn</span>
          </a>
          <button
            type="button"
            className="navbar-menu-btn"
            aria-expanded={menuOpen}
            aria-controls="navbar-mobile-panel"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            data-cursor="disable"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <IoClose size={26} /> : <IoMenu size={26} />}
          </button>
          <ul id="navbar-mobile-panel" className="navbar-nav-list">
            <li>
              <a
                data-href="#about"
                href="#about"
                onClick={closeMenu}
              >
                <HoverLinks text="ABOUT" />
              </a>
            </li>
            <li>
              <a data-href="#work" href="#work" onClick={closeMenu}>
                <HoverLinks text="WORK" />
              </a>
            </li>
            <li>
              <a
                data-href="#contact"
                href="#contact"
                onClick={closeMenu}
              >
                <HoverLinks text="CONTACT" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
