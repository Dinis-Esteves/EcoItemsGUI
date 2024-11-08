import React from "react";
import AbstractDropDownMenu from "./AbstractDropDownMenu";
import Toolbox from "../Toolbox";
import Arg from "../Arg";
import effectsArgs from "../../assets/effects-args.json";
import ShapeDropDownMenu from "./ShapeDropDownMenu";
import AddButton from "../AddButton";
import ConditionDropDownMenu from "./ConditionDropDownMenu";
import MutatorDropDownMenu from "./MutatorDropDownMenu";
import FilterDropDownMenu from "./FilterDropDownMenu";
import TriggerDropDownMenu from "./TriggerDropDownMenu";

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
      argRefs: [], // Store refs for Arg components
      hasEffectArgs: false, // State to track if there are effect-type arguments
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
    const args = effectsArgs[effectName as keyof typeof effectsArgs] || {}; // Returns an empty object if undefined
    if (!args)
      return { argComponents: [], newArgRefs: [], hasEffectArgs: false }; // Return an empty array if no args found

    const newArgRefs: any = []; // Array to hold refs for the newly created Arg components
    let hasEffectArgs = false; // Flag to track if there are effect-type arguments

    const argComponents = Object.entries(args).map(([key, type], index) => {
      const ref = React.createRef<Arg>(); // Create a ref for each Arg component
      newArgRefs.push(ref); // Store the ref

      switch (type) {
        case "int":
          return <Arg key={index} ref={ref} type="number" label={key} />;
        case "str":
          return <Arg key={index} ref={ref} type="text" label={key} />;
        case "float":
          return (
            <Arg key={index} ref={ref} type="number" label={key} />
          );
        case "boolean":
          return <Arg key={index} ref={ref} type="checkbox" label={key} />;
        case "effect":
          hasEffectArgs = true; // Set flag if there's an effect argument
          return <EffectDropDownMenu key={index} />;
        case "shape":
          return <ShapeDropDownMenu key={index} />;
        default:
          return null; // Handle unknown types
      }
    });

    return { argComponents, newArgRefs, hasEffectArgs }; // Return components and updated refs
  }

  addComponentToArgs = (ComponentType: any) => {
    const newComponentRef = React.createRef(); // Create a new ref for the new component

    // Create an instance of the component and pass the ref to it
    const newComponent = (
      <ComponentType key={this.state.Args.length} ref={newComponentRef} />
    );

    this.setState((prevState: any) => ({
      Args: [...prevState.Args, newComponent],
      argRefs: [...prevState.argRefs, newComponentRef],
    }));
  };

  // Define the onChange method to update Args when a new effect is selected
  onChange = (option: any) => {
    super.setValue(option.value);

    const { argComponents, newArgRefs, hasEffectArgs } =
      this.generateArgsComponents(option.value);
    this.setState({ Args: argComponents, argRefs: newArgRefs, hasEffectArgs });
  };

  toYML(ident = 0): string {
    ident += 1;

    const effectId = this.getValue(); // Get the selected effect's ID or name

    // Initialize categorized arrays for different component types
    let effectsYAML = [];
    let conditionsYAML: string[] = [];
    let mutatorsYAML: string[] = [];
    let filtersYAML: string[] = [];
    let miscellaneousYAML: string[] = [];

    // Generate YAML for arguments and categorize components
    const argsYML = this.state.argRefs
      .map((ref: any) => {
        if (ref.current) {
          const yamlString = ref.current.toYML(ident); // Generate YAML for each argument component
          if (yamlString.trim() !== "") {
            if (ref.current instanceof EffectDropDownMenu) {
              effectsYAML.push(`${"\t".repeat(ident)}${yamlString}`);
            } else if (ref.current instanceof ConditionDropDownMenu) {
              conditionsYAML.push(`${"\t".repeat(ident + 2)}${yamlString}`);
            } else if (ref.current instanceof MutatorDropDownMenu) {
              mutatorsYAML.push(`${"\t".repeat(ident)}${yamlString}`);
            } else if (ref.current instanceof FilterDropDownMenu) {
              filtersYAML.push(`${"\t".repeat(ident)}${yamlString}`);
            } else {
              miscellaneousYAML.push(`${"\t".repeat(ident)}${yamlString}`);
            }
          }
        }
        return null;
      })
      .filter(Boolean);

    // Format the main effect's YAML entry
    const mainEffectYML = `${argsYML.join("\n")}`;

    // Add main effect to the beginning of effects YAML
    if (effectsYAML.length > 0) {
      effectsYAML.unshift(mainEffectYML);
    } else {
      effectsYAML = [mainEffectYML]; // Ensure main effect is included if there are no nested effects
    }
    // Helper function to format each section, skipping empty sections
    const formatSection = (header: string, content: string[]) =>
      content.length ? `${header}${content.join("\n")}` : "";

    // Generate the final YAML content, omitting empty sections
    if (this.state.hasEffectArgs) {
      return [
        `\n ${"\t".repeat(ident - 1)}- args:`,
        formatSection("\n\teffects:", effectsYAML),
        formatSection("\n\tconditions:", conditionsYAML),
        '\n',
        formatSection("\tmutators:", mutatorsYAML),
        '\n',
        formatSection("\tfilters:", filtersYAML),
        '\n',
        miscellaneousYAML.join("\n"),
        `${"\t".repeat(ident - 1)}- id: ${effectId}`,
      ]
        .filter(Boolean) // Remove empty sections
        .join("\n"); // Join sections with spacing
    }

    return [
      `\n${"\t".repeat(ident - 1)}- args:`,
      formatSection("", effectsYAML),
      formatSection("conditions:", conditionsYAML),
      formatSection("mutators:", mutatorsYAML),
      formatSection("filters:", filtersYAML),
      miscellaneousYAML.join("\n"),
      `${"\t".repeat(ident - 1)}- id: ${effectId}`,
    ]
      .filter(Boolean) // Remove empty sections
      .join("\n"); // Join sections with spacing
  }

  render(): JSX.Element {
    return (
      <div className="effect-div">
        {super.render()}

        {/* Render all Arg components stored in state */}
        <div className="args-container">
          {this.state.Args}

          {/* Render AddButton only if the effect has arguments */}
          {this.state.hasEffectArgs && (
            <AddButton
              component={<EffectDropDownMenu />}
              onClick={() => this.addComponentToArgs(EffectDropDownMenu)} // Pass desired component type to add
            />
          )}
          {
            <AddButton
              component={<ConditionDropDownMenu />}
              onClick={() => this.addComponentToArgs(ConditionDropDownMenu)} // Pass desired component type to add
            />
          }
          {
            <AddButton
              component={<TriggerDropDownMenu />}
              onClick={() => this.addComponentToArgs(TriggerDropDownMenu)}
            />
          }
          {
            <AddButton
              component={<FilterDropDownMenu />}
              onClick={() => this.addComponentToArgs(FilterDropDownMenu)}
            />
          }
        </div>
      </div>
    );
  }
}

export default EffectDropDownMenu;
