import React from "react";
import AbstractDropDownMenu from "./AbstractDropDownMenu";
import Toolbox from "../Toolbox";
import Arg from "../Arg";

import effectsArgs from "../../assets/filters-args.json";

class FilterDropDownMenu extends AbstractDropDownMenu {
  constructor(props: any) {
    const onChange = (option: any) => {
      console.log(option);
    };

    super(
      new Map(),
      "Select the filter",
      "item-dropdown-menu",
      onChange,
      props
    );

    this.state = {
      optionsMap: new Map(),
      Args: [], // Initialize state to hold Arg components
      argRefs: [], // Store refs for Arg components
    };
  }

  componentDidMount() {
    Toolbox.csvToMap("filters.csv", (map) => {
      this.setState({ optionsMap: map });
      this.optionsMap = map;
    });
  }

  // Function to generate Arg components from JSON data
  generateArgsComponents(effectName: string) {
    const args = effectsArgs[effectName]; // Get the args based on the effect name
    if (!args) return []; // Return an empty array if no args found

    const newArgRefs = []; // Array to hold refs for the newly created Arg components

    const argComponents = Object.entries(args).map(([key, type], index) => {
      // Generate Arg components based on type
      const ref = React.createRef<Arg>(); // Create a ref for each Arg component
      newArgRefs.push(ref); // Store the ref

      switch (type) {
        case "int":
          return <Arg key={index} ref={ref} type="number" label={key} />;
        case "str":
          return <Arg key={index} ref={ref} type="text" label={key} />;
        case "float":
          return (
            <Arg key={index} ref={ref} type="number" label={key} step="0.1" />
          );
        case "boolean":
          return <Arg key={index} ref={ref} type="checkbox" label={key} />;
        default:
          return null; // Handle unknown types
      }
    });

    this.setState({ argRefs: newArgRefs }); // Update state with new refs
    return argComponents; // Return the generated Arg components
  }

  // Define the onChange method to update Args
  onChange = (option: any) => {
    super.setValue(option.value);

    // Clear previous Args and generate new Args from JSON
    const newArgs = this.generateArgsComponents(option.value);
    this.setState({ Args: newArgs });
  };

  toYML(ident: number = 0): string {
    ident += 1; // Increment ident for indentation
    const effectValue = this.getValue(); // Get the effect value
    const argsYML = this.state.argRefs
      .map((ref) =>
        ref.current ? `${"\t".repeat(ident)}${ref.current.toYML(ident)}` : null
      ) // Prefix each Arg YML with tabs
      .filter(Boolean) // Filter out null values
      .join("\n"); // Join all Arg YML strings with newlines

    // Format the output string with tabs
    return `\n${"\t".repeat(ident - 1)}- args:\n${argsYML}\n${"\t".repeat(
      ident - 1
    )}- id: ${effectValue}`; // Use \t for indentation
  }

  render(): JSX.Element {
    return (
      <div className="effect-div">
        {super.render()}

        {/* Render all Arg components stored in state */}
        <div className="args-container">{this.state.Args}</div>
      </div>
    );
  }
}

export default FilterDropDownMenu;
