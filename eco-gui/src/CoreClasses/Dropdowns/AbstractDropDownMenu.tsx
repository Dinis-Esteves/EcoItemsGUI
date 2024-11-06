import React from "react";
import Manager from "../Manager";
import Select from "react-select";

abstract class AbstractDropDownMenu extends React.Component {
  protected optionsMap: Map<string, string>;
  protected id: string;
  protected placeHolder: string;
  protected className: string;
  protected onChange: (option: any) => void;
  protected currentValue: string = '';

  constructor(
    optionsMap: Map<string, string>,
    placeHolder: string,
    className: string,
    onChange: (option: any) => void,
    props: any
  ) {
    super(props);
    this.id = Manager.generateId();
    this.optionsMap = optionsMap;
    this.placeHolder = placeHolder;
    this.className = className;
    this.onChange = onChange;
  }

  getValue(): string {
    return this.currentValue;
  }

  setValue(value: string): void {
    this.currentValue = value;
  }

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
        onChange={this.onChange}
      />
    );
  }
}

export default AbstractDropDownMenu;
