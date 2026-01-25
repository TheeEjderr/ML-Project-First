from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import joblib
import pandas as pd


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)


model = joblib.load("model.joblib")


class SleepInput(BaseModel):
    age: float
    sleep: float
    activity: float
    male: int 


@app.get("/")
def root():
    return {"status": "API is running"}


@app.post("/predict")
def predict(data: SleepInput):
    X = pd.DataFrame([{
        "Age": data.age,
        "Gender_Male": data.male,
        "Physical Activity Level": data.activity,
        "Sleep Duration": data.sleep
    }])

    prediction = model.predict(X)

    return {
        "prediction_1": float(prediction[0][0]),
        "prediction_2": float(prediction[0][1])
    }
