import React from 'react';
import './about.css';
import marsImage from '../../assests/mars.png';
import mobileImage from '../../assests/mobile-mars.png';

function About() {
  return (
    <div
      className="impact-container"
      style={{ backgroundImage: `url(${window.innerWidth <= 767 ? mobileImage : marsImage})` }}
    >
      <div className="mars-con" />

      <div className="cards-con">
        {/* Card 1 */}
        <div className="cards">
          <h3 className="impact-title">01. Sparkling Innovation</h3>
          <p className="impact-">
           DevStack encourages students to transform raw ideas into practical hackathon projects. By providing clear problem statements, collaboration tools, participants can focus on creativity and build solutions that solve real-world problems.
          </p>
        </div>

        {/* Card 2 */}
        <div className="cards">
          <h3 className="impact-title">02. Empowering Future Leaders</h3>
          <p className="impact-">
            It provides a learning space where people gain hands-on experience. Students improve their development skills, teamwork abilities, and problem-solving while working on real projects in hackathons.
          </p>
        </div>

        {/* Card 3 */}
        <div className="cards">
          <h3 className="impact-title">03. Creating a Better World</h3>
          <p className="impact-">
            It promotes solution-oriented hackathons that focus on solving meaningful challenges. By encouraging practical innovation,helps students create projects that have real value beyond the event.
          </p>
        </div>

        {/* Card 4 */}
        <div className="cards">
          <h3 className="impact-title">04. Building Bridges</h3>
          <p className="impact-">
            It connects students, mentors, coordinators within a single collaborative ecosystem. This streamlined communication ensures better guidance, smoother project development, and effective evaluation throughout the hackathon.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
