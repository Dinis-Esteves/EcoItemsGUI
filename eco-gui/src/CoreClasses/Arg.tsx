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
    const newValue =
      this.props.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.value = newValue;
  };

  public getValue() {
    return this.value;
  }

  // Correctly returns the label and value in the desired format
  toYML(): string {
    if (this.props.type === "checkbox" || this.props.type === "text") {
      this.value = this.value ? this.value : false; // Ensure value is defined
      if (
        this.props.label === "craftable" ||
        this.props.label === "display Name"
      ) {
        // For "display Name", put the value in single quotes if it's text
        if (this.props.type === "text") {
          return "\t" + this.props.label.replace(/ /g, "") + ": '" + this.value + "'";
        }
        return "\t" + this.props.label.replace(/ /g, "") + ": " + this.value; // For other types, use as is
      }

      if (this.props.label === "Hide Attributes") {
        return ""; // Skip this label
      }
    }

    return this.props.label.replace(/ /g, "") + ": " + this.value; // Default case
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
