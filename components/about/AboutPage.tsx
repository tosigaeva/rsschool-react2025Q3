export const AboutPage = () => (
  <div className="relative mx-auto my-0 max-w-7xl p-5">
    <h1 className="name">Anastasiia Barkovskaia</h1>
    <h2 className="level">Junior Front-end Developer</h2>

    <section className="mx-auto my-0 w-1/2 text-start">
      <h2>About me</h2>
      <p>
        I am motivated to learn HTML, CSS, JavaScript, and frameworks to develop
        modern and user-friendly web applications. My goal is to become a
        skilled Frontend Developer who contributes to impactful projects. I
        prioritize continuous learning and staying updated with industry trends
        to adapt to new advancements.
      </p>
    </section>
    <section className="mx-auto my-0 w-1/2 text-start">
      <h2>Skills</h2>
      <ul>
        <li className="pb-2.5">
          <span className={"label"}>Web development: </span>
          HTML, CSS, JavaScript
        </li>
        <li className="pb-2.5">
          <span className={"label"}>Frameworks and libraries: </span>
          Vue.js, Express, Jest
        </li>
        <li className="pb-2.5">
          <span className={"label"}>Version control: </span>
          GIT, GitHub
        </li>
        <li className="pb-2.5">
          <span className={"label"}>Graphics: </span>
          Figma
        </li>
      </ul>
    </section>
    <section className="mx-auto my-0 w-1/2 text-start">
      <h2>Education</h2>
      <p>
        <span>Tula State University, Russia</span>
      </p>
      <p>Radiophysics and Electronics</p>
    </section>
    <section className="mx-auto my-0 w-1/2 text-start">
      <h2>English</h2>
      <p>B1 - Pre-Intermediate</p>
    </section>

    <a
      className="mt-7.5 inline-block text-2xl text-black dark:text-white"
      href="https://rs.school/courses/reactjs"
      target="_blank"
      rel="noreferrer"
    >
      link to the RS School React course
    </a>
  </div>
);
