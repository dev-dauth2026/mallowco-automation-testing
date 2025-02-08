exports.Home = class Home {

    constructor(page){
        this.page = page;
    }
    async gotoHomePage() {
        await this.page.goto(process.env.TEST_URL);
      }
}