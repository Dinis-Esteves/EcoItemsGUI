import React from "react";
import ItemDropDownMenu from "./Dropdowns/ItemDropDownMenu";
import Manager from "./Manager";

class ItemRecipe extends React.Component {
  private slots: Array<JSX.Element> = [];
  private itemRefs: Array<any> = []; // Array para armazenar referências aos ItemDropDownMenu

  constructor(props: any) {
    super(props);
    // Adiciona 9 instâncias de ItemDropDownMenu ao array slots
    for (let i = 1; i <= 9; i++) {
      const itemDropDown = (
        <ItemDropDownMenu
          key={i}
          className="recipe-dropdown-menu"
          ref={(ref: any) => (this.itemRefs[i - 1] = ref)} // Salva a referência do componente
        />
      );
      this.slots.push(itemDropDown);
    }
  }

  // Função para gerar a representação YAML dos itens
  toYML() {
    return (
      "\trecipe:\n" +
      this.itemRefs
        .map((itemRef) => {
          const value = itemRef.getValue(); // Get the value from the itemRef
          return value ? `\t- ${value}` : "\t- ''"; // Check if the value is empty
        })
        .join("\n")
    );
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
