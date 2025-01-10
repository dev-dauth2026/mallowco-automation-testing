exports.Auth =  class Auth {

  constructor(page) {

    this.page = page;
    this.login_link =  page.getByRole('link', { name: 'Login', exact: true });
    this.username_textbox = page.getByLabel("E-Mail Address *");
    this.password_textbox = page.locator("#login_password");
    this.login_button = page.getByRole("button", { name: "Login" });
    this.profile_link = page.getByRole('link', { name: 'Welcome David ' });
    this.logoutButton = page.getByRole('link', { name: ' Logout' });
    this.login_error_message = page.getByText('These credentials do not match our records.', { exact: false });
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

  async getCurrentUrl(){
    return this.page.url();
  }

  async isLoginSuccessful(){
    return this.profile_link.isVisible();

  }

  async isErrorMessageVisible(){
    return this.login_error_message.isVisible();
  }
}
