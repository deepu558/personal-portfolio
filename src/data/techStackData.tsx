import type { IconType } from "react-icons";
import { DiDatabase, DiJava } from "react-icons/di";
import {
  SiCss,
  SiDocker,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiJenkins,
  SiKubernetes,
  SiMysql,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiRuby,
  SiRubyonrails,
  SiSpringboot,
  SiSwagger,
  SiTypescript,
} from "react-icons/si";

export type TechItem = { name: string; Icon: IconType };
export type TechGroup = { title: string; items: TechItem[] };

/** Grouped from resume “Technical Skills” — adjust icons/names anytime in this file. */
export const techStackGroups: TechGroup[] = [
  {
    title: "Languages",
    items: [
      { name: "Java", Icon: DiJava },
      { name: "TypeScript", Icon: SiTypescript },
      { name: "JavaScript", Icon: SiJavascript },
      { name: "Ruby", Icon: SiRuby },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "React", Icon: SiReact },
      { name: "Oracle JET", Icon: SiJavascript },
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "HTML5", Icon: SiHtml5 },
      { name: "CSS3", Icon: SiCss },
    ],
  },
  {
    title: "Backend & APIs",
    items: [
      { name: "Spring Boot", Icon: SiSpringboot },
      { name: "Ruby on Rails", Icon: SiRubyonrails },
      { name: "REST & OpenAPI", Icon: SiSwagger },
    ],
  },
  {
    title: "Data & platforms",
    items: [
      { name: "Oracle DB", Icon: DiDatabase },
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "MySQL", Icon: SiMysql },
      { name: "Docker", Icon: SiDocker },
      { name: "Kubernetes", Icon: SiKubernetes },
      { name: "Jenkins", Icon: SiJenkins },
      { name: "Git", Icon: SiGit },
    ],
  },
];
