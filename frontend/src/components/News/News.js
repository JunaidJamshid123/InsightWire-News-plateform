import { CalendarDays, User } from "lucide-react"
import { Link } from "react-router-dom"
import "./News.css"

const News = ({ newsItem }) => {
  const { id, title, content, publicationDate, author, imageUrl } = newsItem

  return (
    <article className="news-card">
      <div className="news-image-container">
        <img src={imageUrl || "/placeholder.svg"} alt={title} className="news-image" />
      </div>

      <div className="news-content">
        <div className="news-metadata">
          <div className="metadata-item">
            <CalendarDays size={16} />
            <span>{publicationDate}</span>
          </div>
          <div className="metadata-item">
            <User size={16} />
            <span>BY {author}</span>
          </div>
        </div>

        <h2 className="news-title">{title}</h2>
        <p className="news-excerpt">{content}</p>

        <div className="read-more">
          <Link to={`/news/${id}`} className="read-more-link">
            READ MORE
          </Link>
        </div>
      </div>
    </article>
  )
}

export default News

