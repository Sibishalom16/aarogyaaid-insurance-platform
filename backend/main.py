from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from groq import Groq
import os

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -------------------------------
# Models
# -------------------------------

class UserProfile(BaseModel):
    fullName: str
    age: str
    lifestyle: str
    conditions: str
    income: str
    city: str


class ChatRequest(BaseModel):
    question: str


# -------------------------------
# Recommendation API
# -------------------------------

@app.post("/recommend")
def recommend(user: UserProfile):

    age = int(user.age)

    if "diabetes" in user.conditions.lower():
        policy_name = "Care Supreme"
        score = 96

    elif age >= 45:
        policy_name = "Niva Bupa Secure Plus"
        score = 94

    elif user.income == "under 3L":
        policy_name = "Star Health Smart Basic"
        score = 91

    else:
        policy_name = "Star Health Premium Plan"
        score = 95

    try:
        prompt = f"""
        User Name: {user.fullName}
        Age: {user.age}
        Lifestyle: {user.lifestyle}
        Conditions: {user.conditions}
        Income: {user.income}
        City: {user.city}

        Recommended Policy: {policy_name}

        Explain in 4 short lines why this policy is best for this user.
        """

        chat = client.chat.completions.create(
            messages=[
                {"role": "user", "content": prompt}
            ],
            model="llama-3.1-8b-instant"
        )

        ai_reason = chat.choices[0].message.content

    except Exception as e:
        print("GROQ ERROR:", e)
        ai_reason = f"{policy_name} is suitable for your profile."

    return {
        "best_policy": {
            "name": policy_name,
            "premium": "₹12,000",
            "cover": "₹10 Lakhs",
            "waiting": "1 Year",
            "score": score
        },

        "comparison": [
            {
                "name": policy_name,
                "premium": "₹12,000",
                "cover": "₹10L",
                "waiting": "1 Year",
                "score": score
            },
            {
                "name": "Care Supreme",
                "premium": "₹13,500",
                "cover": "₹12L",
                "waiting": "2 Years",
                "score": 90
            },
            {
                "name": "Niva Bupa Gold",
                "premium": "₹11,000",
                "cover": "₹8L",
                "waiting": "2 Years",
                "score": 88
            }
        ],

        "coverage": {
            "inclusions": "Hospitalization, ICU, Daycare, Pre/Post treatment",
            "exclusions": "Cosmetic surgery, Self injury",
            "copay": "10%",
            "claim": "Cashless + Reimbursement"
        },

        "reason": ai_reason
    }


# -------------------------------
# Chat Explainer API
# -------------------------------

@app.post("/chat")
def chat(data: ChatRequest):

    q = data.question.lower()

    try:
        prompt = f"""
        User asked insurance doubt:

        {q}

        Reply in simple short human friendly words.
        """

        chat = client.chat.completions.create(
            messages=[
                {"role": "user", "content": prompt}
            ],
            model="llama-3.1-8b-instant"
        )

        answer = chat.choices[0].message.content

    except Exception as e:
        print("CHAT ERROR:", e)

        if "waiting" in q:
            answer = "Waiting period means some diseases can be claimed only after few months or years."
        elif "copay" in q:
            answer = "Co-pay means you pay a small share of bill, insurer pays balance."
        else:
            answer = "This policy gives health protection and cashless treatment support."

    return {"answer": answer}