import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from '../../styles/Skills.module.css';

const skillTabs = [
  {
    id: 'core',
    label: 'Core Skills',
    icon: 'fas fa-code',
    skills: [
      { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'C', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
      { name: 'C++', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
      { name: 'C#', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
      { name: 'ASP.NET', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg' },
      { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Angular', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
      { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'NodeJS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Tailwind', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Bootstrap', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
      { name: 'SQL Server', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg' },
      { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'Material UI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg' }
    ]
  },
  {
    id: 'tools',
    label: 'DevOps & Tools',
    icon: 'fas fa-cloud',
    skills: [
      { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'Azure', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
      { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
      { name: 'YAML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/yaml/yaml-original.svg' },
      { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' }
    ]
  },
  {
    id: 'certs',
    label: 'Certificates',
    icon: 'fas fa-award',
    certificates: [
      {
        name: 'Azure Fundamentals',
        logo: '/certificates/azure.png'
      },
      {
        name: 'AWS Certified Developer',
        logo: '/certificates/aws.png'
      }
    ]
  }
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState('core');
  const currentTab = skillTabs.find(t => t.id === activeTab);

  return (
    <section id="skills" className={styles.container}>
      <div className="aurora-bg">
        <div className="aurora aurora-1"></div>
        <div className="aurora aurora-2"></div>
        <div className="aurora aurora-3"></div>
      </div>

      <div className={styles.tabWrapper}>
        {skillTabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <i className={`${tab.icon} ${activeTab === tab.id ? styles.activeIcon : ''}`}></i>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <motion.div 
        key={activeTab}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={styles.tabContent}
      >
        {currentTab.skills && (
          <div className={styles.skillsGrid}>
            {currentTab.skills.map((skill, index) => (
              <div 
                key={index} 
                className={styles.skillCard}
              >
                <img 
                  src={skill.logo} 
                  alt={skill.name} 
                  className={styles.skillIconImg}
                />
                <div className={styles.skillName}>
                  {skill.name}
                </div>
              </div>
            ))}
          </div>
        )}

        {currentTab.certificates && (
          <div className={styles.certificatesGrid}>
            {currentTab.certificates.map((cert, index) => (
              <div 
                key={index} 
                className={styles.certificateCard}
              >
                <img 
                  src={cert.logo} 
                  alt={cert.name} 
                  className={styles.certificateImg}
                />
                <div className={styles.certificateTitle}>
                  {cert.name}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
