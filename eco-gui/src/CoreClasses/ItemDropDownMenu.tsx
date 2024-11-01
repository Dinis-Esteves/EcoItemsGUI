import React from "react";
import AbstractDropDownMenu from "./AbstractDropDownMenu";
import Toolbox from "./Toolbox";

class ItemDropDownMenu extends AbstractDropDownMenu {
  constructor(props: any) {
    const onChange = (option: any) => {
      super.setValue(option.value);
    };

    super(new Map(), "Select the item", "item-dropdown-menu", onChange, props);
    this.state = {
      optionsMap: new Map(), // Initialize state if needed
    };
  }

  componentDidMount() {
    Toolbox.csvToMap("items.csv", (map) => {
      this.setState({ optionsMap: map });
      this.optionsMap = map;
    });
  }

  render(): JSX.Element {
    return super.render();
  }
}

export default ItemDropDownMenu;
