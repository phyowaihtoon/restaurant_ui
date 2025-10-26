import { Account } from "./account.model";
import { INestedMenu } from "./nested-menu.dto";

export interface IAccountDTO{   
    account:Account;
    menuTree: INestedMenu[];
}