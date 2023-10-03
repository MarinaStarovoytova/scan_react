import styles from './cardTarif.module.css'
import iconLamp from './../../img/icons/icon_lamp.svg'
import iconArrowC from './../../img/icons/icon_arrowCircle.svg'
import iconLaptop from './../../img/icons/icon_laptop.svg'
import iconCheckmark from './../../img/icons/icon_checkmark.svg'

function CardTarif () {
    return (
        <section className={styles.section__card}>
            <div className="container">
            <div className="card__heading"><h2>наши тарифы</h2></div>
                <div className={styles.card__content}>
                    <div className={styles.cards__grid}>
                        <div className={styles.card}>
                            <div className={styles.card__background+' '+styles.background__oranje}>
                                <div>
                                    <h3 className={styles.heading}>Beginner</h3>
                                    <p className={styles.text}>Для небольшого исследования</p>
                                </div>
                                <img src={iconLamp} alt="Lamp"/>
                            </div>
                            <div className={styles.card__price}>
                                <span className={styles.price__now}>799 ₽</span ><span className={styles.price__outdated}>1 200 ₽</span>
                                <p className={styles.add__text}>или 150 ₽/мес. при рассрочке на 24 мес.</p>
                                <p className={styles.services__text}>В тариф входит:</p>
                                <div className={styles.checkmark}><img src={iconCheckmark} alt="Checkmark" /><span className={styles.checkmark__text}>Безлимитная история запросов</span></div>
                                <div className={styles.checkmark}><img src={iconCheckmark} alt="Checkmark" /><span className={styles.checkmark__text}>Безопасная сделка</span></div>
                                <div className={styles.checkmark}><img src={iconCheckmark} alt="Checkmark" /><span className={styles.checkmark__text}>Поддержка 24/7</span></div>
                            </div>
                            <div className={styles.button}><button type='button'className={styles.button__tarif}>Подробнее</button></div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.card__background+' '+styles.background__blue}>
                                <div>
                                    <h3 className={styles.heading}>Pro</h3>
                                    <p className={styles.text}>Для HR и фрилансеров</p>
                                </div>
                                <img src={iconArrowC} alt="Arrow" />
                            </div>
                            <div className={styles.card__price}>
                                <span className={styles.price__now}>1 299 ₽</span ><span className={styles.price__outdated}>2 600 ₽</span>
                                <p className={styles.add__text}>или 279 ₽/мес. при рассрочке на 24 мес.</p>
                                <p className={styles.services__text}>В тариф входит:</p>
                                <div className={styles.checkmark}><img src={iconCheckmark} alt="Checkmark" /><span className={styles.checkmark__text}>Все пункты тарифа Beginner</span></div>
                                <div className={styles.checkmark}><img src={iconCheckmark} alt="Checkmark" /><span className={styles.checkmark__text}>Экспорт истории</span></div>
                                <div className={styles.checkmark}><img src={iconCheckmark} alt="Checkmark" /><span className={styles.checkmark__text}>Рекомендации по приоритетам</span></div>
                            </div>
                            <div className={styles.button}><button type='button'className={styles.button__tarif}>Подробнее</button></div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.card__background+' '+styles.background__black}>
                                <div>
                                    <h3 className={styles.heading+' '+styles.color}>Business</h3>
                                    <p className={styles.text+' '+styles.color}>Для корпоративных клиентов</p>
                                </div>
                                <img src={iconLaptop} alt="Laptop" />
                            </div>
                            <div className={styles.card__price}>
                                <span className={styles.price__now}>2 379 ₽</span ><span className={styles.price__outdated}>3 700 ₽</span>
                                <p className={styles.add__text+' '+styles.with__empty}>или 279 ₽/мес. при рассрочке на 24 мес.</p>
                                <p className={styles.services__text}>В тариф входит:</p>
                                <div className={styles.checkmark}><img src={iconCheckmark} alt="Checkmark" /><span className={styles.checkmark__text}>Все пункты тарифа Pro</span></div>
                                <div className={styles.checkmark}><img src={iconCheckmark} alt="Checkmark" /><span className={styles.checkmark__text}>Безлимитное количество запросов</span></div>
                                <div className={styles.checkmark}><img src={iconCheckmark} alt="Checkmark" /><span className={styles.checkmark__text}>Приоритетная поддержка</span></div>
                            </div>
                            <div className={styles.button}><button type='button'className={styles.button__tarif}>Подробнее</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CardTarif;