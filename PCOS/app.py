from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


with open('PCOS.pkl', 'rb') as file:
    data = pickle.load(file)

model = data["model"]


le_Age = data.get("le_Age")
le_Weight_kg = data.get("le_Weight_kg")
le_Hormonal_Imbalance = data.get("le_Hormonal_Imbalance")
le_Hyperandrogenism = data.get("le_Hyperandrogenism")
le_Hirsutism = data.get("le_Hirsutism")
le_Conception_Difficulty = data.get("le_Conception_Difficulty")
le_Insulin_Resistance = data.get("le_Insulin_Resistance")
le_Exercise_Frequency = data.get("le_Exercise_Frequency")
le_Exercise_Type = data.get("le_Exercise_Type")
le_Exercise_Duration = data.get("le_Exercise_Duration")
le_Sleep_Hours = data.get("le_Sleep_Hours")
le_Exercise_Benefit = data.get("le_Exercise_Benefit")
le_PCOS = data.get("le_PCOS")  # For decoding predictions

@app.route('/predict', methods=['POST'])
def predict():
    input_data = request.json

    try:

        features = [
            le_Age.transform([input_data["age"]])[0],
            le_Weight_kg.transform([input_data["weight_kg"]])[0],
            le_Hormonal_Imbalance.transform([input_data["hormonal_imbalance"]])[0],
            le_Hyperandrogenism.transform([input_data["hyperandrogenism"]])[0],
            le_Hirsutism.transform([input_data["hirsutism"]])[0],
            le_Conception_Difficulty.transform([input_data["conception_difficulty"]])[0],
            le_Insulin_Resistance.transform([input_data["insulin_resistance"]])[0],
            le_Exercise_Frequency.transform([input_data["exercise_frequency"]])[0],
            le_Exercise_Type.transform([input_data["exercise_type"]])[0],
            le_Exercise_Duration.transform([input_data["exercise_duration"]])[0],
            le_Sleep_Hours.transform([input_data["sleep_hours"]])[0],
            le_Exercise_Benefit.transform([input_data["exercise_benefit"]])[0],
        ]


        features = np.array(features).reshape(1, -1)


        pcos_prediction = model.predict(features)[0]  # ✅ Extract prediction


        pcos_result = le_PCOS.inverse_transform([pcos_prediction])[0] if le_PCOS else int(pcos_prediction)


        return jsonify({"PCOS": pcos_result})

    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    app.run(debug=True)
