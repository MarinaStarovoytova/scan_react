import styles from './main.module.css'
import imgHome from './../../img/images/image_home.png'
import CardCarousel from './../../components/card_carousel/Card_carousel';
import Background from './../../components/background-image/BackgroundImg';
import CardTarif from './../../components/card__tarif/CardTarif';
import { Link } from 'react-router-dom';

function Main() {
    return (
        <>
            <main className="main">
                <section className={styles.section__home}>
                    <div className="container">
                        <div className={styles.main__page}>
                            <div className={styles.main__content}>
                                <h1 className={styles.main__heading}>сервис по поиску<br /> публикаций о компании<br />по его ИНН</h1>
                                <p className={styles.main__text}>Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</p>
                                <Link to="search">
                                    <button type='button' className={styles.button}>Запросить данные</button>
                                </Link>
                            </div>
                            <div className={styles.main__img}>
                                <img src={imgHome} alt="Main_Image" />
                            </div>
                        </div>
                    </div>
                </section>
                <CardCarousel />
                <Background />
                <CardTarif />
            </main>
        </>
    )
}

export default Main;