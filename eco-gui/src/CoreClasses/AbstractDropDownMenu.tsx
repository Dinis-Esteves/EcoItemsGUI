import React from "react";
import Manager from "./Manager";
import Select from "react-select";

abstract class AbstractDropDownMenu extends React.Component {
  protected optionsMap: Map<string, string>; // Assuming optionsMap is a Map
  protected id: string = Manager.generateId(); // Assuming id is a string
  protected placeHolder: string;
  protected className: string;
  protected onChange: (option: any) => void; // Add onChange type

  constructor(
    optionsMap: Map<string, string>,
    placeHolder: string,
    className: string,
    onChange: (option: any) => void // Add onChange to constructor
  ) {
    super({});
    if (new.target === AbstractDropDownMenu) {
      throw new TypeError("Cannot instantiate AbstractDropDownMenu directly.");
    }

    this.optionsMap = optionsMap;
    this.placeHolder = placeHolder;
    this.className = className;
    this.onChange = onChange; // Assign the onChange handler
  }

  // Ensure that subclasses implement this method
  render(): JSX.Element {
    const optionsArray = Array.from(this.optionsMap, ([value, label]) => ({
      value,
      label,
    }));

    return (
      <Select
        options={optionsArray}
        isSearchable
        className={this.className}
        id={this.id}
        placeholder={this.placeHolder}
        onChange={this.onChange} // Use the onChange handler
      />
    );
  }
}

export default AbstractDropDownMenu;
