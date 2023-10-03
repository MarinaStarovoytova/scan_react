import styles from './card_carousel.module.css'
import iconArrowL from './../../img/icons/icon_arrowL.svg'
import iconArrowR from './../../img/icons/icon_arrowR.svg'
import iconClock from './../../img/icons/icon_clock.svg'
import iconSearch from './../../img/icons/icon_search.svg'
import iconlock from './../../img/icons/icon_lock.svg'

function CardCarousel () {
    return (
        <section className={styles.section__card}>
            <div className="container">
            <div className="card__heading"><h2>Почему именно мы</h2></div>
                <div className={styles.card__content}>

                    <button type="button" className={styles.button_arrow}><img src={iconArrowL} alt="L" /></button>

                    <div className={styles.cards__grid}>
                        {/* <Carousel> */}
                        <div className={styles.card}>
                            <img src={iconClock} alt="Clock" />
                            <p className={styles.card__text}>Высокая и оперативная скорость обработки заявки</p>
                        </div>
                        <div className={styles.card}>
                            <img src={iconSearch} alt="Clock" />
                            <p className={styles.card__text}>Огромная комплексная база данных, обеспечивающая объективный ответ на запрос</p>
                        </div>
                        <div className={styles.card}>
                            <img src={iconlock} alt="Clock" />
                            <p className={styles.card__text}>Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству</p>
                        </div>
                        {/* </Carousel> */}
                    </div>

                    <button type="button" className={styles.button_arrow}><img src={iconArrowR} alt="R" /></button>
                </div>
            </div>
        </section>
    )
}

export default CardCarousel;