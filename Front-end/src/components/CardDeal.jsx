import { card } from "../assets";
import styles, { layout } from "../style";
import Button from "./Button";
import person from "../assets/person.png"

const CardDeal = () => (
  <section className={layout.section}>
    <div className={`${layout.sectionImg} images-cardDeeal`}>
      <img src={person} alt="billing" className="w-[70%] h-[70%]" />
    </div>
    <div className={`${layout.sectionInfo} context-cardDeeal`}>
    <h2 className={`title-color ${styles.heading2}`}>
    Ce que nos clients <br className="sm:block hidden" /> disent de nous
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      Découvrez comment notre service d'analyse des commandes a transformé la gestion des opérations et augmenté la rentabilité de nombreuses entreprises.
      </p>
    </div>

  </section>
);

export default CardDeal;
