import { useState, useEffect } from 'react';
import ErrorMassage from '../errorMassage/ErrorMassage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import useMarvelService from '../../services/MarvelService';
import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    const {loading, error, getCharachter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId])

    const updateChar = () => {
         const {charId} = props;
         if(!charId) {
            return;
         }
        
        clearError();
        getCharachter(charId)
            .then(onCharLoaded);
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }
    
    // const {char, loading, error} = this.state;
    //this.setState(this.state.foo = true) // for ErrorBoundary
    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorMassage = error ? <ErrorMassage/> : null;
    const spinner = loading ?  <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char = {char}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMassage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    let imgStyle = {'objectFit': 'cover'};
    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
        imgStyle = {'objectFit': 'contain'};
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    comics.map((item, i) => {
                        if(i > 9) return;
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default CharInfo;