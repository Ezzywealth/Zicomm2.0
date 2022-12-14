import { toast } from "react-toastify";
import Stripe from "stripe";
import Order from "../../../components/Models/Order";
import db from "../../../utils/db";
import { getError } from "../../../utils/error";

const handler = async (req, res) => {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const { orderItems, id } = req.body;
  const redirectURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://zicomm-v2.vercel.app";

  const productLists = orderItems.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.name,
      },
      unit_amount: product.price,
    },
    quantity: product.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: productLists,
      mode: "payment",
      success_url: redirectURL + `/order/${id}?status=success`,
      cancel_url: redirectURL + `/order/${id}?status=cancel`,
    });

    db.connect();
    await Order.updateOne({ _id: id }, { $set: { isPaid: true } });
    db.disconnect();

    res.send(session);
  } catch (error) {
    toast.error(getError(error.message));
  }
};

export default handler;
