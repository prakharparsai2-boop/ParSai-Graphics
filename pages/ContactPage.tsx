import React, { useState } from "react";
import {
  Mail,
  Linkedin,
  Instagram,
  Youtube,
  Send,
  MapPin,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  Check,
} from "lucide-react";
import WebsiteBackgroundWrapper from "../components/WebsiteBackgroundWrapper";
import PausableAnimation from "../components/PausableAnimation";
import "./ContactPage.css";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const subjectOptions = [
    "General Inquiry",
    "Project Quote",
    "Collaboration",
    "Other",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubjectSelect = (subject: string) => {
    setFormData((prev) => ({ ...prev, subject }));
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "General Inquiry",
        message: "",
      });
    } catch (error: any) {
      console.error("Submission error:", error);
      setStatus("error");
      setErrorMessage(
        error.message || "Failed to send message. Please try again.",
      );
    }
  };

  return (
    <WebsiteBackgroundWrapper>
      <div className="contact-page">
        <div className="container">
          {/* Header */}
          <div className="contact-page-header">
            <h1 className="contact-main-title anim-contact-title delay-100">
              Let's Start a <span className="text-accent">Project</span>
            </h1>
            <p className="contact-main-subtitle anim-contact-fade delay-200">
              Ready to elevate your content? Fill out the form below or reach
              out directly. I usually respond within 24 hours.
            </p>
          </div>

          <div className="contact-grid">
            {/* Left: Contact Info */}
            <div className="contact-info-card anim-contact-fade delay-300">
              <h3 className="card-heading">Contact Information</h3>
              <div className="contact-list">
                <a
                  href="mailto:workwithparsai@gmail.com"
                  className="contact-item"
                >
                  <div className="icon-box">
                    <Mail size={20} />
                  </div>
                  <div className="item-details">
                    <span className="item-label">Email Me</span>
                    <span className="item-value">workwithparsai@gmail.com</span>
                  </div>
                </a>

                <div className="contact-item">
                  <div className="icon-box">
                    <MapPin size={20} />
                  </div>
                  <div className="item-details">
                    <span className="item-label">Location</span>
                    <span className="item-value">Remote / Worldwide</span>
                  </div>
                </div>

                <div className="contact-socials-block">
                  <span className="socials-label">Follow Me</span>
                  <div className="social-row">
                    <a
                      href="https://www.linkedin.com/in/prakhar-parsai-a87268328/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-pill"
                    >
                      <Linkedin size={18} />
                      <span>LinkedIn</span>
                    </a>
                    <a
                      href="https://www.instagram.com/prakhar_parsai7/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-pill"
                    >
                      <Instagram size={18} />
                      <span>Instagram</span>
                    </a>
                    <a
                      href="https://www.youtube.com/@ParSai6244"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-pill"
                    >
                      <Youtube size={18} />
                      <span>YouTube</span>
                    </a>
                    <a
                      href="https://wa.me/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-pill"
                    >
                      <img
                        src="https://img.icons8.com/material-outlined/48/000000/whatsapp--v1.png"
                        alt="WhatsApp"
                        className="social-pill-wa"
                      />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="contact-form-card anim-contact-fade delay-400">
              {status === "success" ? (
                <div className="success-message">
                  <div className="success-icon-wrapper">
                    <CheckCircle size={48} className="text-green" />
                  </div>
                  <h3>Message Sent!</h3>
                  <p>Thanks for reaching out. I'll get back to you shortly.</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="submit-btn"
                    style={{ width: "auto", margin: "2rem auto 0" }}
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Your Name"
                      className="form-input"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="your@email.com"
                      className="form-input"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Custom Dropdown for Subject */}
                  <div className="form-group">
                    <label>Subject</label>
                    <div className="custom-select-container">
                      <button
                        type="button"
                        className={`custom-select-trigger ${isDropdownOpen ? "open" : ""}`}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        <span className="selected-value">
                          {formData.subject}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`select-arrow ${isDropdownOpen ? "rotated" : ""}`}
                        />
                      </button>

                      {isDropdownOpen && (
                        <>
                          <div
                            className="dropdown-backdrop"
                            onClick={() => setIsDropdownOpen(false)}
                          />
                          <div className="custom-options-list">
                            {subjectOptions.map((opt) => (
                              <div
                                key={opt}
                                className={`custom-option ${formData.subject === opt ? "selected" : ""}`}
                                onClick={() => handleSubjectSelect(opt)}
                              >
                                <span>{opt}</span>
                                {formData.subject === opt && (
                                  <Check size={16} className="text-accent" />
                                )}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Tell me about your project..."
                      className="form-input textarea"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  {status === "error" && (
                    <div className="error-banner">
                      <AlertCircle size={16} />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <PausableAnimation
                    tag="button"
                    type="submit"
                    className="submit-btn"
                    disabled={status === "sending"}
                    style={{ opacity: status === "sending" ? 0.7 : 1 }}
                  >
                    <span>
                      {status === "sending" ? "Sending..." : "Send Message"}
                    </span>
                    {status === "sending" ? (
                      <div className="spinner-sm"></div>
                    ) : (
                      <Send size={18} />
                    )}
                  </PausableAnimation>
                </form>
              )}
            </div>
          </div>

          {/* Developer Branding Section (Requested) */}
          <div className="contact-developer-branding anim-contact-fade delay-500">
            <div className="developer-badge-lg">
              <span className="dev-text-lg">
                Portfolio Website Developed by{" "}
                <span className="text-white">Kunal Paraye</span>
              </span>
              <div className="dev-actions-lg">
                <a
                  href="https://wa.me/918959690529"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dev-contact-link-lg"
                  aria-label="WhatsApp"
                >
                  <img
                    src="https://img.icons8.com/material-outlined/48/000000/whatsapp--v1.png"
                    alt="WhatsApp"
                    className="dev-wa-icon-lg"
                  />
                  <span>+91 89596 90529</span>
                </a>
                <a
                  href="mailto:draftworks000@gmail.com"
                  className="dev-contact-link-lg"
                  aria-label="Email"
                >
                  <Mail size={16} />
                  <span>draftworks000@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WebsiteBackgroundWrapper>
  );
};

export default ContactPage;
