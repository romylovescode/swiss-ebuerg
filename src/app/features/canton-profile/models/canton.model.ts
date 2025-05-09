export interface CantonRules {
  residenceRequirement: string;
  languageRequirement: string;
  additionalRequirements: string;
  naturalizedPersonsCount?: number;
  localAuthority?: string;
  specificRules?: SpecificRule[];
}

export interface Canton {
  id: string;
  name: string;
  code: string;
  population: number;
  area: number;
  capital: string;
  languages: string[];
  established: Date;
  rules?: SpecificRule[];
  cantonalFlag?: string;
}

export interface SpecificRule {
  id: string;
  title: string;
  description: string;
  effectiveDate: Date;
  category: string;
}
