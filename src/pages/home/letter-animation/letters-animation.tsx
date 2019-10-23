import React, {RefObject} from "react";
import './styles.scss';

const getEvent = (container: RefObject<HTMLDivElement>) => {
  return (event: KeyboardEvent) => {
    const { key } = event;

    const animationTimeMs = 3000;
    const renderWaitTimeMs = 50;

    const textContent = key;
    const fontSize = (Math.random() * 100) + 20;
    const leftOffset = Math.random() * 100;
    const bottomOffset = Math.round(Math.random() * 100) + 10;

    const lettersContainer = container.current;
    if (lettersContainer === null) {
      return;
    }

    const letter = document.createElement('div');
    letter.classList.add('letters-animation__letter');
    letter.style.fontSize = `${fontSize}px`;
    letter.innerHTML = textContent;
    letter.style.left = `${leftOffset}%`;
    // letter.style.transition = `${animationTimeMs/1000}s`;

    lettersContainer.appendChild(letter);

    setTimeout(() => {
      letter.classList.add('letters-animation__letter-out');
      letter.style.bottom = `${bottomOffset}%`
    }, renderWaitTimeMs);

    setTimeout(() => {
      lettersContainer.removeChild(letter);
    }, animationTimeMs+renderWaitTimeMs);
  };
};

class LettersAnimation extends React.Component {
  lettersContainer: RefObject<HTMLDivElement>;

  constructor(props: any){
    super(props);

    this.lettersContainer = React.createRef<HTMLDivElement>();
  }

  componentDidMount(): void {
    window.addEventListener('keyup', getEvent(this.lettersContainer));
  }

  componentWillUnmount(): void {
    window.removeEventListener('keyup', getEvent(this.lettersContainer));
  }

  render() {
    return (
      <div className="letters-animation" ref={this.lettersContainer} />
    );
  }
}

export default LettersAnimation;
