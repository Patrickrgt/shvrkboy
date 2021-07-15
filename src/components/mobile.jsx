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
    const mcaFloatBound = mcaFloat.getBoundingClientRect();

    const mcaQuote = document.querySelector(".mca-quote");
    if (mcaFloatBound.bottom < aboutSub.top) {
      console.log(mcaFloatBound.top, aboutSub.top);
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
    const joundFloatBound = joundFloat.getBoundingClientRect();
    if (
      testImg.top < joundFloatBound.top &&
      1 < joundFloatBound.bottom < testSub.top - joundFloatBound.bottom
    ) {
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

    const jordanFloatBound = jordanFloat.getBoundingClientRect();
    const jordanQuote = document.querySelector(".jordan-quote");
    if (
      salesImg.top < jordanFloatBound.top &&
      1 < jordanFloatBound.bottom < salesSub.top - jordanFloatBound.bottom
    ) {
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

    const azaelFloatBound = azaelFloat.getBoundingClientRect();
    // testImg.top < joundFloatBound.top &&
    //   1 < joundFloatBound.bottom < testSub.top - joundFloatBound.bottom;

    if (
      futureImg.top < azaelFloatBound.top &&
      1 < azaelFloatBound.bottom < futureSub.top - azaelFloatBound.bottom
    ) {
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
                “Nike, Yeezy, Supreme,” my friends talked about these brands
                with such excitement that I never understood. “Why would someone
                spend over one-hundred dollars on a piece of clothing or on a
                pair of shoes?” I asked, and I was always hit with, “You
                wouldn’t get it, it’s a culture.”
                <br></br>
                <br></br>I was never a fan of the social exclusivity these
                brands endorsed but I was interested in the business. I was a
                university student finding ways to cover tuition without having
                to sacrifice time for my studies. I worked several part-time
                jobs and unpaid internships in the past only to realize the
                maxim, “Time is Money”. My time has value and minimum wage on
                part-times did not satisfy nor balance out my university costs
                and studies.
                <br></br>
                <br></br>I had to work smarter.
                <br></br>
                <br></br>I opened up a credit card as soon as I turned eighteen
                and started buying Supreme. I calculated my risk by
                understanding the third party market on brands. Supreme t-shirts
                and accessories retailed on average fifty dollars but would get
                marked up by 30% or more on the third party market. Supreme was
                exclusive. I live in New York State where Supreme owns a
                flagship store, I saw the opportunity and found my niche. I
                started by selling each Supreme piece online, paying off my
                credit card, then putting my gains towards my small operation. I
                expanded outside of Supreme. I would wait in lines for hours for
                Nikes, stay up until 3 AM for Yeezys, I cycled through the
                buying and selling process for weeks and kept expanding.
                <br></br>
                <br></br>I hated waiting in line, especially in New York City
                where the motto in these lines is “bully or be bullied”. Waiting
                in line started to become more of a hassle than a hustle. If I
                wanted to continue expanding my operation, I needed to automate
                purchases. I started investing in programs that acted as
                multiple customers purchasing products online. I researched
                proxy servers and cloud servers to maximize my success, each new
                infrastructure adding to my expenses, with the risk of failure
                increasing alongside success. But, I get it now. It’s a culture.
                <br></br>
                <br></br>
                Today I operate from home, buying and selling hot commodities
                ranging from limited sneakers, apparel, and technology. Given
                the opportunity of managing and starting a business taught me to
                value my time and money, to not be afraid to take risks and be
                grateful for what I have and appreciate my luck in life.
                <br></br>
                <br></br>
                Strangely enough, I’m known as shvrkboy because when I was
                younger I was told I look like young Taylor Lautner. I added a
                ‘v’ because most usernames with ‘sharkboy’ are taken and during
                the time, turning an A upside down as a V seemed an appropriate
                and popular solution.
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
                  <div key={index} className="container-test-m ">
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
                I find myself always getting interested in niche spaces but
                always relating those spaces back to art. When I was younger I
                wanted to be an artist. It eventually grew into graphic design,
                then game design, then music production, then sound engineering,
                then fashion. These niches spiraled into what I pursue now:
                Computer Science. I’m pursuing my dream of working as a
                full-stack engineer. Building an application from the ground-up
                forces you to design logically and artistically and I’m attached
                to that challenge. Knowing you’ve worked on a project that
                people use is an encouraging feeling of respect towards your
                craft.
                <br></br>
                <br></br>
                My answer to the age old question of where I see myself in five
                years is: Successful. Successful in my eyes. Owning a house,
                having a family, managing a car, pursuing a stable career. I
                want to inspire people with my art, whether it be through code
                or graphics. If not in five years then ten. I want to make
                myself proud so I will continue working hard everyday until I’m
                content. Comfort is my worst enemy, so I’m always learning
                something new. Whether it be Art, Design, Fashion, Software
                Engineering, Blockchain, or Business. I’m dedicated to mastering
                my craft and understandings so I’m always keeping up with
                trends. Of course the world moves fast and unexpectedly, I find
                myself always adapting.
                <br></br>
                <br></br>
                The future is unknown.
                <br></br>
                <br></br>However, whichever career I pursue in the future—design
                and technology will always be my niche.
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
