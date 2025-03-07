import { CalendarDays, User, Globe, Tag, ArrowLeft } from "lucide-react"
import { useParams, Link } from "react-router-dom"
import { newsData } from "../News/data"
import Chatbot from "../chatbot/chatbot"
import "./Detail.css"

export default function NewsDetails() {
  const { id } = useParams()
  const newsItem = newsData.find((item) => item.id === Number(id))
  
  if (!newsItem) {
    return (
      <div className="container error-container">
        <h1>Article not found</h1>
        <Link to="/" className="back-link">
          <ArrowLeft size={16} />
          <span>Back to News</span>
        </Link>
      </div>
    )
  }
  
  return (
    <>
      <article className="news-details">
        <div className="container">
          <div className="article-header">
            <Link to="/" className="back-link">
              <ArrowLeft size={16} />
              <span>Back to News</span>
            </Link>
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
              <div className="meta-item">
                <Tag size={18} />
                <span>{newsItem.category}</span>
              </div>
            </div>
          </div>
          
          <div className="article-image-container">
            <img
              src={newsItem.imageUrl || "/placeholder.svg"}
              alt={newsItem.title}
              className="article-image"
            />
          </div>
          
          <div className="article-content">
            {newsItem.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          
          <div className="article-footer">
            <div className="related-tags">
              <span className="tag-label">Related Topics:</span>
              <div className="tags-container">
                <span className="category-tag">{newsItem.category}</span>
                {newsItem.tags && newsItem.tags.map((tag, index) => (
                  <span key={index} className="category-tag">{tag}</span>
                ))}
              </div>
            </div>
            
            <div className="article-source">
              <span>Source: {newsItem.source}</span>
            </div>
          </div>
          
          {newsItem.relatedArticles && newsItem.relatedArticles.length > 0 && (
            <div className="related-articles">
              <h3>Related Articles</h3>
              <div className="related-articles-grid">
                {newsItem.relatedArticles.map((article, index) => (
                  <Link key={index} to={`/news/${article.id}`} className="related-article-card">
                    <div className="related-article-image">
                      <img src={article.imageUrl || "/placeholder.svg"} alt={article.title} />
                    </div>
                    <h4>{article.title}</h4>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
      
      <Chatbot />
    </>
  )
}