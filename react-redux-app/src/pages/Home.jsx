import {useEffect, useState} from "react"
import {fetchWithDelay} from "../api/fakeApi"
import "./home.css"

function Home() {
  const [vehicles, setVehicles] = useState([])
  const [selected, setSelected] = useState(null)
  const [news, setNews] = useState([])
  const [facts, setFacts] = useState([])
  const [loading, setLoading] = useState(true)

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

  if (loading) return <h2 className="loading">Загрузка данных...</h2>

  return (
    <div className="home">

      {/* LIST */}
      <section>
        <h2>Боевая техника</h2>
        <div className="vehicle-list">
          {vehicles.map(v => (
            <div
              key={v.id}
              className="vehicle-item"
              onClick={() => setSelected(v)}
            >
              {v.name}
            </div>
          ))}
        </div>
      </section>

      {/* DETAIL */} {selected && (
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
        </section>
    )}

      {/* NEWS */}
      <section>
        <h2>Новости</h2>
        {news.map(n => (
          <div
            key={n.id}
            className="news-card"
          >
            <h3>{n.title}</h3>
            <p>{n.text}</p>
          </div>
        ))}
      </section>

      {/* FACTS */}
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
