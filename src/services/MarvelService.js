import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
	const { loading, request, error, clearError } = useHttp();

	const _apiBased = "https://gateway.marvel.com:443/v1/public/";
	const _apiKey = "apikey=25ff1b080c84a510a052228220711179";
	// const _apiKey = window.env.API_KEY;
	const _baseOffset = 210;

	const getAllCharachters = async (offset = _baseOffset) => {
		const res = await request(
			`${_apiBased}characters?limit=9&offset=${offset}&${_apiKey}`
		);
		return res.data.results.map(_transformCharachter);
	};

	const getCharachter = async (id) => {
		const res = await request(`${_apiBased}characters/${id}?${_apiKey}`);
		return _transformCharachter(res.data.results[0]);
	};

	const getAllComics = async (offset = 0) => {
		const res = await request(
			`${_apiBased}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`
		);
		return res.data.results.map(_transformComics);
	};

	const getComics = async (id) => {
		const res = await request(`${_apiBased}comics/${id}?${_apiKey}`);
		return _transformComics(res.data.results[0]);
	};

	const _transformCharachter = (char) => {
		return {
			id: char.id,
			name: char.name,
			description: char.name,
			thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items,
		};
	};

	const _transformComics = (comics) => {
		return {
			id: comics.id,
			title: comics.title,
			description: comics.description || "There is no description",
			pageCount: comics.pageCount
				? `${comics.pageCount} p.`
				: "No information about the number of pages",
			thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
			language: comics.textObjects.language || "en-us",
			price: comics.prices.price
				? `${comics.prices.price}$`
				: "not available",
		};
	};

	return {
		loading,
		error,
		clearError,
		getAllCharachters,
		getCharachter,
		getAllComics,
		getComics,
	};
};

export default useMarvelService;
