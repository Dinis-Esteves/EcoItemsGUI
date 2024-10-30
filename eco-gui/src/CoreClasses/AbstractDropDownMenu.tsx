import React from "react";
import Manager from "./Manager";

abstract class AbstractDropDownMenu extends React.Component {
  protected optionsMap: Map<string, string>; // Assuming optionsMap is a Map
  protected id: string = Manager.generateId(); // Assuming id is a string

  constructor(optionsMap: Map<string, string>) {
    super({});
    if (new.target === AbstractDropDownMenu) {
      throw new TypeError("Cannot instantiate AbstractDropDownMenu directly.");
    }

    this.optionsMap = optionsMap;
  }

  // Ensure that subclasses implement this method
  abstract render(): JSX.Element; // Use JSX.Element as the return type for render
}

export default AbstractDropDownMenu;

