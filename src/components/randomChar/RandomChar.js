import {useState, useEffect} from 'react'
import useMarvelService from '../../services/MarvelService';
import ErrorMassage from '../errorMassage/ErrorMassage';
import Spinner from '../spinner/Spinner';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {

    const [char, setChar] = useState({});
    //because we have a hook useHttp
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);

    const {loading, error, getCharachter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();

        const timerId = setInterval(updateChar, 60000);
        console.log('update 60');
        return () => {
            console.log('cancel update 60');
            clearInterval(timerId)
        }

    }, []);

    const onCharLoaded = (char) => {
        setChar(char);
        //because we have a hook useHttp
        // setLoading(false);
    }

    //because we have a hook useHttp
    // const onCharLoading = () => {
    //     setLoading(true);
    // }

    // const onRerror = () => {
    //     setLoading(false);
    //     setError(true);
    // }

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        
        getCharachter(id).then(onCharLoaded)
    }

    const errorMassage = error ? <ErrorMassage/> : null;
    const spinner = loading ?  <Spinner/> : null;
    const content = !(loading || error) ? <View char = {char}/> : null;

        return (
            <div className="randomchar">
                {errorMassage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={updateChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;