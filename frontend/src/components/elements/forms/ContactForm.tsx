// components/blocks/navbar/partials/Contact.tsx
import { FC, FormEvent, Fragment, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { companyInfo as company } from 'config';

const ContactForm: FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [text, setText] = useState('');
  const { push } = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      service_id: company.sendEmailSettings.service_id,
      template_id: company.sendEmailSettings.template_id,
      user_id: company.sendEmailSettings.user_id,
      template_params: {
        name,
        surname: 'Modal',
        email: phone,
        message: text
      }
    };
    const responce = await axios.post(company.sendEmailSettings.url, payload);
    // if (responce.status == 200) {
    //   push('/photo/thankyou');
    // } else {
    //   push('/photo/error');
    // }
  };

  return (
    <Fragment>
      <h2 className="mb-3 text-start">Instant Quote</h2>
      <p className="lead mb-6 text-start">Send us request, we will send quote to you within 1 working day.</p>

      <form onSubmit={handleSubmit} className="text-start mb-3">
        <div className="form-floating mb-4">
          <input
            type="text"
            value={name}
            id="loginName"
            placeholder="Name"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="loginName">Name</label>
        </div>
        <div className="form-floating mb-4">
          <input
            type="text"
            value={phone}
            id="loginPhone"
            placeholder="Phone"
            className="form-control"
            onChange={(e) => setPhone(e.target.value)}
          />
          <label htmlFor="loginPhone">Phone</label>
        </div>
        <div className="form-floating">
          <textarea
            required
            id="textArea"
            placeholder="Textarea"
            className="form-control"
            style={{ height: 150 }}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <label htmlFor="textArea">Describe your project</label>
        </div>
        <button
          type="submit"
          className="btn btn-primary rounded-pill btn-login w-100 mb-2 mt-5"
          data-bs-dismiss="modal"
        >
          Send Request
        </button>
      </form>
    </Fragment>
  );
};

export default ContactForm;
