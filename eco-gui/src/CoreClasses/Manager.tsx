import React from "react";
import ItemDropDownMenu from "./ItemDropDownMenu";

class Manager {
  // Hold the single instance of the Manager
  private static instance: Manager | null = null;

  private currentLetter: string = 'a';
  private currentNumber: number = 0;

  private components: React.ReactNode[] = new Array(10);

  // Private constructor to enforce singleton pattern
  private constructor() {
    if (Manager.instance) {
      return Manager.instance;
    }
    Manager.instance = this; // Set the instance

    //default template
    this.addComponent(<ItemDropDownMenu />)
  }

  public static getInstance(): Manager {
    if (!Manager.instance) {
      Manager.instance = new Manager();
    }
    return Manager.instance;
  }

  public addComponent(component: React.ReactNode): void {
    this.components.push(component);
  }

  public removeComponent(component: React.ReactNode): void {
    this.components = this.components.filter((item) => item !== component);
  }

  public generateYml(): void {
    // Needs implementation
  }

  public generateId(): string {

     if (this.currentNumber < 9) {
      this.currentNumber++;
    } else {
      this.currentNumber = 0; // Reset to 0
      this.currentLetter = String.fromCharCode(this.currentLetter.charCodeAt(0) + 1); // Move to the next letter
      }
  
  return this.currentLetter + this.currentNumber.toString();
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


