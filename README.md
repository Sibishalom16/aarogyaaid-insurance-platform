
# AarogyaAid – AI Powered Insurance Recommendation Platform

AarogyaAid is an intelligent health insurance recommendation platform that helps users choose the most suitable insurance policy based on their age, lifestyle, health conditions, income, and city tier.

It simplifies a confusing decision using AI-powered recommendations, transparent reasoning, and plan comparison.

---

# Features

## User Portal

- 6-field profile form
- Personalized insurance recommendation
- Suitability score
- Policy comparison table
- Coverage details
- AI-generated explanation

## Admin Panel

- Secure login
- Upload policy files (PDF / JSON / TXT)
- View uploaded policies
- Edit metadata
- Delete policies

## AI Features

- Personalized reasoning
- Insurance term explainer
- Chat assistant
- Future-ready RAG architecture

---

# Tech Stack

## Frontend

- React.js
- Vite
- CSS

## Backend

- FastAPI
- Python

## AI Integration

- Groq API
- Gemini fallback ready

## Environment Management

- python-dotenv

---

# Why React?

React provides reusable components, fast UI updates, and smooth state management for dynamic recommendation screens.

# Why FastAPI?

FastAPI offers high performance, clean API structure, automatic validation, and quick backend development.

# Why Groq?

Groq provides fast inference speed and free-tier access suitable for rapid AI recommendation generation.

---

# Recommendation Logic

The engine uses 6 user inputs:

1. Full Name  
2. Age  
3. Lifestyle  
4. Pre-existing Conditions  
5. Income Band  
6. City Tier  

It evaluates:

- Health risk
- Affordability
- Lifestyle fit
- Hospital network suitability
- Premium sensitivity

Then returns best-fit policy with reasoning.

---

# Project Structure

```bash
aarogyaaid-insurance-platform/
│── frontend/
│── backend/
│── README.md
│── PRD.md
│── .env.example

```
# Installation Guide

## Frontend Setup

cd frontend  
npm install  
npm run dev

Runs on:

http://localhost:5173

----------

## Backend Setup

cd backend  
source venv/Scripts/activate  
uvicorn main:app --reload

Runs on:

http://127.0.0.1:8000

----------

# Environment Variables

Create `.env` file inside backend folder:

GROQ_API_KEY=your_api_key_here

----------

# API Endpoint

## POST `/recommend`

Returns:

-   Best policy
-   Comparison table
-   Coverage details
-   AI-generated reason

----------

# Future Improvements

-   Real RAG using uploaded PDFs
-   Chroma vector database
-   Policy clause citation
-   Family floater recommendation
-   Voice assistant
-   Regional language support

----------

# Screenshots

-   User recommendation dashboard
-   AI explanation panel
-   Comparison table
-   Admin panel

----------

# Author

Developed by **Sibiraj**