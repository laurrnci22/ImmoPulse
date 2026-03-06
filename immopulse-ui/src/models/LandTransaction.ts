export interface LandTransaction {
    id: string;
    mutationDate: string;
    mutationType: string;
    propertyValue: number;
    streetNumber: string;
    streetName: string;
    postalCode: string;
    city: string;
    departmentCode: string;
    section: string;
    plotNumber: string;
    propertyType: string;
    builtArea: number;
    landArea: number;
}

export interface Departement {
    label: string;
    code: number;
}

export interface PropertyType {
    label: string;
}
