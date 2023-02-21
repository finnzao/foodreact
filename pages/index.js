import Head from 'next/head';
import axios from 'axios';
import Featured from '@/componets/Featured';
import About from '@/componets/About';
import { useState } from 'react';
import Add from '@/componets/AddProducts';
import AddButton from '@/componets/AddProductsButton';
import HomeProduct from "@/componets/HomeProducts"

export default function Home({ prodList, admin }) {
  const [close, setClose] = useState(true)
  return (
    <>

      <Head>
        <title>Caminito</title>
        <meta name="description" content="Melhor Comida da região" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/12/12426.png" />
      </Head>
      <Featured />
      {
        admin && <AddButton setClose={setClose} />
      }
      {!close && <Add setClose={setClose} />}
      <HomeProduct prodList={prodList} />
      <About />
    </>
  )
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  const urlBase = process.env.BASE_URL

  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true
  }
  const res = await axios.get(`${urlBase}/api/products`);
  return {
    props: {
      prodList: res.data,
      admin
    }
  };
};