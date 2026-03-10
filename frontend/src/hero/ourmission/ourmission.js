import React from 'react';
import './MissionVision.css';
// import project from '../../assests/project.png'
import MissionImg from '../../assests/ourMissionVision/ourMission.jpeg';
import VisionImg from '../../assests/ourMissionVision/ourVision.jpeg';
const MissionVision = () => {
  return (
    <div className="mission-vision-container">
      <div className="content-wrapper">
        <div className="mission">
          <div className="mission-header">
            <div className="vertical-line"></div>
            <h2 className='missionvision'>Our Mission</h2>
          </div>
          <div className="mission-content">
            <p className='para'>
              DevStack’s mission is to make hackathon participation more structured, inclusive, and impactful.
The platform aims to simplify collaboration, provide mentorship support, and help participants transform innovative ideas into practical solutions. By offering organized workflows and development guidance, DevStack ensures every participant has the opportunity to learn, build, and deliver meaningful projects.
            </p>
            <img src={MissionImg} alt="Satellite in space" className="mission-image" />
          </div>
        </div>
        
        <div className="vision">
          <div className="vision-content">
            <img src={VisionImg} alt="Satellite in space" className="vision-image" />
            <div className="vision-text">
              <div className="mission-header">
                <div className="vertical-line"></div>
                <h2 className='missionvision'>Our Vision</h2>
              </div>
              <p className='para'>
              DevStack’s vision is to become a reliable innovation hub where students consistently build, test, and present scalable solutions.
The platform aims to foster a culture of creativity, collaboration, and problem-solving, enabling future developers and innovators to contribute meaningful ideas that address real-world challenges.
It also strives to create an ecosystem where continuous learning, experimentation, and innovation become a natural part of every participant’s development journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionVision;