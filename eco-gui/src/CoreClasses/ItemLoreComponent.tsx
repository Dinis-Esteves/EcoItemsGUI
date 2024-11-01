import React from "react";
import Manager from "./Manager";

class ItemLoreComponent extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      inputs: [""],
    };
  }

  addInput = () => {
    this.setState((prevState) => ({
      inputs: [...prevState.inputs, ""],
    }));
  };

  removeInput = (index: number) => {
    this.setState((prevState) => ({
      inputs: prevState.inputs.filter((_, i) => i !== index),
    }));
  };

  moveUp = (index: number) => {
    if (index === 0) return;
    this.setState((prevState) => {
      const newInputs = [...prevState.inputs];
      [newInputs[index - 1], newInputs[index]] = [
        newInputs[index],
        newInputs[index - 1],
      ];
      return { inputs: newInputs };
    });
  };

  moveDown = (index: number) => {
    if (index === this.state.inputs.length - 1) return;
    this.setState((prevState) => {
      const newInputs = [...prevState.inputs];
      [newInputs[index], newInputs[index + 1]] = [
        newInputs[index + 1],
        newInputs[index],
      ];
      return { inputs: newInputs };
    });
  };

  handleChange = (index: number, value: string) => {
    this.setState((prevState) => {
      const newInputs = [...prevState.inputs];
      newInputs[index] = value;
      return { inputs: newInputs };
    });
  };

  // Expose the inputs state through a ref
  getLore = () => {
    return this.state.inputs;
  };

  render() {
    return (
      <div className="lore">
        {this.state.inputs.map((input, index: number) => (
          <div key={index}>
            <input
              type="text"
              value={input}
              className="loreBox"
              placeholder={`Item Lore Line ${index}`}
              onChange={(e) => this.handleChange(index, e.target.value)}
            />
            <button onClick={() => this.moveUp(index)} className="loreButtons">
              ↑
            </button>
            <button
              onClick={() => this.moveDown(index)}
              className="loreButtons"
            >
              ↓
            </button>
            <button
              onClick={() => this.removeInput(index)}
              className="loreButtons"
            >
              Remove
            </button>
          </div>
        ))}
        <button onClick={this.addInput} className="loreButtons">
          Add +1
        </button>
      </div>
    );
  }
}

export default ItemLoreComponent;
