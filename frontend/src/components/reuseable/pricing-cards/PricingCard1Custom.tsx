import { FC } from 'react';
import Price from './Price';
import NextLink from '../links/NextLink';
import { urls } from 'utils/urls';
import { IPackageSetDatum } from 'interfaces/IPackageSet';

// ================================================================
type PricingCard1Props = {
  pack: IPackageSetDatum;
  roundedButton?: boolean;
  bulletBg?: boolean;
};
// ================================================================

const PricingCard1: FC<PricingCard1Props> = (props) => {
  const { pack, roundedButton, bulletBg } = props;

  return (
    <div className="pricing card shadow-lg">
      <div className="card-body pb-12">
        {/* <div className="prices text-dark">
          <Price duration="mo" value={monthlyPrice} classes={monthClasses} />
          <Price duration="yr" value={yearlyPrice} classes={yearClasses} />
        </div> */}

        <h4 className="card-title mt-2">
          {pack.attributes.name}
          <strong>
            <span className="underline-3 style-3 leaf"> ${pack.attributes.value}</span>
          </strong>
        </h4>

        <ul className={`icon-list ${bulletBg ? 'bullet-bg' : ''} bullet-soft-primary mt-7 mb-8`}>
          {pack.attributes.prices.data.map((item, i) => (
            <li key={i}>
              <i className="uil uil-check fs-21" />
              <span>
                <strong>{item.attributes.name}</strong>
              </span>
            </li>
          ))}
        </ul>
        <NextLink
          href={urls.prices(pack.id)}
          title="Choose Plan"
          className={`btn btn-primary ${roundedButton ? 'rounded' : 'rounded-pill'}`}
        />
      </div>
    </div>
  );
};

export default PricingCard1;
