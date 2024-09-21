import React, { useState } from 'react';
import './App.scss';

// Modal Popup component
const Modal = ({ showModal, setShowModal }) => {
  return showModal ? (
    <div className="modal-overlay" onClick={() => setShowModal(false)}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Modal Popup</h2>
        <p>This is a modal popup!</p>
        <button onClick={() => setShowModal(false)}>Close</button>
      </div>
    </div>
  ) : null;
};

// Sidebar Navigation
const Sidebar = ({ showSidebar }) => (
  <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
    <nav>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Services</li>
        <li>Contact</li>
      </ul>
    </nav>
  </div>
);

// Drag and Drop component with image preview
const DragAndDrop = () => {
  const [images, setImages] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);

    // Filter image files only
    const imageFiles = droppedFiles.filter((file) => file.type.startsWith('image/'));

    // Convert the image files into URLs for preview
    const imageUrls = imageFiles.map((file) => URL.createObjectURL(file));

    setImages((prevImages) => [...prevImages, ...imageUrls]);
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className="drag-drop" onDrop={handleDrop} onDragOver={handleDragOver}>
      <p>Drag & Drop images here</p>

      <div className="image-preview">
        {images.length > 0 ? (
          images.map((image, index) => (
            <img key={index} src={image} alt={`Preview ${index}`} className="preview-img" />
          ))
        ) : (
          <p>No images uploaded yet</p>
        )}
      </div>
    </div>
  );
};

// Responsive Navigation
const ResponsiveNav = ({ toggleSidebar }) => (
  <div className="responsive-nav">
    <button className="menu-btn" onClick={toggleSidebar}>
      ☰ Menu
    </button>
  </div>
);

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(prev => !prev);
  };

  return (
    <div className="App">
      <ResponsiveNav toggleSidebar={toggleSidebar} />
      <Sidebar showSidebar={showSidebar} />

      <div className="main-content">
        <h1>React Features Demo</h1>

        {/* Drag and Drop */}
        <section>
          <h2>Drag and Drop with Image Preview</h2>
          <DragAndDrop />
        </section>

        {/* Modal Popup */}
        <section>
          <h2>Modal Popup</h2>
          <button onClick={() => setShowModal(true)}>Open Modal</button>
          <Modal showModal={showModal} setShowModal={setShowModal} />
        </section>

        {/* Save Multiple Images */}
        <section>
          <h2>Save Multiple Images</h2>
          <input
            type="file"
            multiple
            onChange={(e) => console.log(e.target.files)}
          />
        </section>
      </div>
    </div>
  );
};

export default App;
