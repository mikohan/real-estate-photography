import { NextPage } from 'next';
import { FC } from 'react';
import Image from 'next/image';
import { Fragment, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
// -------- custom component -------- //
import Filter from 'components/common/Filter';
import Select from 'components/reuseable/Select';
import ShopService from 'components/common/ShopService';
import Breadcrumb from 'components/reuseable/Breadcrumb';
import PageProgress from 'components/common/PageProgress';
import Navbar4Custom from 'components/blocks/navbar/Navbar4Custom';
import { ProductCardCustom } from 'components/reuseable/product-cards';
import { IPrice, IPriceDatum } from 'interfaces/IPrice';
import { ICompany, PurpleAttributes } from 'interfaces/ICompany';
import { ISocial, ISocialDatum } from 'interfaces/ISocial';
import currency from 'utils/currency';
// -------- data -------- //
import products from 'data/product-list';
import Footer5Custom from 'components/blocks/footer/Footer5Custom';
import { tableHeading } from 'data/cart-page';
import CartListItemCustom from 'components/reuseable/CartListItemCustom';
import { urls } from 'utils/urls';
import { IPackageSet, IPackage, IPackageSetDatum } from 'interfaces/IPackageSet';
import { BACKEND_IMG_URL, BACKEND_API_URL } from 'config';
const breadcrumb = [
  { id: 1, title: 'Home', url: urls.home() },
  { id: 2, title: 'Shop', url: urls.shop() }
];

type Props = {
  price?: IPrice;
  company: ICompany;
  social: ISocial;
  pack: IPackage;
};

export type IGrandTotal = {
  id: number;
  price: number;
};

const ShopTwo: NextPage<Props> = (props) => {
  // filter options

  const company: PurpleAttributes = props.company.data.attributes;
  const social: ISocialDatum[] = props.social.data;
  const prices: IPriceDatum[] = props.price!.data;
  const pack: IPackage = props.pack;
  const src = BACKEND_IMG_URL + pack.data.attributes.image.data.attributes.url;
  const alt = pack.data.attributes.image.data.attributes.alternativeText;
  // data.attributes.image.data.attributes.formats.large.height
  const height = pack.data.attributes.image.data.attributes.formats.large.height;
  const width = pack.data.attributes.image.data.attributes.formats.large.width;
  const title = pack.data.attributes.name;
  const options = pack.data.attributes.prices;

  // Total order price here
  const grandTotalInit: IGrandTotal[] = [];
  const [grandTotal, setGrandTotal] = useState<IGrandTotal[]>(grandTotalInit);
  const totArr = grandTotal.map((item: IGrandTotal) => item.price);
  let totSum: number = 0;
  if (pack.data.attributes.priceValue) {
    totSum = pack.data.attributes.priceValue;
    totArr.push(totSum);
  }

  if (totArr.length) {
    totSum = totArr.reduce((acc: number, cur: number) => acc + cur);
  }

  const Options: FC = () => {
    return (
      <Fragment>
        <ul className="icon-list bullet-bg bullet-soft-green mb-0">
          {options.data.map((item) => (
            <li key={item.id}>
              <span>
                <i className="uil uil-check" />
              </span>
              <span>{item.attributes.name}</span>
              <p
                style={{ fontSize: '0.75rem', fontWeight: 300 }}
                dangerouslySetInnerHTML={{ __html: item.attributes.description }}
              ></p>
            </li>
          ))}
        </ul>
      </Fragment>
    );
  };

  // button color
  //   let btnColor = 'btn-primary';
  let btnColor = 'btn-soft-leaf';
  let btnText = 'Proceed to Checkout';
  if (totSum === 0) {
    btnColor = 'btn-outline-secondary';
    btnText = 'Add services to order';
  }
  return (
    <Fragment>
      <PageProgress />

      {/* ========== header section ========== */}
      <header className="wrapper bg-light">
        {/* <Navbar4Custom cart navClassName="navbar navbar-expand-lg center-nav navbar-light navbar-bg-light" /> */}
        <Navbar4Custom showLogo={false} social={social} company={company} />
      </header>

      <main className="content-wrapper">
        {/* ========== breadcrumb section ========== */}
        <section className="wrapper bg-gray">
          <div className="container py-3 py-md-5">
            <Breadcrumb data={breadcrumb} className="mb-0" />
          </div>
        </section>
        <div className="container pt-6 pt-md-6">
          <div className="row">
            <div className="col-12">
              <h1 className="mt-4 mb-4">You choose {pack.data.attributes.name}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="card">
                <div className="card-body">
                  <Image src={src} alt={alt} height={height} width={width} style={{ width: '100%', height: '100%' }} />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card shadow-lg">
                <div className="card-body">
                  <h5 className="card-title">Package included:</h5>
                  <Options />
                  {/* <p className="card-text">...</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="wrapper bg-light">
          <div className="container pt-12 pt-md-14 pb-14 pb-md-16">
            <div className="row">
              <div className="col-12">
                <h2>
                  Consider to add <span className="underline-3 style-1 leaf">services</span> to your package
                </h2>
              </div>
            </div>
            <div className="row gx-md-8 gx-xl-12 gy-12">
              <div className="col-lg-8">
                {/* ========== product list section ========== */}
                <div className="table-responsive">
                  <table className="table text-center shopping-cart">
                    <thead>
                      <tr>
                        {tableHeading.map(({ id, title }) => {
                          const firstChild = id === 1;

                          return (
                            <th className={firstChild ? 'ps-0 w-25' : ''} key={id}>
                              <div className={`h4 mb-0 ${firstChild ? 'text-start' : ''}`}>{title}</div>
                            </th>
                          );
                        })}

                        <th />
                      </tr>
                    </thead>

                    <tbody>
                      {prices.map((item) => (
                        <CartListItemCustom
                          key={item.id}
                          price={item}
                          setGrandTotal={setGrandTotal}
                          grandTotal={grandTotal}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ========== order summary section ========== */}
              <div className="col-lg-4">
                <h3 className="mb-4">Order Summary</h3>
                <div className="table-responsive">
                  <table className="table table-order">
                    <tbody>
                      <tr>
                        <td className="ps-0">
                          <strong className="text-dark">Total Order</strong>
                        </td>
                        <td className="pe-0 text-end">${totSum}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <button className={`btn ${btnColor}  rounded w-100 mt-4`}>{btnText}</button>
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

export const getStaticPaths: GetStaticPaths = async () => {
  const package_res = await fetch('http://localhost:1337/api/package-sets');
  const packages: IPackageSet = await package_res.json();
  const idList = packages.data.map((item: IPackageSetDatum) => item.id);
  const paths: string[] = [];
  idList.forEach((id: number) => {
    paths.push(`/prices/${id}`);
  });
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  const id = context.params.id;

  const package_res = await fetch(`http://localhost:1337/api/package-sets/${id}?populate=*`);
  const pack: IPackage = await package_res.json();
  const options = pack.data.attributes.prices.data;

  let quryUrl = 'http://localhost:1337/api/prices?populate=*&';
  const packageInclude = options.forEach((item, i) => {
    // &filters[id][$notIn][1]=2
    quryUrl += `filters[id][$notIn][${i}]=${item.id}&`;
  });

  quryUrl.slice(0, -1);

  //Prices fetching starts here
  const price_res = await fetch(quryUrl);
  const price: IPrice = await price_res.json();

  //Company fetching starts here
  const comp_res = await fetch('http://localhost:1337/api/company?populate=companyMainPhoto');
  const company: ICompany = await comp_res.json();

  const social_res = await fetch('http://localhost:1337/api/social-medias');
  const social: ISocial = await social_res.json();
  //http://localhost:1337/api/package-sets?populate=*

  return {
    props: {
      price,
      company,
      social,
      pack
    }
  };
};

export default ShopTwo;