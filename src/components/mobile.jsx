import React, { Component } from "react";

import mca from "../img/mca.png";

import jound from "../img/jound.png";
import jordan from "../img/jordan.png";
import azael from "../img/azaelcom.jpg";
import { paginate } from "../utils/paginate";
import CountUpPurchases from "./countuppurchases.jsx";
import CountUpSales from "./countupsales.jsx";
import { db } from "../store/firebase.js";

class Mobile extends Component {
  constructor(props) {}

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
  };

  handleScroll(e) {
    this.setState({
      offsetY: window.pageYOffset,
    });
    // console.log();

    // Jound Positions
    const JoundBox = document.querySelector("#joundM");
    const JoundRect = JoundBox.getBoundingClientRect();
    if (JoundRect.y < 0) {
      this.setState(
        {
          JoundOffset: JoundRect.y * -1,
        }
        // () => {
        //   console.log(this.state.JoundOffset);
        // }
      );
    }

    // Azael Positions
    const AzaelBox = document.querySelector("#azaelM");
    const AzaelRect = AzaelBox.getBoundingClientRect();
    if (AzaelRect.y < 0) {
      this.setState(
        {
          AzaelOffset: AzaelRect.y * -1,
        }
        // () => {
        //   console.log(this.state.JoundOffset);
        // }
      );
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
    const { pageSize, currentPage, twitterRef: allRefs } = this.state;

    return (
      <React.Fragment>
        <div className="container-m">
          <div id="about-m" className="header-m">
            <h1>ABOUT</h1>
          </div>
          <img
            id="mcaM"
            className="mini-img"
            src={mca}
            alt=""
            style={{ transform: `translateY(${this.state.offsetY * 0.5}px)` }}
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
              transform: `translateY(${this.state.JoundOffset * 0.5}px)`,
            }}
          />
          <div>
            <h1>TESTIMONIALS</h1>
          </div>

          <article>
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
          <section>
            <h1 className="titles-m">SALES</h1>
          </section>
          <article>
            <img id="jordanM" className="mini-img" src={jordan} alt="" />

            <div id="salesM">
              {this.state.scouttLoad ? (
                <div>
                  {this.state.scouttApp.map((scouttApi, index) => (
                    <section key={index}>
                      <div>
                        <h3>
                          Total Purchases:{""}
                          <CountUpPurchases num={this.state.scoutPurchases} />
                        </h3>
                      </div>

                      <div>
                        <h3>
                          Total Sales:{""}
                          <CountUpSales num={this.state.scoutSales} />
                        </h3>
                      </div>
                    </section>
                  ))}
                </div>
              ) : (
                <React.Fragment>
                  <div id="purchase" className="row">
                    <p>{this.state.randomNum1}</p>
                  </div>

                  <div id="sale" className="row">
                    <p>{this.state.randomNum1}</p>
                  </div>
                </React.Fragment>
              )}
            </div>
          </article>
        </div>

        <div className="container-m">
          <div id="future-m" className="titles-m">
            <h1>FUTURE</h1>
          </div>

          <article>
            <img
              id="azaelM"
              className="mini-img"
              src={azael}
              alt=""
              style={{
                transform: `translateY(${this.state.AzaelOffset * 0.5}px)`,
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
      </React.Fragment>
    );
  }
}

export default Mobile;
