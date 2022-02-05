import '../styles/globals.scss'
import '../styles/index.css'
import '../styles/dropdown.css'
import '../styles/modal.css'
import '../styles/input.css'
import '../styles/button.css'
import '../styles/skeleton.css'
import PageLayout from '../components/PageLayout'

function MyApp({ Component, pageProps }) {
  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>  
  )
}

export default MyApp
