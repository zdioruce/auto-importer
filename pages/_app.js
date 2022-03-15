import '@styles/index.css'
import '@styles/dropdown.css'
import '@styles/modal.css'
import '@styles/input.css'
import '@styles/input-number.css'
import '@styles/button.css'
import '@styles/skeleton.css'
import '@styles/grid.css'
import '@styles/radio.css'
import '@styles/divider.css'
import '@styles/tabs.css'
import '@styles/select.css'
import '@styles/switch.css'
import '@styles/checkbox.css'
import '@styles/spin.css'
import '@styles/pagination.css'
import '@styles/notification.css'
import '@styles/globals.scss'
import PageLayout from '@components/PageLayout'
import { wrapper } from "../redux/store"

function MyApp({ Component, pageProps }) {
  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  )
}

export default wrapper.withRedux(MyApp);
