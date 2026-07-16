import { Header } from '@/components/Header';
import { ArrowUpRight, GithubIcon, LinkedinIcon } from '@/components/Icons';
import { ProjectVisual } from '@/components/ProjectVisual';

const projects = [
  {
    number: '01',
    title: 'Linux commands, rebuilt in C',
    description:
      'A collection of low-level projects recreating familiar Linux tools such as ls, top and sudo. The work focused on memory management, processes, permissions and clean command-line behavior.',
    tags: ['C', 'Linux', 'System programming'],
    href: 'https://github.com/cassydjye/Linux_commands',
    linkLabel: 'View repository',
    kind: 'terminal' as const,
  },
  {
    number: '02',
    title: 'Duck Hunt recreation',
    description:
      'A graphical C project built with CSFML. I worked on the game loop, sprite animation, scoring, input handling and the small details that make a simple arcade game feel responsive.',
    tags: ['C', 'CSFML', 'Game development'],
    href: '/assets/csfml_video.mp4',
    linkLabel: 'Watch the demo',
    kind: 'duck' as const,
  },
   {
    number: '03',
    title: 'Hello Kitty Cars',
    description:
      'A deliberately playful website combining Hello Kitty with Japanese car culture. It was a way to experiment with visual direction, layout and front-end interactions outside school assignments.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    href: '/projects/hellokitty-cars/',
    linkLabel: 'Open the project',
    kind: 'kitty' as const,
  },
  {
    number: '04',
    title: 'E-Girls website',
    description:
      'The official website for E-Girls, an association helping women and girls discover sectors where they are still underrepresented through events, workshops and accessible resources.',
    tags: ['React', 'Next.js', 'TypeScript'],
    href: 'https://egirls.fr',
    linkLabel: 'Open the website',
    kind: 'girls' as const,
  },
];

const skillGroups = [
  { label: 'Languages', value: 'C, Python, JavaScript, Kotlin' },
  { label: 'Front-end', value: 'HTML, CSS, React, Next.js' },
  { label: 'Tools', value: 'Git, GitHub, Linux, VS Code, Trello' },
  { label: 'Practices', value: 'Teamwork, version control, technical support' },
];

export default function Home() {
  return (
    <>
      <Header />

      <main id="top">
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-main">
            <p className="eyebrow">Software development student · La Réunion</p>
            <h1 id="hero-title">Seedjye<br />Malbrouck</h1>
            <p className="hero-intro">
              I build practical software, from low-level C programs to web and Android applications. I am currently in my second year at Epitech La Réunion.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#projects">
                See my work <ArrowUpRight />
              </a>
              <a className="text-link" href="https://github.com/cassydjye" target="_blank" rel="noreferrer">
                GitHub profile <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          <aside className="hero-note" aria-label="Current profile summary">
            <p className="note-label">Currently</p>
            <dl>
              <div>
                <dt>Studying</dt>
                <dd>Epitech La Réunion</dd>
              </div>
              <div>
                <dt>Working with</dt>
                <dd>C, web &amp; mobile</dd>
              </div>
              <div>
                <dt>Also doing</dt>
                <dd>TekTek ambassador</dd>
              </div>
            </dl>
          </aside>
        </section>

        <section className="section section-about" id="about">
          <div className="shell section-grid">
            <div>
              <p className="section-index">About</p>
            </div>
            <div className="about-copy">
              <h2>Learning by building things that actually work.</h2>
              <div className="two-columns">
                <p>
                  At Epitech, most of my progress comes from project-based learning. Rebuilding familiar tools from scratch has taught me to understand what happens underneath an interface, not only how to use it.
                </p>
                <p>
                  I also enjoy the human side of technology. As a TekTek ambassador, I present the school during events, and during my internship in a city IT department I helped users while developing an internal employee directory.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-projects" id="projects">
          <div className="shell">
            <div className="section-heading">
              <p className="section-index">Selected projects</p>
              <h2>A few things I have built.</h2>
            </div>

            <div className="project-list">
              {projects.map((project) => (
                <article className="project" key={project.title}>
                  <div className="project-copy">
                    <p className="project-number">{project.number}</p>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <ul className="tag-list" aria-label="Technologies used">
                      {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                    </ul>
                    <a className="project-link" href={project.href} target="_blank" rel="noreferrer">
                      {project.linkLabel} <ArrowUpRight size={17} />
                    </a>
                  </div>
                  <ProjectVisual kind={project.kind} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-experience" id="experience">
          <div className="shell section-grid">
            <div>
              <p className="section-index">Experience</p>
            </div>
            <div>
              <div className="experience-item">
                <div>
                  <h3>Web development internship</h3>
                  <p className="experience-place">City IT department</p>
                </div>
                <p>
                  Built an internal employee directory with card views, search, sorting and authentication. I also answered calls and helped users with day-to-day technical issues.
                </p>
              </div>
              <div className="experience-item">
                <div>
                  <h3>TekTek ambassador</h3>
                  <p className="experience-place">Epitech La Réunion</p>
                </div>
                <p>
                  Represent the school during open days, forums and presentations, and explain the Epitech learning model to future students and their families.
                </p>
              </div>
              <div className="experience-item">
                <div>
                  <h3>Android team project</h3>
                  <p className="experience-place">Kotlin · Android Studio</p>
                </div>
                <p>
                  Contributed to a mobile and tablet application using GitHub for collaboration, shared branches and version control throughout the project.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-skills" aria-labelledby="skills-title">
          <div className="shell section-grid">
            <div>
              <p className="section-index">Skills</p>
            </div>
            <div>
              <h2 id="skills-title">A simple toolkit, used with care.</h2>
              <div className="skills-list">
                {skillGroups.map((group) => (
                  <div key={group.label}>
                    <h3>{group.label}</h3>
                    <p>{group.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="shell contact-inner">
            <div>
              <p className="eyebrow">Get in touch</p>
              <h2>Let&apos;s talk about a project, an internship or technology.</h2>
            </div>
            <div className="contact-links">
              <a href="https://www.linkedin.com/in/seedjye-malbrouck-99401934a/" target="_blank" rel="noreferrer">
                <LinkedinIcon /> LinkedIn <ArrowUpRight size={17} />
              </a>
              <a href="https://github.com/cassydjye" target="_blank" rel="noreferrer">
                <GithubIcon /> GitHub <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <p>© 2026 Seedjye Malbrouck</p>
          <p>Designed and built with Next.js.</p>
        </div>
      </footer>
    </>
  );
}
