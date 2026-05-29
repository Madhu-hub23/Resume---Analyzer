// pages/ResumeUpload.jsx

import "./ResumeUpload.css";
import { FaFileUpload, FaClipboardList } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import { BsFileEarmarkArrowDownFill } from "react-icons/bs";





function ResumeUpload() {
  return (
    <div className="upload-page">
      <h1>Welcome, Harini !</h1>

      <p>
        Upload your resume and job description
        to analyze your match
      </p>

      <div className="upload-box">
        
        <div className="upload-header">
  
  
  <MdDescription className="upload-icon"  size={52}/>

  <div className="upload-text">
    <h2>Upload Resume</h2>
    <p>Upload your resume in PDF/DOCX format</p>
 
</div>

</div>
        <div className="drop-area">
          
<BsFileEarmarkArrowDownFill color="#3563d8" size={70} />
          <h2>Drag & Drop Resume Here</h2>
          <h3>or</h3>
          <input
  type="file"
  id="resume-upload"
  hidden
/>

<label
  htmlFor="resume-upload"
  className="browse-btn"
>
  Browse Files
</label>
        </div>
        <div  className="upload-box2">
        <div className="job-header">
  <MdDescription className="job-icon" />

  <div className="job-text">
    <h2>Job Description</h2>
    <p>Paste your job description here to compare with resume</p>
  </div>
</div>
        </div>

        <textarea placeholder="Paste job description here..." />

        <button className="analyze-btn">
          Analyze Resume
        </button>
      </div>
    </div>
  );
}

export default ResumeUpload;