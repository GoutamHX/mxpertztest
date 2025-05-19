import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Story from './components/StoryDetail';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/story/:id" element={<Story />} />
      </Routes>
    </Router>
  );
};

export default App;
