from joblib import load
import json


input_data = []
model = load('model.joblib')



with open("input.json") as f:
    input_data = json.load(f)
    print(input_data)

age_ = input_data["age"]
print(age_)
sleep_ = input_data["sleep"]
activity_ = input_data["activity"]
male_ = input_data["male"]

age_ = int(age_)
sleep_ = int(sleep_)
activity_ = int(activity_)

answer = model.predict([[age_,sleep_,activity_,male_]])

data = {
    "Stress":answer[0,0],
    "Sleep":answer[0,1]
}

json_str = json.dumps(data, indent=2)

with open("output.json", "w") as f:
    f.write(json_str)

print("\n" , answer)