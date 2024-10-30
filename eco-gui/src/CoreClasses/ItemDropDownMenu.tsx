import React from "react";
import AbstractDropDownMenu from "./AbstractDropDownMenu";
import Toolbox from "./Toolbox";
import Manager from "./Manager";

class ItemDropDownMenu extends AbstractDropDownMenu {
  constructor() {
    // Temporarily pass an empty map
    super(new Map());
    this.state = {
      optionsMap: new Map(),
    };
  }

  componentDidMount() {
    Toolbox.csvToMap("items.csv", (map) => {
      // Set the state and re-initialize AbstractDropDownMenu with the correct map
      this.setState({ optionsMap: map });
      this.optionsMap = map;
    });
  
  }

  render(): JSX.Element{
    return <h2></h2>;
  }

}

export default AbstractDropDownMenu;

