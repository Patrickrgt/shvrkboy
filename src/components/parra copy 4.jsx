import React, { Component, useEffect } from "react";
import Parallax from "parallax-js";
import Pagination from "../components/pagination";
import { paginate } from "../utils/paginate";
import mca from "../img/mcacom.jpg";
import jound from "../img/joundcom.jpg";
import jordan from "../img/jordancom.jpg";
import CountUp, { useCountUp } from "react-countup";
import { Spring, Transition, animated } from "react-spring/renderprops";
import CountUpProfit from "./countupprofit.jsx";
import CountUpPurchases from "./countuppurchases.jsx";
import CountUpSales from "./countupsales.jsx";

import Fetch from "./countupsales.jsx";

import Grid from "@material-ui/core/Grid";
// import Animated from "react-animated-css";
import ReactDOM from "react-dom";
import transitions from "@material-ui/core/styles/transitions";

class Parra extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      scouttApp: [],
      twitterRef: [],
      twitterReplies: [],
      apiLoaded: false,
      scouttLoad: false,
      navHover: false,
      navIdled: false,
      randomNum1: "",
      randomNum2: "",
      randomNum3: "",
      hypebeast: mca,
      currentPage: 1,
      pageSize: 4,
      clickOnce: false,
      showSales: false,
      scroll: 0,
      tab: 0,
      scoutProfits: 0,
      displayNumbers: false,
      renderNumbers: false,
    };
  }

  async callAPI() {
    fetch("/twitterAPI")
      .then((res) => res.json())
      .then((results) =>
        this.setState({ scouttApp: [results] }, () => {
          console.log("ScouttApp Results: ", results);
          console.log(results.results.totalProfit);
          this.setState({
            scouttLoad: true,
            scoutProfits: parseFloat(
              results.results.totalProfit.replace(/\$|,/g, "")
            ),
            scoutPurchases: parseFloat(
              results.results.totalPurchases.replace(/\$|,/g, "")
            ),
            scoutSales: parseFloat(
              results.results.totalSales.replace(/\$|,/g, "")
            ),
          });
        })
      );
  }

  async callRefs() {
    fetch("/users")
      .then((res) => res.json())
      .then((replies) =>
        this.setState(
          { twitterRef: replies.replies },
          () => console.log("Twitter References: ", this.state.twitterRef),
          this.setState({ apiLoaded: true })
        )
      );
  }

  async randomNumGen() {
    if (this.state.scouttLoad) {
      return;
    } else this.setState({ randomNum1: "loading" });
  }

  componentDidMount() {
    var scene = document.getElementById("scene");
    var parallaxInstance = new Parallax(scene, {
      relativeInput: true,
    });
    this.callAPI();
    this.callRefs();
    this.randomNumGen();

    window.addEventListener("wheel", (e) => this.handleScroll(e));
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = async (e) => {
    if (e.deltaY > 0) {
      if (this.state.tab === 3) {
        return;
      } else
        this.setState(
          {
            tab: this.state.tab + 1,
          },
          () => {
            console.log(this.state.tab);
            this.handleTab();
          }
        );
    } else if (e.deltaY < 0) {
      if (this.state.tab === 0) {
        return;
      } else
        this.setState(
          {
            tab: this.state.tab - 1,
          },
          () => {
            console.log(this.state.tab);
            this.handleTab();
          }
        );
    }
  };

  handleTab() {
    switch (this.state.tab) {
      case 0:
        this.setState({
          renderNumbers: false,
        });
        return this.displayAbout();

      case 1:
        if (this.state.apiLoaded === true) {
          this.setState({
            renderNumbers: false,
          });
          return this.displayTestimonials();
        }

      case 2:
        this.setState({
          renderNumbers: true,
        });
        return this.displaySales();
      case 3:
    }
  }

  displayAbout() {
    this.setState({ hypebeast: mca });

    const aboutHeader = document.getElementById("aboutHeader");
    aboutHeader.classList.add("animate__animated", "animate__fadeInRight");

    const aboutSubContainer = document.getElementById("aboutSubContainer");
    aboutSubContainer.classList.add(
      "animate__animated",
      "animate__fadeInRight",
      "p-animate-delay-1"
    );
  }

  async displayTestimonials() {
    this.setState({ currentPage: 1, hypebeast: jound }, () => {
      if (this.state.hypebeast == jound && this.state.clickOnce == false) {
        this.setState({ clickOnce: true });
        setInterval(this.randomPage.bind(this), 4000);
      }
    });

    // const testHeader = document.getElementById("testHeader");
    // testHeader.classList.add("animate__animated", "animate__fadeInRight");

    // const testBox1 = document.getElementById("testBox0");
    // testBox1.classList.add(
    //   "animate__animated",
    //   "animate__fadeInRight",
    //   "p-animate-delay-2"
    // );

    // const testBox2 = document.getElementById("testBox1");
    // testBox2.classList.add(
    //   "animate__animated",
    //   "animate__fadeInRight",
    //   "p-animate-delay-3"
    // );

    // const testBox3 = document.getElementById("testBox2");
    // testBox3.classList.add(
    //   "animate__animated",
    //   "animate__fadeInRight",
    //   "p-animate-delay-4"
    // );

    // const testBox4 = document.getElementById("testBox3");
    // testBox4.classList.add(
    //   "animate__animated",
    //   "animate__fadeInRight",
    //   "p-animate-delay-5"
    // );
  }

  randomPage() {
    var curPage = this.state.currentPage;
    if (curPage === this.state.pageSize) {
      curPage = 1;
    } else curPage++;
    this.setState(
      {
        currentPage: curPage,
      },
      console.log(this.state.currentPage)
    );
  }

  displaySales() {
    this.setState({ hypebeast: jordan, showSales: true });

    const aboutHeader = document.getElementById("salesHeader");
    aboutHeader.classList.add("animate__animated", "animate__fadeInRight");

    const profit = document.getElementById("profit");
    profit.classList.add(
      "animate__animated",
      "animate__fadeInRight",
      "p-animate-delay-1"
    );

    const purchase = document.getElementById("purchase");
    purchase.classList.add(
      "animate__animated",
      "animate__fadeInRight",
      "p-animate-delay-2",
      "animate__flash"
    );

    const sale = document.getElementById("sale");
    sale.classList.add(
      "animate__animated",
      "animate__fadeInRight",
      "p-animate-delay-3",
      "animate__flash"
    );

    const comment = document.getElementById("comment");
    comment.classList.add(
      "animate__animated",
      "animate__fadeInRight",
      "p-animate-delay-4",
      "animate__flash"
    );
  }

  onNavHover() {
    this.setState({
      navHover: true,
      navIdle: true,
    });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  state = {};
  render() {
    const twitterRef = this.state.twitterRef;
    const { length: count } = twitterRef;
    const { pageSize, currentPage, twitterRef: allRefs } = this.state;
    const refs = paginate(allRefs, currentPage, pageSize);

    return (
      <React.Fragment>
        <div class="area">
          <ul
            id="mcaFloat"
            className={
              this.state.hypebeast === mca
                ? "circles"
                : this.state.hypebeast === jound
                ? "jound-float"
                : "jordan-float"
            }
          >
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>

        <div class="area">
          <ul id="joundFloat" className="jound-float">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>

        <div class="area">
          <ul id="jordanFloat" className="jordan-float">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>

        <div className="nav nav-img-1 animate__animated animate__delay-1s">
          <Grid container spacing={1}>
            <Grid item lg>
              <h1 onClick={() => this.displayAbout()} className="grid-item">
                ABOUT
              </h1>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item lg>
              <h1
                onClick={() => {
                  if (this.state.apiLoaded) {
                    this.displayTestimonials();
                  }
                }}
                className="grid-item"
              >
                TESTIMONIALS
              </h1>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item lg>
              <h1 onClick={() => this.displaySales()} className="grid-item">
                NUMBERS
              </h1>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item lg>
              <h1 className="grid-item">FUTURE</h1>
            </Grid>
          </Grid>
        </div>

        <ul className="nav-img-div" data-relative-input="true" id="scene">
          <li data-depth="0.2">
            <img
              id="hypebeastDisplay"
              className="hypebeast-img"
              src={this.state.hypebeast}
            ></img>
          </li>

          {/* ABOUT */}
          {/* ABOUT */}
          {/* ABOUT */}
          <section data-depth="0.1" className="about-contain">
            <div
              style={
                this.state.hypebeast === mca
                  ? { display: "block" }
                  : { display: "none" }
              }
              className="about"
            >
              <h1 id="aboutHeader" className="about-header">
                ABOUT
              </h1>

              <div className="about-sub-container">
                <article id="aboutSubContainer" className="about-sub">
                  Fashion, art enthusiast and reseller.
                  <br></br>
                  First-generation born American.
                  <br></br>
                  Parents did not grow up with much but were a big inspiration
                  on my work ethic, they were born in the Philippines and got to
                  the United States to nurse AIDs patients during the AIDs
                  epidemic. They taught me the value of money, but also to treat
                  myself to nice things. My mother is frugal with her money and
                  thinks about the future but my dad priorities other people's
                  happiness and willingly spends graciously on them.
                  <br></br>
                  Their clashing personalities did not work well and eventually
                  they divorced when our finances were not working out.
                  <br></br>
                  <br></br>
                  The fighting between them about finances pushed me to take a
                  risk and start a business.
                  <br></br>
                  <br></br>I grew up interested in entrepreneurship, worked for
                  three summers during high-school to save enough money for any
                  Opened up a secured deposit credit card at 18 and started
                  building credit.
                  <br></br>
                  Purchased Supreme apparel during week 0 of the Fall/Winter
                  2018 Season and took off from there.
                </article>
              </div>
            </div>
          </section>
          {/* ABOUT */}
          {/* ABOUT */}
          {/* ABOUT */}

          {/* TESTIMONIALS */}
          {/* TESTIMONIALS */}
          {/* TESTIMONIALS */}
          <section data-depth="0.1" className="test-contain">
            <div
              style={
                this.state.hypebeast === jound
                  ? { display: "block" }
                  : { display: "none" }
              }
              className="test"
            >
              <h1 id="testHeader" className="test-header">
                TESTIMONIALS
              </h1>

              {this.state.apiLoaded === true ? (
                <div>
                  {refs.map((ref, index) => (
                    <div
                      // id={"testBox" + index}
                      // className="container test-sub"
                      className={
                        this.state.currentPage === 1
                          ? "container test-sub animate__animated animate__fadeInRight p-animate-delay-2"
                          : // : this.state.currentPage === 2
                            // ? "container test-sub animate__animated animate__fadeInRight p-animate-delay-3"
                            // : this.state.currentPage === 3
                            // ? "container test-sub animate__animated animate__fadeInRight p-animate-delay-3"
                            "container test-sub animate__animated animate__fadeInRight p-animate-delay-5"
                      }
                    >
                      <div className="row">
                        <div className="col-sm test-img-col">
                          <img src={ref.pfp} className="test-img"></img>
                        </div>

                        <div className="col-sm test-ref-col">
                          <h4 className="test-name">{ref.username}</h4>{" "}
                          <h4 className="test-handle">{ref.at}</h4>
                          <div>
                            <h4 className="test-name">{ref.reply}</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="pagination-div">
                    <Pagination
                      itemsCount={count}
                      pageSize={pageSize}
                      currentPage={currentPage}
                      onPageChange={this.handlePageChange}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </section>
          {/* TESTIMONIALS */}
          {/* TESTIMONIALS */}
          {/* TESTIMONIALS */}

          {/* SALES */}
          {/* SALES */}
          {/* SALES */}
          <section data-depth="0.1" className="test-contain">
            <div
              style={
                this.state.hypebeast === jordan
                  ? { display: "block" }
                  : { display: "none" }
              }
              className="sales"
            >
              {/* <Transition
                native
                items={this.state.showSales}
                from={{ opacity: 1, transform: "scale(2)" }}
                enter={{ opacity: 1, transform: "scale(1)" }}
                leave={{ opacity: 0, transform: "scale(1)" }}
              >
                {(show) =>
                  show &&
                  ((props) => (
                    <animated.div style={props}> */}
              <h1 id="salesHeader" className="test-header">
                SALES
              </h1>
              {/* </animated.div>
                  ))
                }
              </Transition> */}

              {/* <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                {(props) => (
                  <div style={props}>
                    <h1 className="test-header">SALES</h1>
                  </div>
                )}
              </Spring> */}

              {this.state.scouttLoad ? (
                <React.Fragment>
                  {/* <CountUpSales
                    // display={}
                    sales={this.state.scoutProfits}
                  >
                    {" "}
                  </CountUpSales> */}
                  {this.state.scouttApp.map((scouttApi) => (
                    <React.Fragment>
                      <div id="profit" className="row">
                        <h1>
                          Total Profit:{""}
                          {this.state.renderNumbers ? (
                            <CountUpProfit num={this.state.scoutProfits} />
                          ) : (
                            <h1>error fetching</h1>
                          )}
                        </h1>
                      </div>

                      <div id="purchase" className="row">
                        <h1>
                          Total Purchases:{""}
                          {this.state.renderNumbers ? (
                            <CountUpPurchases num={this.state.scoutPurchases} />
                          ) : (
                            <h1>error fetching</h1>
                          )}
                        </h1>
                      </div>

                      <div id="sale" className="row">
                        <h1>
                          Total Sales:{""}
                          {this.state.renderNumbers ? (
                            <CountUpSales num={this.state.scoutSales} />
                          ) : (
                            <h1>error fetching</h1>
                          )}
                        </h1>
                      </div>
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div id="profit" className="row">
                    <h1>{this.state.randomNum1}</h1>
                  </div>

                  <div id="purchase" className="row">
                    <h1>{this.state.randomNum1}</h1>
                  </div>

                  <div id="sale" className="row">
                    <h1>{this.state.randomNum1}</h1>
                  </div>
                </React.Fragment>
              )}

              <div id="comment" className="row">
                <h6>
                  Scraped from my{" "}
                  <a href="https://scoutapp.ai/@shvrkboy">ScouttAPI</a> using
                  Puppetter
                </h6>
              </div>
            </div>
          </section>
          {/* TESTIMONIALS */}
          {/* TESTIMONIALS */}
          {/* TESTIMONIALS */}
        </ul>
      </React.Fragment>
    );
  }
}

export default Parra;
