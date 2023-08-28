import { ProgramType } from "../../enum/ProgramType";
import { CheckboxFilter } from "../Form/CheckboxFilter";

export class FiltersProgram {
  public name: string;
  public types: CheckboxFilter[] = [];
  public nbDay: number;

  constructor() {
    // Loop through all enums
    Object.values(ProgramType).forEach((pt) => {
      this.types.push(new CheckboxFilter(pt));
    });
  }
}
