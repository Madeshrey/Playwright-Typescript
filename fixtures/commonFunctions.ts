import {Locator, Page,expect}from '@playwright/test'
import { softExpect } from './loginTest'
export class CommonFunctions{
    private page:Page
    public readonly alert:Locator

    constructor(page:Page ){
        this.page=page
        this.alert=this.page.getByRole('alert')
    }

    async assertElementVisibility(fieldLocator:Locator){
        await expect(fieldLocator).toBeVisible()
    }

    async verifySnackBarMessage(message:string){
        await this.assertElementVisibility(this.alert)
        await softExpect(this.alert).toHaveText(message)
    }

    async verifyRequiredErrorMessage(fieldLocator:Locator){
        const count=await fieldLocator.count()
        if(count===1){
            await softExpect(fieldLocator).toBeVisible()
        }else{
            await softExpect(fieldLocator.first()).toBeVisible()
            await softExpect(fieldLocator.last()).toBeVisible()
        }
    }
}