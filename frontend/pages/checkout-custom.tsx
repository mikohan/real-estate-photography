import { GetServerSideProps, GetServerSidePropsContext, GetStaticPropsContext, NextPage } from 'next';
import { ChangeEvent, Fragment, ReactHTMLElement, SyntheticEvent, useState } from 'react';
import currency from 'utils/currency';
// -------- custom component -------- //
import Navbar4Custom from 'components/blocks/navbar/Navbar4Custom';
import { Footer8 } from 'components/blocks/footer';
import ShopService from 'components/common/ShopService';
import Breadcrumb from 'components/reuseable/Breadcrumb';
import PageProgress from 'components/common/PageProgress';
import { ProductCard2, ProductCard2Custom } from 'components/reuseable/product-cards';
import { Checkbox, Input, Select } from 'components/elements/checkout-form';
// -------- data -------- //
import { breadcrumb, orderProducts, orderSummeryRow } from 'data/checkout-page';
import { IPrice } from 'interfaces/IPrice';
import { ICompany } from 'interfaces/ICompany';
import { ISocial } from 'interfaces/ISocial';
import { IPackageSet } from 'interfaces/IPackageSet';
import { BACKEND_API_URL } from 'config';
import { PurpleAttributes } from 'interfaces/ICompany';
import { ISocialDatum } from 'interfaces/ISocial';
import Footer5Custom from 'components/blocks/footer/Footer5Custom';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

type Props = {
  price?: IPrice;
  company: ICompany;
  social: ISocial;
  pack?: IPackageSet;
};
type IProducts = {
  id: number;
  title: string;
  value: number;
  type: string;
};
const Checkout: NextPage<Props> = (props) => {
  const { pack, price } = props;
  const company: PurpleAttributes = props.company.data.attributes;
  const social: ISocialDatum[] = props.social.data;
  let total = 0;
  let products: IProducts[] = [];

  if (price) {
    price.data.map((val) => {
      total += val.attributes.value;
      products?.push({
        id: val.id,
        title: val.attributes.name,
        value: val.attributes.value,
        type: 'price'
      });
    });
  }
  if (pack) {
    pack.data.map((val) => {
      total += val.attributes.value;
      products?.push({
        id: val.id,
        title: val.attributes.name,
        value: val.attributes.value,
        type: 'pack'
      });
    });
  }
  console.log(products);
  // Controlled form starts here
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [country, setCountry] = useState('US');
  const [state, setState] = useState('CA');
  const [zip, setZip] = useState('');

  const handleFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };
  const handleLasttName = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handPhone = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };
  const handEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handAddress1 = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress1(e.target.value);
  };
  const handAddress2 = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress2(e.target.value);
  };
  const handCountry = (e: React.FormEvent<HTMLSelectElement>) => {
    setCountry(e.currentTarget.value);
  };
  const handState = (e: React.FormEvent<HTMLSelectElement>) => {
    setState(e.currentTarget.value);
  };
  const handZip = (e: ChangeEvent<HTMLInputElement>) => {
    setZip(e.target.value);
  };
  const formData = {
    firstName,
    lastName,
    phone,
    email,
    address1,
    address2,
    country,
    state,
    zip,
    total
  };
  console.log({ products, formData });

  const stripePromise = loadStripe(
    'pk_test_51NYAAsAOIjwuKYKnueiGoMSbBJqPX1S9C9hKfnFuogivf32dbKPb1mSnS6F7rvOgbi60aaKBNCmV5ZRpmPhz3gzz00Xj395Ekh'
  );
  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const res = await axios.post(BACKEND_API_URL + 'orders', {
        formData,
        products
      });
      if (stripe) {
        await stripe.redirectToCheckout({
          sessionId: res.data.stripeSession.id
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <PageProgress />

      {/* ========== header section ========== */}
      <header className="wrapper bg-light">
        <Navbar4Custom showLogo={false} social={social} company={company} />
      </header>

      <main className="content-wrapper">
        {/* ========== breadcrumb section ========== */}
        <section className="wrapper bg-gray">
          <div className="container py-3 py-md-5">
            <Breadcrumb data={breadcrumb} className="mb-0" />
          </div>
        </section>

        <div className="wrapper bg-light">
          <div className="container pt-12 pt-md-14 pb-14 pb-md-16">
            <div className="row gx-md-8 gx-xl-12 gy-12">
              {/* ========== shipping section ========== */}
              <div className="col-lg-8">
                <div className="alert alert-blue alert-icon mb-6" role="alert">
                  <i className="uil uil-exclamation-circle"></i> Tell us about real estate{' '}
                  <strong>Location and Contacts</strong> of representative please for faster checkout experience.
                </div>

                <h3 className="mb-4">Property Address</h3>

                <form className="needs-validation">
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <Input
                        type="text"
                        id="firstName"
                        placeholder="First name"
                        label="First name"
                        value={firstName}
                        onChange={handleFirstName}
                      />
                    </div>

                    <div className="col-sm-6">
                      <Input
                        type="text"
                        id="lastName"
                        placeholder="Last name"
                        label="Last name"
                        value={lastName}
                        onChange={handleLasttName}
                      />
                    </div>

                    <div className="col-12">
                      <Input
                        type="email"
                        id="email"
                        placeholder="you@example.com"
                        label="Email"
                        value={email}
                        onChange={handEmail}
                      />
                    </div>
                    <div className="col-12">
                      <Input
                        type="phone"
                        id="phone"
                        placeholder="(951) 000-00-00"
                        label="Phone"
                        value={phone}
                        onChange={handPhone}
                      />
                    </div>

                    <div className="col-12">
                      <Input
                        type="text"
                        id="address"
                        placeholder="1234 Main St"
                        label="Address"
                        value={address1}
                        onChange={handAddress1}
                      />
                    </div>

                    <div className="col-12">
                      <Input
                        type="text"
                        id="address2"
                        placeholder="Apartment or suite"
                        label="Address 2 (Optional)"
                        value={address2}
                        onChange={handAddress2}
                      />
                    </div>

                    <div className="col-md-5">
                      <Select
                        required
                        id="country"
                        label="Country"
                        options={[{ title: 'United States', value: 'usa' }]}
                        value={country}
                        onSelect={handCountry}
                      />
                    </div>

                    <div className="col-md-4">
                      <Select
                        required
                        id="state"
                        label="State"
                        options={[{ title: 'California', value: 'california' }]}
                        value={state}
                        onSelect={handState}
                      />
                    </div>

                    <div className="col-md-3">
                      <Input
                        type="text"
                        id="zip"
                        placeholder="Zip Code"
                        label="Zip Code"
                        value={zip}
                        onChange={handZip}
                      />
                    </div>
                  </div>

                  <hr className="mt-7 mb-6" />
                </form>
              </div>

              {/* ========== order summary section ========== */}
              <div className="col-lg-4">
                <h3 className="mb-4">Order Summary</h3>

                <div className="shopping-cart mb-7">
                  {price && price.data.map((item) => <ProductCard2Custom price={item} key={item.id} />)}
                  {pack && pack.data.map((item) => <ProductCard2Custom pack={item} key={item.id} />)}
                </div>

                <hr className="my-4" />
                <h3 className="mb-2">Order</h3>

                <div className="table-responsive">
                  <table className="table table-order">
                    <tbody>
                      <tr>
                        <td className="ps-0">
                          <strong className="text-dark">Grand Total</strong>
                        </td>

                        <td>
                          <p>${total}</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <button type="submit" className="btn btn-primary rounded w-100 mt-4" onClick={handlePayment}>
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ========== service section ========== */}
        <ShopService />
      </main>

      {/* ========== footer section ========== */}
      <Footer5Custom company={company} social={social} />
    </Fragment>
  );
};
// Url for prices and packages section start
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const queryBuilder = (arr: string[], model: string) => {
    let url = BACKEND_API_URL + `${model}?`;
    arr.forEach((item, i) => {
      url += `populate=image&populate=thumbnail&filters[id][$in][${i}]=${item}&`;
    });
    return url.slice(0, -1);
  };

  let arr: string[] = [];
  if (Array.isArray(context.query.price_id)) {
    arr = context.query.price_id;
  } else if (context.query.price_id) {
    arr.push(context.query.price_id);
  }

  const urlPrices = queryBuilder(arr, 'prices');

  let arrPack: string[] = [];
  if (Array.isArray(context.query.pack_id)) {
    arrPack = context.query.pack_id;
  } else if (context.query.pack_id) {
    arrPack.push(context.query.pack_id);
  }
  const urlPacks = queryBuilder(arrPack, 'package-sets');
  // Url section end

  //Company fetching starts here
  const comp_res = await fetch('http://localhost:1337/api/company?populate=companyMainPhoto');
  const company: ICompany = await comp_res.json();

  const social_res = await fetch('http://localhost:1337/api/social-medias');
  const social: ISocial = await social_res.json();
  // Getting panorama data

  //Prices fetching starts here
  let price: IPrice | null = null;
  if (context.query.price_id) {
    const price_res = await fetch(urlPrices);
    price = await price_res.json();
  }

  // Packages
  let pack: IPackageSet | null = null;
  if (context.query.pack_id) {
    const package_res = await fetch(urlPacks);
    pack = await package_res.json();
  }
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time

  return {
    props: {
      price,
      company,
      social,
      pack
    }
  };
}

export default Checkout;
