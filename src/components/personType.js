import React from "react";
import styled from "styled-components";

const Person = styled.svg`
  position: absolute;
  top: 10vh;
  right: 10vw;
  height: 80vh;

  @media screen and (max-width: 768px) {
    right: -1vh;
    height: 35vh;
  }

  @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    height: 80vh;
    right: 10vw;
  }

  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 2) {
    height: 50vh;
  }

  /* Landscape */
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2) {
    height: 80vh;
    right: 10vw;
  }

  path {
    stroke: #000552;
    stroke-width: 2px;
  }
`;

class PersonType extends React.Component {
  statusSelect(status) {
    switch (status) {
      case 1:
        return "#329803";
      case 2:
        return "#F29205";
      case 3:
        return "#F20905";
      default:
        break;
    }
  }
  render() {
    const currentStatus = this.statusSelect(this.props.status);
    return this.props.personType === "male" ? (
      <Person
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 192 512"
      >
        <path
          fill={currentStatus}
          d="M96 0c35.346 0 64 28.654 64 64s-28.654 64-64 64-64-28.654-64-64S60.654 0 96 0m48 144h-11.36c-22.711 10.443-49.59 10.894-73.28 0H48c-26.51 0-48 21.49-48 48v136c0 13.255 10.745 24 24 24h16v136c0 13.255 10.745 24 24 24h64c13.255 0 24-10.745 24-24V352h16c13.255 0 24-10.745 24-24V192c0-26.51-21.49-48-48-48z"
        />
      </Person>
    ) : (
      <Person
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 512"
      >
        <path
          fill={currentStatus}
          d="M128 0c35.346 0 64 28.654 64 64s-28.654 64-64 64c-35.346 0-64-28.654-64-64S92.654 0 128 0m119.283 354.179l-48-192A24 24 0 0 0 176 144h-11.36c-22.711 10.443-49.59 10.894-73.28 0H80a24 24 0 0 0-23.283 18.179l-48 192C4.935 369.305 16.383 384 32 384h56v104c0 13.255 10.745 24 24 24h32c13.255 0 24-10.745 24-24V384h56c15.591 0 27.071-14.671 23.283-29.821z"
        />
      </Person>
    );
  }
}

export { PersonType as default };
