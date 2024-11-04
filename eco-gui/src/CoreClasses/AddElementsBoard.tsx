import React from "react";
import Manager from "./Manager";
import EffectDropDownMenu from "./EffectDropDownMenu";
import MutatorDropDownMenu from "./MutatorDropDownMenu";
import FilterDropDownMenu from "./FilterDropDownMenu";
import ConditionDropDownMenu from "./ConditionDropDownMenu";

class AddElementsBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      components: [], // Store added components here
    };
  }

  handleAddComponent = (component) => {
    Manager.addComponent(component); // Add to Manager
    this.setState((prevState) => ({
      components: [...prevState.components, component], // Update local state to re-render
    }));
  };

  render() {
    return (
      <div>
        <button
          className="addButton"
          onClick={() => this.handleAddComponent(<EffectDropDownMenu />)}
        >
          Add Effect
        </button>
        <button
          className="addButton"
          onClick={() => this.handleAddComponent(<MutatorDropDownMenu />)}
        >
          Add Mutator
        </button>
        <button
          className="addButton"
          onClick={() => this.handleAddComponent(<FilterDropDownMenu />)}
        >
          Add Filter
        </button>
        <button
          className="addButton"
          onClick={() => this.handleAddComponent(<ConditionDropDownMenu />)}
        >
          Add Condition
        </button>

        {/* Render added components */}
        <div>
          {this.state.components.map((Component, index) => (
            <div key={index}>{Component}</div>
          ))}
        </div>
      </div>
    );
  }
  toYML(): string {
    return "";
  }
}

export default AddElementsBoard;
