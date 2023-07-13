import { FC } from 'react';
import { TestimonialCard1 } from 'components/reuseable/testimonial-cards';
// -------- data -------- //
import { testimonials } from 'data/demo-28';

const Testimonial22: FC = () => {
  return (
    <div className="grid mt-md-n19 mt-xl-n20 mt-xxl-n21 mb-20">
      <div className="row isotope gy-6">
        {testimonials.map((item, index) => (
          <div className="item col-md-6 col-xl-3" key={index}>
            <TestimonialCard1 {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial22;
