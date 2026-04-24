
# Product Requirements Document (PRD)

# AarogyaAid – AI Powered Health Insurance Recommendation Platform

---

# 1. Product Overview

AarogyaAid is an AI-powered insurance recommendation platform that helps users choose the most suitable health insurance plan based on their personal profile, health conditions, income level, lifestyle, and city type.

The platform simplifies insurance decision-making through:

- Personalized policy recommendations
- Clear peer comparison tables
- Coverage transparency
- AI-powered explanations
- RAG-based policy intelligence
- Admin knowledge base management

---

# 2. Problem Statement

Choosing health insurance is difficult for many users because:

- Policies are complex and full of jargon
- Hidden waiting periods and exclusions
- Too many plans in the market
- Lack of personalized guidance
- Difficult manual comparison

Users need a smart assistant that explains plans clearly and recommends the best option.

---

# 3. Product Goals

## Primary Goals

- Help users choose the right insurance plan quickly
- Improve understanding of insurance coverage
- Reduce confusion around policy terms
- Enable transparent comparison between plans
- Use AI to personalize decisions

## Secondary Goals

- Build scalable insurance recommendation system
- Enable document-driven recommendations using RAG
- Provide admin dashboard for policy management

---

# 4. Target Users

## End Users

- First-time insurance buyers
- Families comparing plans
- Senior citizens
- Users with medical conditions
- Budget-conscious customers

## Admin Users

- Product team
- Insurance analysts
- Operations team
- Knowledge base managers

---

# 5. Key Features

# 5.1 User Recommendation Module

Users enter:

- Full Name
- Age
- Lifestyle
- Existing Health Conditions
- Income Level
- City Type

System recommends best-fit policy.

---

# 5.2 Peer Comparison Table

Shows recommended plan with 2–3 alternatives.

Columns:

- Policy Name
- Insurer
- Premium (Rs/year)
- Cover Amount
- Waiting Period
- Key Benefit
- Suitability Score

---

# 5.3 Coverage Detail Table

Displays:

- Inclusions
- Exclusions
- Sub-limits
- Co-pay %
- Claim Type

---

# 5.4 Why This Policy

AI generates personalized explanation (150–250 words) based on:

- Age
- Income
- Lifestyle
- Medical condition
- City
- Affordability

---

# 5.5 Insurance Chat Assistant

Users can ask:

- What is waiting period?
- What is co-pay?
- What is premium?
- What is claim settlement?

---

# 5.6 PDF Report Generation

Downloadable report includes:

- Customer profile
- Recommended policy
- Comparison table
- Coverage details
- AI explanation

---

# 5.7 Admin Dashboard

## Features:

- Secure login
- Upload policy files
- View document list
- Edit policy metadata
- Delete files
- Sync with vector DB

---

# 6. AI / Recommendation Engine

## Inputs Considered

- Age
- Health condition
- Income level
- Lifestyle
- City tier

## Logic

Policies ranked using weighted suitability score.

Example:

- Diabetes → stronger diabetic-friendly policies
- Lower income → budget plans
- Metro cities → network hospital plans

---

# 7. RAG Architecture

## Purpose

Use uploaded policy documents as knowledge source instead of relying only on model memory.

## Pipeline

1. Admin uploads PDF / TXT / JSON
2. Documents parsed
3. Text chunked
4. Embeddings created
5. Stored in ChromaDB
6. Relevant chunks retrieved during recommendation
7. AI uses retrieved evidence in output

---

# 8. User Flow

## User Journey

1. Open platform
2. Fill profile form
3. Submit details
4. Receive recommendation
5. Compare policies
6. Review coverage
7. Download report

## Admin Journey

1. Login
2. Upload policy files
3. Edit metadata
4. Delete outdated files
5. Maintain knowledge base

---

# 9. Functional Requirements

## Frontend

- Responsive React UI
- Form validation
- Tables
- PDF download
- Admin dashboard

## Backend

- FastAPI APIs
- Recommendation engine
- Chat endpoint
- File upload APIs
- RAG integration

---

# 10. Non Functional Requirements

- Fast response time
- Scalable APIs
- Secure credentials handling
- Clean UI
- Modular architecture
- Easy deployment

---

# 11. API Endpoints

## User APIs

```text
POST /recommend
POST /chat

```

##  Admin APIs

```text
GET /admin/files  
POST /admin/upload  
PUT /admin/update/{id}  
DELETE /admin/delete/{id}
```

# 12. Tech Stack

## Frontend

-   React.js
-   Axios
-   CSS / Tailwind

## Backend

-   FastAPI
-   Python

## AI

-   Groq API

## RAG

-   SentenceTransformers
-   ChromaDB

----------

# 13. Success Metrics

-   Faster insurance decision making
-   Improved user understanding
-   Accurate personalized recommendations
-   Admin document management efficiency
-   Positive demo evaluation

----------

# 14. Future Scope

-   Live insurer API integration
-   Real premium pricing engine
-   OCR for scanned policy PDFs
-   Multilingual assistant
-   Mobile application
-   Claims prediction engine
-   Payment gateway integration

----------

# 15. Risks & Mitigation

## Risk: Incorrect recommendation

Mitigation:  
Use weighted logic + human-readable comparison.

## Risk: Poor uploaded documents

Mitigation:  
Structured file validation.

## Risk: Security issues

Mitigation:  
Environment variables + auth layer.

----------

# 16. Conclusion

AarogyaAid transforms confusing insurance selection into a transparent, personalized, AI-driven experience using recommendation logic, RAG document intelligence, and modern web technologies