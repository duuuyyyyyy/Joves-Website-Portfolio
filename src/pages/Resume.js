import React, { useEffect } from 'react';

function Resume() {
  useEffect(() => {
    document.title = 'Resume | Portfolio';
  }, []);

  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <h1>Resume</h1>
        <p>Professional background, experience, and qualifications</p>
      </section>

      <main>
        {/* Download Resume Section */}
        <section className="resume-download">
          <h2 className="resume-download-title">Get My Full Resume</h2>
          <p className="resume-download-text">Download my complete resume in PDF format</p>
          <a href="#" className="btn btn-primary btn-large"><i className="fas fa-download"></i> Download Resume</a>
        </section>
      </main>
    </>
  );
}

export default Resume;
