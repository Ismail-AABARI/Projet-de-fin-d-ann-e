import { features } from "../constants";
import styles, { layout } from "../style";
import Button from "./Button";

const FeatureCard = ({ icon, title, content, index }) => (
  <div className={`flex flex-row p-6 rounded-[20px] ${index !== features.length - 1 ? "mb-6" : "mb-0"} feature-card content`}>
    <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
      <img src={icon} alt="star" className="w-[50%] h-[50%] object-contain" />
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-poppins font-semibold text-black text-[18px] leading-[23.4px] mb-1 title">
        {title}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px] paragraph">
        {content}
      </p>
    </div>
  </div>
);

const Business = () =>  (
  <section className={layout.section}>
    <div className={`${layout.sectionInfo} business-design`}>
    <h2 className={`title-color ${styles.heading2}`}>
        Vous gérez l'entreprise, <br className="sm:block hidden " /> Nous nous occupons des commandes.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      Avec notre service d'analyse des commandes avancé, vous pouvez rationaliser vos opérations, optimiser vos stocks et augmenter votre rentabilité. Dans le marché concurrentiel d'aujourd'hui, prendre des décisions basées sur les données est crucial. 
      </p>

      <Button styles={`mt-10`} />
    </div>

    <div className={`${layout.sectionImg} flex-col card-right`}>
      {features.map((feature, index) => (
        <FeatureCard key={feature.id} {...feature} index={index} />
      ))}
    </div>
  </section>
);

export default Business;
