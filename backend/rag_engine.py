import os
import json
import chromadb
from pypdf import PdfReader

# -----------------------------------
# Chroma Setup
# -----------------------------------

DB_PATH = "./chroma_db"

client = chromadb.PersistentClient(path=DB_PATH)

collection = client.get_or_create_collection(
    name="insurance_docs"
)

# -----------------------------------
# Lazy Load Embedding Model
# -----------------------------------

model = None


def get_model():
    global model

    if model is None:
        from sentence_transformers import SentenceTransformer

        model = SentenceTransformer(
            "all-MiniLM-L6-v2"
        )

    return model


# -----------------------------------
# Helpers
# -----------------------------------

def chunk_text(text, size=500):
    chunks = []

    text = text.strip()

    for i in range(0, len(text), size):
        part = text[i:i + size].strip()

        if part:
            chunks.append(part)

    return chunks


def read_pdf(file_path):
    text = ""

    try:
        reader = PdfReader(file_path)

        for page in reader.pages:
            page_text = page.extract_text()

            if page_text:
                text += page_text + "\n"

    except:
        pass

    return text


def read_txt(file_path):
    try:
        with open(
            file_path,
            "r",
            encoding="utf-8"
        ) as f:
            return f.read()

    except:
        return ""


def read_json(file_path):
    try:
        with open(
            file_path,
            "r",
            encoding="utf-8"
        ) as f:
            data = json.load(f)

        return json.dumps(
            data,
            indent=2
        )

    except:
        return ""


# -----------------------------------
# Parse File
# -----------------------------------

def parse_file(file_path):

    ext = file_path.split(".")[-1].lower()

    if ext == "pdf":
        return read_pdf(file_path)

    elif ext == "txt":
        return read_txt(file_path)

    elif ext == "json":
        return read_json(file_path)

    return ""


# -----------------------------------
# Add Document to Vector DB
# -----------------------------------

def add_document(
    file_id,
    file_name,
    file_path,
    policy_name="",
    insurer=""
):
    text = parse_file(file_path)

    if not text.strip():
        text = (
            f"{policy_name} by {insurer}. "
            f"Insurance policy file."
        )

    chunks = chunk_text(text)

    if not chunks:
        chunks = [text]

    ids = []
    docs = []
    metas = []

    for idx, chunk in enumerate(chunks):
        ids.append(f"{file_id}_{idx}")
        docs.append(chunk)

        metas.append({
            "file_id": str(file_id),
            "file_name": file_name,
            "policy": policy_name,
            "insurer": insurer
        })

    embeddings = get_model().encode(
        docs
    ).tolist()

    collection.add(
        ids=ids,
        documents=docs,
        embeddings=embeddings,
        metadatas=metas
    )

    return True


# -----------------------------------
# Search Similar Docs
# -----------------------------------

def search_documents(query, top_k=3):

    embedding = get_model().encode(
        [query]
    ).tolist()

    result = collection.query(
        query_embeddings=embedding,
        n_results=top_k
    )

    docs = result.get("documents", [[]])[0]
    metas = result.get("metadatas", [[]])[0]

    output = []

    for i in range(len(docs)):
        output.append({
            "text": docs[i],
            "meta": metas[i]
        })

    return output


# -----------------------------------
# Delete File From Vector DB
# -----------------------------------

def delete_document(file_id):

    result = collection.get()

    ids_to_delete = []

    for i, meta in enumerate(
        result["metadatas"]
    ):
        if meta.get("file_id") == str(file_id):
            ids_to_delete.append(
                result["ids"][i]
            )

    if ids_to_delete:
        collection.delete(
            ids=ids_to_delete
        )

    return True