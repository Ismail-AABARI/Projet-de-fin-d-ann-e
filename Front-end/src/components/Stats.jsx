import { stats } from "../constants";
import styles from "../style";
import CountUp from 'react-countup';

const Stats = () => (
  <section className="flex justify-center items-center flex-row flex-wrap  mt-6 ">
    {stats.map((stat) => (
      <div key={stat.id} className="flex-1 flex justify-start items-center flex-row m-3 ml-40">
        <CountUp end={parseFloat(stat.value)} className='text-black font-poppins font-semibold xs:text-[40px] text-[30px] xs:leading-[53px] leading-[43px] ' />
        <p className="font-poppins font-normal xs:text-[20.45px] text-[15.45px] xs:leading-[26.58px] leading-[21.58px] title-color uppercase ml-3">
          {stat.title}
        </p>
      </div>
    ))}
  </section>
);

export default Stats;
