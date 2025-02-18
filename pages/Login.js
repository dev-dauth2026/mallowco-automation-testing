import { BasePage } from "./BasePage";

export class Login extends BasePage {

  constructor(page) {
    super(page)

    this.loginLink =  page.getByRole('link', { name: 'Login', exact: true });
    this.usernameTextbox = page.getByLabel("E-Mail Address *");
    this.passwordTextbox = page.locator("#login_password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.loginErrorMessage = page.getByText('These credentials do not match our records.', { exact: false });
    this.forgotYourPassword = page.getByRole('link', { name: 'Forgot Your Password?' });
    this.facebookLogin = page.locator('.login-facebook-btn');
    this.googleLogin = page.locator('.login-google-btn');
    this.signupLink = page.getByRole('link',{name:'Sign Up'});

  }

  async login(username, password) {
    await this.loginLink.click();
    await this.usernameTextbox.fill(username);
    await this.passwordTextbox.fill(password);
    await this.loginButton.click();
  }

  async getCurrentUrl(){
    return this.page.url();
  }

  async isErrorMessageVisible(){
    return this.loginErrorMessage.isVisible();
  }

  async clickSignUpLink(){
    await this.signupLink.click();
  }
}
