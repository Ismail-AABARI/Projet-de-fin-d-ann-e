import { bill } from "../assets";
import styles, { layout } from "../style";
import Design from "../assets/Customers.png"

const Billing = () => (
  <section className={layout.sectionReverse}>
    <div className={layout.sectionImgReverse}>
      <img src={Design} alt="billing" className="w-[100%] h-[100%] relative z-[5] image-product" />

      {/* gradient start */}
      <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
      <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient" />
      {/* gradient end */}
    </div>

    <div className={`${layout.sectionInfo} context-product`}>
      <h2 className={`title-color ${styles.heading2}`}>
        Analyser vos données <br className="sm:block hidden" /> pour mieux vendre
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      Analysez vos commandes et ventes de produits en détail avec notre plateforme. Suivez les tendances en temps réel et identifiez les meilleurs produits. <br /> Transformez vos données brutes en informations stratégiques avec nos tableaux de bord intuitifs.
      </p>
    </div>
  </section>
);

export default Billing;
