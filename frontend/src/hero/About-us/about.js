import React from 'react';
import './about.css';
// import aboutImage from '../../assests/First 5.png';
import aboutImg from '../../assests/about.jpg';

const AboutUs = () => {
  return (
    <section className="about-container" id="about">
      <div className="about-wrapper">
        <figure className="image-section">
          <img 
            src={aboutImg} 
            alt="Geometric pattern representing innovation" 
            className="about-image"
          />
          {/* <figcaption className="image-caption">Geometric pattern representing innovation</figcaption> */}
        </figure>
        <article className="content-section">
          <div className="title-container">
            <span className="vertical-line"></span>
            <h2 className="about-title">About Us</h2>
          </div>
          <p className="about-description">
           Dev-stack is a student-driven community at KIET College, fostering innovation through mentorship and collaborative projects. It is a combination of Dev-orbit and HACKATHON Platform . Hackathon platform extends this ecosystem as a comprehensive hackathon management platform, featuring role-based access for students, mentors, and coordinators. It provides end-to-end hackathon tracking—from team formation and progress monitoring to accessing completed, upcoming, and past events.
          </p>
        </article>
      </div>
    </section>
  );
};

export default AboutUs;