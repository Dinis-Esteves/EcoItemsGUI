import { useState, useEffect } from "react";
import Manager from "./CoreClasses/Manager";
import "./App.css";
import ConditionDropDownMenu from "./CoreClasses/Dropdowns/ConditionDropDownMenu";
import FilterDropDownMenu from "./CoreClasses/Dropdowns/FilterDropDownMenu";
import MutatorDropDownMenu from "./CoreClasses/Dropdowns/MutatorDropDownMenu";
import EffectDropDownMenu from "./CoreClasses/Dropdowns/EffectDropDownMenu";
import AddButton from "./CoreClasses/AddButton";

function App() {
  const [components, setComponents] = useState(Manager.getComponents());

  useEffect(() => {
    const updateComponents = () => setComponents([...Manager.getComponents()]);
    window.addEventListener("updateComponents", updateComponents);
    return () =>
      window.removeEventListener("updateComponents", updateComponents);
  }, []);

  const handleGenerateYAML = () => {
    Manager.generateYAMLFile();
  };

  return (
    <div>
      {components.map((component, index) => (
        <div key={index}>{component}</div>
      ))}
      <div>
        <AddButton component={<EffectDropDownMenu />} />
        <AddButton component={<MutatorDropDownMenu />} />
        <AddButton component={<FilterDropDownMenu />} />
        <AddButton component={<ConditionDropDownMenu />} />
      </div>
      <div>
        <button onClick={handleGenerateYAML} className="generate-button">
          Generate YML File
        </button>
      </div>
    </div>
  );
}

export default App;
