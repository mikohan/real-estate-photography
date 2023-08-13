import { FC } from 'react';
// -------- icons -------- //
import Verify from 'icons/solid-mono/Verify';
import PushCart from 'icons/solid-mono/PushCart';
import Wallet from 'icons/solid-mono/Wallet';
import Shipping from 'icons/solid-mono/Shipment';
// -------- data -------- //
const services = [
  {
    id: 1,
    Icon: Wallet,
    title: 'We have good pricing',
    description: 'We offer a simple pricing'
  },
  {
    id: 2,
    Icon: PushCart,
    title: 'Fast material delivery',
    description: 'We often deliver all materials within 24 hours. We can deliver it faster upon request'
  },
  {
    id: 3,
    Icon: Verify,
    title: 'No copyright claims',
    description: 'All materials is yours, you can use whatever way you want.'
  }
];

const ShopService: FC = () => {
  return (
    <section className="wrapper bg-gray">
      <div className="container py-12 py-md-14">
        <div className="row gx-lg-8 gx-xl-12 gy-8">
          {services.map(({ id, Icon, title, description }) => (
            <div className="col-md-6 col-lg-4" key={id}>
              <div className="d-flex flex-row">
                <div>
                  <Icon className="text-primary" />
                </div>

                <div>
                  <h4 className="mb-1">{title}</h4>
                  <p className="mb-0">{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopService;
