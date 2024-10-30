import React from "react";

abstract class AbstractDropDownMenu extends React.Component {
  protected optionsMap: Map<string, string>; // Assuming optionsMap is a Map
  protected id: string; // Assuming id is a string

  constructor(optionsMap: Map<string, string>, id: string) {
    super({});
    if (new.target === AbstractDropDownMenu) {
      throw new TypeError("Cannot instantiate AbstractDropDownMenu directly.");
    }

    this.optionsMap = optionsMap;
    this.id = id;
  }

  // Ensure that subclasses implement this method
  abstract render(): JSX.Element; // Use JSX.Element as the return type for render
}

export default AbstractDropDownMenu;

