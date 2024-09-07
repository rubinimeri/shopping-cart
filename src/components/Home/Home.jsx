import { Link } from 'react-router-dom'
import styles from './Home.module.css'

function Home() {
    return(
        <main className={styles.main}>
            <h1>{'Beauty is in the eye of the beholder'.toUpperCase()}</h1>
            <Link to="/shop">Shop</Link>
        </main>
    )
}

export default Home