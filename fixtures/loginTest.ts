import { Locator, Page,expect } from '@playwright/test'
import { loginLocators } from '../input/locators/index'
import { CommonFunctions } from './commonFunctions'
export const softExpect=expect.configure({soft:true,timeout:30000})
export class LoginTest{
    private page:Page
    public readonly username:Locator
    public readonly password:Locator
    public readonly login:Locator
    public readonly forgetPassword:Locator
    public readonly required:Locator
    constructor(page:Page){
        this.page=page
        this.username=this.page.getByRole('textbox',{name:loginLocators.username})
        this.password=this.page.getByRole('textbox',{name:loginLocators.password})
        this.login=this.page.getByRole('button',{name:loginLocators.login})
        this.forgetPassword=this.page.getByText(loginLocators.forgotPassword)
        this.required=this.page.locator(loginLocators.required)
    }

    async launchUrl(URL:string){
        await this.page.goto(URL)
    }

    async loginIn(input1:string,input2:string){
        const commonFunctions=new CommonFunctions(this.page)
        const elements=[this.username,this.password,this.login]
        for(let element of elements){
            await commonFunctions.assertElementVisibility(element)
        }   
        await this.username.fill(input1)
        await this.password.fill(input2)
        await this.login.click()
    }
}