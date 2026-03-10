import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import './faqs.css';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="faq-item">
      <button className="faq-question" onClick={onClick}>
        {question}
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && <div className="faq-answer">{answer}</div>}
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "What is DevStack?",
      answer: "DevStack is a platform built to manage and support complete hackathon workflows. It provides tools for organizing hackathons, managing participants, and facilitating project development. DevStack aims to create an engaging and collaborative environment for developers to showcase their skills and connect with like-minded individuals."
    },
    {
      question: "Who can use DevStack?",
      answer: "Students, mentors, coordinators, and organizers can use DevStack based on role-based access."
    },
    {
      question: "Can I create or join a team in DevStack?",
      answer: "Yes, DevStack supports both team creation and team joining during active hackathons."
    },
    {
      question: "What can I submit through DevStack?",
      answer: "You can submit project details, repository links, documentation, demos, and final presentations."
    },
    {
      question: "Does DevStack support mentor and judge workflows?",
      answer: "Yes, DevStack enables mentor guidance and judge evaluation with organized tracking."
    },
    {
      question: "Is DevStack only for coding events?",
      answer: "DevStack is designed mainly for hackathons and innovation events, including technical and solution-based tracks."
    }
  ];

  const handleItemClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1 className='faqh1'>FREQUENTLY ASKED QUESTIONS</h1>
      {faqData.map((item, index) => (
        <FAQItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onClick={() => handleItemClick(index)}
        />
      ))}
    </div>
  );
};

export default FAQ;