import React from 'react';
import { Skill } from '../types';
import './style.scss';

class RawSkillsList extends React.Component<{skills: Skill[]}, {}> {
  render() {
    const $rawSkills = this.props.skills.map(skill => (
      <div className="raw-skill">
        <div className="raw-skill__title">{skill.name}</div>
        <div className="raw-skill__level">{skill.level}</div>
      </div>
    ));

    return (
      <div className="raw-skills-list">
        {$rawSkills}
      </div>
    );
  }
}

export default RawSkillsList;
