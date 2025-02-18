import { newsData } from "../News/data.js"
import "./RelatedArticles.css"

const RelatedArticles = () => {
  return (
    <section className="related-articles">
      <div className="container">
        <h2 className="section-title">Related Articles</h2>
        <div className="articles-grid">
          {newsData.map((article) => (
            <article key={article.id} className="article-card">
              <a href={article.url} className="article-link">
                <div className="image-container">
                  <img
                    src={article.imageUrl || "/placeholder.svg"}
                    alt={article.title}
                    className="article-image"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x250"
                    }}
                  />
                </div>
                <h3 className="article-title">{article.title}</h3>
                <div className="article-meta">
                  <span className="article-date">{article.publicationDate}</span>
                  <span className="article-source">{article.source}</span>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RelatedArticles

