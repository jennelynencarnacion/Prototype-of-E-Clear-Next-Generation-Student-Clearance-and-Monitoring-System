import React, { useEffect, useState } from 'react';
import './Home.css'; 
import logo from './eclear_logo.png'; 

const Home = ({ user }) => {
  useEffect(() => {
    console.log('User prop in Home component:', user);
  }, [user]);

  const welcomeMessage = 'Welcome';


  const initialProgressData = [
    { title: 'Student Organization Treasurer', completed: true, requirements: ['Requirement 1', 'Requirement 2'] },
    { title: 'Student Organization President', completed: true, requirements: ['Requirement 1', 'Requirement 2'] },
    { title: 'Dean', completed: false, requirements: ['Requirement 1', 'Requirement 2', 'Requirement 3'] },
    { title: 'Cashier', completed: false, requirements: ['Requirement 1', 'Requirement 2'] },
    { title: 'OVPSAS', completed: false, requirements: ['Requirement 1', 'Requirement 2', 'Requirement 3'] },
  ];

  const [progressData, setProgressData] = useState(initialProgressData);
  const [selectedTask, setSelectedTask] = useState(null);
  const [checkedRequirements, setCheckedRequirements] = useState([]);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setCheckedRequirements(Array(task.requirements.length).fill(false));
  };

  const handleCheckboxChange = (index) => {
    const newCheckedRequirements = [...checkedRequirements];
    newCheckedRequirements[index] = !newCheckedRequirements[index];
    setCheckedRequirements(newCheckedRequirements);
  };

  const handleSignButtonClick = () => {
    if (selectedTask) {
      const updatedProgressData = progressData.map((task) => {
        if (task.title === selectedTask.title) {
          return { ...task, completed: true };
        }
        return task;
      });
      setProgressData(updatedProgressData);
      setSelectedTask(null); 
    }
  };

  const handlePrintClearance = () => {
 
    alert('Printing clearance...');
  };

  const isClearanceCompleted = progressData.every((task) => task.completed);

  return (
    <div className="home-container">
      <header className="header">
        {/* Logo */}
        <img className="logo" src={logo} alt="Logo" />

        {/* Menu */}
        <nav className="menu">
          <a href="#home" className="menu-item">
            <i className="fas fa-home"></i>
          </a>
          <a href="#notifications" className="menu-item">
            <i className="fas fa-bell"></i>
          </a>
          <a href="#profile" className="menu-item">
            <i className="fas fa-user"></i>
          </a>
          <a href="#profile" className="menu-item">
            <i class="fa-solid fa-star"></i>
          </a>
        </nav>
      </header>

      {/* Main content */}
      <main className="main-content">
        <h2>{welcomeMessage} to E-Clear</h2>

        {/* Progress Tracking */}
        <section id="progress">
          <h3>Your Clearance Progress</h3>
          <div className="progress-tracking">
            {progressData.map((task, index) => (
              <div key={index} className={`progress-item ${task.completed ? 'completed' : 'incomplete'}`} onClick={() => handleTaskClick(task)}>
                <span>{task.title}</span>
                <span>{task.completed ? 'Completed' : 'Incomplete'}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Display Requirements */}
        {selectedTask && (
          <section id="requirements">
            <h3>Requirements for {selectedTask.title}</h3>
            <ul className="requirements-list">
              {selectedTask.requirements.map((requirement, index) => (
                <li key={index} className="requirement-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={checkedRequirements[index]}
                      onChange={() => handleCheckboxChange(index)}
                    />
                    {requirement}
                  </label>
                </li>
              ))}
            </ul>
            <button className="sign-button" onClick={handleSignButtonClick} disabled={!checkedRequirements.every(Boolean)}>
              Sign as Completed
            </button>
          </section>
        )}

        {/* Print Clearance Button */}
        {isClearanceCompleted && (
          <button className="print-button" onClick={handlePrintClearance}>
            Print Clearance
          </button>
        )}
      </main>
    </div>
  );
};

export default Home;
