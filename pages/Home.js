import { BasePage } from "./BasePage";

export class Home extends BasePage {

    constructor(page){
        super(page);

        
    }
    async gotoHomePage() {
        await this.page.goto(process.env.TEST_URL);
      }
}