from fastapi import FastAPI, Form, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import pandas as pd
import os

app = FastAPI()

# Mount static folder
app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

EXCEL_FILE = "travel_data.xlsx"


@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.post("/submit")
def submit_data(
    name: str = Form(...),
    place: str = Form(...),
    days: int = Form(...)
):
    data = {"Name": name, "Place": place, "Days": days}

    df = pd.DataFrame([data])

    if os.path.exists(EXCEL_FILE):
        existing = pd.read_excel(EXCEL_FILE)
        df = pd.concat([existing, df], ignore_index=True)

    df.to_excel(EXCEL_FILE, index=False)

    return {"message": "Data saved successfully!"}
