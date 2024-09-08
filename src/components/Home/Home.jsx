import { Link } from 'react-router-dom'
import styles from './Home.module.css'

function Home() {
    return(
        <main className={styles.main}>
            <h1>{'Beauty is in the eye of the beholder'.toUpperCase()}</h1>
            <div className={styles.flex}>
                <div className={styles.heroImg}></div>
                <section className={styles.section}>
                    <h2>LOREM IPSUM, DOLOR SIT AMET</h2>
                    <p className={styles.para}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quos quidem ipsam eum, consequuntur officia inventore ducimus doloribus eligendi tenetur unde deserunt, optio pariatur voluptates dolores architecto sunt distinctio. Dignissimos.
                    </p>
                    <Link to="/shop">SHOP</Link>
                </section>
            </div>
        </main>
    )
}

export default Home