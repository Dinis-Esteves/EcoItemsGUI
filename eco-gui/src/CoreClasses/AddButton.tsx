import React, { ReactNode } from "react";
import Manager from "./Manager";

// Define the expected structure of `component` prop

interface AddButtonProps {
  component: ReactNode; // Use the custom ComponentType here
  onClick?: () => void; // Optional onClick prop
}

class AddButton extends React.Component<AddButtonProps> {
  constructor(props: AddButtonProps) {
    super(props);
  }

  // Default click handler
  handleClick = (): void => {
    Manager.addComponent(this.props.component);
    // Trigger a custom event to update components in the main App component
    window.dispatchEvent(new CustomEvent("updateComponents"));
  };

  render(): JSX.Element {
    const { onClick } = this.props;

    // Check if `this.props.component` is a valid React element
    const componentType = React.isValidElement(this.props.component) && 
      typeof this.props.component.type === "function" ? 
      this.props.component.type.name : 
      "Component";

    const buttonLabel = `Add ${componentType.replace("DropDownMenu", "")}`;

    return (
      <button
        onClick={onClick || this.handleClick} // Use provided onClick or default to handleClick
        className="addButton"
      >
        {buttonLabel}
      </button>
    );
  }
}

export default AddButton;
