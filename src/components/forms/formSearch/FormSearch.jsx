import axios from 'axios';
import stylesF from './formSearch.module.css'
import { Component } from 'react';
import Output from '../../../pages/output/Output';
import styles from './search.module.css';
import imgDoc from './../../../img/imgSearch/img_document.svg'
import imgFolders from './../../../img/imgSearch/img_folders.png'
import imgMan from './../../../img/imgSearch/img_man.png'


class FormSearch extends Component {
    errorInn = false;
    errorLimit = false;
    errorDate = false;
    errTextForInn = 'Введите корректные данные';
    errTextForLimit = 'Введите от 1 до 1000';
    errTextDate = '';
    state = {
        "issueDateInterval": {
            startDate: null,
            endDate: null
        },
        "searchContext": {
            "targetSearchEntitiesContext": {
                "targetSearchEntities": [
                    {
                        "type": "company",
                        "sparkId": null,
                        "entityId": null,
                        inn: '',
                        "maxFullness": true,
                        "inBusinessNews": null
                    }
                ],
                "onlyMainRole": false,
                "tonality": "any",
                "onlyWithRiskFactors": false,
                "riskFactors": {
                    "and": [],
                    "or": [],
                    "not": []
                },
                "themes": {
                    "and": [],
                    "or": [],
                    "not": []
                }
            },
            "themesFilter": {
                "and": [],
                "or": [],
                "not": []
            }
        },
        "searchArea": {
            "includedSources": [],
            "excludedSources": [],
            "includedSourceGroups": [],
            "excludedSourceGroups": []
        },
        "attributeFilters": {
            "excludeTechNews": true,
            "excludeAnnouncements": true,
            "excludeDigests": true
        },
        "similarMode": "duplicates",
        limit: 1,
        "sortType": "sourceInfluence",
        "sortDirectionType": "desc",
        "intervalType": "month",
        "histogramTypes": [
            "totalDocuments",
            "riskFactors"
        ]
    }

    handleInputInnChange = ({ target: { value } }) => {
        const sContext = this.state.searchContext;
        sContext.targetSearchEntitiesContext.targetSearchEntities[0].inn = value;
        this.setState({
            searchContext: sContext
        })
    }

    handleInputTonChange = ({ target: { value } }) => {
        const sContext = this.state.searchContext;
        sContext.targetSearchEntitiesContext.tonality = value;
        this.setState({
            searchContext: sContext
        })
    }

    handleInputNumberChange = ({ target: { value } }) => {
        this.setState({
            limit: value
        })
    }

    validDate(value, value2, isEndDate) {
        this.errorDate = false;
        this.errTextDate = '';
        const dateNow = new Date();
        const dateValue = new Date(value);
        const dateValue2 = new Date(value2);
        if ((dateValue.getTime() > dateNow.getTime())) {
            this.errorDate = true;
            this.errTextDate = 'Даты не должны быть в будущем времени';
        }
        if (isEndDate) {
            if ((dateValue.getTime() > dateValue2.getTime())) {
                this.errorDate = true;
                this.errTextDate = 'Дата начала не может быть позже даты конца';
            }
        } else {
            if ((dateValue.getTime() < dateValue2.getTime())) {
                this.errorDate = true;
                this.errTextDate = 'Дата начала не может быть позже даты конца';
            }
        }
    }

    handleInputDataStChange = ({ target: { value } }) => {
        this.validDate(value, this.state.issueDateInterval.endDate, true);
        this.setState({
            issueDateInterval: { ...this.state.issueDateInterval, startDate: value }
        })
    }

    handleInputDataEndChange = ({ target: { value } }) => {
        this.validDate(value, this.state.issueDateInterval.startDate, false);
        this.setState({
            issueDateInterval: { ...this.state.issueDateInterval, endDate: value }
        })
    }
    handleCheckedMainRole = ({ target: { checked } }) => {
        const sContext = this.state.searchContext;
        sContext.targetSearchEntitiesContext.onlyMainRole = checked;
        this.setState({
            searchContext: sContext
        })
    }


    handleCheckedRiskFactors = ({ target: { checked } }) => {
        const sContext = this.state.searchContext;
        sContext.targetSearchEntitiesContext.onlyMonlyWithRiskFactorsinRole = checked;
        this.setState({
            searchContext: sContext
        })
    }

    getData = (e) => {
        e.preventDefault();
        const innText = this.state.searchContext.targetSearchEntitiesContext.targetSearchEntities[0].inn;
        const limitText = this.state.limit;
        this.errorInn = false;
        this.errorLimit = false;
        if (innText === '' || (innText + '').length !== 10) {
            this.errorInn = true;
            this.setState({ state: this.state });
            return;
        }

        if (limitText === "" || limitText < 1 || limitText > 1000) {
            this.errorLimit = true;
            this.setState({ state: this.state });
            return;
        }

        if (this.errorDate) {
            return;
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },

        };
        axios.post('https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms', this.state, config)
            .then((res) => {

                console.log(res.data);
                console.log(res.data.issueDateInterval);
                this.setState({ exRequest: this.state });
                this.setState({ dataOutput: res.data });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        const { inn, limit, startDate, endDate } = this.state;


        if (this.state.dataOutput) {
            return <Output dataOutput={this.state.dataOutput} exRequest={this.state.exRequest} />
        } else
            return (

                <main className="main">
                    <section className="section__search">
                        <div className="container">
                            <div className={styles.page__search}>
                                <div className={styles.search__content}>
                                    <div className={styles.header__search}>
                                        <h1 className={styles.heading}>Найдите необходимые данные в пару кликов.</h1>
                                        <p className={styles.text}>Задайте параметры поиска.</p>
                                        <p className={styles.text}>Чем больше заполните, тем точнее поиск</p>
                                    </div>
                                    <div className={styles.img__doc}>
                                        <img src={imgDoc} alt="Document" className={styles.img__doc} />
                                        <img src={imgFolders} className={styles.img__folders} alt="Folders" />
                                    </div>
                                </div>

                                <div className={styles.block__form_search}>
                                    <form className={stylesF.form__search} onSubmit={this.getData}>
                                        <div>
                                            <label htmlFor="" className={stylesF.label}>ИНН компании *</label>
                                            <input type="number"
                                                placeholder='10 цифр'
                                                className={
                                                    this.errorInn ?
                                                        stylesF.input + ' ' + stylesF.input__required : stylesF.input
                                                }
                                                name='inn'
                                                value={inn}
                                                onChange={this.handleInputInnChange}
                                            />
                                            <p className={stylesF.text__error}>{this.errorInn && this.errTextForInn}</p>

                                            <label htmlFor="" className={stylesF.label}>Тональность</label>
                                            <select className={stylesF.select__tonality}
                                                name='tonality'
                                                onChange={this.handleInputTonChange}
                                            >
                                                <option value="any" >Любая</option>
                                                <option value="positive" >Позитивная</option>
                                                <option value="negative" >Негативная</option>
                                            </select>
                                            <label htmlFor="" className={stylesF.label}>Количество документов в выдаче *</label>
                                            <input type="number" className={
                                                this.errorLimit ?
                                                    stylesF.input + ' ' + stylesF.input__required : stylesF.input}
                                                name='numberDocuments'
                                                placeholder='От 1 до 1000'
                                                value={limit}
                                                onChange={this.handleInputNumberChange}
                                            />
                                            <p className={stylesF.text__error}>{this.errorLimit && this.errTextForLimit}</p>

                                            <label htmlFor="" className={stylesF.label}>Диапазон поиска *</label>
                                            <input type="text" onMouseOver={(e) => e.target.type = 'date'}
                                                className={stylesF.input + ' ' + stylesF.input__data} placeholder='Дата начала'
                                                name='dataStart'
                                                value={startDate}
                                                onChange={this.handleInputDataStChange}
                                            />
                                            <input type="text" onMouseOver={(e) => e.target.type = 'date'} className={stylesF.input + ' ' + stylesF.input__data}
                                                placeholder='Дата конца'
                                                name='dataEnd'
                                                value={endDate}
                                                onChange={this.handleInputDataEndChange}
                                            />
                                            <p className={stylesF.text__error}>{this.errorDate && this.errTextDate}</p>

                                        </div>
                                        <div className={stylesF.checkbox__mobile}>
                                            <div className={stylesF.list__checkbox}>
                                                <input type="checkbox" /><span className={stylesF.span}>Признак максимальной полноты</span>
                                            </div>
                                            <div className={stylesF.list__checkbox}>
                                                <input type="checkbox" /><span className={stylesF.span}>Упоминания в бизнес-контексте</span>
                                            </div>
                                            <div className={stylesF.list__checkbox}>
                                                <input type="checkbox" onChange={this.handleCheckedMainRole} /><span className={stylesF.span}>Главная роль в публикации</span>
                                            </div>
                                            <div className={stylesF.list__checkbox}>
                                                <input type="checkbox" onChange={this.handleCheckedRiskFactors} disabled /><span className={stylesF.span + ' ' + stylesF.span__disabled}>Публикации только с риск-факторами</span>
                                            </div>
                                            <div className={stylesF.list__checkbox}>
                                                <input type="checkbox" disabled /><span className={stylesF.span + ' ' + stylesF.span__disabled}>Включать технические новости рынков</span>
                                            </div>
                                            <div className={stylesF.list__checkbox}>
                                                <input type="checkbox" /><span className={stylesF.span}>Включать анонсы и календари</span>
                                            </div>
                                            <div className={stylesF.list__checkbox}>
                                                <input type="checkbox" disabled /><span className={stylesF.span + ' ' + stylesF.span__disabled}>Включать сводки новостей</span>
                                            </div>
                                            <div>
                                                <button type='submit' className={stylesF.button}
                                                    disabled={inn === "" || limit === "" || startDate === "" || endDate === ""}
                                                >Поиск</button>
                                                <p className={stylesF.button__text}>* Обязательные к заполнению поля</p>
                                            </div>
                                        </div>
                                    </form>

                                    <div className={styles.img__man}>
                                        <img src={imgMan} alt="Man" className={styles.img__man} />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                </main>
            );
    }
}

export default FormSearch;

