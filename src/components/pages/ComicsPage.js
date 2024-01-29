import {BrowserRouter as Router, Route, Rouytes} from "react-router-dom"

import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";

const ComicsPage = () => {
    return (
        <>
            <AppBanner/>
            <ComicsList/>
        </>
    )
}

export default ComicsPage;