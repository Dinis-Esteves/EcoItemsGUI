import React from "react";
import AbstractDropDownMenu from "./AbstractDropDownMenu";
import Toolbox from "./Toolbox";

class EffectDropDownMenu extends AbstractDropDownMenu {
  constructor() {
    // Define the onChange behavior for this dropdown
    const onChange = (option: any) => {
      console.log("Selected option:", option);
    };

    // Temporarily pass an empty map
    super(new Map(), "Select the effect", "item-dropdown-menu", onChange);
    this.state = {
      optionsMap: new Map(),
    };
  }

  componentDidMount() {
    Toolbox.csvToMap("effects.csv", (map) => {
      // Set the state and re-initialize AbstractDropDownMenu with the correct map
      this.setState({ optionsMap: map });
      this.optionsMap = map;
    });
  }

  render(): JSX.Element {
    return super.render();
  }
}

export default EffectDropDownMenu;
