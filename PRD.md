# Product Requirements Document (PRD)
## AarogyaAid – AI Powered Insurance Recommendation Platform

## 1. Product Overview

AarogyaAid is an AI-powered health insurance recommendation platform designed to help users choose the most suitable insurance policy based on their personal, medical, and financial profile.

Many users struggle to understand insurance plans, waiting periods, exclusions, premiums, and policy jargon. AarogyaAid simplifies this process using AI-driven recommendations with transparent reasoning.

---

## 2. Target Users

### Primary Users:
- First-time insurance buyers
- Working professionals
- Families seeking health coverage
- Senior citizens looking for better plans
- Users with pre-existing medical conditions

---

## 3. User Pain Points

Users commonly face these problems:

- Too many confusing insurance plans
- Difficult insurance terms (co-pay, deductible, waiting period)
- No personalized suggestions
- Hidden exclusions
- Hard to compare plans
- Fear of making wrong financial decision

---

## 4. Solution

AarogyaAid collects 6 profile inputs:

1. Full Name  
2. Age  
3. Lifestyle  
4. Pre-existing Conditions  
5. Income Band  
6. City / Tier

Using this data, AI recommends the best-fit insurance policy with:

- Suitability Score
- Comparison Table
- Coverage Breakdown
- Personalized Explanation
- Chat Explainer Support

---

## 5. Feature Prioritization

### Phase 1 (Built First)

- User profile form
- AI recommendation engine
- Comparison table
- Coverage details
- Personalized reasoning

### Phase 2

- Admin panel
- Policy document upload
- Chat assistant
- Real-time RAG document retrieval

---

## 6. Recommendation Logic

The recommendation engine evaluates:

### Health Risk
- Diabetes
- Cardiac conditions
- Hypertension
- Age factor

### Financial Fit
- Income affordability
- Premium suitability

### Lifestyle Match
- Active users → OPD / wellness coverage
- Sedentary users → preventive care focus

### City Match
- Metro users → broader hospital network
- Tier-2/3 users → regional claim support

Final recommendation is generated using weighted scoring.

---

## 7. Assumptions

- Users provide accurate information
- Sample policy data reflects realistic market plans
- Income bands approximate affordability
- Users prefer explainable recommendations over generic lists

---

## 8. Success Metrics

- Fast recommendations (<3 sec)
- High relevance of suggested policy
- User understanding improved
- Lower confusion in choosing plans

---

## 9. Future Enhancements

- OCR PDF policy ingestion
- Claim prediction scoring
- Multi-language support
- Family floater recommendations
- Voice AI assistant

---

## 10. Final Goal

Help users confidently choose health insurance during one of the most important financial decisions of their life.