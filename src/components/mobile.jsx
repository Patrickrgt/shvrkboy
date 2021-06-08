import React, { Component } from "react";
import mca from "../img/mca.png";

import jound from "../img/jound.png";
import jordan from "../img/jordan.png";
import { db } from "../store/firebase.js";
import axios from "axios";
import CountUpPurchases from "./countuppurchases.jsx";
import CountUpSales from "./countupsales.jsx";
import PaginationMobile from "../components/paginationMobile";
// import { paginate } from "../utils/paginate";

import {
  Swiper,
  SwiperSlide,
  // Navigation,
  // Pagination,
  // Scrollbar,
  // A11y,
  // Virtual,
} from "swiper/react";

class Mobile extends Component {
  // constructor(props) {
  //   super(props);
  // }

  state = {
    scouttApp: [],
    twitterRef: "",
    apiLoaded: false,
    scouttLoad: false,
    navHover: false,
    navIdled: false,
    about: true,
    counter: 1,
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
    const url = "https://shvrkboyapinodejs.herokuapp.com";

    axios.get(url).then((res) => {
      this.setState(
        { twitterRef: res.data.replies },
        this.setState({ apiLoaded: true, isActive: false })
      );
    });
  }

  async randomNumGen() {
    if (this.state.scouttLoad) {
      return;
    } else this.setState({ randomNum1: "loading" });
  }

  componentDidMount() {
    this.callAPI();
    this.callRefs();
    this.randomNumGen();
  }

  aboutM() {
    const aboutM = document.getElementById("aboutM");
    aboutM.style.display = "block";

    const mcaM = document.getElementById("mcaM");
    mcaM.style.display = "none";

    const aboutBtn = document.getElementById("aboutBtn");
    aboutBtn.style.display = "none";
  }

  aboutMImg() {
    const aboutM = document.getElementById("aboutM");
    aboutM.style.display = "none";

    const mcaM = document.getElementById("mcaM");
    mcaM.style.display = "block";

    const aboutBtn = document.getElementById("aboutBtn");
    aboutBtn.style.display = "block";

    // TEST
    const testBox0m = document.getElementById("testBox0m");
    testBox0m.style.display = "none";

    const testBox1m = document.getElementById("testBox1m");
    testBox1m.style.display = "none";

    const testBox2m = document.getElementById("testBox2m");
    testBox2m.style.display = "none";

    const testBox3m = document.getElementById("testBox3m");
    testBox3m.style.display = "none";

    const testBox4m = document.getElementById("testBox4m");
    testBox4m.style.display = "none";

    const joundM = document.getElementById("joundM");
    joundM.style.display = "block";

    const testBtn = document.getElementById("testBtn");
    testBtn.style.display = "block";

    const salesM = document.getElementById("salesM");
    salesM.style.display = "none";

    const jordanM = document.getElementById("jordanM");
    jordanM.style.display = "block";

    const salesBtn = document.getElementById("salesBtn");
    salesBtn.style.display = "block";
  }

  testM() {
    const testBox0m = document.getElementById("testBox0m");
    testBox0m.style.display = "block";

    const testBox1m = document.getElementById("testBox1m");
    testBox1m.style.display = "block";

    const testBox2m = document.getElementById("testBox2m");
    testBox2m.style.display = "block";

    const testBox3m = document.getElementById("testBox3m");
    testBox3m.style.display = "block";

    const testBox4m = document.getElementById("testBox4m");
    testBox4m.style.display = "block";

    const joundM = document.getElementById("joundM");
    joundM.style.display = "none";

    const testBtn = document.getElementById("testBtn");
    testBtn.style.display = "none";
  }

  testMImg() {
    const testM = document.getElementById("testM");
    testM.style.display = "none";

    const joundM = document.getElementById("joundM");
    joundM.style.display = "block";

    const testBtn = document.getElementById("testBtn");
    testBtn.style.display = "block";
  }

  salesM() {
    const salesM = document.getElementById("salesM");
    salesM.style.display = "block";

    const jordanM = document.getElementById("jordanM");
    jordanM.style.display = "none";

    const salesBtn = document.getElementById("salesBtn");
    salesBtn.style.display = "none";
  }

  render() {
    const twitterRef = this.state.twitterRef;
    const { length: count } = twitterRef;
    const { pageSize, currentPage } = this.state;
    // const refs = paginate(allRefs, currentPage, pageSize);
    // let displayAbout = false;
    // var counter = 1;
    // const slides = Array.from({ length: 1000 }).map(
    //   (el, index) => `Slide ${index + 1}`
    // );
    return (
      <React.Fragment>
        <Swiper
          pagination={{ clickable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => this.aboutMImg()}
        >
          <SwiperSlide className="header-m">
            <div>
              <section>
                <h1 className="titles-m">ABOUT</h1>
              </section>
              <article>
                <img id="mcaM" className="mini-img" src={mca} alt="" />
                <button
                  id="aboutBtn"
                  onClick={() => this.aboutM()}
                  className="btn-change-mca btn-mca"
                ></button>
                <div className="about-sub-m-container-m">
                  <article id="aboutM" className="about-sub-m">
                    Thank you for visiting my page!
                    <br></br>
                    <br></br>
                    I'm a sneakerhead that's into art, fashion, coding and
                    reselling.
                    <br></br>
                    <br></br>
                    My work ethic revolves around my nurting at a young age. I
                    never felt good enough compared to others, but when I
                    stopped comparing myself to others or caring what other
                    people thought--I started to learn to do things for
                    myself--to make myself proud.
                    <br></br>
                    <br></br>
                    Today I'm an aspiring full-stack developer maintaining an
                    LLC with passion to continue learning from people smarter
                    than me and creating projects with groups of like-minded
                    people.
                  </article>
                </div>
              </article>
            </div>
          </SwiperSlide>
          {/* JOUND */}
          <SwiperSlide className="header-m">
            <div>
              <section>
                <h1 className="titles-m">TESTIMONIALS</h1>
              </section>
              <article>
                <img id="joundM" className="mini-img" src={jound} alt="" />
                <button
                  id="testBtn"
                  onClick={() => this.testM()}
                  className="btn-change-jound btn-jound"
                ></button>
                {twitterRef !== "" ? (
                  <React.Fragment>
                    <div className="vert-m">
                      {this.state.twitterRef[0].replies.map(
                        (twitterApi, index) => (
                          <div className="test-center-m">
                            <div
                              id={"testBox" + index + "m"}
                              className="container test-sub-m"
                            >
                              <div className="row">
                                <div className="col-sm test-img-col-m">
                                  <img
                                    alt="twitter profile pic"
                                    src={twitterApi.pfp}
                                    className="test-img-m"
                                  ></img>
                                </div>

                                <div className="col-sm test-ref-col-m">
                                  <h4 className="test-name-m">
                                    {twitterApi.username}
                                  </h4>{" "}
                                  <h4 className="test-handle-m">
                                    {twitterApi.at}
                                  </h4>
                                  <div>
                                    <h4 className="test-name-m">
                                      {twitterApi.reply}
                                    </h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                      <div className="pagination-div">
                        <PaginationMobile
                          itemsCount={count}
                          pageSize={pageSize}
                          currentPage={currentPage}
                          onPageChange={this.handlePageChange}
                        />
                      </div>
                    </div>
                  </React.Fragment>
                ) : null}
              </article>
            </div>
          </SwiperSlide>
          {/* JORDAN */}
          <SwiperSlide className="header-m">
            <div>
              <section>
                <h1 className="titles-m">SALES</h1>
              </section>
              <article>
                <img id="jordanM" className="mini-img" src={jordan} alt="" />
                <button
                  id="salesBtn"
                  onClick={() => this.salesM()}
                  className="btn-change-jordan btn-jordan"
                ></button>
                <div id="salesM">
                  {this.state.scouttLoad ? (
                    <React.Fragment>
                      {this.state.scouttApp.map((scouttApi, index) => (
                        <section key={index}>
                          <div id="purchase" className="row">
                            <h1>
                              Total Purchases:{""}
                              {this.state.renderNumbers ? (
                                <CountUpPurchases
                                  num={this.state.scoutPurchases}
                                />
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
                      <div id="profit" className="row">
                        <h1>
                          Total Profit: ${this.state.randomNum1}
                          {this.state.randomNum2}
                          {","}
                          {this.state.randomNum3}
                          {this.state.randomNum2}
                          {this.state.randomNum1}
                          {"."}
                          {this.state.randomNum2}
                          {this.state.randomNum3}
                        </h1>
                      </div>

                      <div id="purchase" className="row">
                        <h1>
                          Total Purchases: ${this.state.randomNum2}
                          {this.state.randomNum1}
                          {this.state.randomNum3}
                          {","}
                          {this.state.randomNum2}
                          {this.state.randomNum3}
                          {this.state.randomNum1}
                          {"."}
                          {this.state.randomNum1}
                          {this.state.randomNum3}
                        </h1>
                      </div>

                      <div id="sale" className="row">
                        <h1>
                          Total Sales: ${this.state.randomNum3}
                          {this.state.randomNum2}
                          {this.state.randomNum1}
                          {","}
                          {this.state.randomNum1}
                          {this.state.randomNum2}
                          {this.state.randomNum3}
                          {"."}
                          {this.state.randomNum3}
                          {this.state.randomNum2}
                        </h1>
                      </div>
                    </React.Fragment>
                  )}
                </div>
              </article>
            </div>
          </SwiperSlide>
          {/* <SwiperSlide className="header-m">
            {({ isActive }) => <div>{isActive ? "ABOUT" : "ABOUT"}</div>}
          </SwiperSlide> */}
        </Swiper>
      </React.Fragment>
    );
  }
}

export default Mobile;
