import {Locator,Page} from '@playwright/test'
import { searchEmployeeLocators } from '../input/locators/index'
import { softExpect } from './loginTest'

export class SearchEmployee{
    private page:Page
    public readonly employeeList:Locator
    public readonly detailsExpandButton:Locator
    public readonly employeeName:Locator
    public readonly tableData:Locator
    public readonly userData:Locator
    public readonly searchButton:Locator
    public readonly searching:Locator

    constructor(page:Page){
         this.page=page
         this.employeeList=this.page.getByRole('link',{name:searchEmployeeLocators.employeeList})
         this.detailsExpandButton=this.page.locator(searchEmployeeLocators.expandButton)
         this.employeeName=this.page.getByRole('textbox',{name:searchEmployeeLocators.employeeName}).first()
         this.tableData=this.page.locator(searchEmployeeLocators.userData).first()
         this.userData=this.tableData.getByRole('cell').first().locator('div > div:nth-child(2)')
         this.searchButton=this.page.getByRole('button',{name:searchEmployeeLocators.searchButton})
         this.searching=this.page.getByText('Searching....')
    }

    async navigateToEmployeeList(){
        await this.employeeList.click()
        await this.detailsExpandButton.click()
    }

    async assertEmployeeDetails(input1:string){
        await this.employeeName.fill(input1)
        await softExpect(this.searching).toBeVisible()
        await this.searchButton.scrollIntoViewIfNeeded()
        await this.searchButton.dblclick()
        await this.page.getByRole('row').first().scrollIntoViewIfNeeded()
        await softExpect(this.page.getByRole('cell').nth(2)).toHaveText(input1)
    }
}