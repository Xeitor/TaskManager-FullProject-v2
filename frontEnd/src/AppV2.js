import React, { useState, useEffect } from 'react'
import MainComponent from './main_components/MainComponent';
var aux = null;

const App = () => {
  
  return (
    <div className="container">
      <h1>Task manager app</h1>
      <MainComponent />
    </div>
  )
}

export default App
