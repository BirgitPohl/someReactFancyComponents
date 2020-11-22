import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {food} from './mockData'

// Components and Pages
import Overview from './Overview'
import Search from './SearchWidget'

interface Advisor {
  id: number,
  firstName: string,
  lastName: string,
  language: string,
  isOnline: string
}
Home.getInitialProps = async ({request}) => {
  // Normally we would import a fetch function from '../lib/' which handles all services.
  // It can be handled with Axios or GraphQL

  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
  const response = await fetch('https://api.mocki.io/v1/412d2898');
  const advisors: Advisor[] = await response.json()

  // Like advisors, the food would probably come from a preciously filled data base.

  return { advisors, food };
}

export default function Home( { advisors, food } ) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Search items={ food }/>
      <Overview advisors={ advisors } />

      
    </div>
  )
}
