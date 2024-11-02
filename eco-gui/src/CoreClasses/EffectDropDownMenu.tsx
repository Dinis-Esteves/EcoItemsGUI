import React from "react";
import AbstractDropDownMenu from "./AbstractDropDownMenu";
import Toolbox from "./Toolbox";
import Arg from "./Arg";

// Assume effects-args.json is imported or fetched here
import effectsArgs from '../../public/effects-args.json';
import ShapeDropDownMenu from "./ShapeDropDownMenu";

class EffectDropDownMenu extends AbstractDropDownMenu {
  constructor(props: any) {

    const onChange = (option: any) => {
      console.log(option);
    };

    super(
      new Map(),
      "Select the effect",
      "item-dropdown-menu",
      onChange,
      props
    );

    this.state = {
      optionsMap: new Map(),
      Args: [], // Initialize state to hold Arg components
    };
  }

  componentDidMount() {
    Toolbox.csvToMap("effects.csv", (map) => {
      this.setState({ optionsMap: map });
      this.optionsMap = map;
    });
  }

  // Function to generate Arg components from JSON data
  generateArgsComponents(effectName: string) {
    const args = effectsArgs[effectName]; // Get the args based on the effect name
    if (!args) return []; // Return an empty array if no args found

    return Object.entries(args).map(([key, type], index) => {
      // Generate Arg components based on type
      switch (type) {
        case "int":
          return <Arg key={index} type="number" label={key} />;
        case "str":
          return <Arg key={index} type="text" label={key} />;
        case "float":
          return <Arg key={index} type="number" label={key} step="0.1" />;
        case "boolean":
          return <Arg key={index} type="checkbox" label={key} />;
        case "effect":
          return <EffectDropDownMenu/>;
        case "shape":
          return <ShapeDropDownMenu/>;
        default:
          return null; // Handle unknown types
      }
    });
  }

  // Define the onChange method to update Args
  onChange = (option: any) => {
    super.setValue(option.value);
    
    // Clear previous Args and generate new Args from JSON
    const newArgs = this.generateArgsComponents(option.value);
    this.setState({ Args: newArgs });
  };

  render(): JSX.Element {
    return (
      <div>
        {super.render()}

        {/* Render all Arg components stored in state */}
        <div className="args-container">
          {this.state.Args}
        </div>
      </div>
    );
  }
}

export default EffectDropDownMenu;
