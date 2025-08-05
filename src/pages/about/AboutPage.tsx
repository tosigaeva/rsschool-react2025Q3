import '../../App.css';

const AboutPage = () => (
  <div className="relative mx-auto my-0 max-w-[1200px] p-5">
    <h1 className="name">Anastasiia Barkovskaia</h1>
    <h2 className="level">Junior Front-end Developer</h2>

    <section>
      <h2 className="section-title">About me</h2>
      <p>
        I am motivated to learn HTML, CSS, JavaScript, and frameworks to develop
        modern and user-friendly web applications. My goal is to become a
        skilled Frontend Developer who contributes to impactful projects. I
        prioritize continuous learning and staying updated with industry trends
        to adapt to new advancements.
      </p>
    </section>
    <section>
      <h2>Skills</h2>
      <ul>
        <li>
          <span className={'label'}>Web development: </span>
          HTML, CSS, JavaScript
        </li>
        <li>
          <span className={'label'}>Frameworks and libraries: </span>
          Vue.js, Express, Jest
        </li>
        <li>
          <span className={'label'}>Version control: </span>
          GIT, GitHub
        </li>
        <li>
          <span className={'label'}>Graphics: </span>
          Figma
        </li>
      </ul>
    </section>
    <section>
      <h2>Education</h2>
      <p>
        <span>Tula State University, Russia</span>
      </p>
      <p>Radiophysics and Electronics</p>
    </section>
    <section>
      <h2>English</h2>
      <p>B1 - Pre-Intermediate</p>
    </section>

    <a
      href="https://rs.school/courses/reactjs"
      target="_blank"
      rel="noreferrer"
    >
      link to the RS School React course
    </a>
  </div>
);

export default AboutPage;
