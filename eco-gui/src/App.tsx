import { useState } from "react";
import Manager from "./CoreClasses/Manager";
import "./App.css";
import ConditionDropDownMenu from "./CoreClasses/ConditionDropDownMenu";
import FilterDropDownMenu from "./CoreClasses/FilterDropDownMenu";
import MutatorDropDownMenu from "./CoreClasses/MutatorDropDownMenu";
import EffectDropDownMenu from "./CoreClasses/EffectDropDownMenu";

function App() {
  const [components, setComponents] = useState(Manager.getComponents());

  const handleAddComponent = (component) => {
    Manager.addComponent(component);
    setComponents([...Manager.getComponents()]); // Update state to trigger re-render
  };

  const handleGenerateYAML = () => {
    Manager.generateYAMLFile();
  };

  return (
    <div>
      {components.map((component, index) => (
        <div key={index}>{component}</div> // Render each component with a unique key
      ))}
      <div>
        <button
          onClick={() => handleAddComponent(<EffectDropDownMenu />)}
          className="addButton"
        >
          Add Effect
        </button>
        <button
          onClick={() => handleAddComponent(<MutatorDropDownMenu />)}
          className="addButton"
        >
          Add Mutator
        </button>
        <button
          onClick={() => handleAddComponent(<FilterDropDownMenu />)}
          className="addButton"
        >
          Add Filter
        </button>
        <button
          onClick={() => handleAddComponent(<ConditionDropDownMenu />)}
          className="addButton"
        >
          Add Condition
        </button>
      </div>
      <div>
        <button onClick={handleGenerateYAML} className="generate-button">Generate YML File</button>
      </div>
    </div>
  );
}

export default App;
