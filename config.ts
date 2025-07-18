import * as dotenv from 'dotenv'
dotenv.config()
export const config={
    TEST_URL:String(process.env.TEST_URL),
    USERNAME:String(process.env.USERNAME),
    PASSWORD:String(process.env.PASSWORD)
}

