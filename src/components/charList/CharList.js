import React, { useState, useEffect, useRef } from 'react';
import useMarvelService from '../../services/MarvelService';
import ErrorMassage from '../errorMassage/ErrorMassage';
import Spinner from '../spinner/Spinner';
import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const refFocus = useRef();

    const {loading, error, getAllCharachters} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllCharachters(offset)
                        .then(onCharListLoaded)
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false
        if(newCharList.length < 9) {
            ended = true
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }
    
    const focusItem = (i) => {
        const arr = refFocus.current;
        arr.childNodes.forEach((item) => {
            item.className = 'char__item'
        })
        arr.childNodes[i].className = 'char__item char__item_selected';
        console.log(arr.childNodes[i].className);
    }

    function renderItems(arr) {
        
        const items =  arr.map((item, index) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            const onClick = () => {
                focusItem(index);
                props.onCharSelected(item.id);
            }

            return (
                <li 
                    className="char__item"
                    key={item.id}
                    onClick={() => onClick()}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });

        return (
            <ul className="char__grid" ref={refFocus}>
                {items}
            </ul>
        )
    }
    
    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMassage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="char__list">
            {spinner}
            {errorMessage}
            {items}
            <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;