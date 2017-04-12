import Head from 'next/head'

const AppHeader = () => {
  return (
      <Head>
        <title>Cashpplication</title>
        <meta name="theme-color" content="#333333" />
        <meta name="description" content="cash rules everything around me"/>
        <meta viewport="viewport" contnet="initial-scale=1.0 width=device-width" />
        <link rel="shortcut icon" type="image/png" href="static/globe-favicon.png" />
      </Head>
  )
}

export default AppHeader
