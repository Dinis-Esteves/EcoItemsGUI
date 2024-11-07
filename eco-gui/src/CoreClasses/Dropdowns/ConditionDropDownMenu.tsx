import React from "react";
import AbstractDropDownMenu from "./AbstractDropDownMenu";
import Toolbox from "../Toolbox";
import Arg from "../Arg";

import effectsArgs from "../../assets/conditions-args.json";
import AddButton from "../AddButton";

class ConditionDropDownMenu extends AbstractDropDownMenu {
  constructor(props: any) {
    const onChange = (option: any) => {
      console.log(option);
    };

    super(
      new Map(),
      "Select the condition",
      "item-dropdown-menu",
      onChange,
      props
    );

    this.state = {
      optionsMap: new Map(),
      Args: [], // Initialize state to hold Arg components
      argRefs: [], // Store refs for Arg components
      hasConditionArgs: false,
    };
  }

  componentDidMount() {
    Toolbox.csvToMap("conditions.csv", (map) => {
      this.setState({ optionsMap: map });
      this.optionsMap = map;
    });
  }

  addComponentToArgs = (ComponentType) => {
    const newComponentRef = React.createRef(); // Create a new ref for the new component

    // Create an instance of the component and pass the ref to it
    const newComponent = (
      <ComponentType key={this.state.Args.length} ref={newComponentRef} />
    );

    this.setState((prevState) => ({
      Args: [...prevState.Args, newComponent],
      argRefs: [...prevState.argRefs, newComponentRef],
    }));
  };

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
        case "condition":
          this.state.hasConditionArgs = true;
          return <ConditionDropDownMenu key={index} ref={ref} />;
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
    ident += 1;

    const conditionId = this.getValue();
    let conditionsYAML: string[] = [];
    let miscellaneousYAML: string[] = [];

    // Process each argument reference to generate YAML
    this.state.argRefs.forEach((ref) => {
      if (ref.current) {
        const yamlString = ref.current.toYML(ident);
        if (yamlString.trim() !== "") {
          if (ref.current instanceof ConditionDropDownMenu) {
            conditionsYAML.push(`${"\t".repeat(ident + 1)}${yamlString}`);
          } else {
            miscellaneousYAML.push(`${"\t".repeat(ident)}${yamlString}`);
          }
        }
      }
    });

    // Construct the main YAML structure
    return [
      `\n${"\t".repeat(ident - 1)}- args:`,
      conditionsYAML.length
        ? `${"\t".repeat(ident)}conditions:\n${conditionsYAML.join("\n")}`
        : "",
      miscellaneousYAML.join("\n"),
      `${"\t".repeat(ident - 1)}- id: ${conditionId}`,
    ]
      .filter(Boolean)
      .join("\n");
  }

  render(): JSX.Element {
    return (
      <div className="effect-div">
        {super.render()}

        {/* Render all Arg components stored in state */}
        <div className="args-container">{this.state.Args}</div>

        {/* Render AddButton only if the effect has arguments */}
        {this.state.hasConditionArgs && (
          <AddButton
            component={<ConditionDropDownMenu />}
            onClick={() => this.addComponentToArgs(ConditionDropDownMenu)} // Pass desired component type to add
          />
        )}
      </div>
    );
  }
}

export default ConditionDropDownMenu;
