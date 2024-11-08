import React from "react";
import AbstractDropDownMenu from "./AbstractDropDownMenu";
import Arg from "../Arg";

class ShapeDropDownMenu extends AbstractDropDownMenu {
  private selectedKey: string = ""; // Store the key of the selected shape

  constructor(props: any) {
    const options = new Map<string, string>([
      ["radius: int, angle: int", "cone"],
      ["radius: int", "circle"],
      ["radius: int, offset: int", "offset_circle"],
      ["radius: int, max_distance: int", "scan_in_front"],
      ["radius: int, distance: int, pierce_blocks: boolean, pierce_entities: boolean", "beam"],
    ]);

    const onChange = (option: any) => {
      super.setValue(option.value);
      this.selectedKey = option.label; // Store the key of the selected option
      const newArgs = this.parseValueToArgs(option.value);
      this.setState({ Args: newArgs });
    };

    super(options, "Select the shape", "item-dropdown-menu", onChange, props);

    this.state = {
      Args: [],
      argRefs: [],
    };
  }

  parseValueToArgs(value: string) {
    const fields = value.split(", ").map((field) => {
      const [label, type] = field.split(": ");
      return { label, type: type === "int" ? "number" : type === "boolean" ? "checkbox" : "text" };
    });

    const newArgRefs: any = [];
    const argComponents = fields.map((field, index) => {
      const ref = React.createRef<Arg>();
      newArgRefs.push(ref);

      return (
        <Arg
          key={index}
          ref={ref}
          type={field.type}
          label={field.label}
        />
      );
    });

    this.setState({ argRefs: newArgRefs });
    return argComponents;
  }

  toYML(ident: number = 0): string {
    // Use the stored key as the shape label in YAML
    const argsYML = (this.state.argRefs || [])
      .map((ref: any) =>
        ref.current ? `${"\t".repeat(ident)}${ref.current.toYML(ident)}` : null
      )
      .filter(Boolean)
      .join("\n");

    return `shape: ${this.selectedKey}\n${argsYML}`;
  }

  render(): JSX.Element {
    return (
      <div>
        {super.render()}
        <div className="args-container">{this.state.Args}</div>
      </div>
    );
  }
}

export default ShapeDropDownMenu;