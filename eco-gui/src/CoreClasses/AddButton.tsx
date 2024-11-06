import React from "react";
import Manager from "./Manager";

interface AddButtonProps {
  component: React.ReactNode;
}

class AddButton extends React.Component<AddButtonProps> {
  constructor(props: AddButtonProps) {
    super(props); // Pass props to super
  }

  handleClick = (): void => {
    Manager.addComponent(this.props.component);
    // Trigger a custom event to update components in the main App component
    window.dispatchEvent(new CustomEvent("updateComponents"));
  };

  render(): JSX.Element {
    const componentType = this.props.component?.type?.name || "Component";
    const buttonLabel = `Add ${componentType.replace("DropDownMenu", "")}`;

    return (
      <button onClick={this.handleClick} className="addButton">
        {buttonLabel}
      </button>
    );
  }
}

export default AddButton;
