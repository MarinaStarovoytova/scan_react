import styles from './footer.module.css'
import iconLogo from './../../img/icons/icon_logo_footer.svg'

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footer__column}>
                    <div className={styles.footer__logo}>
                        <a href="#!"><img src={iconLogo} alt="Icon LOGO" /></a>
                    </div>
                    <div className={styles.footer__info}>
                        <address className={styles.address}>
                            <p>г. Москва, Цветной б-р, 40</p>
                            <p>+7 495 771 21 11</p>
                            <p>info@skan.ru</p>
                        </address>
                        <span className={styles.rights}>Copyright. 2022</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;