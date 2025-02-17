import { BasePage } from "./BasePage";

export class Signup extends BasePage{

    constructor(page){
        super(page);

        this.page = page;
        this.signup_link = page.getByRole('link', { name: 'Sign Up' })
        this.fullname = page.getByPlaceholder('Enter your full name');
        this.email = page.getByPlaceholder('Enter your email address');
        this.password = page.getByLabel('Password *', { exact: true });
        this.confirm_password = page.getByLabel('Confirm Password *');
        this.register_button = page.getByRole('button', { name: 'Register' });

    }

    async goHomePage(){
        await this.page.goto(process.env.TEST_URL);
    }

    async signUp(fullname,email,password,confirm_password){
        await this.signup_link.click();
        await this.fullname.fill(fullname);
        await this.email.fill(email);
        await this.password.fill(password);
        await this.confirm_password.fill(confirm_password);
        await this.page.pause();

        await this.register_button.click();

    }
}