import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from '../../styles/Skills.module.css';

const skillTabs = [
  {
    id: 'core',
    label: 'Core Skills',
    icon: 'fas fa-code',
    skills: [
   // Languages
{ name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
{ name: 'Go', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg' },
{ name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
{ name: 'C#', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
{ name: 'C++', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
{ name: 'C', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },

// Web
{ name: 'HTML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
{ name: 'CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
{ name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
{ name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
{ name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
{ name: 'React Native', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' }, // same logo as React
{ name: 'Angular', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
{ name: 'NodeJS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
{ name: 'ExpressJS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
{ name: 'Spring Boot', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
{ name: 'GraphQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },
{ name: 'Jest', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg' },
{ name: 'Cypress', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Cypress.png' }, // External source; no devicon
{ name: 'Mocha', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mocha/mocha-plain.svg' },

// APIs & Messaging
{ name: 'REST', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/api/api-original.svg' }, // Placeholder, custom icon may be needed
{ name: 'SOAP', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/SOAP_logo.svg' }, // External source
{ name: 'WebSocket', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Websocket.svg' }, // External source
{ name: 'JMS', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Java_Message_Service_logo.png' }, // External source
{ name: 'Apache Kafka', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Apache_kafka-icon.svg' }, // External source

// Databases & Caching
{ name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
{ name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
{ name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
{ name: 'Redis', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
{ name: 'DynamoDB', logo: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/amazondynamodb.svg' }, // From Simple Icons

    ]
  },
  {
    id: 'tools',
    label: 'DevOps & Tools',
    icon: 'fas fa-cloud',
    skills: [
// DevOps & Cloud
{ name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
{ name: 'Azure', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
{ name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
{ name: 'Kubernetes', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
{ name: 'Terraform', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg' },
{ name: 'Jenkins', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg' },
{ name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
{ name: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
{ name: 'Bitbucket', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bitbucket/bitbucket-original.svg' },
{ name: 'NGINX', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg' },
{ name: 'Bash', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg' },
{ name: 'YAML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/yaml/yaml-original.svg' },

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
