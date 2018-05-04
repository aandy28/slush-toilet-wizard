import React from "react";
import styled from "styled-components";

const SelectedToilet = styled.div`
  position: fixed;
  min-width: 1200px;
  height: 100%;
  bottom: 0;
  left: 0;
  padding: 10vh 10vh 10vh 10vw;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  top: 0;

  @media screen and (max-width: 768px)
  {
    padding: 30vh 0 5vh 10vw;
    width:100%;
    min-width: 1px;
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
  .selected-toilet__bg{
    transform-origin: 0 0;
  }
  .selected-toilet__bg--down {
    top: 40vh;
    height: 60vh;
    background: #f5f0ef;

    @media screen and (max-width: 768px)
    {
      top: 30vh;
      height: 70vh;
    }
  }

  .selected-toilet__title {
    margin: 1em 0 0.1em;
    font-size: 4.5em;
    color: #000552;
    font-weight: 700;

    @media screen and (max-width: 768px)
    {
      font-size: 2em;
    }
  }

  .selected-toilet__subtitle {
    text-transform: uppercase;
    margin: 0.75em 0 1em 0;
    letter-spacing: 0.115em;
    font-size: 1.75em;
    color: #000552;

    @media screen and (max-width: 768px)
    {
      font-size: 1em;
    }
  }

  .selected-toilet__description {
    line-height: 1.5;
    font-weight: bold;
    max-width: 50%;
    margin: 2em 0 0 0;
    color: #000552;

    @media screen and (max-width: 768px)
    {
      max-width: 70%;
      font-size: 0.85em;
      margin: 1em 0 0 0;
    }
  }

  svg {
    position: absolute;
    top: 10vh;
    right: 10vw;
    height: 80vh;

    @media screen and (max-width: 768px)
    {
      right: -1vh;
      height: 50vh;
    }

    path {
      fill: #000552;
    }
  }

  .selected-toilet__close {
    position: absolute;
    top: 0;
    right: 0;
    border: 0;
    background: none;
    margin: 2em;
    cursor: pointer;
    font-size: 1.5em;
    color: #000552;
    padding: 1px 7px 2px;
    width:50px;
    
    @media screen and (max-width: 768px)
    {
      top: -20px;
      right: 20px;
      margin: 1em;
    }
    

    &:focus {
      outline: none;
    }

    svg {
    position: static;
    height: 50px;

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
        <h3 className="selected-toilet__subtitle">Constantin Frecker</h3>
        <p className="selected-toilet__description">
          The current queue time for this toilet is {item.queue_time} minutes.
        </p>

        {this.props.item.type === "male" ? (
          <svg
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 192 512"
            className="svg-inline--fa fa-male fa-w-6 fa-5x"
          >
            <path
              fill="currentColor"
              d="M96 0c35.346 0 64 28.654 64 64s-28.654 64-64 64-64-28.654-64-64S60.654 0 96 0m48 144h-11.36c-22.711 10.443-49.59 10.894-73.28 0H48c-26.51 0-48 21.49-48 48v136c0 13.255 10.745 24 24 24h16v136c0 13.255 10.745 24 24 24h64c13.255 0 24-10.745 24-24V352h16c13.255 0 24-10.745 24-24V192c0-26.51-21.49-48-48-48z"
              className=""
            />
          </svg>
        ) : (
          <svg
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 512"
            className="svg-inline--fa fa-female fa-w-8 fa-5x"
          >
            <path
              fill="currentColor"
              d="M128 0c35.346 0 64 28.654 64 64s-28.654 64-64 64c-35.346 0-64-28.654-64-64S92.654 0 128 0m119.283 354.179l-48-192A24 24 0 0 0 176 144h-11.36c-22.711 10.443-49.59 10.894-73.28 0H80a24 24 0 0 0-23.283 18.179l-48 192C4.935 369.305 16.383 384 32 384h56v104c0 13.255 10.745 24 24 24h32c13.255 0 24-10.745 24-24V384h56c15.591 0 27.071-14.671 23.283-29.821z"
              className=""
            />
          </svg>
        )}
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
