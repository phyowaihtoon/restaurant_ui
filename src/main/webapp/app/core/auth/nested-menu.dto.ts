export interface INestedMenu {
    id: string;
    caption: string;
    routerLink: string;
    viewApplicable: boolean;
    addApplicable: boolean;
    editApplicable: boolean;
    deleteApplicable: boolean;
    printApplicable: boolean;
    children?: INestedMenu[];
}