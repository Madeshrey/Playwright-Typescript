import dotenv from "dotenv";
dotenv.config({ quiet: true });
export const config = {
  TEST_URL: String(process.env.TEST_URL) || "",
  USERNAME: String(process.env.APPUSERNAME) || "",
  PASSWORD: String(process.env.APPPASSWORD) || "",
};
