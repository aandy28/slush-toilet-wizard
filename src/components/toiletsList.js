import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as toiletsActions from "../actions/toiletsActions";
import PropTypes from "prop-types";
import React from "react";
import { CSSTransitionGroup } from "react-transition-group";
import styled from "styled-components";
import Toilet from "./toilet";
import PersonType from "./personType";

const ToiletsListContainer = styled.div`
  padding: 0.5rem;
  max-width: 1200px;
  margin: auto;

  .key {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2000;
    width: 100vw;
    padding: 1em 0;
    text-align: center;
    background-color: rgba(0, 52, 82, 0.9);
    color: white;

    .key__title {
      font-size: 1em;
      white-space: nowrap;
    }

    .status-list {
      display: -ms-flexbox;
      display: flex;
      margin: 0;
      -ms-flex-pack: center;
      justify-content: center;
      list-style-type: none;
      overflow: hidden;
      white-space: nowrap;

      .status-list__item {
        margin-right: 1em;

        &:before {
          content: "";
          display: inline-block;
          width: 0.75em;
          height: 0.75em;
          margin-right: 0.75em;
          vertical-align: middle;
          border-radius: 1.5em;
        }

        &--short:before {
          background-color: #329803;
        }
        &--average:before {
          background-color: #f29205;
        }
        &--long:before {
          background-color: #f20905;
        }
      }
    }
  }
`;

const ToiletItems = styled.div`
  margin: 10em auto 7em;
  position: relative;
  padding: 0 1em;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media screen and (max-width: 768px) {
    padding: 0 1vw;
  }
`;

const ToiletItem = styled.div`
  padding: 0 4vw;
  margin: 0 0 12vh;

  @media screen and (max-width: 768px) {
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
    transition: all 0.3s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }

    &__bg {
      height: 20em;
      background: #000552;
      position: relative;
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
        0 10px 10px rgba(0, 0, 0, 0.22);

      @media screen and (max-width: 768px) {
        height: 10em;
      }
    }

    &__title {
      position: relative;
      margin: 0.5em 0 0.5em 0;
      font-size: 1.75em;
      color: #000;
      font-weight: 700;

      @media screen and (max-width: 768px) {
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
      padding: 2px;
      transform: translate3d(-50%, 0, 0);

      @media screen and (max-width: 768px) {
        max-height: 19em;
      }

      path {
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

  renderToilet(selectedToilet) {
    return (
      <Toilet
        key={selectedToilet.id}
        hideSelected={() => {
          this.hideSelected();
        }}
        item={selectedToilet}
      />
    );
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
          <PersonType status={item.queue_level} personType={item.type} />

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
          <div className="key">
            <h2 className="key__title">Toilet queue sizes</h2>
            <ul className="status-list">
              <li className="status-list__item status-list__item--short">
                Shorter
              </li>
              <li className="status-list__item status-list__item--average">
                Average
              </li>
              <li className="status-list__item status-list__item--long">
                Longer
              </li>
            </ul>
          </div>
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
            transitionLeaveTimeout={300}
          >
            {!this.state.isHidden &&
              this.renderToilet(this.state.selectedToilet)}
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
