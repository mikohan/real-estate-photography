import { FC, Fragment } from 'react';
import { ServiceCard2Custom } from 'components/reuseable/service-cards';
// -------- data -------- //
import { serviceList3 } from 'data/service';
import { Datum } from 'interfaces/IServices';
import { ServiceCard2Props } from 'components/reuseable/service-cards/ServiceCard2Custom';
interface IProps {
  services: Datum[];
}

const Services4Custom: FC<IProps> = ({ services }) => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-8 col-xl-7 col-xxl-6">
          <h2 className="fs-16 text-uppercase text-line text-primary mb-3">Why you should choose us?</h2>
          <h3 className="display-4 mb-9">We will make your life easier.</h3>
        </div>
      </div>

      <div className="row gx-md-8 gy-8 mb-14 mb-md-18">
        {services.map((item) => {
          const payload: ServiceCard2Props = {
            icon: item.attributes.icon,
            linkUrl: item.attributes.linkUrl || '',
            title: item.attributes.title,
            description: item.attributes.description
          };
          return (
            <ServiceCard2Custom
              hiddenBtn
              {...payload}
              key={item.id}
              iconBoxClassNames="icon btn btn-block btn-lg btn-soft-primary pe-none mb-6"
            />
          );
        })}
      </div>
    </Fragment>
  );
};

export default Services4Custom;
