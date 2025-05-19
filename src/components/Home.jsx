import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Home.css";

const Home = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("new");

  // Fetch stories from API
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get(
          "https://mxpertztestapi.onrender.com/api/sciencefiction"
        );
        setStories(response.data);
      } catch (error) {
        console.error("Failed to fetch stories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  // Filter stories by tab
  const getFilteredStories = () => {
    if (activeTab === "inProgress") {
      return stories.filter((story) => story.status === "In Progress");
    }
    if (activeTab === "completed") {
      return stories.filter((story) => story.status === "completed");
    }
    return stories.filter((story) => !story.status || story.status === "new");
  };

  // Handle tab change
  const handleTabChange = (selectedTab) => {
    if (selectedTab === "clear") {
      setStories([]); // clear all data
      setActiveTab("new");
    } else {
      setActiveTab(selectedTab);
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="logo-container">
          <img src="" alt="" className="logo-icon" />
          <h1 className="logo-text">BrainyLingo</h1>
        </div>
        <nav className="main-nav flex-wrap justify-content-center justify-content-md-end">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="#" className="nav-link">Leaderboard</Link>
          <Link to="#" className="nav-link">Daily Quiz</Link>
          <Link to="#" className="nav-link">Gems</Link>
        </nav>
        <button className="sign-out-btn">Sign Out</button>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <h2 className="page-title">Science Fiction Stories</h2>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          <button 
            className={`tab-btn ${activeTab === "new" ? "active" : ""}`}
            onClick={() => handleTabChange("new")}
          >
            <span className="tab-icon new-icon">🔍</span>
            New
          </button>
          <button 
            className={`tab-btn ${activeTab === "inProgress" ? "active" : ""}`}
            onClick={() => handleTabChange("inProgress")}
          >
            <span className="tab-icon in-progress-icon">⏳</span>
            In Progress
          </button>
          <button 
            className={`tab-btn ${activeTab === "completed" ? "active" : ""}`}
            onClick={() => handleTabChange("completed")}
          >
            <span className="tab-icon completed-icon">✓</span>
            Completed
          </button>
          <button 
            className="tab-btn clear-btn"
            onClick={() => handleTabChange("clear")}
          >
            <span className="tab-icon clear-icon">🗑️</span>
            Clear All
          </button>
        </div>

        {/* Story Cards */}
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading stories...</p>
          </div>
        ) : (
         <div className="story-grid">
            {getFilteredStories().length === 0 ? (
              <p className="no-stories-message">No stories available.</p>
            ) : (
              getFilteredStories().map((story) => (
                <div key={story._id} className="story-card">
                  <div className="story-image-container">
                    <img
                      src={`https://ik.imagekit.io/dev24/${story.Image[0]}`}
                      alt={story.Title}
                      className="story-image"
                    />
                    {story.status === "completed" && (
                      <div className="status-badge completed">Completed</div>
                    )}
                    {story.status === "In Progress" && (
                      <div className="status-badge in-progress">In Progress</div>
                    )}
                  </div>
                  <div className="story-card-content">
                    <h3 className="story-title">{story.Title}</h3>
                    <Link
                      to={`/story/${story._id}`}
                      className={`story-action-btn ${
                        story.status === "completed" ? "read-again" : "start-reading"
                      }`}
                    >
                      {story.status === "completed" ? "Completed" : 
                       story.status === "In Progress" ? "In Progress" : "New"}
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Pagination */}
        <div className="pagination">
          <button className="pagination-btn prev">
            <span className="arrow">←</span> Previous
          </button>
          <div className="page-numbers">
            <button className="page-number active">1</button>
            <button className="page-number">2</button>
            <button className="page-number">3</button>
          </div>
          <button className="pagination-btn next">
            Next <span className="arrow">→</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
