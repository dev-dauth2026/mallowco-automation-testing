exports.Auth =  class Auth {

  constructor(page) {

    this.page = page;
    this.login_link =  page.getByRole('link', { name: 'Login', exact: true });
    this.username_textbox = page.getByLabel("E-Mail Address *");
    this.password_textbox = page.locator("#login_password");
    this.login_button = page.getByRole("button", { name: "Login" });
  }

  async goHomepage() {
    await this.page.goto("https://www.mallowco.com.au/");
  }

  async login(username, password) {
    await this.login_link.click();
    await this.username_textbox.fill(username);
    await this.password_textbox.fill(password);
    await this.login_button.click();
  }
}
