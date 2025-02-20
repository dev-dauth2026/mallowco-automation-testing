import { BasePage } from "./BasePage";

export class Signup extends BasePage{

    constructor(page){
        super(page);

        this.page = page;

        this.fullname = page.getByPlaceholder('Enter your full name');
        this.email = page.getByPlaceholder('Enter your email address');
        this.password = page.locator('input[type="password"][name="password"]');
        this.confirmPassword = page.locator('input[type="password"][name="password_confirmation"]');
        this.registerButton = page.getByRole('button', { name: 'Register' });
        this.facebookSignUpButton = page.locator('.login-facebook-btn');
        this.googleSignupButton = page.locator('.login-google-btn');
        this.loginLink2 = page.getByRole('link',{name:'Login'}).nth(2);

    }

    async signUp(fullname,email,password,confirm_password){

        await this.fullname.fill(fullname);
        await this.email.fill(email);
        await this.password.fill(password);
        await this.confirm_password.fill(confirm_password);
        await this.page.pause();

        await this.register_button.click();

    }

    async signupWithFacebook(){
        await this.facebookSignUpButton.click();
    }

    async signUpWithGoogle(){
        await this.signUpWithGoogle.click();
    }

    async gotoLoginPage(){
        await this.loginLink2.click();
    }
}