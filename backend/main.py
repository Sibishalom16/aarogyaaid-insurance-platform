from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from groq import Groq
import os
import random
from datetime import datetime

# RAG
from rag_engine import add_document, search_documents, delete_document

load_dotenv()

# -----------------------------------
# Setup
# -----------------------------------

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
# -----------------------------------
# Models
# -----------------------------------

class UserProfile(BaseModel):
    fullName: str
    age: str
    lifestyle: str
    conditions: str
    income: str
    city: str


class ChatRequest(BaseModel):
    question: str


class UpdateRequest(BaseModel):
    policy: str
    insurer: str


# -----------------------------------
# Admin Data
# -----------------------------------

admin_files = [
    {
        "id": 1,
        "fileName": "CareSupreme.pdf",
        "type": "PDF",
        "date": "24 Apr 2026",
        "policy": "Care Supreme",
        "insurer": "Care Health",
    },
    {
        "id": 2,
        "fileName": "StarHealth.json",
        "type": "JSON",
        "date": "24 Apr 2026",
        "policy": "Star Health Gold",
        "insurer": "Star Health",
    },
    {
        "id": 3,
        "fileName": "NivaBupa.txt",
        "type": "TXT",
        "date": "24 Apr 2026",
        "policy": "Niva Bupa Secure",
        "insurer": "Niva Bupa",
    },
]

# -----------------------------------
# Policy Database
# -----------------------------------

policies = [
    {
        "name": "Care Supreme",
        "insurer": "Care Health",
        "premium": "₹12,000",
        "cover": "₹10 Lakhs",
        "waiting": "1 Year",
        "benefit": "No claim bonus + fast cashless network",
        "sub_limits": "No room rent cap",
        "base_score": 90,
    },
    {
        "name": "Niva Bupa Secure Plus",
        "insurer": "Niva Bupa",
        "premium": "₹15,000",
        "cover": "₹15 Lakhs",
        "waiting": "1 Year",
        "benefit": "High sum insured + restore benefit",
        "sub_limits": "ICU capped as per policy",
        "base_score": 88,
    },
    {
        "name": "Star Health Smart Basic",
        "insurer": "Star Health",
        "premium": "₹9,000",
        "cover": "₹7 Lakhs",
        "waiting": "2 Years",
        "benefit": "Affordable premium for budget buyers",
        "sub_limits": "Room rent ₹5k/day",
        "base_score": 84,
    },
    {
        "name": "Star Health Premium Plan",
        "insurer": "Star Health",
        "premium": "₹13,500",
        "cover": "₹12 Lakhs",
        "waiting": "1 Year",
        "benefit": "Balanced premium with wide coverage",
        "sub_limits": "No major sub-limits",
        "base_score": 87,
    },
]

# -----------------------------------
# Admin APIs
# -----------------------------------

@app.get("/admin/files")
def get_admin_files():
    return {"files": admin_files}


@app.post("/admin/upload")
async def upload_file(
    file: UploadFile = File(...),
    policy_name: str = Form(""),
    insurer: str = Form("")
):
    global admin_files

    new_id = max([x["id"] for x in admin_files], default=0) + 1
    ext = file.filename.split(".")[-1].upper()

    os.makedirs("uploads", exist_ok=True)

    file_path = f"uploads/{file.filename}"

    content = await file.read()

    with open(file_path, "wb") as f:
        f.write(content)

    new_file = {
        "id": new_id,
        "fileName": file.filename,
        "type": ext,
        "date": datetime.now().strftime("%d %b %Y"),
        "policy": policy_name if policy_name else "New Policy",
        "insurer": insurer if insurer else "Unknown Insurer",
    }

    admin_files.append(new_file)

    # Add to Vector DB
    add_document(
        file_id=new_id,
        file_name=file.filename,
        file_path=file_path,
        policy_name=new_file["policy"],
        insurer=new_file["insurer"]
    )

    return {
        "success": True,
        "message": "Uploaded successfully",
        "file": new_file,
    }


@app.put("/admin/update/{file_id}")
def update_file(file_id: int, data: UpdateRequest):

    for item in admin_files:
        if item["id"] == file_id:
            item["policy"] = data.policy
            item["insurer"] = data.insurer

            return {
                "success": True,
                "message": "Updated successfully",
                "file": item,
            }

    return {"success": False, "message": "File not found"}


@app.delete("/admin/delete/{file_id}")
def delete_file(file_id: int):
    global admin_files

    admin_files = [
        item for item in admin_files
        if item["id"] != file_id
    ]

    # Remove from vector DB
    delete_document(file_id)

    return {
        "success": True,
        "message": "Deleted successfully",
    }

# -----------------------------------
# Recommendation API
# -----------------------------------

@app.post("/recommend")
def recommend(user: UserProfile):

    try:
        age = int(user.age)
    except:
        age = 25

    condition = user.conditions.lower()
    lifestyle = user.lifestyle.lower()
    income = user.income.lower()
    city = user.city.lower()

    ranked = []

    for policy in policies:
        score = policy["base_score"]

        if "diabetes" in condition and "Care" in policy["name"]:
            score += 10

        if "bp" in condition and "Niva" in policy["name"]:
            score += 8

        if "heart" in condition and "Premium" in policy["name"]:
            score += 8

        if age >= 45 and "Niva" in policy["name"]:
            score += 8

        elif age <= 30 and "Basic" in policy["name"]:
            score += 6

        if "under 3l" in income and "Basic" in policy["name"]:
            score += 10

        elif "15l+" in income and "Premium" in policy["name"]:
            score += 8

        if lifestyle == "active" and "Care" in policy["name"]:
            score += 4

        if city == "metro" and "Premium" in policy["name"]:
            score += 3

        score += random.randint(0, 2)

        score = min(score, 100)

        ranked.append({
            "name": policy["name"],
            "insurer": policy["insurer"],
            "premium": policy["premium"],
            "cover": policy["cover"],
            "waiting": policy["waiting"],
            "benefit": policy["benefit"],
            "sub_limits": policy["sub_limits"],
            "score": score,
        })

    ranked = sorted(
        ranked,
        key=lambda x: x["score"],
        reverse=True
    )

    best_policy = ranked[0]
    comparison = ranked[:3]

    # -------------------------------
    # RAG Search
    # -------------------------------

    rag_results = search_documents(
        f"{user.conditions} {user.age} {user.income}",
        top_k=3
    )

    rag_text = "\n".join(
        [x["text"] for x in rag_results]
    )

    # -------------------------------
    # AI Explanation
    # -------------------------------

    try:
        prompt = f"""
Write a warm and professional health insurance recommendation in 150 to 220 words.

User Profile:
Name: {user.fullName}
Age: {user.age}
Lifestyle: {user.lifestyle}
Medical Condition: {user.conditions}
Income: {user.income}
City: {user.city}

Recommended Policy: {best_policy["name"]}

Relevant policy document info:
{rag_text}

Must clearly explain why this plan suits the user.
Mention at least 3 profile factors.
Use simple human language.
"""

        chat = client.chat.completions.create(
            messages=[{
                "role": "user",
                "content": prompt
            }],
            model="llama-3.1-8b-instant"
        )

        ai_reason = chat.choices[0].message.content

    except:
        ai_reason = f"""
Based on your age of {user.age}, lifestyle of {user.lifestyle},
and medical condition ({user.conditions}), {best_policy["name"]}
offers a practical balance of affordability and protection.
Your income level of {user.income} makes the premium manageable,
while the coverage helps reduce hospital expenses.
Since you are located in a {user.city} area, access to network
hospitals and cashless claims can be useful during emergencies.
Overall, this policy matches your needs well.
"""

    return {
        "best_policy": best_policy,
        "comparison": comparison,

        "coverage": {
            "inclusions":
                "Hospitalization, ICU, Daycare, Pre/Post treatment",
            "exclusions":
                "Cosmetic surgery, Self injury, Dental cosmetic",
            "sub_limits":
                best_policy["sub_limits"],
            "copay":
                "10%",
            "claim":
                "Cashless + Reimbursement",
        },

        "reason": ai_reason,
        "rag_used": True
    }

# -----------------------------------
# Chat API
# -----------------------------------

@app.post("/chat")
def chat(data: ChatRequest):

    q = data.question.lower()

    try:
        prompt = f"""
User asked insurance question:

{q}

Reply in short, simple and friendly words.
"""

        chat = client.chat.completions.create(
            messages=[{
                "role": "user",
                "content": prompt
            }],
            model="llama-3.1-8b-instant"
        )

        answer = chat.choices[0].message.content

    except:

        if "waiting" in q:
            answer = "Waiting period means some claims start only after a fixed time."

        elif "copay" in q:
            answer = "Co-pay means you pay a small part of the bill."

        elif "premium" in q:
            answer = "Premium is the yearly amount paid to keep policy active."

        elif "claim" in q:
            answer = "Claim means asking insurer to pay eligible medical expenses."

        else:
            answer = "This policy gives financial support during medical emergencies."

    return {"answer": answer}