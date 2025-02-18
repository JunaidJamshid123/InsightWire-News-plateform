import { CalendarDays, User, Globe } from "lucide-react"
import { useParams } from "react-router-dom"
import { newsData } from "../News/data"
import Chatbot from "../chatbot/chatbot"
import RelatedArticles from "../Releted Articles/RelatedArticles.jsx"
import "./Detail.css"

export default function NewsDetails() {
  const { id } = useParams()
  const newsItem = newsData.find((item) => item.id === Number(id))

  if (!newsItem) {
    return (
      <div className="container">
        <h1>Article not found</h1>
      </div>
    )
  }

  return (
    <>
      <article className="news-details">
        <div className="container">
          <h1 className="article-title">{newsItem.title}</h1>

          <div className="article-meta">
            <div className="meta-item">
              <CalendarDays size={18} />
              <span>{newsItem.publicationDate}</span>
            </div>
            <div className="meta-item">
              <User size={18} />
              <span>BY {newsItem.author}</span>
            </div>
            <div className="meta-item">
              <Globe size={18} />
              <span>{newsItem.source}</span>
            </div>
          </div>

          <div className="article-image">
            <img src={newsItem.imageUrl || "/placeholder.svg"} alt={newsItem.title} />
          </div>

          <div className="article-content">
            <p>{newsItem.content}</p>
          </div>

          <div className="article-footer">
            <span className="category-tag">{newsItem.category}</span>
          </div>
        </div>
      </article>

      {/* Related Articles component */}
      <RelatedArticles currentArticleId={newsItem.id} />

      {/* Chatbot component */}
      <Chatbot />
    </>
  )
}

