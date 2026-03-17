# GigShield AI
### AI-Powered Parametric Income Protection for Gig Delivery Workers

GigShield AI is an AI-driven parametric insurance platform designed to protect gig delivery partners from income loss caused by external disruptions such as extreme weather, pollution, and sudden area closures.

The platform provides automated weekly micro-insurance that compensates delivery workers when environmental disruptions prevent them from working.

---

# Problem Statement

India's gig economy depends heavily on delivery partners working with platforms such as:

- Zomato
- Swiggy
- Zepto
- Amazon
- Dunzo

These workers rely on daily deliveries for income. However, external disruptions such as:

- Heavy rain
- Extreme heat
- Severe air pollution
- Flooding
- Sudden curfews or zone closures

can significantly reduce their working hours and earnings.

Currently, gig workers have **no protection against such uncontrollable disruptions**, which often results in 20–30% loss of their weekly income.

---

# Our Solution

GigShield AI introduces an **AI-powered parametric insurance system** that automatically compensates gig workers when disruptions occur.

The system works by:

1. Monitoring real-time environmental conditions.
2. Predicting disruption risks using AI models.
3. Triggering claims automatically when thresholds are crossed.
4. Processing instant payouts for income loss.

Unlike traditional insurance, workers **do not need to manually file claims**.

---

# Selected Persona

This solution focuses on:

## Food Delivery Partners

Platforms:

- Zomato
- Swiggy

### Why Food Delivery?

Food delivery workers operate outdoors and are highly affected by environmental disruptions such as:

| Disruption | Impact |
|------------|--------|
Heavy Rain | Deliveries halted or delayed |
Extreme Heat | Unsafe working conditions |
Flooded Roads | Delivery routes blocked |
Severe Pollution | Outdoor activity reduced |

These disruptions directly reduce their working hours and earnings.

---

# Weekly Insurance Pricing Model

Gig workers operate on a **weekly earning cycle**, so GigShield AI uses a **weekly premium model**.

| Plan | Weekly Premium | Maximum Weekly Payout |
|------|---------------|-----------------------|
Basic | ₹20 | ₹500 |
Standard | ₹35 | ₹900 |
Premium | ₹50 | ₹1500 |

Workers can choose plans based on their risk tolerance and expected income protection.

---

# AI-Based Dynamic Premium Calculation

Premiums are dynamically adjusted using AI models based on risk factors such as:

- Location
- Historical weather patterns
- Seasonal disruption trends
- Flood or pollution risk zones

Example:

| Area Type | Risk Score | Weekly Premium |
|-----------|-----------|---------------|
Low Risk Zone | 0.2 | ₹20 |
Moderate Risk Zone | 0.5 | ₹30 |
High Risk Zone | 0.8 | ₹45 |

This ensures fair pricing and sustainable insurance coverage.

---

# Parametric Claim Triggers

GigShield AI uses **parametric insurance**, meaning claims are triggered automatically when specific conditions occur.

Example triggers include:

| Event | Trigger Condition | Data Source |
|------|------------------|------------|
Heavy Rain | Rainfall > 70 mm | Weather API |
Extreme Heat | Temperature > 45°C | Weather API |
Severe Pollution | AQI > 400 | Air Quality API |
Flood Risk | Heavy rain + road closures | Traffic API |

Example trigger logic:

IF rainfall > 70mm  
AND worker location matches affected zone  
THEN claim is automatically triggered

This allows **instant claim processing without manual verification delays**.

---

# System Workflow

The GigShield AI platform follows this workflow:

Worker Registration  
↓  
AI Risk Profiling  
↓  
Weekly Plan Selection  
↓  
Policy Activation  
↓  
Real-Time Environmental Monitoring  
↓  
Parametric Trigger Detection  
↓  
Automatic Claim Generation  
↓  
Instant Payout to Worker

---

# AI/ML Integration

GigShield AI integrates machine learning in two key areas.

## 1. Risk Prediction Model

Purpose:
Predict probability of environmental disruptions in specific zones.

Input features:

- Historical weather data
- Current forecasts
- Location-based risk
- Seasonal patterns

Possible ML models:

- Random Forest
- Gradient Boosting
- Time Series Forecasting

Output:

Risk Score (0–1)

This score helps determine insurance pricing and coverage.

---

## 2. Fraud Detection System

To ensure fair claims, the platform includes an AI-based fraud detection layer.

Fraud scenarios detected:

- GPS location spoofing
- Duplicate claims
- False inactivity reporting

Example validation rule:

If a worker claims disruption during heavy rain but delivery activity is recorded in the same period, the claim will be flagged for review.

---

# Technology Stack

Frontend

- React
- Tailwind CSS

Backend

- Node.js
- Express.js

Database

- MongoDB

Machine Learning

- Python
- Scikit-learn

External Integrations

- Weather API (OpenWeatherMap)
- Traffic Data API
- Pollution Data API

Payment Simulation (future phases)

- Razorpay Sandbox
- Stripe Test Mode

---

# Platform Architecture

User Mobile/Web App  
↓  
Frontend (React + Tailwind)  
↓  
Backend API (Node.js + Express)  
↓  
Database (MongoDB)

External Services:

- Weather API
- Traffic API
- Air Quality API
- Payment Gateway

---

# Prototype Screens (Seed Phase)

For Phase 1, the prototype includes the following basic interfaces:

1. Landing Page – Overview of the platform
2. Worker Registration – Sign up for gig workers
3. Weekly Plan Selection – Choose insurance plan
4. Worker Dashboard – View active coverage and claims

These screens demonstrate the overall system workflow.

---

# Development Roadmap

## Phase 1 – Seed (Ideation & Foundation)

- Define problem and solution
- Select delivery worker persona
- Design insurance model
- Create prototype UI
- Document AI integration strategy

Deliverables:

- Idea documentation
- GitHub repository
- Prototype UI
- Architecture overview

---

## Phase 2 – Scale (Automation & Protection)

Planned features:

- Worker registration system
- Insurance policy management
- Dynamic premium calculation
- Parametric trigger monitoring
- Automated claims system

---

## Phase 3 – Soar (Optimization & Intelligence)

Advanced features:

- AI-based fraud detection
- Instant payout simulation
- Predictive disruption analytics
- Worker and insurer dashboards

---

# Expected Impact

For Gig Workers

- Protection from sudden income loss
- Affordable weekly micro-insurance
- Automated claims with no paperwork

For Insurance Providers

- Reduced claim fraud
- Predictive risk management
- Scalable gig economy insurance model

---

# Repository Structure
