import styles from './header.module.css'
import media from './header.module.css'
import icon__logo from './../../img/icons/icon_logo_header.svg'
import iconBurger from './../../img/icons/icon_burger.svg'
import Dashboard from '../dashboard/Dashboard'
import { Link } from 'react-router-dom'

function Header(props) {
    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.header__column}>
                    <div className={styles.header__logo}>
                        <Link to="/">
                            <img src={icon__logo} alt="Icon LOGO" />
                        </Link>
                    </div>
                    <nav className={styles.header__nav}>
                        <ul className={styles.nav__list}>
                            <Link to="/">
                                <li className={styles.nav__item}><a href="#!" className={styles.nav__link}>Главная</a></li>
                            </Link>

                            <li className={styles.nav__item}><a href="#!" className={styles.nav__link}>Тарифы</a></li>
                            <li className={styles.nav__item}><a href="#!" className={styles.nav__link}>FAQ</a></li>
                        </ul>
                        
                    </nav>
                    <div className={styles.header__dashboard}>
                        <Dashboard isAutorization={props.isAutorization} mSetIsAutor={props.mSetIsAutor} />
                        
                    </div>
                    <button className={media.nav__button}><img src={iconBurger} alt="Burger" /></button>
                </div>
            </div>
        </header>
    )
}


export default Header;

