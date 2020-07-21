import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Grommet, Grid, Box, Layer, Image, Button } from 'grommet';
import { animateScroll as scroll } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBriefcase,
  faUser,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { ShowcaseCarousel, MouseScrollIcon, ShowcaseList } from 'components';
import { useScrollPosition } from 'hooks/useScrollPosition';
import { Portfolio } from 'screens';
import MyGrommetTheme from 'theme';
import showcase from 'showcase.json';

const CloseButton = styled(Button)`
  background-color: gray;
  border-radius: 50%;
  margin-top: 2rem;
  margin-right: auto;
  margin-left: auto;
  padding: 0.8rem 1rem;
  &:active,
  &:focus {
    outline: none;
  }
`;

const showcaseModifier = 7;

class HomeClass extends Component<{ useScrollPosition: number[] }> {
  state = {
    availableScrolling: 0,
    currentSlide: 0,
    showPortfolioItem: false,
    currentInfo: {
      name: '',
      description: '',
      image: undefined,
      technology: [],
    },
  };

  moveToSlide = (index: number) => {
    this.setState({ ...this.state, currentSlide: index });
  };

  componentDidMount() {
    scroll.scrollToTop();
    const scrollHeight = document.body.scrollHeight;

    let scrollArea =
      (scrollHeight * (showcase.length * showcaseModifier)) / 69 - 9;
    scrollArea = Math.round(scrollArea);

    this.setState(
      Object.assign(this.state, {
        availableScrolling: scrollArea,
      })
    );
  }

  openPortfolioItem = (showcase) => {
    let newState = { ...this.state, showPortfolioItem: true };
    if (showcase) {
      newState = { ...newState, currentInfo: showcase };
    }
    this.setState(newState);
  };

  closePortfolioItem = () => {
    this.setState({ ...this.state, showPortfolioItem: false, currentInfo: {} });
  };

  render() {
    const {
      currentSlide,
      availableScrolling,
      showPortfolioItem,
      currentInfo,
    } = this.state;
    const { useScrollPosition } = this.props;
    const [, , , offsetY] = useScrollPosition;

    return (
      <>
        <Grommet full theme={MyGrommetTheme}>
          {showPortfolioItem && (
            <Layer
              full
              animation="fadeIn"
              onEsc={() => this.closePortfolioItem()}
              onClickOutside={() => this.closePortfolioItem()}
              className="overflow-auto"
            >
              <Box
                margin="auto"
                direction="column"
                style={{ maxWidth: 900 }}
                className="pb-4"
                fill
              >
                <CloseButton onClick={() => this.closePortfolioItem()}>
                  <FontAwesomeIcon icon={faTimes} className="block m-auto" />
                </CloseButton>
                <span className="block text-6xl font-bold my-12 text-center leading-tight">
                  {currentInfo ? currentInfo && currentInfo.name : ''}
                </span>
                <Image
                  fit="contain"
                  src={currentInfo ? currentInfo.image : undefined}
                  className="rounded-lg mb-4 shadow-md"
                  style={{ minHeight: 563 }}
                />
                <Grid
                  fill="vertical"
                  columns={['flex', 'auto']}
                  gap="small"
                  className="pb-6"
                >
                  <Box
                    className="p-3 rounded-lg"
                    style={{
                      backgroundColor: 'rgba(1, 0, 15, 0.8)',
                    }}
                  >
                    {currentInfo && currentInfo.description && (
                      <>
                        <span className="text-gray-500">Description</span>
                        <p>{currentInfo.description}</p>
                      </>
                    )}
                  </Box>
                  <Box
                    align="end"
                    className="p-3 rounded-lg"
                    style={{
                      backgroundColor: 'rgba(1, 0, 15, 0.8)',
                    }}
                  >
                    <span className="text-gray-500">Technologies used</span>
                    <ul className="text-right">
                      {currentInfo &&
                        currentInfo.technology &&
                        currentInfo.technology.length &&
                        currentInfo.technology.map((t) => <li>{t}</li>)}
                    </ul>
                  </Box>
                </Grid>
              </Box>
            </Layer>
          )}
          <Grid
            fill="vertical"
            columns={['flex', '5rem']}
            className="w-full h-full fixed top-0"
          >
            <Box as="main" background="accent-1" fill responsive>
              <Grid rows={['xxsmall', 'flex']} fill="vertical">
                <Box
                  className="bg-transparent z-10"
                  as="header"
                  pad="small"
                  justify="center"
                  background="dark-4"
                >
                  <Link to="/">Kevin Do</Link>
                </Box>
                <Route exact path="/">
                  <>
                    <ShowcaseList
                      showcase={showcase}
                      offsetY={offsetY}
                      openPortfolioItem={this.openPortfolioItem}
                    />
                    <ShowcaseCarousel
                      moveToSlide={this.moveToSlide}
                      currentSlide={currentSlide}
                      offsetY={offsetY}
                      availableScrolling={availableScrolling}
                      showcase={showcase}
                      openPortfolioItem={this.openPortfolioItem}
                    />
                  </>
                </Route>
                <Route exact path="/portfolio">
                  <Portfolio
                    offsetY={offsetY}
                    availableScrolling={availableScrolling}
                    showcase={showcase}
                    openPortfolioItem={this.openPortfolioItem}
                  />
                </Route>
              </Grid>
            </Box>
            <Box as="nav" background="dark-3">
              <Grid rows={['xxsmall', 'flex', 'xxsmall']} fill>
                <Box pad="medium" justify="center" align="center">
                  <Link to="/portfolio">
                    <FontAwesomeIcon icon={faBriefcase} />
                  </Link>
                </Box>
                <Box justify="center" align="center">
                  <MouseScrollIcon />
                </Box>
                <Box justify="center" align="center">
                  <FontAwesomeIcon icon={faUser} />
                </Box>
              </Grid>
            </Box>
          </Grid>
        </Grommet>
        <Box
          style={{
            height:
              showcase && showcase.length
                ? `${showcase.length * showcaseModifier}rem`
                : 0,
          }}
          className="w-2"
        />
      </>
    );
  }
}

export default function Home(props) {
  const uSP = useScrollPosition();
  return <HomeClass {...props} useScrollPosition={uSP} />;
}
