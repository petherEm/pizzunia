import Head from 'next/head'
import axios from 'axios'
import Image from 'next/image'
import Featured from '../components/Featured'
import PizzaList from '../components/PizzaList'

export default function Home({ pizzaList }) {


  return (
    <div>
      <Head>
        <title>Pizzunia</title>
        <meta name="description" content="Best Pizza in Warsaw" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <PizzaList pizzaList={pizzaList} />

    </div>
  )
}


export const getServerSideProps = async () => {
  const res = await axios.get("https://pizzunia.vercel.app/api/products");

  return {
    props: {
      pizzaList: res.data,
    }
  }
}