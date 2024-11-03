import React from "react";
import AbstractDropDownMenu from "./AbstractDropDownMenu";
import Toolbox from "./Toolbox";
import Manager from "./Manager";

interface ItemDropDownMenuState {
  optionsMap: Map<string, string>;
  argRefs: Array<React.RefObject<any>>; // Specify type for argRefs
}

class ItemDropDownMenu extends AbstractDropDownMenu {
  state: ItemDropDownMenuState;

  constructor(props: any) {
    const onChange = (option: any) => {
      super.setValue(option.value);
    };

    super(new Map(), "Select the item", props.className, onChange, props);

    // Initialize `argRefs` as an empty array in the state
    this.state = {
      optionsMap: new Map(),
      argRefs: [], // Initialize argRefs here
    };
  }

  componentDidMount() {
    Toolbox.csvToMap("items.csv", (map) => {
      this.setState({ optionsMap: map });
      this.optionsMap = map;
    });
  }

  public toYML(): string {
    // Generate YAML output for the item
    let ymlOutput = `item:\n  item: ${this.getValue()}`;

    if (Manager.getHideAttributesValue()) {
      return ymlOutput + " hide_attributes";
    }
    return ymlOutput;
  }

  render(): JSX.Element {
    return super.render();
  }
}

export default ItemDropDownMenu;
