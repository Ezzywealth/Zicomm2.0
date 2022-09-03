import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { useEffect } from "react";
import { formatPrice } from "../../utils/helpers";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";
// import paymentSlice from "../../Slices/paymentSlice";
import { fetchOrder } from "../../Slices/paymentSlice";

const OrderId = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const order = useSelector((state) => state.paymentSlice.order);
  console.log(order);
  const {
    orderItems,
    paymentMethod,
    shippingAddress,
    itemsPrice,
    shippingPrice,
    taxPrize,
  } = order;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const total = itemsPrice + taxPrize + shippingPrice;

  useEffect(() => {
    dispatch(fetchOrder(id));
  }, []);

  return (
    <Layout title={`order ${id}`}>
      <div className='mx-24 my-8'>
        <h3>Place Order</h3>
        <main className='grid grid-cols-4 mt-4  gap-8'>
          <section className='col-span-3 '>
            <div className='card mb-4 p-6 '>
              <h4>Shipping Address</h4>
              <div className='text-2xl my-2'>
                {shippingAddress.name}, {shippingAddress.address},{" "}
                {shippingAddress.city}, {shippingAddress.country},{" "}
                {shippingAddress.postalcode}
              </div>
              <h5
                className='text-blue-500 w-full text-2xl font-semibold'
                onClick={() => router.push("/shipping")}
              >
                not delivered
              </h5>
            </div>
            <div className='card mb-4 p-5'>
              <h4>Payment Method</h4>
              <div className='text-2xl my-2'>{paymentMethod}</div>
              <h5
                className='text-blue-500 text-2xl font-semibold'
                onClick={() => router.push("/payment")}
              >
                not paid
              </h5>
            </div>
            <div className='card mb-4 p-3'>
              <h4 className='p-5'>Order Items</h4>
              <table className='min-w-full mx-auto'>
                <thead className='border-b'>
                  <tr className='font-bold text-2xl'>
                    <td className='p-5 text-left flex gap-4'>Item</td>
                    <td className='text-center p-3'>Quantity</td>
                    <td className='text-center p-3'>Price</td>
                    <td className='text-center p-3'>Subtotal</td>
                  </tr>
                </thead>

                <tbody>
                  {orderItems.map((item) => (
                    <tr key={item.id} className='border-b text-xl font-normal'>
                      <td className='p-5 text-left flex gap-4 '>
                        <div className='flex items-center gap-2'>
                          <div className='h-20 w-20'>
                            <Link href={`/products/${item.id}`}>
                              <a className='flex flex-1'>
                                <Image
                                  src={item.images[0].url}
                                  alt={item.name}
                                  height='200px'
                                  width='200px'
                                  layout='intrinsic'
                                  className='rounded-md'
                                />
                              </a>
                            </Link>
                          </div>
                          <p className='text-blue-500 capitalize '>
                            {item.name}
                          </p>
                        </div>
                      </td>

                      <td className='text-center p-3'>{item.quantity}</td>
                      <td className='text-center p-3 tracking-widest'>
                        {formatPrice(item.price)}
                      </td>
                      <td className='text-center p-3 tracking-widest'>
                        {formatPrice(item.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                className='text-blue-500 text-2xl font-semibold p-3'
                onClick={() => router.push("/cart")}
              >
                Edit
              </button>
            </div>
          </section>
          <section className='col-span-1 '>
            <section className='card mb-4 p-5 '>
              <h4 className='my-4 font-bold text-center'>Order Summary</h4>
              <div className='mb-4 text-xl font-normal flex justify-between'>
                <span>Items</span>
                <span>{formatPrice(itemsPrice)}</span>
              </div>
              <div className='mb-4 text-xl font-normal flex justify-between'>
                <span>Tax</span>
                <span className='tracking-widest'>{formatPrice(taxPrize)}</span>
              </div>
              <div className='mb-4 text-xl font-normal flex justify-between'>
                <span>Shipping</span>
                <span className='tracking-widest'>
                  {formatPrice(shippingPrice)}
                </span>
              </div>
              <hr />
              <div className='mb-4 mt-4 text-xl font-semibold flex justify-between'>
                <span>Total</span>
                <span className='tracking-widest'>{formatPrice(total)}</span>
              </div>
              <button className='primary-button w-full mb-4 text-xl'>
                now
              </button>
            </section>
          </section>
        </main>
      </div>
    </Layout>
  );
};

export default OrderId;