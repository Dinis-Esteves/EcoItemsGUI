import React from "react";
import ItemDropDownMenu from "./ItemDropDownMenu";
import Manager from "./Manager";

class ItemRecipe extends React.Component {
  private slots: Array<JSX.Element> = [];

  constructor(props: any) {
    super(props);
    // Adiciona 9 instâncias de ItemDropDownMenu ao array slots
    for (let i = 1; i <= 9; i++) {
      this.slots.push(
        <ItemDropDownMenu
          key={i}
          className="recipe-dropdown-menu" 
        />
      );
    }
  }

  render() {
    return (
      <div className="recipeGrid">
        <div className="recipeRow">{this.slots.slice(0, 3)}</div>
        <div className="recipeRow">{this.slots.slice(3, 6)}</div>
        <div className="recipeRow">{this.slots.slice(6, 9)}</div>
      </div>
    );
  }
}

export default ItemRecipe;
