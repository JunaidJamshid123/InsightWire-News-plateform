import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Top_News from "./components/Top_News"
import NewsSection from "./components/NewsSection"
import NewsDetails from "./components/Detail/Detail"
import Footer from "./components/Footer/Footer"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Top_News />
                <NewsSection />
              </>
            }
          />
          <Route path="/news/:id" element={<NewsDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App

