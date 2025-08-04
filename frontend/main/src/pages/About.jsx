import React from "react";
import { Link } from 'react-router-dom';

const FitnessAppPage = () => {
  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 0.15;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.3;
            }
          }

          .feature-card:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 25px rgba(255, 87, 34, 0.8);
            transition: all 0.3s ease-in-out;
          }

          .action-button:hover {
            background-color: #ff784e;
            transform: scale(1.05);
            box-shadow: 0 6px 16px rgba(255, 120, 78, 0.6);
            transition: all 0.3s ease-in-out;
          }
        `}
      </style>

      <div style={styles.page}>
        {/* Background Effect */}
        <div style={styles.backgroundEffect}>
          <div style={{ ...styles.shape, ...styles.shape1 }}></div>
          <div style={{ ...styles.shape, ...styles.shape2 }}></div>
          <div style={{ ...styles.shape, ...styles.shape3 }}></div>
          <div style={{ ...styles.shape, ...styles.shape4 }}></div>
        </div>

        <div style={styles.container}>
          <h1 style={styles.title}>Welcome to FitLife</h1>
          <p style={styles.description}>
            Your all-in-one fitness app to track workouts, monitor progress, and stay motivated!
          </p>

          <div style={styles.features}>
            <FeatureCard
              title="Workout Plans"
              description="Choose from a variety of customized workout routines."
            />
            <FeatureCard
              title="Progress Tracking"
              description="Monitor your improvements and reach your fitness goals."
            />
          </div>

          <div style={styles.buttons}>
            <Link to ="/signupuser" className="action-button" style={styles.button}>
              Sign Up
            </Link>
            <Link to ="/loginuser" className="action-button" style={styles.button}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const FeatureCard = ({ title, description }) => (
  <div className="feature-card" style={styles.card}>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const styles = {
  page: {
    position: "relative",
    minHeight: "100vh",
    backgroundColor: "#121212",
    color: "white",
    overflow: "hidden",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },

  backgroundEffect: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
    pointerEvents: "none",
  },

  shape: {
    position: "absolute",
    borderRadius: "50%",
    opacity: 0.15,
    boxShadow: "0 0 60px 30px #ff5722",
    animation: "pulse 6s ease-in-out infinite",
  },
  shape1: {
    width: 200,
    height: 200,
    top: "10%",
    left: "15%",
    backgroundColor: "#ff5722",
    animationDelay: "0s",
  },
  shape2: {
    width: 300,
    height: 300,
    top: "60%",
    left: "70%",
    backgroundColor: "#ff9800",
    animationDelay: "2s",
  },
  shape3: {
    width: 150,
    height: 150,
    top: "30%",
    left: "80%",
    backgroundColor: "#e91e63",
    animationDelay: "4s",
  },
  shape4: {
    width: 250,
    height: 250,
    top: "70%",
    left: "20%",
    backgroundColor: "#9c27b0",
    animationDelay: "3s",
  },

  container: {
    position: "relative",
    zIndex: 1,
    maxWidth: 900,
    margin: "0 auto",
    padding: "80px 20px",
    textAlign: "center",
  },
  title: {
    fontSize: "3.5rem",
    marginBottom: 15,
    fontWeight: "bold",
  },
  description: {
    fontSize: "1.4rem",
    marginBottom: 40,
    color: "#ddd",
  },
  features: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
    marginBottom: 50,
  },
  card: {
    backgroundColor: "#222",
    borderRadius: 12,
    padding: 25,
    flex: "1 1 280px",
    boxShadow: "0 8px 20px rgba(255,87,34,0.6)",
    transition: "all 0.3s ease-in-out",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: 25,
  },
  button: {
    padding: "14px 36px",
    fontSize: "1.1rem",
    cursor: "pointer",
    borderRadius: 30,
    border: "none",
    backgroundColor: "#ff5722",
    color: "white",
    fontWeight: "600",
    boxShadow: "0 4px 12px rgba(255,87,34,0.6)",
    transition: "all 0.3s ease-in-out",
  },
};

export default FitnessAppPage;
