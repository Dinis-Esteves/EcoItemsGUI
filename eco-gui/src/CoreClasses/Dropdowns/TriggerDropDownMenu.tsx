import React from "react";
import AbstractDropDownMenu from "./AbstractDropDownMenu";
import Toolbox from "../Toolbox";
import Manager from "../Manager";

class TriggerDropDownMenu extends AbstractDropDownMenu {
  constructor(props: any) {
    const onChange = (option: any) => {
      super.setValue(option.value);
    };

    super(new Map(), "Select the trigger", "item-dropdown-menu", onChange, props);

    // Initialize `argRefs` as an empty array in the state
    this.state = {
      optionsMap: new Map(),
      argRefs: [], // Initialize argRefs here
    };
  }

  componentDidMount() {
    Toolbox.csvToMap("triggers.csv", (map) => {
      this.setState({ optionsMap: map });
      this.optionsMap = map;
    });
  }

  public toYML(): string {
    // Generate YAML output for the item
    let ymlOutput = `triggers: ${this.getValue()}`;

    return ymlOutput;
  }

  render(): JSX.Element {
    return super.render();
  }
}

export default TriggerDropDownMenu;
