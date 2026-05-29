import { MdSearch, MdOutlineNotifications, MdApps } from 'react-icons/md';
import './Navbar.css';

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="navbar-tabs">
          <button className="nav-tab active">All tools</button>
          <button className="nav-tab">Edit</button>
          <button className="nav-tab">Convert</button>
          <button className="nav-tab">E-Sign</button>
        </div>
      </div>
      <div className="navbar-right">
        <div className="navbar-search">
          <MdSearch className="search-icon" />
          <span className="search-placeholder">Find text or tools</span>
        </div>
        <button className="navbar-icon-btn"><MdOutlineNotifications /></button>
        <button className="navbar-icon-btn"><MdApps /></button>
        <button className="navbar-share-btn">Share</button>
        <button className="navbar-ai-btn">
          <span className="ai-btn-dot" />
          Ask AI Assistant
        </button>
      </div>
    </header>
  );
}

export default Navbar;
