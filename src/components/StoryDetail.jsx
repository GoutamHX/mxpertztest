import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles/story.css";

const StoryDetail = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("adventure");

  // Fetch story details
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await axios.get(
          `https://mxpertztestapi.onrender.com/api/sciencefiction/${id}`
        );
        setStory(response.data);
      } catch (error) {
        console.error("Error fetching story:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  // Brain Quest functionality
  const handleOptionClick = (qIndex, option) => {
    if (!story.Brainquest[qIndex].selected) {
      const updatedQuestions = [...story.Brainquest];
      updatedQuestions[qIndex].selected = option;
      setStory({ ...story, Brainquest: updatedQuestions });
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading story...</p>
      </div>
    );
  }

  if (
    !story ||
    Object.keys(story).length === 0 ||
    (story.Storyadvenure?.content?.length === 0 &&
      story.Wordexplore?.length === 0 &&
      story.Brainquest?.length === 0)
  ) {
    return (
      <div className="error-container">
        <h2>Story not found or is empty</h2>
        <Link to="/" className="return-home">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="logo-container">
          <img src="" alt="" className="logo-icon" />
          <h1 className="logo-text">BrainyLingo</h1>
        </div>
        <nav className="main-nav">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="#" className="nav-link">
            Leaderboard
          </Link>
          <Link to="#" className="nav-link">
            Daily Quiz
          </Link>
          <Link to="#" className="nav-link">
            Gems
          </Link>
        </nav>
        <button className="sign-out-btn">Sign Out</button>
      </header>

      {/* Main Content */}
      <main className="story-detail-content">
        <h1 className="story-title">{story.Title}</h1>

        {/* Section Navigation */}
        <div className="section-tabs">
          <button
            className={`section-tab ${
              activeSection === "adventure" ? "active" : ""
            }`}
            onClick={() => setActiveSection("adventure")}
          >
            <span className="tab-icon adventure-icon">📚</span>
            Story Adventure
          </button>
          <button
            className={`section-tab ${
              activeSection === "words" ? "active" : ""
            }`}
            onClick={() => setActiveSection("words")}
          >
            <span className="tab-icon words-icon">🔤</span>
            Word Explorer
          </button>
          <button
            className={`section-tab ${
              activeSection === "brain" ? "active" : ""
            }`}
            onClick={() => setActiveSection("brain")}
          >
            <span className="tab-icon brain-icon">🧠</span>
            Brain Quest
          </button>
        </div>

        {/* Content Sections */}
        <div className="section-content">
          {/* Story Adventure Section */}
          {activeSection === "adventure" && (
            <div className="adventure-section">
              {story.Storyadvenure?.content?.map((section, index) => (
                <div key={index} className="story-segment">
                  {section.Storyimage?.map((img, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={`https://ik.imagekit.io/dev24/${img}`}
                      alt={`Story illustration ${imgIndex + 1}`}
                      className="story-illustration"
                    />
                  ))}
                  <div className="story-paragraphs">
                    {section.Paragraph?.map((text, textIndex) => (
                      <p key={textIndex} className="story-paragraph">
                        {text}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Word Explorer Section */}
          {activeSection === "words" && (
            <div className="word-explorer-section">
              <div className="instruction-banner">
                <p>Word Explorer Section</p>
              </div>
              <div className="matching-game">
                <div className="word-cards">
                  {story.Wordexplore?.map((word, index) => (
                    <div key={index} className="word-card">
                      <h3 className="word-title">{word.Storytitle}</h3>
                      <p className="word-definition">{word.Storyttext}</p>
                    </div>
                  ))}
                </div>
                <div className="image-cards">
                  {story.Wordexplore?.map((word, index) => (
                    <div key={index} className="image-card">
                      <img
                        src={`https://ik.imagekit.io/dev24/${word.Storyimage?.[0]}`}
                        alt={word.Storytitle}
                        className="word-image"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Brain Quest Section */}
          {activeSection === "brain" && (
            <div className="brain-quest-section">
              {story.Brainquest?.map((question, index) => (
                <div key={index} className="question-card">
                  <h3 className="question-number">Question {index + 1}</h3>
                  <p className="question-text">{question.Question}</p>

                  <div className="options-list">
                    {question.Option.map((option, optIndex) => {
                      const isSelected = question.selected === option;
                      const isCorrect = option === question.Answer;
                      const showResult = !!question.selected;

                      return (
                        <div
                          key={optIndex}
                          className={`option ${
                            showResult
                              ? isSelected && isCorrect
                                ? "correct"
                                : isSelected
                                ? "incorrect"
                                : ""
                              : ""
                          }`}
                          onClick={() => handleOptionClick(index, option)}
                        >
                          <input
                            type="radio"
                            name={`question-${index}`}
                            checked={isSelected}
                            onChange={() => {}}
                          />
                          <label>{option}</label>
                        </div>
                      );
                    })}
                  </div>

                  {question.selected && (
                    <div
                      className={`result-feedback ${
                        question.selected === question.Answer
                          ? "correct-feedback"
                          : "incorrect-feedback"
                      }`}
                    >
                      {question.selected === question.Answer
                        ? "Correct! Great job! 🎉"
                        : `Incorrect. The correct answer is: ${question.Answer}`}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StoryDetail;
