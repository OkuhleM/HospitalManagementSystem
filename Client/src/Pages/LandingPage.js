import React from "react";
import Navbar from "../Components/Navbar";
import "../Styling/LandingPage.css";

function LandingPage() {
  return (
    <div>
      <Navbar />

      <div>
        <section class="hero">
          <h1>Run your hospital on one secure platform</h1>
          <p>
            MedicaHub helps hospitals run smoothly and scale administration with
            powerful tools and integrations.
          </p>
          <div class="cta-buttons">
            <button class="btn-filled">Get Started</button>
            <button class="btn-outline">See Demo</button>
          </div>

          <div>
            <ul className="info">
              <li className="enclose">HIPPA- ready</li>
              <li className="enclose">Role base access</li>
              <li className="enclose">Accurate Data</li>
              <li className="enclose">24/7 availabilty</li>
            </ul>
          </div>
        </section>

        <div className="features" id="Features">
          <p className="heading">Purpose-built for every role</p>

          <div className="roles">
            <h5>Admin</h5>
            <p>
              Create users, assign roles, manage permissions and audit logs.
            </p>
            <p>User & role management</p>
            <p>Security & compliance</p>
            <p>Global settings</p>
          </div>

   <div className="roles">
            <h5>Receptionist</h5>
            <p>
              Register patients, manage medical aids, and pull reports.
            </p>
            <p>Add new patients</p>
            <p>View history & reports</p>
            <p>Insurance linking</p>
          </div>

             <div className="roles">
            <h5>Doctor</h5>
            <p>
              View patient records, update notes, track appointments.
            </p>
            <p>Appointment Views</p>
            <p>Visit Notes</p>
            <p>Prescription Tracking</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LandingPage;
