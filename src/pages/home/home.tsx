import React from "react";
import './home.scss';
import BlockItem from "./block-item/block-item";
import SocialLinks from "./social-links/social-links";
import StackItems from "./stack-items/stack-items";
import Creator from "./creator/creator";
import LettersAnimation from "./letter-animation/letters-animation";
import MyApps from "./my-apps/my-apps";

class Home extends React.Component {
  render() {
    return (
      <div className="letter-container">
        <LettersAnimation />
        <div className="home-page">
          <Creator name={<>Igor <br /> Gerasimovich</>} additionalInfo={<>Ukraine, Full stack developer</>} />
          <BlockItem title="Useful links">
            <SocialLinks />
          </BlockItem>
          <BlockItem title="My stack">
            <StackItems />
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
