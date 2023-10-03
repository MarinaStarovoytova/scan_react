import styles from './backgroundImg.module.css'
import background_1 from './../../img/images/image_vector1.png'
import background_2 from './../../img/images/image_vector2.png'

function Background() {
    return (
        <section className={styles.section__background}>
            <div className="container">
                <div className={styles.background__flex}>
                    <div className={styles.background}>
                        <img src={background_1} alt="background" />
                    </div>
                    <div className={styles.background}>
                        <img src={background_2} alt="background" className={styles.background_2} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Background;