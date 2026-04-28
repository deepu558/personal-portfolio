"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const TIMELINE_DATA = [
  {
    year: "2022 - Present",
    title: "Software Developer 2 (IC2)",
    org: "Oracle Corporation · Kansas City, MO",
    description:
      "Healthcare scheduling platform with Oracle JET, TypeScript, and React; semantic objects and vector DB-backed AI search; OpenAPI integrations; legacy Revenue Cycle modernization with React, Oracle APEX, and WCAG compliance.",
    type: "work",
  },
  {
    year: "2018 - 2022",
    title: "Senior Software Engineer",
    org: "Cerner Corporation · Kansas City, MO",
    description:
      "Enhanced global healthcare applications; React and Ruby on Rails web components for appointment workflows; partnered with product and UX; debugging, root cause analysis, and reliability improvements.",
    type: "work",
  },
  {
    year: "2015 - 2018",
    title: "Software Engineer",
    org: "Vista Applied Solutions Group (Cerner) · Kansas City, MO",
    description:
      "PHYSDOC and Revenue Cycle features; Ruby on Rails APIs with React-Redux; WebSockets between React and Spring Boot; responsive UI and unit tests.",
    type: "work",
  },
  {
    year: "2015",
    title: "Software Engineer",
    org: "Vista Applied Solutions Group (Deloitte) · Camp Hill, PA",
    description:
      "Maryland Health Information Exchange (ACA); Hibernate, Spring MVC, SOAP/REST; Oracle PL/SQL performance; Kentucky Health Department claims POC.",
    type: "work",
  },
  {
    year: "2014",
    title: "M.S. Computer Science (GPA 3.33)",
    org: "University of Central Missouri, Warrensburg, MO",
    description: "Graduate coursework and foundation for enterprise software engineering roles.",
    type: "education",
  },
  {
    year: "2013",
    title: "B.Tech Computer Science",
    org: "JNTU Hyderabad, India",
    description: "Undergraduate degree in computer science.",
    type: "education",
  },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative z-20 bg-[#0a0a0a] min-h-screen py-32 px-4 md:px-12 overflow-hidden" id="journey">
       {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[20%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
             My <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">Journey</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Eleven-plus years shipping healthcare software—from enterprise scheduling and revenue cycle to semantic search and accessible UIs.
          </p>
        </motion.div>

        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-linear-to-b from-blue-500/20 via-purple-500/50 to-blue-500/20 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {TIMELINE_DATA.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ item, index }: { item: any; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex items-center ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Spacer for desktop layout */}
      <div className="hidden md:block w-1/2" />

      {/* Point on Line */}
      <div className="absolute left-[20px] md:left-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-[#121212] transform -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
         <div className="absolute inset-0 bg-blue-400 blur-sm opacity-70" />
      </div>

      {/* Content Card */}
      <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
        <div className="group relative p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
          <div className={`flex flex-col ${isEven ? "md:items-end" : "md:items-start"} mb-2`}>
             <span className="text-xs text-blue-400 font-mono border border-blue-500/30 px-2 py-1 rounded-full bg-blue-500/10 mb-2 w-fit">
              {item.year}
            </span>
            <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
              {item.title}
            </h3>
          </div>
          
          <p className="text-sm text-purple-300 mb-4 font-medium uppercase tracking-wider">
            {item.org}
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
