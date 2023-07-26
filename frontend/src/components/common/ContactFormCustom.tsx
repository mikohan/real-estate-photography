import { FC, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { company } from 'data/company-info';

const ContactForm: FC = () => {
  const { push } = useRouter();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      service_id: company.sendEmailSettings.service_id,
      template_id: company.sendEmailSettings.template_id,
      user_id: company.sendEmailSettings.user_id,
      template_params: {
        name,
        surname,
        email,
        message
      }
    };
    const responce = await axios.post(company.sendEmailSettings.url, payload);
    if (responce.status == 200) {
      push('/photo/thankyou');
    } else {
      push('/photo/error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form needs-validation" method="post">
      <div className="messages"></div>
      <div className="row gx-4">
        <div className="col-md-6">
          <div className="form-floating mb-4">
            <input
              required
              type="text"
              name="name"
              id="form_name"
              placeholder="Jane"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="form_name">First Name *</label>
            <div className="valid-feedback"> Looks good! </div>
            <div className="invalid-feedback"> Please enter your first name. </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-floating mb-4">
            <input
              required
              type="text"
              name="surname"
              placeholder="Doe"
              id="form_lastname"
              className="form-control"
              onChange={(e) => setSurname(e.target.value)}
            />
            <label htmlFor="form_lastname">Last Name *</label>
            <div className="valid-feedback"> Looks good! </div>
            <div className="invalid-feedback"> Please enter your last name. </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-floating mb-4">
            <input
              required
              type="email"
              name="email"
              id="form_email"
              className="form-control"
              placeholder="jane.doe@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="form_email">Email *</label>
            <div className="valid-feedback"> Looks good! </div>
            <div className="invalid-feedback"> Please provide a valid email address. </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-select-wrapper mb-4">
            <select className="form-select" id="form-select" name="department" required>
              <option disabled value="">
                Select a department
              </option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="Customer Support">Customer Support</option>
            </select>

            <div className="valid-feedback"> Looks good! </div>
            <div className="invalid-feedback"> Please select a department. </div>
          </div>
        </div>

        <div className="col-12">
          <div className="form-floating mb-4">
            <textarea
              required
              name="message"
              id="form_message"
              className="form-control"
              placeholder="Your message"
              style={{ height: 150 }}
              onChange={(e) => setMessage(e.target.value)}
            />

            <label htmlFor="form_message">Message *</label>
            <div className="valid-feedback"> Looks good! </div>
            <div className="invalid-feedback"> Please enter your messsage. </div>
          </div>
        </div>

        <div className="col-12 text-center">
          <input type="submit" value="Send message" className="btn btn-primary rounded-pill btn-send mb-3" />
          <p className="text-muted">
            <strong>*</strong> These fields are required.
          </p>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
