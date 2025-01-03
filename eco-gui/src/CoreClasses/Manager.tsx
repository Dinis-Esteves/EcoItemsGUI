import React, { ReactElement } from "react";
import ItemDropDownMenu from "./Dropdowns/ItemDropDownMenu";
import EffectDropDownMenu from "./Dropdowns/EffectDropDownMenu";
import ItemLoreComponent from "./ItemLoreComponent";
import Arg from "./Arg";
import ItemRecipe from "./ItemRecipe";
import ConditionDropDownMenu from "./Dropdowns/ConditionDropDownMenu";
import FilterDropDownMenu from "./Dropdowns/FilterDropDownMenu";
import MutatorDropDownMenu from "./Dropdowns/MutatorDropDownMenu";

class Manager {
  private static instance: Manager | null = null;

  private currentLetter: string = "a";
  private currentNumber: number = -1;
  private components: React.ReactNode[] = [];
  private componentRefs: React.RefObject<any>[] = [];

  private constructor() {
    if (Manager.instance) {
      return Manager.instance;
    }
    Manager.instance = this;

    // Default components
    this.addComponent(<Arg type="number" label="effective Durability" />);
    this.addComponent(<Arg type="number" label="base Attack Speed" />);
    this.addComponent(<Arg type="number" label="base Damage" />);
    this.addComponent(<ItemDropDownMenu className="item-dropdown-menu" />);
    this.addComponent(<Arg type="checkbox" label="Hide Attributes" />);
    this.addComponent(<Arg type="text" label="display Name" />);
    this.addComponent(<ItemRecipe />);
    this.addComponent(<Arg type="checkbox" label="craftable" />);
    this.addComponent(<ItemLoreComponent />);
    this.addComponent(<EffectDropDownMenu />);
  }

  public static getInstance(): Manager {
    if (!Manager.instance) {
      Manager.instance = new Manager();
    }
    return Manager.instance;
  }

  public addComponent(component: React.ReactNode): void {
    const ref = React.createRef();
    const componentWithRef = React.isValidElement(component)
    ? React.cloneElement(component as ReactElement, { ref })
    : null;
    this.components.push(componentWithRef);
    this.componentRefs.push(ref);
  }

  public getComponents(): React.ReactNode[] {
    return this.components;
  }

  public getHideAttributesValue(): boolean {
    // Assuming the "Hide Attributes" checkbox is at index 5 in componentRefs
    const hideAttributesRef = this.componentRefs[4];
    return hideAttributesRef.current
      ? hideAttributesRef.current.getValue()
      : false; // Return false if ref is null
  }

  public generateYAMLFile() {
    let effectsYAML: string[] = [];
    let conditionsYAML: string[] = [];
    let mutatorsYAML: string[] = [];
    let filtersYAML: string[] = [];
    let miscellaneousYAML: string[] = [];

    this.componentRefs.forEach((ref) => {
      if (ref.current) {
        const yamlString = ref.current.toYML();
        if (yamlString.trim() !== "") {
          if (ref.current instanceof EffectDropDownMenu) {
            effectsYAML.push("  " + yamlString);
          } else if (ref.current instanceof ConditionDropDownMenu) {
            conditionsYAML.push("  " + yamlString);
          } else if (ref.current instanceof MutatorDropDownMenu) {
            mutatorsYAML.push("  " + yamlString);
          } else if (ref.current instanceof FilterDropDownMenu) {
            filtersYAML.push("  " + yamlString);
          } else {
            miscellaneousYAML.push(yamlString);
          }
        }
      }
    });

    const formatSection = (header: string, content: string[]) =>
      content.length ? `${header}\n${content.join("\n")}` : `${header} []`;

    const yamlContent = [
      miscellaneousYAML.join("\n"),
      formatSection("effects:", effectsYAML),
      formatSection("conditions:", conditionsYAML),
      formatSection("mutators:", mutatorsYAML),
      formatSection("filters:", filtersYAML),
    ]
      .filter(Boolean)
      .join("\n\n");

    const blob = new Blob([yamlContent], { type: "text/yaml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "item_config.yml";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  public generateId(): string {
    if (this.currentNumber < 9) {
      this.currentNumber++;
    } else {
      this.currentNumber = 0;
      this.currentLetter = String.fromCharCode(
        this.currentLetter.charCodeAt(0) + 1
      );
    }
    return this.currentLetter + this.currentNumber.toString();
  }
}

export default Manager.getInstance();