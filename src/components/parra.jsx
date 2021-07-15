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

    const aboutSubContainer2 = document.getElementById("aboutSubContainer2");
    aboutSubContainer2.classList.add(
      "animate__animated",
      "animate__fadeInRight",
      "p-animate-delay-1"
    );

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

    const aboutSubContainer2 = document.getElementById("futureSubContainer2");
    aboutSubContainer2.classList.add(
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
                {this.state.tab === 0 ? (
                  <span className="extras">
                    Nike Off-White MCA's were the first super limited shoe I
                    managed to hit. Events like that created momentum for me
                    throughout my reselling career that made the model a special
                    momento.
                  </span>
                ) : this.state.tab === 1 ? (
                  <span className="extras">
                    My favorite footwear brand is New Balance and I love the
                    silhouette and tones of the JJJJound 992 New Balance's.
                    Definitely my favorite sneaker in my collection.
                  </span>
                ) : this.state.tab === 2 ? (
                  <span className="extras">
                    Not much of a Jordan fan in all honesty but if I had to
                    choose one colorway it would be the OG Neutral Grey's.
                  </span>
                ) : this.state.tab === 3 ? (
                  <span className="extras">
                    Yeezy 700 v3 Azael's are so unique, I believe the
                    single-construction no-lace design that Kanye West is
                    supporting towards--definitely screams 'the future'.
                  </span>
                ) : (
                  <div></div>
                )}
                <div>
                  <span className="extras">
                    you can use the mouse wheel to scroll through the tabs
                  </span>
                </div>
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

              <div id="aboutSubContainer" className="about-sub-container">
                <article className="about-sub">
                  “Nike, Yeezy, Supreme,” my friends talked about these brands
                  with such excitement that I never understood. “Why would
                  someone spend over one-hundred dollars on a piece of clothing
                  or on a pair of shoes?” I asked, and I was always hit with,
                  “You wouldn’t get it, it’s a culture.”
                  <br></br>
                  <br></br>I was never a fan of the social exclusivity these
                  brands endorsed but I was interested in the business. I was a
                  university student finding ways to cover tuition without
                  having to sacrifice time for my studies. I worked several
                  part-time jobs and unpaid internships in the past only to
                  realize the maxim, “Time is Money”. My time has value and
                  minimum wage on part-times did not satisfy nor balance out my
                  university costs and studies.
                  <br></br>
                  <br></br>I had to work smarter.
                  <br></br>
                  <br></br>I opened up a credit card as soon as I turned
                  eighteen and started buying Supreme. I calculated my risk by
                  understanding the third party market on brands. Supreme
                  t-shirts and accessories retailed on average fifty dollars but
                  would get marked up by 30% or more on the third party market.
                  Supreme was exclusive. I live in New York State where Supreme
                  owns a flagship store, I saw the opportunity and found my
                  niche. I started by selling each Supreme piece online, paying
                  off my credit card, then putting my gains towards my small
                  operation. I expanded outside of Supreme. I would wait in
                  lines for hours for Nikes, stay up until 3 AM for Yeezys, I
                  cycled through the buying and selling process for weeks and
                  kept expanding.
                </article>
                <article id="aboutSubContainer2" className="about-sub-right">
                  I hated waiting in line, especially in New York City where the
                  motto in these lines is “bully or be bullied”. Waiting in line
                  started to become more of a hassle than a hustle. If I wanted
                  to continue expanding my operation, I needed to automate
                  purchases. I started investing in programs that acted as
                  multiple customers purchasing products online. I researched
                  proxy servers and cloud servers to maximize my success, each
                  new infrastructure adding to my expenses, with the risk of
                  failure increasing alongside success. But, I get it now. It’s
                  a culture.
                  <br></br>
                  <br></br>
                  Today I operate from home, buying and selling hot commodities
                  ranging from limited sneakers, apparel, and technology. Given
                  the opportunity of managing and starting a business taught me
                  to value my time and money, to not be afraid to take risks and
                  be grateful for what I have and appreciate my luck in life.
                  <br></br>
                  <br></br>
                  Strangely enough, I’m known as shvrkboy because when I was
                  younger I was told I look like young Taylor Lautner. I added a
                  ‘v’ because most usernames with ‘sharkboy’ are taken and
                  during the time, turning an A upside down as a V seemed an
                  appropriate and popular solution.
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

              <div id="futureSubContainer" className="future-sub-container">
                <article className="future-sub">
                  I find myself always getting interested in niche spaces but
                  always relating those spaces back to art. When I was younger I
                  wanted to be an artist. It eventually grew into graphic
                  design, then game design, then music production, then sound
                  engineering, then fashion. These niches spiraled into what I
                  pursue now: Computer Science. I’m pursuing my dream of working
                  as a full-stack engineer. Building an application from the
                  ground-up forces you to design logically and artistically and
                  I’m attached to that challenge. Knowing you’ve worked on a
                  project that people use is an encouraging feeling of respect
                  towards your craft.
                  <br></br>
                  <br></br>
                  My answer to the age old question of where I see myself in
                  five years is: Successful. Successful in my eyes. Owning a
                  house, having a family, managing a car, pursuing a stable
                  career.
                </article>
                <article id="futureSubContainer2" className="future-sub">
                  I want to inspire people with my art, whether it be through
                  code or graphics. If not in five years then ten. I want to
                  make myself proud so I will continue working hard everyday
                  until I’m content. Comfort is my worst enemy, so I’m always
                  learning something new. Whether it be Art, Design, Fashion,
                  Software Engineering, Blockchain, or Business. I’m dedicated
                  to mastering my craft and understandings so I’m always keeping
                  up with trends. Of course the world moves fast and
                  unexpectedly, I find myself always adapting.
                  <br></br>
                  <br></br>
                  The future is unknown.
                  <br></br>
                  <br></br>However, whichever career I pursue in the
                  future—design and technology will always be my niche.
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
