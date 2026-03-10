import React, { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowLeft } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';
import './TeamDetails.css';
import Footer from '../components/footer/footer';
import Akhila from '../assests/teampics/akhila.jpg' ;
import prudhvi from '../assests/teampics/prudhvi.jpeg' ;
import neeraj from '../assests/teampics/neeraj.jpeg' ;
import sowjanya from '../assests/teampics/sowjanya.jpeg' ;
import yasaswinii from '../assests/teampics/yasaswinii.jpeg' ;
import saikumar from '../assests/teampics/saikumar.jpg' ;
import aravvind from '../assests/teampics/aravvind.jpg' ;
import venky from '../assests/teampics/venky.jpg' ;
import umaa from '../assests/teampics/umaa.jpg' ;
import Dpjunior from '../assests/teampics/Dpjunior.jpg' ;
import Dpsenior from '../assests/teampics/Dpsenior.jpg';
import deepujunior from '../assests/teampics/deepujunior.jpg' ;
import govindjunior from '../assests/teampics/govindjunior.jpg' ;
import prudhvijunior from '../assests/teampics/prudhvijunior.jpg' ;
import swarnasenior from '../assests/teampics/swarnasenior.jpg' ;
import tejasenior from '../assests/teampics/tejasenior.jpg' ;

const TeamDetails = () => {
  const navigate = useNavigate();
  const [selectedBatch, setSelectedBatch] = useState("2024");

  const batch2024Details = {
    batch: "2024",
    teamNumber: "DevOrbit",
    teamLead: [
      { 
        name: 'Prudhvi', 
        role: 'Team-Lead',
        image: prudhvi, 
        social: {
          github: 'https://github.com/Prudhvi2k3',
          linkedin: 'https://www.linkedin.com/in/prudhvi-ankamreddi/',
          email: 'prudhviankamreddi1@gmail.com'
        }
      }
    ],
    seniorDevelopers: [
      { 
        name: 'NEERA MADHAV', 
        role: 'Senior-Developer',
        image: neeraj,
        social: {
          github: 'https://github.com/NeerajMadhav',
          linkedin: 'https://www.linkedin.com/in/neerajmadhav/',
          email: 'neerajmadhav777@gmail.com'
        }
      },
      { 
        name: 'Yasaswini', 
        role: 'Senior-Developer',
        image: yasaswinii,
        social: {
          github: 'https://github.com/Yasaswini313',
          linkedin: 'https://www.linkedin.com/in/yasaswini-jakkula-a74413226/',
          email: 'yasaswinianudurga@gmail.com'
        }
      },
      { 
        name: 'Sowjanya', 
        role: 'Senior-Developer',
        image: sowjanya,
        social: {
          github: 'https://github.com/SOWJANYATILLAPUDI',
          linkedin: 'https://www.linkedin.com/in/sowjanya-tillapudi-19005623b/',
          email: 'tillapudisowjanya04@gmail.com'
        }
      },
      { 
        name: 'Venky', 
        role: 'Senior-Developer',
        image: venky,
        social: {
          github: 'https://github.com/venky-1710',
          linkedin: 'https://www.linkedin.com/in/venky1710',
          email: 'venkysss47@gmail.com'
        }
      }
    ],
    juniorDevelopers: [
      { 
        name: 'Aravind Swamy', 
        role: 'Junior-Developer',
        image: aravvind,
        social: {
          github: 'https://github.com/Aravindswamymajjuri',
          linkedin: 'https://linkedin.com/in/prudhvi',
          email: 'aravindswamymajjuri143@gmail.com'
        }
      },
      {
        name: 'Saikumar', 
        role: 'Junior-Developer',
        image: saikumar,
        social: {
          github: 'https://github.com/SAIKUMAR008212',    
          linkedin: 'https://www.linkedin.com/in/sai-kumar-kannuru-661673287/',
          email: 'ksai33393@gmail.com'
        }
      },
      { 
        name: 'Akhila', 
        role: 'Junior-Developer',
        image: Akhila,
        social: {
          github: 'https://github.com/AkhilaBelugula15',
          linkedin: 'https://www.linkedin.com/in/akhila-belugula-801444287/',
          email: 'belugulaakhilanaidu@gmail.com'
        }
      },
      { 
        name: 'Uma Seershika', 
        role: 'Junior-Developer',
        image: umaa,
        social: {
          github: 'https://github.com/umaseershika4',
          linkedin: 'https://www.linkedin.com/in/uma-seershika-yadla-b88a15276/ ',
          email: ' umaseershika@gmail.com'
        }
      },
    ]
  };

  const batch2025Details = {
    batch: "2025",
    teamNumber: "Hackathon",
    teamLead: [
      { 
        name: 'Aravind Swamy', 
        role: 'Team-Lead',
        image: aravvind,
        social: {
          github: 'https://github.com/Aravindswamymajjuri',
          linkedin: 'https://linkedin.com/in/prudhvi',
          email: 'aravindswamymajjuri143@gmail.com'
        }
      },
    ],
    seniorDevelopers: [
      { 
        name: 'Durga Prasad', 
        role: 'Senior-Developer',
        image: Dpsenior,
        social: {
          github: 'https://github.com/DurgaPrasad-54',
          linkedin: 'https://in.linkedin.com/in/durga-prasad-koppireddy-778516275',
          email: 'prasad8790237@gmail.com'
        }
      },
      { 
        name: 'Sai Teja', 
        role: 'Senior-Developer',
        image: tejasenior,
        social: {
          github: 'https://github.com/tejnaiduu',
          linkedin: 'https://www.linkedin.com/in/saiteja-kumpatla-a724b8293/',
          email: 'tejnaidukumpatla123@gmail.com'
        }
      },
      { 
        name: 'Swarna', 
        role: 'Senior-Developer',
        image: swarnasenior,
        social: {
          github: 'https://github.com/kandaswarna123',
          linkedin: 'https://www.linkedin.com/in/swarna-kanda-a9459a288',
          email: 'kandha815@gmail.com'
        }
      },
      // { 
      //   name: 'Balaji', 
      //   role: 'Senior-Developer',
      //   image: venky,
      //   social: {
      //     github: 'https://github.com',
      //     linkedin: 'https://www.linkedin.com',
      //     email: 'seniordev4@gmail.com'
      //   }
      // }
    ],
    juniorDevelopers: [
      { 
        name: 'Prudhvi', 
        role: 'Junior-Developer',
        image: prudhvijunior,
        social: {
          github: 'https://github.com',
          linkedin: 'https://www.linkedin.com',
          email: 'juniordev1@gmail.com'
        }
      },
      {
        name: 'Durga Prasad', 
        role: 'Junior-Developer',
        image: Dpjunior,
        social: {
          github: 'https://github.com/Durga62823',    
          linkedin: 'https://www.linkedin.com/in/durga-prasad-peddapalli-1616a8297/',
          email: 'psivadurgaprasad88@gmail.com'
        }
      },
      { 
        name: 'Govind', 
        role: 'Junior-Developer',
        image: govindjunior,
        social: {
          github: 'https://github.com/govindgovind0987',
          linkedin: 'https://www.linkedin.com',
          email: 'mamidalagovind5599@gmail.com'
        }
      },
      { 
        name: 'G.H.S.Deepthi', 
        role: 'Junior-Developer',
        image: deepujunior,
        social: {
          github: 'https://github.com/deepthigopisetti',
          linkedin: 'https://www.linkedin.com/in/deepthi-gopisetti-a49870292/',
          email: 'deepugopisetti@gmail.com'
        }
      },
    ]
  };

  const teamDetails = selectedBatch === "2024" ? batch2024Details : batch2025Details;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div>
      <div className="teamdetails-container">
        <button className="teamdetails-back-button" onClick={handleBackClick}>
          <FaArrowLeft /> 
        </button>
        
        <h1 className='teamdetails-heading'>Batch-{teamDetails.batch}</h1>
        
        {/* Batch Selector Buttons */}
        <div className="teamdetails-batch-selector">
          <button 
            className={`teamdetails-batch-button ${selectedBatch === "2024" ? "active" : ""}`}
            onClick={() => setSelectedBatch("2024")}
          >
            2024 BATCH
          </button>
          <button 
            className={`teamdetails-batch-button ${selectedBatch === "2025" ? "active" : ""}`}
            onClick={() => setSelectedBatch("2025")}
          >
            2025 BATCH
          </button>
        </div>
        
        <h2 className="teamdetails-team-title" style={{marginTop : "-20px"}}>Team {teamDetails.teamNumber}</h2>

        {/* Team Lead Section */}
        <h2 className="teamdetails-team-title">Team Lead</h2>
        <div className="teamdetails-team-section">
          {teamDetails.teamLead.map((member, index) => (
            <div key={index} className="teamdetails-team-card teamdetails-lead">
              <div className="teamdetails-profile-image-container">
                <img src={member.image} alt={member.name} className="teamdetails-profile-image" />
              </div>
              <div className="teamdetails-member-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <div className="teamdetails-social-links">
                  <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                    <FaGithub className="teamdetails-social-icon" />
                  </a>
                  <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="teamdetails-social-icon" />
                  </a>
                  <a href={`mailto:${member.social.email}`}>
                    <FaEnvelope className="teamdetails-social-icon" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Senior Developers Section */}
        <h2 className="teamdetails-team-title">Senior Developers</h2>
        <div className="teamdetails-team-section">
          {teamDetails.seniorDevelopers.map((member, index) => (
            <div key={index} className="teamdetails-team-card teamdetails-senior">
              <div className="teamdetails-profile-image-container">
                <img src={member.image} alt={member.name} className="teamdetails-profile-image" />
              </div>
              <div className="teamdetails-member-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <div className="teamdetails-social-links">
                  <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                    <FaGithub className="teamdetails-social-icon" />
                  </a>
                  <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="teamdetails-social-icon" />
                  </a>
                  <a href={`mailto:${member.social.email}`}>
                    <FaEnvelope className="teamdetails-social-icon" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Junior Developers Section */}
        <h2 className="teamdetails-team-title">Junior Developers</h2>
        <div className="teamdetails-team-section">
          {teamDetails.juniorDevelopers.map((member, index) => (
            <div key={index} className="teamdetails-team-card teamdetails-junior">
              <div className="teamdetails-profile-image-container">
                <img src={member.image} alt={member.name} className="teamdetails-profile-image" />
              </div>
              <div className="teamdetails-member-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <div className="teamdetails-social-links">
                  <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                    <FaGithub className="teamdetails-social-icon" />
                  </a>
                  <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="teamdetails-social-icon" />
                  </a>
                  <a href={`mailto:${member.social.email}`}>
                    <FaEnvelope className="teamdetails-social-icon" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
};

export default TeamDetails;