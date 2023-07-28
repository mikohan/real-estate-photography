import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from 'redux/features/counterSlice';
import { useState } from 'react';
import { IState } from 'redux/store';
import { pricesApi, useGetPricesQuery } from 'redux/services/pricesAPI';

const Facts1Increment: FC = () => {
  const count = useSelector((state: IState) => state.counter.count);
  const dispatch = useDispatch();
  const handleIncrement = () => dispatch(increment());
  const handleDecrement = () => dispatch(decrement());
  const handleIncrementBy = () => dispatch(incrementByAmount(amount));
  // state
  const [amount, setAmount] = useState(0);
  // API
  const { isLoading, isFetching, data, error } = useGetPricesQuery(null);
  // const handlePrice = () => dispatch()
  console.log(data, isLoading);
  return (
    <section className="wrapper bg-soft-primary">
      <div className="container py-14 pt-md-17 pb-md-21">
        <div className="row gx-lg-8 gx-xl-12 gy-10 gy-lg-0 mb-2 align-items-end">
          <div className="col-lg-4">
            <h2 className="fs-16 text-uppercase text-line text-primary mb-3">Counter</h2>
            <h3>{count}</h3>
            <button className="btn btn-success" onClick={handleIncrement}>
              Increment
            </button>
            <button className="btn btn-danger" onClick={handleDecrement}>
              Decrement
            </button>
            <div>
              <input type="text" onChange={(e) => setAmount(Number(e.target.value))} />
              <button onClick={handleIncrementBy}>Add</button>
            </div>
          </div>

          <div className="col-lg-8 mt-lg-2">
            <div className="row align-items-center counter-wrapper gy-6 text-center"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Facts1Increment;
