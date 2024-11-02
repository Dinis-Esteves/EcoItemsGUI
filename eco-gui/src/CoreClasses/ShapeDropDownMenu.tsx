import React from "react";
import AbstractDropDownMenu from "./AbstractDropDownMenu";
import Arg from "./Arg";

class ShapeDropDownMenu extends AbstractDropDownMenu {
    constructor(props: any) {
        const options = new Map<string, string>([
            ["radius: int, angle: int", "cone"],
            ["radius: int", "circle"],
            ["radius: int, offset: int", "offset_circle"],
            ["radius: int, max_distance: int", "scan_in_front"],
            ["radius: int, distance: int, pierce_blocks: boolean, pierce_entities: boolean", "beam"],
        ]);

        const onChange = (option: any) => {
            super.setValue(option.value);
            // Generate new Arg components when the selected shape changes
            const newArgs = this.parseValueToArgs(option.value);
            this.setState({ Args: newArgs });
        };

        super(options, "Select the shape", "item-dropdown-menu", onChange, props);
        this.state = {
            Args: [], // Initialize state to hold Arg components
        };
    }

    parseValueToArgs(value: string) {
        const fields = value.split(", ").map((field) => {
            const [label, type] = field.split(": ");
            return { label, type: type === "int" ? "number" : type === "boolean" ? "checkbox" : "text" };
        });

        return fields.map((field, index) => (
            <Arg 
                key={index} // Use index as key
                type={field.type} 
                label={field.label} 
                onChange={(value) => this.handleArgChange(field.label, value)} // Passa a função onChange para Arg
            />
        ));
    }

    handleArgChange(label: string, value: any) {
        console.log(`${label} changed to ${value}`);
        // Aqui você pode armazenar o valor de cada Arg, se necessário
    }

    render(): JSX.Element {
        return (
            <div>
                {super.render()}

                {/* Render all Arg components stored in state */}
                <div className="args-container">
                    {this.state.Args}
                </div>
            </div>
        );
    }
}

export default ShapeDropDownMenu;

