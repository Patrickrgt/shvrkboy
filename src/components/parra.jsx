import React, { Component } from "react";
import Parallax from "parallax-js";
import Pagination from "../components/pagination";
import { paginate } from "../utils/paginate";
import mca from "../img/mcacom.jpg";
import jound from "../img/joundcom.jpg";
import jordan from "../img/jordancom.jpg";
import azael from "../img/azaelcom.jpg";
import CountUpPurchases from "./countuppurchases.jsx";
import CountUpSales from "./countupsales.jsx";
import { db } from "../store/firebase.js";
import Grid from "@material-ui/core/Grid";

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
      isActive: true,
      waitTime: 0,
    };
  }

  async handleWait() {
    if (this.state.isActive === true) {
      var wait = this.state.waitTime;
      wait++;
      this.setState({
        waitTime: wait,
      });
    }
  }

  async callAPI() {
    db.collection("sales")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());

        this.setState({ scouttApp: data }, () => {
          this.setState({
            scouttLoad: true,

            scoutPurchases: parseFloat(
              data[0].totalPurchases.replace(/\$|,/g, "")
            ),
            scoutSales: parseFloat(data[0].totalSales.replace(/\$|,/g, "")),
          });
        });
      });
  }

  async callRefs() {
    db.collection("refs")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());

        this.setState({
          twitterRef: data,
          apiLoaded: true,
          isActive: false,
        });
      });

    // const url = "https://shvrkboyapinodejs.herokuapp.com";

    // axios.get(url).then((res) => {
    //   this.setState(
    //     { twitterRef: res.data.replies },
    //     this.setState({ apiLoaded: true, isActive: false })
    //   );
    // });

    // fetch(url, { mode: "cors" })
    //   .then((res) => {
    //     console.log(res);
    //     res.json();
    //   })
    //   .then(
    //     (replies) =>
    //       this.setState(
    //         { twitterRef: replies.replies },

    //         this.setState({ apiLoaded: true, isActive: false })
    //       ),
    //     () => {
    //       console.log(this.state.twitterRef);
    //     }
    //   );
  }

  async randomNumGen() {
    if (this.state.scouttLoad) {
      return;
    } else this.setState({ randomNum1: "loading" });
  }

  componentDidMount() {
    var scene = document.getElementById("scene");
    new Parallax(scene, {
      relativeInput: true,
    });
    this.displayAbout();
    this.callAPI();
    this.callRefs();
    this.randomNumGen();

    window.addEventListener("wheel", (e) => this.handleScroll(e));

    if (this.state.isActive === true) {
      setInterval(this.handleWait.bind(this), 1000);
    } else return;
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = async (e) => {
    if (this.state.isActive === true) {
      return;
    } else if (e.deltaY > 0) {
      if (this.state.tab === 3) {
        return;
      } else
        this.setState(
          {
            tab: this.state.tab + 1,
          },
          () => {
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
        } else break;
      case 2:
        this.setState({
          renderNumbers: true,
        });
        return this.displaySales();

      case 3:
        this.setState({
          renderNumbers: false,
        });
        return this.displayFuture();

      default:
        return;
    }
  }

  displayAbout() {
    this.setState({ tab: 0 });
    const aboutMain = document.getElementById("aboutMain");
    aboutMain.style.opacity = "0.3";
    const testMain = document.getElementById("testMain");
    testMain.style.opacity = "1";
    const salesMain = document.getElementById("salesMain");
    salesMain.style.opacity = "1";
    const futureMain = document.getElementById("futureMain");
    futureMain.style.opacity = "1";

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
    this.setState({ tab: 1 });
    const aboutMain = document.getElementById("aboutMain");
    aboutMain.style.opacity = "1";
    const testMain = document.getElementById("testMain");
    testMain.style.opacity = "0.3";
    const salesMain = document.getElementById("salesMain");
    salesMain.style.opacity = "1";
    const futureMain = document.getElementById("futureMain");
    futureMain.style.opacity = "1";

    this.setState({ currentPage: 1, hypebeast: jound }, () => {
      if (this.state.hypebeast === jound && this.state.clickOnce === false) {
        this.setState({ clickOnce: true });
        setInterval(this.randomPage.bind(this), 4000);
      }
    });

    const testHeader = document.getElementById("testHeader");
    testHeader.classList.add("animate__animated", "animate__fadeInRight");
  }

  randomPage() {
    var curPage = this.state.currentPage;
    if (curPage === this.state.pageSize) {
      curPage = 1;
    } else curPage++;
    this.setState({
      currentPage: curPage,
    });
  }

  displaySales() {
    this.setState({ tab: 2 });
    this.setState({
      renderNumbers: true,
    });
    const aboutMain = document.getElementById("aboutMain");
    aboutMain.style.opacity = "1";
    const testMain = document.getElementById("testMain");
    testMain.style.opacity = "1";
    const salesMain = document.getElementById("salesMain");
    salesMain.style.opacity = "0.3";
    const futureMain = document.getElementById("futureMain");
    futureMain.style.opacity = "1";
    this.setState({ hypebeast: jordan, showSales: true });

    const aboutHeader = document.getElementById("salesHeader");
    aboutHeader.classList.add("animate__animated", "animate__fadeInRight");

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

  displayFuture() {
    this.setState({ tab: 3 });
    const aboutMain = document.getElementById("aboutMain");
    aboutMain.style.opacity = "1";
    const testMain = document.getElementById("testMain");
    testMain.style.opacity = "1";
    const salesMain = document.getElementById("salesMain");
    salesMain.style.opacity = "1";
    const futureMain = document.getElementById("futureMain");
    futureMain.style.opacity = "0.3";

    this.setState({ hypebeast: azael });

    const aboutHeader = document.getElementById("futureHeader");
    aboutHeader.classList.add("animate__animated", "animate__fadeInRight");

    const aboutSubContainer = document.getElementById("futureSubContainer");
    aboutSubContainer.classList.add(
      "animate__animated",
      "animate__fadeInRight",
      "p-animate-delay-1"
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
        {this.state.isActive === true ? (
          <section className="overlay">
            <h1 className="overlay-text">
              Please wait while page loads. Use the scroll wheel to sift through
              the left tabs.
              {this.state.waitTime > 19 ? (
                <span> Getting Drinks.</span>
              ) : this.state.waitTime > 9 ? (
                <span> Fetching snacks.</span>
              ) : (
                <span></span>
              )}
            </h1>
          </section>
        ) : (
          <div className="area">
            <ul
              id="mcaFloat"
              className={
                this.state.hypebeast === mca
                  ? "circles"
                  : this.state.hypebeast === jound
                  ? "jound-float"
                  : this.state.hypebeast === jordan
                  ? "jordan-float"
                  : "azael-float"
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
        )}
        <div className="nav nav-img-1">
          <Grid container spacing={1}>
            <Grid item lg>
              <h1
                onClick={() => this.displayAbout()}
                id="aboutMain"
                className="grid-item"
              >
                ABOUT
              </h1>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item lg>
              <h1
                onClick={() => this.displayTestimonials()}
                id="testMain"
                className="grid-item"
              >
                TESTIMONIALS
              </h1>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item lg>
              <h1
                onClick={() => this.displaySales()}
                id="salesMain"
                className="grid-item"
              >
                SALES
              </h1>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item lg>
              <h1
                onClick={() => this.displayFuture()}
                id="futureMain"
                className="grid-item"
              >
                FUTURE
              </h1>
              <div className="extras-container">
                <span className="extras">
                  use the mouse wheel to scroll through the tabs
                </span>
              </div>
            </Grid>
          </Grid>
        </div>

        <ul className="nav-img-div" data-relative-input="true" id="scene">
          <li data-depth="0.2">
            <img
              alt="shoes"
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
                  Thank you for visiting my page!
                  <br></br>
                  <br></br>
                  I'm a sneakerhead that's into art, fashion, coding and
                  reselling.
                  <br></br>
                  <br></br>
                  My work ethic revolves around my nurting at a young age. I
                  never felt good enough compared to others, but when I stopped
                  comparing myself to others or caring what other people
                  thought--I started to learn to do things for myself--to make
                  myself proud.
                  <br></br>
                  <br></br>
                  Today I'm an aspiring full-stack developer maintaining an LLC
                  with passion to continue learning from people smarter than me
                  and creating projects with groups of like-minded people.
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
                      key={index}
                      id={"testBox" + index}
                      className={
                        this.state.currentPage === 1
                          ? "container test-sub animate__animated animate__fadeInRight p-animate-delay-2"
                          : this.state.currentPage === 2
                          ? "container test-sub animate__animated animate__fadeInLeft p-animate-delay-3"
                          : this.state.currentPage === 3
                          ? "container test-sub animate__animated animate__fadeInRight p-animate-delay-3"
                          : "container test-sub animate__animated animate__fadeILeft p-animate-delay-5"
                      }
                    >
                      <div className="row">
                        <div className="col-sm test-img-col">
                          <img
                            alt="pfp"
                            src={ref.pfp}
                            className="test-img"
                          ></img>
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
              <h1 id="salesHeader" className="test-header">
                SALES
              </h1>

              {this.state.scouttLoad ? (
                <React.Fragment>
                  {this.state.scouttApp.map((scouttApi, index) => (
                    <section key={index}>
                      <div id="purchase" className="row">
                        <h1>
                          Total Purchases:{""}
                          {this.state.renderNumbers ? (
                            <CountUpPurchases num={this.state.scoutPurchases} />
                          ) : (
                            <span>error fetching</span>
                          )}
                        </h1>
                      </div>

                      <div id="sale" className="row">
                        <h1>
                          Total Sales:{""}
                          {this.state.renderNumbers ? (
                            <CountUpSales num={this.state.scoutSales} />
                          ) : (
                            <span>error fetching</span>
                          )}
                        </h1>
                      </div>
                    </section>
                  ))}
                </React.Fragment>
              ) : (
                <React.Fragment>
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
                  <a href="https://scoutapp.ai/@shvrkboy">ScoutApp API</a> using
                  Puppetter
                </h6>
              </div>
            </div>
          </section>
          {/* SALES */}
          {/* SALES */}
          {/* SALES */}
          <section data-depth="0.1" className="future-contain">
            <div
              style={
                this.state.hypebeast === azael
                  ? { display: "block" }
                  : { display: "none" }
              }
              className="future"
            >
              <h1 id="futureHeader" className="future-header">
                FUTURE
              </h1>

              <div className="future-sub-container">
                <article id="futureSubContainer" className="future-sub">
                  I wish to continue to maintain my LLC, pursue my Master's
                  Degree in Computer Science, grasp understanding of new
                  computing languages, libraries, and data analytics as well as
                  managing to land a paid internship or full-time job within my
                  field of study.
                  <br></br>
                  <br></br>
                  Five years from now I see myself managing a passive income
                  through sustainable crypto mining and reselling, while on the
                  verge of becoming financially stable through working as a
                  full-time developer.
                  <br></br>
                  <br></br>I wish to support my family and future family so I
                  can wake up and do the things I love by working on projects in
                  code and art.
                  <br></br>
                  <br></br>I want to meet more people with the same motibational
                  drive to learn and acheieve more so that I may learn under
                  them and prove to be successful as well.
                </article>
              </div>
            </div>
          </section>
        </ul>
      </React.Fragment>
    );
  }
}

export default Parra;
