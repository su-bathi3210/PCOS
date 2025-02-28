import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'

const PCOS = () => {
    const [formData, setFormData] = useState({
        age: '',
        weight_kg: '',
        hormonal_imbalance: '',
        hyperandrogenism: '',
        hirsutism: '',
        conception_difficulty: '',
        insulin_resistance: '',
        exercise_frequency: '',
        exercise_type: '',
        exercise_duration: '',
        sleep_hours: '',
        exercise_benefit: '',
    });

    const [pcosResult, setPcosResult] = useState(null);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:5000/predict', formData);
            setPcosResult(response.data.PCOS);
            setError('');
        } catch (err) {
            setError('Error: ' + err.response?.data?.error || 'Something went wrong');
            setPcosResult(null);
        }
    };

    return (
        <div className="container">
            <h1>PCOS Prediction</h1>
            <p>A PCOS Prediction AI leverages machine learning algorithms to analyze medical data,
                identify patterns associated with Polycystic Ovary Syndrome (PCOS), and predict the likelihood
                of the condition. By processing input parameters, the AI provides a result of <span>Yes or  No</span>, aiding
                in early detection and personalized treatment plans. This technology enhances healthcare accessibility,
                enabling faster diagnosis and proactive symptom management while supporting healthcare professionals in
                providing timely interventions.</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ENTER YOU AGE  </label>
                    <input
                        type="text"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>WEIGHT (KG) </label>
                    <input
                        type="text"
                        name="weight_kg"
                        value={formData.weight_kg}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>HORMONAL IMBALANCE</label>
                    <input
                        type="text"
                        name="hormonal_imbalance"
                        value={formData.hormonal_imbalance}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>HYPERANDROGENISM</label>
                    <input
                        type="text"
                        name="hyperandrogenism"
                        value={formData.hyperandrogenism}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>HIRSUTISM </label>
                    <input
                        type="text"
                        name="hirsutism"
                        value={formData.hirsutism}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>CONCEPTION DIFFICULTY</label>
                    <input
                        type="text"
                        name="conception_difficulty"
                        value={formData.conception_difficulty}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>INSULIN RESISTANCE</label>
                    <input
                        type="text"
                        name="insulin_resistance"
                        value={formData.insulin_resistance}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>EXERCISE FREQUENCY</label>
                    <input
                        type="text"
                        name="exercise_frequency"
                        value={formData.exercise_frequency}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>EXERCISE TYPE </label>
                    <input
                        type="text"
                        name="exercise_type"
                        value={formData.exercise_type}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>EXERCISE DURATION </label>
                    <input
                        type="text"
                        name="exercise_duration"
                        value={formData.exercise_duration}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>SLEEP HOURS</label>
                    <input
                        type="text"
                        name="sleep_hours"
                        value={formData.sleep_hours}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>EXERCISE BENEFIT </label>
                    <input
                        type="text"
                        name="exercise_benefit"
                        value={formData.exercise_benefit}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Predict PCOS</button>
            </form>

            {pcosResult && (
                <div>
                    <h2>PCOS Prediction Result: <span className="pcos"> {pcosResult} </span> </h2>
                </div>
            )}

            {error && <div style={{ color: '#60000' }}>{error}</div>}
        </div>
    );
};

export default PCOS;
