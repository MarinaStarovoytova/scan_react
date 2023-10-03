
import styles from './output.module.css'
import imgOutput from './../../img/imgOutput/img_output.png'
import iconArrowL from './../../img/icons/icon_arrowL.svg'
import iconArrowR from './../../img/icons/icon_arrowR.svg'
import imgNews from './../../img/imgOutput/img_news.png'
import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Output extends React.Component {

    state = {
        publicId: [],
        newAfterMerge: [],
        startFirst: true,
        countShowDoc: 10,
        publicDoc: []
    };


    async getPublicDoc() {
        let countShowDoc = this.state.countShowDoc;
        const publicId = this.state.publicId;
        const publicDoc = this.state.publicDoc;
        const newDoc = {
            ids: []
        };
        while (countShowDoc !== 0 && publicId[0]) {
            newDoc.ids.push(publicId[0].encodedId);
            publicId.shift();
            countShowDoc--;
        }

        if (newDoc.ids[0]) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                },

            };
            const res = await axios.post(
                'https://gateway.scan-interfax.ru/api/v1/documents',
                newDoc,
                config);
            // publicDoc.push(res.data);
            res.data.map((items) => publicDoc.push(items));
            this.setState({ publicId: publicId });
            this.setState({ publicDoc: publicDoc });
            console.log(res.data);
        }
    }

    async getPublicId() {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },

        };
        const res = await axios.post(
            'https://gateway.scan-interfax.ru/api/v1/objectsearch',
            this.props.exRequest,
            config);
        this.setState({ publicId: res.data.items });
        this.getPublicDoc();
    }

    formatterDate(dateValue) {
        const date = new Date(dateValue);
        const formattedDate = date.toLocaleDateString('en-US', {
            day: '2-digit',
            year: 'numeric',
            month: '2-digit',
        }).split('/').join('.');
        return formattedDate;
    }

    mergeData() {
        const newData = [];
        if (this.props.dataOutput.data[0]) {
            this.props.dataOutput.data[0].data.forEach((value, i) => {
                if (i < 8) {
                    newData.push({
                        date: this.formatterDate(value.date),
                        valueTotal: value.value,
                        valueRisk: this.props.dataOutput.data[1].data[i].value
                    });
                }
            });
        }
        this.setState({ newAfterMerge: newData });
    }

    mapBlockInfo() {
        if (this.state.startFirst) {
            this.setState({ startFirst: false });
            this.mergeData();
            this.getPublicId();
        }
        const mapInfo = this.state.newAfterMerge.map((items) =>
            <div className={styles.block}>
                <div className={styles.border__right}>
                    <p className={styles.text__info}>{items.date}</p>
                    <p className={styles.text__info}>{items.valueTotal}</p>
                    <p className={styles.text__info}>{items.valueRisk}</p>
                </div>
            </div>
        );
        return (
            <div className={styles.block__info}>
                {mapInfo}
            </div>
        )
    };

    parseXml(xmlText) {
        const XMLParser = require('react-xml-parser');
        const xml = new XMLParser().parseFromString(xmlText);
        const sentence = xml.getElementsByTagName('sentence');

        return (
            <p className={styles.text__news}>
                {sentence[0].value}
            </p>
        )
    }

    mapDocInfo() {
        const mapDoc = this.state.publicDoc.map((doc) =>
            <div className={styles.column}>
                <div className={styles.content__flex}>
                    <p className={styles.data__doc}>{this.formatterDate(doc.ok.issueDate)}</p>
                    <p className={styles.text__doc}>{doc.ok.source.name}</p>
                </div>
                <h2 className={styles.heading__column}>{doc.ok.title.text}</h2>
                <div className={styles.block__border}>Технические новости</div>
                <img src={imgNews} alt="News" />
                {this.parseXml(doc.ok.content.markup)}
                <div>
                    <button className={styles.button__source}><Link to={doc.ok.url}>Читать в источнике</Link></button>
                    <p className={styles.counter}>{doc.ok.attributes.wordCount} слова</p>
                </div>
            </div>
        );
        return (
            <div className={styles.documents__content}>
                {mapDoc}
            </div>
        )
    };

    render() {

        return (
            <main className="main">
                <section className="section__search">
                    <div className="container">
                        <div className={styles.page__output}>
                            <div className={styles.output__content}>
                                <div className={styles.output__text}>
                                    <h1 className={styles.heading}>Ищем. Скоро будут результаты</h1>
                                    <p className={styles.text}>Поиск может занять некоторое время, просим сохранять терпение.</p>
                                </div>
                                <div className={styles.output__img}>
                                    <img src={imgOutput} alt="Output" />
                                </div>
                            </div>
                            <div className={styles.carousel}>
                                <h2 className={styles.heading__carousel}>Общая сводка</h2>
                                <p className={styles.text__result}>Найдено 4 221 вариантов</p>
                                <div className={styles.carousel__block}>
                                    <img src={iconArrowL} alt="L" />
                                    <div className={styles.carousel__content}>
                                        <p className={styles.carousel__text}>Период</p>
                                        <p className={styles.carousel__text}>Всего</p>
                                        <p className={styles.carousel__text}>Риски</p>
                                    </div>
                                    {this.mapBlockInfo()}
                                    <img src={iconArrowR} alt="R" />
                                </div>

                            </div>
                            <div className={styles.documents}>
                                <h2 className={styles.heading__doc}>Список документов</h2>
                                {this.mapDocInfo()}
                            </div>
                            <button onClick={(e) => this.getPublicDoc()} className={styles.button__more} >Показать больше</button>
                        </div>
                    </div>
                </section>
            </main>

        );
    }
}

export default Output;