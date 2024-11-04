import React from "react";
import ItemDropDownMenu from "./ItemDropDownMenu";
import EffectDropDownMenu from "./EffectDropDownMenu";
import ItemLoreComponent from "./ItemLoreComponent";
import Arg from "./Arg";
import YAML from 'yaml';
import ItemRecipe from "./ItemRecipe";
import { saveAs } from 'file-saver'; // Don't forget to import this
import ConditionDropDownMenu from "./ConditionDropDownMenu";
import FilterDropDownMenu from "./FilterDropDownMenu";
import MutatorDropDownMenu from "./MutatorDropDownMenu";
import AddElementsBoard from "./AddElementsBoard";

class Manager {
  // Hold the single instance of the Manager
  private static instance: Manager | null = null;

  private currentLetter: string = "a";
  private currentNumber: number = -1;

  private components: React.ReactNode[] = []; // Initialize as an empty array
  private componentRefs: React.RefObject<any>[] = []; // Initialize refs array

  // Private constructor to enforce singleton pattern
  private constructor() {
    if (Manager.instance) {
      return Manager.instance;
    }
    Manager.instance = this; // Set the instance

    // Default template with refs
    this.addComponent(<Arg type="number" label="effective Durability" />);
    this.addComponent(<Arg type="number" label="base Attack Speed" />);
    this.addComponent(<Arg type="number" label="base Damage" />);
    this.addComponent(<ItemDropDownMenu ref={React.createRef<ItemDropDownMenu>()} className="item-dropdown-menu" />);
    this.addComponent(<Arg type="checkbox" label="Hide Attributes" />);
    this.addComponent(<Arg type="text" label="display Name" />);
    this.addComponent(<ItemRecipe />);
    this.addComponent(<Arg type="checkbox" label="craftable" />);
    this.addComponent(<ItemLoreComponent />);
    this.addComponent(<EffectDropDownMenu />);
    this.addComponent(<ConditionDropDownMenu />);
    this.addComponent(<FilterDropDownMenu />);
    this.addComponent(<MutatorDropDownMenu />);
    this.addComponent(<AddElementsBoard/>);
    this.addComponent(<button className="generate-button" onClick={() => this.generateYAMLFile()}>Generate YML File</button>);
  }

  public static getInstance(): Manager {
    if (!Manager.instance) {
      Manager.instance = new Manager();
    }
    return Manager.instance;
  }

  addComponent(component: React.ReactNode): void {
    this.components.push(component);
    // If the component is a valid React element, store its ref
    if (React.isValidElement(component) && typeof component.type === 'function') {
      const ref = React.createRef();
      this.componentRefs.push(ref);
      // Clone the element to add the ref
      const componentWithRef = React.cloneElement(component, { ref });
      this.components[this.components.length - 1] = componentWithRef; // Update the last component in the array
    }
  }

  public removeComponent(component: React.ReactNode): void {
    this.components = this.components.filter((item) => item !== component);
  }

  public generateYAMLFile() {
    const yamlContent = this.componentRefs
      .map((ref, index) => {
        if (ref.current) {
          const yamlString = ref.current.toYML(); // Call toYML on the actual instance
          console.log(`Component ${index} toYML output:`, yamlString); // Log each toYML output
          return yamlString; // Add each output
        }
        return ""; // If ref.current is null (shouldn't happen if refs are set correctly)
      })
      .filter((line) => line.trim() !== "") // Filter out empty strings
      .join("\n"); // Join all YAML strings with newlines
  
    console.log("Final YAML content:", yamlContent); // Log the final YAML content to be saved
  
    const blob = new Blob([yamlContent], { type: 'text/yaml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "components.yml";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
  

  public generateId(): string {
    if (this.currentNumber < 9) {
      this.currentNumber++;
    } else {
      this.currentNumber = 0; // Reset to 0
      this.currentLetter = String.fromCharCode(
        this.currentLetter.charCodeAt(0) + 1
      ); // Move to the next letter
    }

    return this.currentLetter + this.currentNumber.toString();
  }
 
  public getHideAttributesValue(): boolean {
    // Assuming the "Hide Attributes" checkbox is at index 5 in componentRefs
    const hideAttributesRef = this.componentRefs[4];
    return hideAttributesRef.current ? hideAttributesRef.current.getValue() : false; // Return false if ref is null
  }

  public getValues(): Array<any> {
    return this.components.map(component => {
      if (typeof component === 'object' && 'getValue' in component) {
        return component.getValue();
      }
      return null; // Or handle accordingly
    }).filter(Boolean); // Filter out null values
  }

  public render(): JSX.Element {
    return (
      <div>
        {this.components.map((component, index) => (
          <div key={index}>{component}</div> // Render each component with a unique key
        ))}
      </div>
    );
  }
}

// Exporting the singleton instance of Manager
export default Manager.getInstance();
