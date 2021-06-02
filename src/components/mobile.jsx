// import React, { Component } from "react";
// import mca from "../img/mca.png";
// import mcafloat from "../img/mcafloat.png";
// import jound from "../img/jound.png";
// import jordan from "../img/jordan.png";

// import {
//   Swiper,
//   SwiperSlide,
//   Navigation,
//   Pagination,
//   Scrollbar,
//   A11y,
//   Virtual,
// } from "swiper/react";

// class Mobile extends Component {
//   constructor(props) {
//     super(props);
//   }

//   state = {
//     scouttApp: [],
//     twitterRef: "",
//     apiLoaded: false,
//     scouttLoad: false,
//     navHover: false,
//     navIdled: false,
//     about: true,
//     counter: 1,
//     randomNum1: "",
//     randomNum2: "",
//     randomNum3: "",
//     hypebeast: mca,
//   };

//   callAPI() {
//     fetch("/twitterAPI")
//       .then((res) => res.json())
//       .then((results) =>
//         this.setState(
//           { scouttApp: [results] },
//           () => console.log("ScouttApp Results: ", results),
//           this.setState({ scouttLoad: true })
//         )
//       );
//   }

//   callRefs() {
//     fetch("/users")
//       .then((res) => res.json())
//       .then((replies) =>
//         this.setState(
//           { twitterRef: [replies] },
//           () => console.log("Twitter References: ", replies),
//           this.setState({ apiLoaded: true })
//         )
//       );
//   }

//   randomNumGen() {
//     let random1 = 0;
//     let random2 = 0;
//     let random3 = 0;
//     if (this.state.scouttLoad) {
//       return;
//     } else
//       setInterval(() => {
//         random1 = Math.floor(Math.random() * 9 + 1);
//         random2 = Math.floor(Math.random() * 9 + 1);
//         random3 = Math.floor(Math.random() * 9 + 1);
//         this.setState({ randomNum1: random1 });
//         this.setState({ randomNum2: random2 });
//         this.setState({ randomNum3: random3 });
//       }, 50);
//   }

//   componentDidMount() {
//     console.log(this.state.counter);
//     this.callAPI();
//     this.callRefs();
//     this.randomNumGen();
//   }

//   aboutM() {
//     const aboutM = document.getElementById("aboutM");
//     aboutM.style.display = "block";

//     const mcaM = document.getElementById("mcaM");
//     mcaM.style.display = "none";

//     const aboutBtn = document.getElementById("aboutBtn");
//     aboutBtn.style.display = "none";
//   }

//   aboutMImg() {
//     const aboutM = document.getElementById("aboutM");
//     aboutM.style.display = "none";

//     const mcaM = document.getElementById("mcaM");
//     mcaM.style.display = "block";

//     const aboutBtn = document.getElementById("aboutBtn");
//     aboutBtn.style.display = "block";

//     // TEST
//     const testBox0m = document.getElementById("testBox0m");
//     testBox0m.style.display = "none";

//     const testBox1m = document.getElementById("testBox1m");
//     testBox1m.style.display = "none";

//     const testBox2m = document.getElementById("testBox2m");
//     testBox2m.style.display = "none";

//     const testBox3m = document.getElementById("testBox3m");
//     testBox3m.style.display = "none";

//     const testBox4m = document.getElementById("testBox4m");
//     testBox4m.style.display = "none";

//     const joundM = document.getElementById("joundM");
//     joundM.style.display = "block";

//     const testBtn = document.getElementById("testBtn");
//     testBtn.style.display = "block";

//     const salesM = document.getElementById("salesM");
//     salesM.style.display = "none";

//     const jordanM = document.getElementById("jordanM");
//     jordanM.style.display = "block";

//     const salesBtn = document.getElementById("salesBtn");
//     salesBtn.style.display = "block";
//   }

//   testM() {
//     const testBox0m = document.getElementById("testBox0m");
//     testBox0m.style.display = "block";

//     const testBox1m = document.getElementById("testBox1m");
//     testBox1m.style.display = "block";

//     const testBox2m = document.getElementById("testBox2m");
//     testBox2m.style.display = "block";

//     const testBox3m = document.getElementById("testBox3m");
//     testBox3m.style.display = "block";

//     const testBox4m = document.getElementById("testBox4m");
//     testBox4m.style.display = "block";

//     const joundM = document.getElementById("joundM");
//     joundM.style.display = "none";

//     const testBtn = document.getElementById("testBtn");
//     testBtn.style.display = "none";
//   }

//   testMImg() {
//     const testM = document.getElementById("testM");
//     testM.style.display = "none";

//     const joundM = document.getElementById("joundM");
//     joundM.style.display = "block";

//     const testBtn = document.getElementById("testBtn");
//     testBtn.style.display = "block";
//   }

//   salesM() {
//     const salesM = document.getElementById("salesM");
//     salesM.style.display = "block";

//     const jordanM = document.getElementById("jordanM");
//     jordanM.style.display = "none";

//     const salesBtn = document.getElementById("salesBtn");
//     salesBtn.style.display = "none";
//   }

//   render() {
//     const twitterRef = this.state.twitterRef;
//     let displayAbout = false;
//     var counter = 1;
//     const slides = Array.from({ length: 1000 }).map(
//       (el, index) => `Slide ${index + 1}`
//     );
//     return (
//       <React.Fragment>
//         <Swiper
//           pagination={{ clickable: true }}
//           onSwiper={(swiper) => console.log(swiper)}
//           onSlideChange={() => this.aboutMImg()}
//         >
//           <SwiperSlide className="header-m">
//             <div>
//               <section>
//                 <h1 className="titles-m">ABOUT</h1>
//               </section>
//               <article>
//                 <img id="mcaM" className="mini-img" src={mca} alt="" />
//                 <button
//                   id="aboutBtn"
//                   onClick={() => this.aboutM()}
//                   className="btn-change-mca btn-mca"
//                 ></button>
//                 <div className="about-sub-m-container-m">
//                   <article id="aboutM" className="about-sub-m">
//                     Fashion, art enthusiast and reseller.
//                     <br></br>
//                     First-generation born American.
//                     <br></br>
//                     Parents did not grow up with much but were
//                     <br></br>a big inspiration on my work ethic, they
//                     <br></br>were born in the Philippines and got to
//                     <br></br>
//                     the United States to nurse AIDs
//                     <br></br>
//                     patients during the AIDs epidemic.
//                     <br></br>
//                     <br></br>
//                     They taught me the value of money, but also
//                     <br></br>
//                     to treat myself to nice things. My mother is
//                     <br></br>
//                     frugal with her money and thinks about the
//                     <br></br>
//                     future but my dad priorities other people's
//                     <br></br>
//                     happiness and willingly spends graciously on them.
//                     <br></br>
//                     Their clashing personalities did not work well and
//                     <br></br>
//                     eventually they divorced when our finances
//                     <br></br>were not working out.
//                     <br></br>
//                     <br></br>
//                     The fighting between them about finances
//                     <br></br>
//                     pushed me to take a risk and start a business.
//                     <br></br>
//                     <br></br>I grew up interested in entrepreneurship,
//                     <br></br>worked for three summers during high-school
//                     <br></br>to save enough money for any expenses.
//                     <br></br>Opened up a secured deposit credit card at 18
//                     <br></br>and started building credit.
//                     <br></br>
//                     Purchased Supreme apparel during week 0 of the
//                     <br></br>Fall/Winter 2018 Season and took off from there.
//                   </article>
//                 </div>
//               </article>
//             </div>
//           </SwiperSlide>
//           {/* JOUND */}
//           <SwiperSlide className="header-m">
//             <div>
//               <section>
//                 <h1 className="titles-m">TESTIMONIALS</h1>
//               </section>
//               <article>
//                 <img id="joundM" className="mini-img" src={jound} alt="" />
//                 <button
//                   id="testBtn"
//                   onClick={() => this.testM()}
//                   className="btn-change-jound btn-jound"
//                 ></button>
//                 {twitterRef != "" ? (
//                   <React.Fragment>
//                     <div className="vert-m">
//                       {this.state.twitterRef[0].replies.map(
//                         (twitterApi, index) => (
//                           <div className="test-center-m">
//                             <div
//                               id={"testBox" + index + "m"}
//                               className="container test-sub-m"
//                             >
//                               <div className="row">
//                                 <div className="col-sm test-img-col-m">
//                                   <img
//                                     src={twitterApi.pfp}
//                                     className="test-img-m"
//                                   ></img>
//                                 </div>

//                                 <div className="col-sm test-ref-col-m">
//                                   <h4 className="test-name-m">
//                                     {twitterApi.username}
//                                   </h4>{" "}
//                                   <h4 className="test-handle-m">
//                                     {twitterApi.at}
//                                   </h4>
//                                   <div>
//                                     <h4 className="test-name-m">
//                                       {twitterApi.reply}
//                                     </h4>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         )
//                       )}
//                     </div>
//                   </React.Fragment>
//                 ) : null}
//               </article>
//             </div>
//           </SwiperSlide>
//           {/* JORDAN */}
//           <SwiperSlide className="header-m">
//             <div>
//               <section>
//                 <h1 className="titles-m">SALES</h1>
//               </section>
//               <article>
//                 <img id="jordanM" className="mini-img" src={jordan} alt="" />
//                 <button
//                   id="salesBtn"
//                   onClick={() => this.salesM()}
//                   className="btn-change-jordan btn-jordan"
//                 ></button>
//                 <div id="salesM">
//                   {this.state.scouttLoad ? (
//                     <React.Fragment>
//                       {this.state.scouttApp.map((scouttApi) => (
//                         <React.Fragment>
//                           <div id="profit" className="row">
//                             <h1>
//                               Total Profit: {scouttApi.results.totalProfit}
//                             </h1>
//                           </div>

//                           <div id="purchase" className="row">
//                             <h1>
//                               Total Purchases:{" "}
//                               {scouttApi.results.totalPurchases}
//                             </h1>
//                           </div>

//                           <div id="sale" className="row">
//                             <h1>Total Sales: {scouttApi.results.totalSales}</h1>
//                           </div>
//                         </React.Fragment>
//                       ))}
//                     </React.Fragment>
//                   ) : (
//                     <React.Fragment>
//                       <div id="profit" className="row">
//                         <h1>
//                           Total Profit: ${this.state.randomNum1}
//                           {this.state.randomNum2}
//                           {","}
//                           {this.state.randomNum3}
//                           {this.state.randomNum2}
//                           {this.state.randomNum1}
//                           {"."}
//                           {this.state.randomNum2}
//                           {this.state.randomNum3}
//                         </h1>
//                       </div>

//                       <div id="purchase" className="row">
//                         <h1>
//                           Total Purchases: ${this.state.randomNum2}
//                           {this.state.randomNum1}
//                           {this.state.randomNum3}
//                           {","}
//                           {this.state.randomNum2}
//                           {this.state.randomNum3}
//                           {this.state.randomNum1}
//                           {"."}
//                           {this.state.randomNum1}
//                           {this.state.randomNum3}
//                         </h1>
//                       </div>

//                       <div id="sale" className="row">
//                         <h1>
//                           Total Sales: ${this.state.randomNum3}
//                           {this.state.randomNum2}
//                           {this.state.randomNum1}
//                           {","}
//                           {this.state.randomNum1}
//                           {this.state.randomNum2}
//                           {this.state.randomNum3}
//                           {"."}
//                           {this.state.randomNum3}
//                           {this.state.randomNum2}
//                         </h1>
//                       </div>
//                     </React.Fragment>
//                   )}
//                 </div>
//               </article>
//             </div>
//           </SwiperSlide>
//           {/* <SwiperSlide className="header-m">
//             {({ isActive }) => <div>{isActive ? "ABOUT" : "ABOUT"}</div>}
//           </SwiperSlide> */}
//         </Swiper>
//       </React.Fragment>
//     );
//   }
// }

// export default Mobile;
