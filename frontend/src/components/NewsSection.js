import News from "./News/News"
import { newsData } from "./News/data"
import "./NewsSection.css"

function NewsSection() {
  return (
    <section className="news-section">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <h2 className="section-heading">News at a Glance</h2>

        {/* News Grid */}
        <div className="news-grid">
          {newsData.map((newsItem) => (
            <News key={newsItem.id} newsItem={newsItem} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewsSection
