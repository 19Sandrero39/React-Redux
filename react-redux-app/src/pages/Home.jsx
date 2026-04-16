import {useEffect, useMemo, useState} from "react"
import {fetchWithDelay} from "../api/fakeApi"
import {useDispatch, useSelector} from "react-redux"
import AuthPanel from "../components/AuthPanel"
import {
    addFavorite,
    addLike,
    addRating,
    deleteRating,
    removeFavorite,
    removeLike,
    updateRating
} from "../features/vehicleInteractionSlice"
import "./home.css"

const emptyNewsForm = {
    title: "",
    text: ""
}

function Home() {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.auth.currentUser)
    const vehicleInteractions = useSelector(state => state.vehicleInteractions)
    const [vehicles, setVehicles] = useState([])
    const [selected, setSelected] = useState(null)
    const [news, setNews] = useState([])
    const [facts, setFacts] = useState([])
    const [loading, setLoading] = useState(true)
    const [newsForm, setNewsForm] = useState(emptyNewsForm)
    const [editingNewsId, setEditingNewsId] = useState(null)
    const [ratingValue, setRatingValue] = useState(5)
    const [editingRatingIndex, setEditingRatingIndex] = useState(null)

    useEffect(() => {
        const loadData = async () => {
            const vehiclesData = await fetchWithDelay("/data/vehicles.json", 1200)
            const newsData = await fetchWithDelay("/data/news.json", 800)
            const factsData = await fetchWithDelay("/data/facts.json", 500)

            setVehicles(vehiclesData)
            setNews(newsData)
            setFacts(factsData)
            setSelected(vehiclesData[0])
            setLoading(false)
        }

        loadData()
    }, [])

    const selectedVehicleStats = selected
        ? vehicleInteractions[selected.id] || {likes: 0, isFavorite: false, ratings: []}
        : {likes: 0, isFavorite: false, ratings: []}

    const averageRating = useMemo(() => {
        if (!selectedVehicleStats.ratings.length) {
            return 0
        }

        const total = selectedVehicleStats.ratings.reduce((acc, rating) => acc + rating, 0)
        return (total / selectedVehicleStats.ratings.length).toFixed(1)
    }, [selectedVehicleStats.ratings])

    const handleNewsInputChange = (event) => {
        const {name, value} = event.target
        setNewsForm(prev => ({...prev, [name]: value}))
    }

    const resetNewsForm = () => {
        setNewsForm(emptyNewsForm)
        setEditingNewsId(null)
    }

    const handleNewsSubmit = (event) => {
        event.preventDefault()

        if (!currentUser) return
        if (!newsForm.title.trim() || !newsForm.text.trim()) return

        if (editingNewsId !== null) {
            setNews(prev => prev.map(item => (
                item.id === editingNewsId
                    ? {
                        ...item,
                        title: newsForm.title.trim(),
                        text: newsForm.text.trim()
                    }
                    : item
            )))
            resetNewsForm()
            return
        }

        const newNewsItem = {
            id: Date.now(),
            title: newsForm.title.trim(),
            text: newsForm.text.trim()
        }

        setNews(prev => [newNewsItem, ...prev])
        resetNewsForm()
    }

    const startEditNews = (item) => {
        setEditingNewsId(item.id)
        setNewsForm({
            title: item.title,
            text: item.text
        })
    }

    const deleteNews = (id) => {
        setNews(prev => prev.filter(item => item.id !== id))

        if (editingNewsId === id) {
            resetNewsForm()
        }
    }

    const handleRatingSubmit = (event) => {
        event.preventDefault()
        if (!selected) return

        const parsedRating = Number(ratingValue)
        if (Number.isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
            return
        }

        if (editingRatingIndex !== null) {
            dispatch(updateRating({
                vehicleId: selected.id,
                index: editingRatingIndex,
                rating: parsedRating
            }))
            setEditingRatingIndex(null)
            setRatingValue(5)
            return
        }

        dispatch(addRating({
            vehicleId: selected.id,
            rating: parsedRating
        }))
        setRatingValue(5)
    }

    const startEditRating = (index) => {
        setEditingRatingIndex(index)
        setRatingValue(selectedVehicleStats.ratings[index])
    }

    const cancelEditRating = () => {
        setEditingRatingIndex(null)
        setRatingValue(5)
    }

    if (loading) return <h2 className="loading">Загрузка данных...</h2>

    return (
        <div className="home">
            <AuthPanel/>

            <section>
                <h2>Боевая техника</h2>
                <div className="vehicle-list">
                    {vehicles.map(v => (
                        <div
                            key={v.id}
                            className="vehicle-item"
                            onClick={() => {
                                setSelected(v)
                                setEditingRatingIndex(null)
                                setRatingValue(5)
                            }}
                        >
                            {v.name}
                        </div>
                    ))}
                </div>
            </section>

            {selected && (
                <section className="vehicle-detail">
                    <h2>{selected.name}</h2>
                    <img
                        src={selected.image}
                        alt={selected.name}
                    />
                    <p><b>Страна:</b> {selected.country}</p>
                    <p><b>Тип:</b> {selected.type}</p>
                    <p><b>Год:</b> {selected.year}</p>
                    <p>{selected.description}</p>

                    <div className="vehicle-actions">
                        <button
                            type="button"
                            onClick={() => dispatch(addLike(selected.id))}
                        >👍 Лайк ({selectedVehicleStats.likes})</button>
                        <button
                            type="button"
                            onClick={() => dispatch(removeLike(selected.id))}
                        >👎 Убрать лайк</button>
                        <button
                            type="button"
                            onClick={() => dispatch(selectedVehicleStats.isFavorite ? removeFavorite(selected.id) : addFavorite(selected.id))}
                        >
                            {selectedVehicleStats.isFavorite ? "★ В избранном" : "☆ Добавить в избранное"}
                        </button>
                    </div>

                    <div className="rating-section">
                        <h3>Оценки</h3>
                        <p><b>Средняя оценка:</b> {averageRating}</p>
                        <form
                            className="rating-form"
                            onSubmit={handleRatingSubmit}
                        >
                            <input
                                type="number"
                                min="1"
                                max="5"
                                value={ratingValue}
                                onChange={(event) => setRatingValue(event.target.value)}
                            />
                            <button type="submit">
                                {editingRatingIndex !== null ? "Обновить оценку" : "Добавить оценку"}
                            </button>
                            {editingRatingIndex !== null && (
                                <button
                                    type="button"
                                    onClick={cancelEditRating}
                                >
                                    Отмена
                                </button>
                            )}
                        </form>

                        <ul className="rating-list">
                            {selectedVehicleStats.ratings.map((rating, index) => (
                                <li key={`${selected.id}-${index}`}>
                                    Оценка: {rating}
                                    <button
                                        type="button"
                                        onClick={() => startEditRating(index)}
                                    >
                                        Изменить
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => dispatch(deleteRating({vehicleId: selected.id, index}))}
                                    >
                                        Удалить
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}

            <section>
                <h2>Новости</h2>
                {!currentUser && <p><b>Чтобы добавить, изменить или удалить новости, выполните вход.</b></p>}
                <form
                    className="news-form"
                    onSubmit={handleNewsSubmit}
                >
                    <input
                        type="text"
                        name="title"
                        placeholder="Заголовок"
                        value={newsForm.title}
                        onChange={handleNewsInputChange}
                    />
                    <textarea
                        name="text"
                        placeholder="Текст новости"
                        rows="3"
                        value={newsForm.text}
                        onChange={handleNewsInputChange}
                    />
                    <div className="news-form-actions">
                        <button
                            type="submit"
                            disabled={!currentUser}
                        >{editingNewsId !== null ? "Обновить" : "Добавить"}</button>
                        {editingNewsId !== null && (
                            <button
                                type="button"
                                onClick={resetNewsForm}
                            >
                                Отмена
                            </button>
                        )}
                    </div>
                </form>

                {news.map(n => (
                    <div
                        key={n.id}
                        className="news-card"
                    >
                        <h3>{n.title}</h3>
                        <p>{n.text}</p>
                        <div className="news-actions">
                            <button
                                type="button"
                                disabled={!currentUser}
                                onClick={() => startEditNews(n)}
                            >
                                Редактировать
                            </button>
                            <button
                                type="button"
                                disabled={!currentUser}
                                onClick={() => deleteNews(n.id)}
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                ))}
            </section>

            <section>
                <h2>Интересные факты</h2>
                <ul>
                    {facts.map(f => <li key={f.id}>{f.fact}</li>)}
                </ul>
            </section>

        </div>
    )
}

export default Home
