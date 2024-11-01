import React from "react";
import Manager from "./Manager";

interface ArgProps {
  type: string;
  label: string;
}

class Arg extends React.Component<ArgProps> {
  private value: any;

  constructor(props: ArgProps) {
    super(props);
    this.value = ""; 
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = this.props.type === "checkbox" ? event.target.checked : event.target.value;
    this.value = newValue;
  };

  public getValue() {
    return this.value;
  }

  public render() {
    return (
      <div>
        <input
          type={this.props.type}
          id={Manager.generateId()}
          className="arg"
          onChange={this.handleChange}
          placeholder={this.props.type === "checkbox" ? "" : this.props.label}
        />
        {this.props.type === "checkbox" ? this.props.label : ""}
      </div>
    );
  }
}

export default Arg;
