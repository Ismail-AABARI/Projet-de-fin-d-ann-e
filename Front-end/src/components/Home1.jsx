import React from "react";
import { Billing, Business, CardDeal, CTA, Footer, Stats, Testimonials, Hero} from "../components";
import styles from "../style";
import Chart from "../components/Chart.jsx"
import Navbar1 from "./Navbar1.jsx";

const Home = () => (
  <div id="rooot" className=" bg-primary w-full overflow-hidden">
    <div id="home" className={`${styles.paddingX} ${styles.flexCenter} triangle`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar1 />
        <Hero />
      </div>
    </div>
    
    <div id="features" className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Stats />
        <Business />
      </div>
    </div>

    <div id="product" className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Billing />
      </div>
    </div>

    <div id="clients" className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Chart/>
        <CardDeal />
        <Testimonials />
      </div>
    </div>

    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <CTA />
        <Footer />
      </div>
    </div>
  </div>
);

export default Home;

/* 
import React from "react";
import { Billing, Business, CardDeal, CTA, Footer, Stats, Testimonials, Hero, Navbar } from "../components";
import styles from "../style";

const Home = () => (
  <div id="root" className="bg-primary w-full overflow-hidden">
    <div id="hero-Nav" className={`${styles.paddingX} ${styles.flexCenter} triangle`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
        <Hero />
      </div>
    </div>
    
    <div id="features" className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Stats />
        <Business />
        <Billing />
      </div>
    </div>
    
    <div id="product" className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <CardDeal />
      </div>
    </div>
    
    <div id="clients" className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Testimonials />
        <CTA />
        <Footer />
      </div>
    </div>
  </div>
);

export default Home; */
