import styles, { layout } from "../style";
import Button from "./Button";
import card from "../assets/card.png"

const Chart = () => (
    <section>
        <div className={`${layout.sectionInfo} context-cards`}>
        <h2 className={`title-color ${styles.heading2}`}>
        Trouvez une meilleure stratégie  <br className="sm:block hidden" /> de gestion des commandes.
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Optimisez vos opérations et améliorez votre rentabilité grâce à notre analyse avancée des commandes.
        Simplifiez la gestion des stocks et anticipez la demande avec précision.
        </p>
        <Button styles={`mt-10`} />
        </div>
        <div className={layout.sectionImg}>
            <img src={card} alt="billing" className="w-[30%] h-[30%] card" />
        </div>
    </section>
);

export default Chart;