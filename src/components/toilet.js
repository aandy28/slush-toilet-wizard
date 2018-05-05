import React from "react";
import styled from "styled-components";
import PersonType from "./personType";

const SelectedToilet = styled.div`
  position: fixed;
  width: calc(100vw - 10vw);
  height: 100%;
  bottom: 0;
  left: 0;
  padding: 40vh 0 10vh 10vw;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  top: 0;

  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    width: calc(100% - 12vh);
  }

  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
    width: calc(100% - 12vh);
  }

  > * {
    position: relative;
    z-index: 1020;
  }

  .selected-toilet__bg {
    width: 100%;
    position: fixed;
    left: 0;
  }
  .selected-toilet__bg--up {
    top: 0;
    height: 100vh;
    background: #fff;
  }
  .selected-toilet__bg {
    transform-origin: 0 0;
  }
  .selected-toilet__bg--down {
    top: 40vh;
    height: 60vh;
    background: #f5f0ef;

    @media screen and (max-width: 768px) {
      top: 30vh;
      height: 70vh;
    }
  }

  .selected-toilet__title {
    margin: -1.5em 0 0.1em;
    font-size: 4.5em;
    color: #000552;
    font-weight: 700;

    @media screen and (max-width: 768px) {
      font-size: 2em;
    }
  }

  .selected-toilet__subtitle {
    text-transform: uppercase;
    margin: 0.75em 0 1em 0;
    letter-spacing: 0.115em;
    font-size: 1.75em;
    color: #000552;

    @media screen and (max-width: 768px) {
      font-size: 1em;
    }
  }

  .selected-toilet__description {
    line-height: 1.5;
    font-weight: bold;
    max-width: 50%;
    margin: 2em 0 0 0;
    color: #000552;

    &__alert {
      color: #f20905;
      margin: 0;
      padding: 0;
    }

    @media screen and (max-width: 768px) {
      max-width: 50%;
      font-size: 0.85em;
      margin: 1em 0 0 0;
    }
  }

  svg {
    position: absolute;
    top: 10vh;
    right: 10vw;
    height: 80vh;
    padding: 2px;

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
  }

  .selected-toilet__close {
    position: absolute;
    top: 0;
    right: 0;
    border: 0;
    background: none;
    margin: 1em;
    cursor: pointer;
    font-size: 1.5em;
    color: #000552;
    padding: 1px 7px 2px;

    &:focus {
      outline: none;
    }

    svg {
      position: static;
      display: block;
      width: 1.5em;
      height: 1.5em;
      margin: 0 auto;

      path {
        fill: #000552;
      }
    }
  }
`;

class Toilet extends React.Component {
  hideSelected() {
    this.props.hideSelected();
  }

  render() {
    const item = this.props.item;
    return (
      <SelectedToilet className="toilet">
        <div className="selected-toilet__bg selected-toilet__bg--up" />
        <div className="selected-toilet__bg selected-toilet__bg--down" />
        <h2 className="selected-toilet__title">{item.map_id}</h2>
        <h3 className="selected-toilet__subtitle">Information:</h3>
        {item.location !== "" ? (
          <p className="selected-toilet__description">{item.location}</p>
        ) : (
          <p className="selected-toilet__description__alert">
            There is currently no location data for this toilet.
          </p>
        )}
        <p className="selected-toilet__description">
          The current queue time for this toilet is {item.queue_time} minutes.
        </p>

        <PersonType status={item.queue_level} personType={item.type} />
        <button
          className="selected-toilet__close"
          onClick={() => {
            this.hideSelected();
          }}
        >
          <svg id="icon-cross" viewBox="0 0 24 24" width="100%" height="100%">
            <title>cross</title>
            <path d="M 5.5,2.5 C 5.372,2.5 5.244,2.549 5.146,2.646 L 2.646,5.146 C 2.451,5.341 2.451,5.659 2.646,5.854 L 8.793,12 2.646,18.15 C 2.451,18.34 2.451,18.66 2.646,18.85 L 5.146,21.35 C 5.341,21.55 5.659,21.55 5.854,21.35 L 12,15.21 18.15,21.35 C 18.24,21.45 18.37,21.5 18.5,21.5 18.63,21.5 18.76,21.45 18.85,21.35 L 21.35,18.85 C 21.55,18.66 21.55,18.34 21.35,18.15 L 15.21,12 21.35,5.854 C 21.55,5.658 21.55,5.342 21.35,5.146 L 18.85,2.646 C 18.66,2.451 18.34,2.451 18.15,2.646 L 12,8.793 5.854,2.646 C 5.756,2.549 5.628,2.5 5.5,2.5 Z" />
          </svg>
        </button>
      </SelectedToilet>
    );
  }
}

export { Toilet as default };
