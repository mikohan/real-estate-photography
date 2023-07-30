import { FC, useState } from 'react';
import { slideInDownAnimate } from 'utils/animation';
import Contact from '../navbar/partials/Contact';
import NextLink from 'components/reuseable/links/NextLink';
import { PricingCard1Custom } from 'components/reuseable/pricing-cards';
import { urls } from 'utils/urls';
// -------- data -------- //
import { pricingList1 } from 'data/pricing';
import Link from 'next/link';
import { IPackageSet } from 'interfaces/IPackageSet';

type IPricingProps = {
  pack: IPackageSet;
};

const Pricing3: FC<IPricingProps> = ({ pack }) => {
  const [activeYearly, setActiveYearly] = useState(false);
  const packageLilst = pack.data;

  return (
    <div className="row gy-6 mb-16 mb-md-18">
      <div className="col-lg-4">
        <h2 className="fs-16 text-uppercase text-line text-primary mt-lg-18 mb-3">Our Pricing</h2>
        <h3 className="display-4 mb-3">We offer base and advance price packages.</h3>
        <p>
          You can choose services on <NextLink title="Go to Prices" href={urls.shop()} className="hover" /> page.
        </p>

        <div style={slideInDownAnimate('1200ms')}>
          <Link href={urls.shop()}>
            <button className="btn btn-primary rounded-pill mx-1 mb-2 mb-md-0">Shop Our Services</button>
          </Link>
        </div>
      </div>

      <div className="col-lg-7 offset-lg-1 pricing-wrapper">
        {/* <div className="pricing-switcher-wrapper switcher justify-content-start justify-content-lg-end">
          <p className="mb-0 pe-3">Monthly</p>
          <Switch value={activeYearly} onChange={setActiveYearly} />
          <p className="mb-0 ps-3">
            Yearly <span className="text-red">(Save 30%)</span>
          </p>
        </div> */}

        <div className="row gy-6 position-relative mt-5">
          <div
            className="shape rounded-circle bg-soft-primary rellax w-18 h-18"
            style={{ top: '-1rem', left: '-2rem' }}
          />

          <div className="shape bg-dot red rellax w-16 h-18" style={{ right: '-1.6rem', bottom: '-0.5rem' }} />

          {packageLilst.map((item, i) => (
            <div className={`col-md-6 ${i === 1 && 'popular'}`} key={i}>
              <PricingCard1Custom roundedButton bulletBg pack={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing3;
