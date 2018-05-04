import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as toiletsActions from "../actions/toiletsActions";
import PropTypes from "prop-types";
import React from "react";
import { CSSTransitionGroup } from "react-transition-group";
import styled from "styled-components";
import Toilet from "./toilet";

const ToiletsListContainer = styled.div`
  padding: 0.5rem;
  max-width: 1200px;
  margin: auto;
`;

const ToiletItems = styled.div`
  margin: 10em auto 7em;
  position: relative;
  padding: 0 1em;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media screen and (max-width: 768px)
  {
    padding: 0 1vw;
  }

`;

const ToiletItem = styled.div`
  padding: 0 4vw;
  margin: 0 0 12vh;
  @media screen and (max-width: 768px)
  {
    padding: 0 2vw;
  }
  &:nth-child(odd) .item {
    margin-top: -8em;
  }

  .item {
    height: 100%;
    padding-top: 10em;
    position: relative;
    cursor: pointer;
    transition: all .3s ease-in-out;

    &:hover
    {
      transform: scale(1.1);
    }

    &__bg {
      height: 20em;
      background: #000552;
      position: relative;
      box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);

      @media screen and (max-width: 768px)
      {
        height: 10em;
      }
    }

    &__title {
      position: relative;
      margin: 0.5em 0 0.5em 0;
      font-size: 1.75em;
      color: #000;
      font-weight: 700;

      @media screen and (max-width: 768px)
      {
        font-size: 1.25em;
      }
    }

    svg {
      max-height: 25em;
      margin: 0 auto;
      display: block;
      position: absolute;
      top: 0;
      left: 50%;
      pointer-events: none;
      transform: translate3d(-50%, 0, 0);

      @media screen and (max-width: 768px)
      {
        max-height: 19em;
      }

      path {
        fill: white;
        stroke: #000552;
        stroke-width: 2px;
      }
    }
  }
`;

class toiletsList extends React.Component {
  constructor() {
    super();
    this.state = {
      isHidden: true,
      selectedToilet: {}
    };
  }
  componentWillMount() {
    this.props.toiletsActions.fetchToilets();
  }

  showLarger(item) {
    this.setState({ isHidden: !this.state.isHidden, selectedToilet: item });
  }

  hideSelected() {
    this.setState({ isHidden: !this.state.isHidden, selectedToilet: {} });
  }

  renderToilet(selectedToilet)
  {
    return(
    <Toilet
        key={selectedToilet.id}
        hideSelected={() => {
          this.hideSelected();
        }}
        item={selectedToilet}
      />)
  }

  renderData(item) {
    return (
      <ToiletItem key={item.id}>
        <div
          className="item"
          onClick={() => {
            this.showLarger(item);
          }}
        >
          <div className="item__bg" />
          {item.type === "male" ? (
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

          <h2 className="item__title">{item.map_id}</h2>
          
        </div>
      </ToiletItem>
    );
  }

  render() {
    if (!this.props.toilets) {
      return <div>Loading Stuff...</div>;
    } else {
      return (
        <ToiletsListContainer className="">
          <ToiletItems>
            {this.props.toilets.map((item, index) => {
              return this.renderData(item);
            })}
          </ToiletItems>
          <CSSTransitionGroup
          transitionName="toiletTransition"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {!this.state.isHidden && (this.renderToilet(this.state.selectedToilet))}
          </CSSTransitionGroup>
        </ToiletsListContainer>
      );
    }
  }
}

toiletsList.propTypes = {
  toiletsActions: PropTypes.object,
  toilets: PropTypes.array
};

function mapStateToProps(state) {
  return {
    toilets: state.toilets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toiletsActions: bindActionCreators(toiletsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(toiletsList);
