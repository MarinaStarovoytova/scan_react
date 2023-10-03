import styles from './auth.module.css'
import imgAuth from './../../img/imgAuth/auth.png'
import FormAuth from '../../components/forms/formAuth/FormAuth'
import imgPadlock from './../../img/imgAuth/img_padlock.svg'

const Authorization = (props) => {
    return ( 
        <> 
        <main className="main">
            <section className="section__auth">
                <div className="container">
                    <div className={styles.page__auth}>
                        <div><h1 className={styles.heading__auth}>Для оформления подписки
                            на тариф, необходимо авторизоваться.</h1>
                            <div className={styles.img__desktop}><img src={imgAuth} alt="Auth" className={styles.img_auth}/></div>
                        </div>
                        
                        <div className={styles.block__form_auth}>
                            <img src={imgPadlock} alt="Padlock" className={styles.img__padlock} />
                            <FormAuth isAutorization={props.isAutorization} mSetIsAutor={props.mSetIsAutor}/> 
                        </div>
                        <div className={styles.img__mobile}><img src={imgAuth} alt="Auth" className={styles.img_auth}/></div>
                    </div>
                </div>
            </section>
        </main>
        </>
     );
}

export default Authorization;

