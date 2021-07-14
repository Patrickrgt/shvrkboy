import React, { Component } from "react";

import mca from "../img/mcamob.jpg";
import jound from "../img/joundmob.jpg";
import jordan from "../img/jordanmob.jpg";
import azael from "../img/azaelmob.jpg";

import mcafloat from "../img/mcafloatflipped.png";
import jordanfloat from "../img/jordanfloatflipped.png";
import azaelfloat from "../img/azaelfloatflipped.png";
import joundfloat from "../img/joundfloatflipped.png";

import CountUpPurchases from "./countuppurchases.jsx";
import CountUpSales from "./countupsales.jsx";
import { db } from "../store/firebase.js";

class Mobile extends Component {
  // constructor(props) {
  //   this.top = React.createRef();
  // }

  state = {
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
    offsetY: 0,
    setOffsetY: 1,
    tabs: ["about", "testimonials", "sales", "future"],
    salesTab: true,
  };

  handleScroll(e) {
    const mcaFloat = document.querySelector(".mcafloat-m");
    const joundFloat = document.querySelector(".joundfloat-m");
    const jordanFloat = document.querySelector(".jordanfloat-m");
    const azaelFloat = document.querySelector(".azaelfloat-m");

    const aboutTab = document.querySelector("#about-m");
    const aboutSub = document.querySelector("#aboutM").getBoundingClientRect();

    const mcaQuote = document.querySelector(".mca-quote");
    if (1 < aboutSub.y) {
      aboutTab.style.opacity = "1";
      mcaFloat.style.opacity = "1";
      mcaQuote.style.opacity = "1";
      mcaFloat.style.transform = `rotate(${this.state.offsetY}deg)`;

      this.setState({
        tabs: ["about", "testimonials", "sales", "future"],
      });
    } else {
      mcaQuote.style.opacity = "0";
      aboutTab.style.opacity = "0";
      mcaFloat.style.opacity = "0";
    }

    const testTab = document.querySelector("#testimonials-m");
    const testImg = document.querySelector("#joundM").getBoundingClientRect();
    const testSub = document
      .querySelector("#testimonialsM")
      .getBoundingClientRect();

    const joundQuote = document.querySelector(".jound-quote");
    if (testImg.top < 1 && 1 < testSub.top) {
      testTab.style.opacity = "1";
      joundFloat.style.opacity = "1";
      joundQuote.style.opacity = "1";
      joundFloat.style.transform = `rotate(${this.state.JoundOffset}deg)`;
      this.setState({
        tabs: ["testimonials", "about", "sales", "future"],
      });
    } else {
      testTab.style.opacity = "0";
      joundFloat.style.opacity = "0";
      joundQuote.style.opacity = "0";
    }

    const salesTab = document.querySelector("#sales-m");
    const salesImg = document.querySelector("#jordanM").getBoundingClientRect();
    const salesSub = document.querySelector("#salesM").getBoundingClientRect();

    const jordanQuote = document.querySelector(".jordan-quote");
    if (salesImg.top < 1 && 1 < salesSub.top) {
      salesTab.style.opacity = "1";
      jordanFloat.style.opacity = "1";
      jordanQuote.style.opacity = "1";
      jordanFloat.style.transform = `rotate(${this.state.JordanOffset}deg)`;

      this.setState({
        tabs: ["sales", "testimonials", "about", "future"],
      });
    } else {
      salesTab.style.opacity = "0";
      jordanFloat.style.opacity = "0";
      jordanQuote.style.opacity = "0";
    }

    const futureTab = document.querySelector("#future-m");
    const futureImg = document.querySelector("#azaelM").getBoundingClientRect();
    const futureSub = document
      .querySelector("#futureM")
      .getBoundingClientRect();

    const azaelQuote = document.querySelector(".azael-quote");

    if (futureImg.top < 1 && 1 < futureSub.top) {
      futureTab.style.opacity = "1";
      azaelFloat.style.opacity = "1";
      azaelQuote.style.opacity = "1";
      azaelFloat.style.transform = `rotate(${this.state.AzaelOffset}deg)`;

      this.setState({
        tabs: ["future", "sales", "testimonials", "about"],
      });
    } else {
      futureTab.style.opacity = "0";
      azaelFloat.style.opacity = "0";
      azaelQuote.style.opacity = "0";
    }

    // MCA Positions
    const McaBox = document.querySelector("#mcaM");
    const McaRect = McaBox.getBoundingClientRect();
    if (McaRect.y < 0) {
      this.setState({
        offsetY: McaRect.y * -0.25,
      });
    } else {
      this.setState({
        offsetY: 0,
      });
    }

    // Jound Positions
    const JoundBox = document.querySelector("#joundM");
    const JoundRect = JoundBox.getBoundingClientRect();
    if (JoundRect.y < 0) {
      this.setState({
        JoundOffset: JoundRect.y * -0.5,
      });
    } else {
      this.setState({
        JoundOffset: 0,
      });
    }

    // Jordan Positions
    const JordanBox = document.querySelector("#jordanM");
    const JordanRect = JordanBox.getBoundingClientRect();
    if (JordanRect.y < 0) {
      this.setState({
        JordanOffset: JordanRect.y * -0.5,
      });
    } else {
      this.setState({
        JordanOffset: 0,
      });
    }

    // Azael Positions
    const AzaelBox = document.querySelector("#azaelM");
    const AzaelRect = AzaelBox.getBoundingClientRect();
    if (AzaelRect.y < 0) {
      this.setState({
        AzaelOffset: AzaelRect.y * -0.5,
      });
    } else {
      this.setState({
        AzaelOffset: 0,
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

        this.setState(
          {
            twitterRef: data,
            apiLoaded: true,
            isActive: false,
          },
          () => {
            console.log(this.state.twitterRef);
          }
        );
      });
  }

  async randomNumGen() {
    if (this.state.scouttLoad) {
      return;
    } else this.setState({ randomNum1: "loading" });
  }

  componentDidMount() {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
    // useEffect(() => {
    //   window.scrollTo(0, 0);
    // }, []);
    // window.scrollTo(0, 0);

    // window.addEventListener("beforeunload", (e) => {
    //   window.scrollTop(0);
    // });

    window.addEventListener("scroll", (e) => this.handleScroll(e), {
      passive: true,
    });

    console.log(this.state.counter);
    this.callAPI();
    this.callRefs();
    this.randomNumGen();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll());
  }

  render() {
    return (
      <React.Fragment>
        {/* Floating Images */}
        <img
          alt="floating mca shoe"
          className="mcafloat-m"
          src={mcafloat}
        ></img>
        <img
          alt="floating jound shoe"
          className="joundfloat-m"
          src={joundfloat}
        ></img>
        <img
          alt="floating jordan shoe"
          className="jordanfloat-m"
          src={jordanfloat}
        ></img>
        <img
          alt="floating yeezy shoe"
          className="azaelfloat-m"
          src={azaelfloat}
        ></img>
        <span className="mca-quote">
          Nike Off-White MCA's were the first super limited shoe I managed to
          hit. Events like that created momentum for me throughout my reselling
          career that made the model a special momento.
        </span>
        <span className="jound-quote">
          My favorite footwear brand is New Balance and I love the silhouette
          and tones of the JJJJound 992 New Balance's. Definitely my favorite
          sneaker in my collection.
        </span>
        <span className="jordan-quote">
          Not much of a Jordan fan in all honesty but if I had to choose one
          colorway it would be the OG Neutral Grey's.
        </span>
        <span className="azael-quote">
          Yeezy 700 v3 Azael's are so unique, I believe the single-construction
          no-lace design that Kanye West is supporting towards--definitely
          screams 'the future'.
        </span>
        {/* Tabs */}

        <div className="float-tabs">
          <div>
            {this.state.tabs.map((tab) => (
              // <article id={`${tab}-tab`} className="div-tabs">
              <div
                // onClick={() => this.tabClick(tab)}
                id={`${tab}-m`}
                className="titles-m"
              >
                <h1>{tab.toUpperCase()}</h1>
              </div>
              // </article>
            ))}
          </div>
        </div>
        {/* 
        <div className="float-tabs">
     
          <article id="about-tab" className="div-tabs">
            <div id="about-m" className="titles-m">
              <h1>ABOUT</h1>
            </div>
          </article>
     
          <article id="test-tab" className="div-tabs">
            <div id="test-m" className="titles-m">
              <h1>TESTIMONIALS</h1>
            </div>
          </article>
 
          <article className="div-tabs">
            <div id="sales-m" className="titles-m">
              <h1>SALES</h1>
            </div>
          </article>
        
          <article className="div-tabs">
            <div id="future-m" className="titles-m">
              <h1>FUTURE</h1>
            </div>
          </article>
        </div> */}

        {/* Tabs */}
        <div className="container-m" id="top" ref={this.top}>
          <img
            id="mcaM"
            className="mini-img"
            src={mca}
            alt=""
            style={{ transform: `translateY(${this.state.offsetY}px)` }}
          />

          <div></div>
          <article className="articles-left-m">
            <div>
              <p id="aboutM" className="about-sub-m">
                Fashion, art enthusiast and reseller.
                <br></br>
                First-generation born American.
                <br></br>
                Parents did not grow up with much but were
                <br></br>a big inspiration on my work ethic, they
                <br></br>were born in the Philippines and got to
                <br></br>
                the United States to nurse AIDs
                <br></br>
                patients during the AIDs epidemic.
                <br></br>
                <br></br>
                They taught me the value of money, but also
                <br></br>
                to treat myself to nice things. My mother is
                <br></br>
                frugal with her money and thinks about the
                <br></br>
                future but my dad priorities other people's
                <br></br>
                happiness and willingly spends graciously on them.
                <br></br>
                Their clashing personalities did not work well and
                <br></br>
                eventually they divorced when our finances
                <br></br>were not working out.
                <br></br>
                <br></br>
                The fighting between them about finances
                <br></br>
                pushed me to take a risk and start a business.
                <br></br>
                <br></br>I grew up interested in entrepreneurship,
                <br></br>worked for three summers during high-school
                <br></br>to save enough money for any expenses.
                <br></br>Opened up a secured deposit credit card at 18
                <br></br>and started building credit.
                <br></br>
                Purchased Supreme apparel during week 0 of the
                <br></br>Fall/Winter 2018 Season and took off from there.
              </p>
            </div>
          </article>
        </div>

        {/* JOUND */}

        <div className="container-m">
          <img
            id="joundM"
            className="mini-img"
            src={jound}
            alt=""
            style={{
              transform: `translateY(${this.state.JoundOffset}px)`,
            }}
          />

          <article id="testimonialsM">
            {this.state.apiLoaded === true ? (
              <div className="test-main-m">
                {this.state.twitterRef.map((ref, index) => (
                  <div key={index} className="container ">
                    <div className="test-sub-m">
                      <div className="test-img-col-m">
                        <img
                          alt="pfp"
                          src={ref.pfp}
                          className="test-img-m"
                        ></img>
                      </div>

                      <div className="col-sm test-ref-col">
                        <h4 className="test-name-m">{ref.username}</h4>{" "}
                        <h4 className="test-handle-m">{ref.at}</h4>
                        <div>
                          <h4 className="test-name-m">{ref.reply}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </article>
        </div>
        {/* JORDAN */}

        <div className="container-m">
          <article>
            <img id="jordanM" className="mini-img" src={jordan} alt="" />

            <div id="salesM">
              {this.state.scouttLoad ? (
                <div>
                  {this.state.scouttApp.map((scouttApi, index) => (
                    <section className="purchases-m" key={index}>
                      <div>
                        <h3>Total Purchases:{""}</h3>
                        <h3>
                          {" "}
                          <CountUpPurchases num={this.state.scoutPurchases} />
                        </h3>
                      </div>

                      <div>
                        <h3>Total Sales:{""}</h3>
                        <h3>
                          <CountUpSales num={this.state.scoutSales} />
                        </h3>
                      </div>
                      <div>
                        <p>
                          Scraped from my{" "}
                          <a href="https://scoutapp.ai/@shvrkboy">
                            ScoutApp API
                          </a>{" "}
                          using Puppetter
                        </p>
                      </div>
                    </section>
                  ))}
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </article>
        </div>

        <div className="container-m">
          <article>
            <img
              id="azaelM"
              className="mini-img"
              src={azael}
              alt=""
              style={{
                transform: `translateY(${this.state.AzaelOffset}px)`,
              }}
            />
          </article>
          <article className="articles-right-m">
            <div className="future-container-m">
              <article id="futureM" className="future-sub-m">
                I wish to continue to maintain my LLC, pursue my Master's Degree
                in Computer Science, grasp understanding of new computing
                languages, libraries, and data analytics as well as managing to
                land a paid internship or full-time job within my field of
                study.
                <br></br>
                <br></br>
                Five years from now I see myself managing a passive income
                through sustainable crypto mining and reselling, while on the
                verge of becoming financially stable through working as a
                full-time developer.
                <br></br>
                <br></br>I wish to support my family and future family so I can
                wake up and do the things I love by working on projects in code
                and art.
                <br></br>
                <br></br>I want to meet more people with the same motibational
                drive to learn and acheieve more so that I may learn under them
                and prove to be successful as well.
              </article>
            </div>
          </article>
        </div>
        <footer className="footer-m">
          made by shvrkboy. if parallax on the page is choppy it's most likely
          because your phone is in low power mode.
        </footer>
      </React.Fragment>
    );
  }
}

export default Mobile;
