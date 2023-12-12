import { useState } from "react";
import Result from "./Result";

const BmiForm = () => {
  const [formIsValid, setIsFormValid] = useState(true);
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("");
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("");
  const [result, setResult] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    if(!weight || !weightUnit || !height || !heightUnit) {
      setIsFormValid(false);
      return;
    }

    if (isNaN(weight) || isNaN(height)) {
      setIsFormValid(false);
      return;
    }

    setIsFormValid(true);
    calculateBMI()
   
  };

  const calculateBMI = () => {
    setResult(703 * (weight / (height * height)));
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>Weight:</label>
        <input
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Enter Weight.."
          type="text"
        />
        <label>Unit:</label>
        <select onChange={(e) => setWeightUnit(e.target.value)}>
          <option disabled selected>
            -- Select a Unit --
          </option>
          <option value="lbs">Pounds - (lbs)</option>
          <option value="kg">Kilograms - (kg)</option>
        </select>
        <label>Height:</label>
        <input
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Enter Height.."
          type="text"
        />
        <label>Unit:</label>
        <select onChange={(e) => setHeightUnit(e.target.value)}>
          <option disabled selected>
            -- Select a Unit --
          </option>
          <option value="in">Inches - (in)</option>
          <option value="m">Meters - (m)</option>
        </select>
        <button>Calculate BMI</button>
      </form>
      {
        !formIsValid && (
          <p>Please Enter Valid Data In All Fields</p>
        )
      }
      {
        result && <Result BMIResult={result} />
      }
      
    </div>
  );
};

export default BmiForm;
