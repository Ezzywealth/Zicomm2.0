import React from "react";
import { GiCompass, GiDiamondHard, GiStabbedNote } from "react-icons/gi";
import { BsGithub, BsTwitter, BsGoogle } from "react-icons/bs";
export const links = [
  {
    id: 1,
    text: "home",
    url: "/",
  },
  {
    id: 2,
    text: "about",
    url: "/about",
  },
  {
    id: 3,
    text: "products",
    url: "/products",
  },
];

export const services = [
  {
    id: 1,
    icon: <GiCompass />,
    title: "mission",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: "vision",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: "history",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  },
];

export const categories = [
  "all",
  "office",
  "living room",
  "kitchen",
  "bedroom",
  "dinning",
  "kids",
];
export const providers = [
  {
    name: "github",
    icon: <BsGithub />,
  },
  {
    name: "twitter",
    icon: <BsTwitter />,
  },
  {
    name: "google",
    icon: <BsGoogle />,
  },
];

export const companies = ["all", "marcos", "liddy", "ikea", "caressa"];

export const colors = ["#ffb900", "#000", "#0000ff", "#ff0000", "#00ff00"];

export const products_url = "https://course-api.com/react-store-products";

export const single_product_url = `https://course-api.com/react-store-single-product?id=`;
