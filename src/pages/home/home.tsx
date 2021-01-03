import React from "react";
import './home.scss';
import BlockItem from "./block-item/block-item";
import SocialLinks from "./social-links/social-links";
import StackItems from "./stack-items/stack-items";
import Creator from "./creator/creator";
import LettersAnimation from "./letter-animation/letters-animation";
import MyApps from "./my-apps/my-apps";
import { Skill } from './types';
import RawSkillsList from './raw-skills-list';

const mainStack: Skill[] = [
  {level: "High", icon: "golang", name: "Golang"},
  {level: "High", icon: "postgresql", name: "PostgreSQL"},
  {level: "High", icon: "typescript", name: "Typescript"},
  {level: "Medium", icon: "react", name: "React"},
];

const additionalStack: Skill[] = [
  {level: "High", icon: "", name: "NSQ"},
  {level: "High", icon: "", name: "Microservices"},
  {level: "Medium", icon: "", name: "Docker"},
  {level: "Medium", icon: "python", name: "Python"},
  {level: "High", icon: "mysql", name: "MySql"},
  {level: "High", icon: "javascript", name: "JavaScript"},
  {level: "High", icon: "vuejs", name: "VueJS"},
  {level: "Medium", icon: "php", name: "PHP"},
  {level: "Medium", icon: "", name: "Linux"},
  {level: "Basic", icon: "", name: "Kubernetes"},
  {level: "Basic", icon: "", name: "C++"},
];

class Home extends React.Component {
  render() {
    return (
      <div className="letter-container">
        <LettersAnimation />
        <div className="home-page">
          <Creator name={<>Igor <br /> Gerasimovich</>} additionalInfo={<>Ukraine, Full stack developer (Backend priority)</>} />
          <BlockItem title="Useful links">
            <SocialLinks />
          </BlockItem>
          <BlockItem title="Main stack">
            <StackItems items={mainStack} />
          </BlockItem>
          <BlockItem title="Additional stack">
            <RawSkillsList skills={additionalStack} />
          </BlockItem>
          <BlockItem title="My apps">
            <MyApps />
          </BlockItem>
        </div>
      </div>
    );
  }
}

export default Home;
