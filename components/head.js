import Head from 'next/head'

const AppHeader = () => {
  return (
    <Head>
      <title>L’argent</title>
      <meta name="theme-color" content="#333333" />
      <meta name="description" content="cash rules everything around me" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="shortcut icon"
        type="image/png"
        href="static/icons/globe-favicon.png"
      />
    </Head>
  )
}

export default AppHeader
