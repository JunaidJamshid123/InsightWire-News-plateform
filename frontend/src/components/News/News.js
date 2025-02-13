import "./News.css"
import { CalendarDays, User } from "lucide-react"

const News = ({ newsItem }) => {
  const { title, content, publicationDate, author, imageUrl, url } = newsItem

  return (
    <div className="news-card">
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
          <a href={url} className="read-more-link">
            READ MORE
          </a>
        </div>
      </div>
    </div>
  )
}

export default News

