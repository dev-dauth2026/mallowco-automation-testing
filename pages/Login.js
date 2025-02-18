import { BasePage } from "./BasePage";

export class Login extends BasePage {

  constructor(page) {
    super(page)

    this.login_link =  page.getByRole('link', { name: 'Login', exact: true });
    this.username_textbox = page.getByLabel("E-Mail Address *");
    this.password_textbox = page.locator("#login_password");
    this.login_button = page.getByRole("button", { name: "Login" });
    this.profile_link = page.getByRole('link', { name: `Welcome ${process.env.FIRSTNAME}` });
    this.login_error_message = page.getByText('These credentials do not match our records.', { exact: false });
    this.forgot_your_password = page.getByRole('link', { name: 'Forgot Your Password?' });
    this.facebook_login = page.locator('.login-facebook-btn');
    this.google_login = page.locator('.login-google-btn');
    this.signup_link = page.getByRole('link',{name:'Sign Up'});

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

  async clickSignUpLink(){
    await this.signup_link.click();
  }
}
