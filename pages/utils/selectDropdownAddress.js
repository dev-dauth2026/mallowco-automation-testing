export async function  selectDropdownAddress (dropdownOptions, newDetails){
    let selected = false;
    for (let i = 0; i < dropdownOptions.length; i++) {
        if (dropdownOptions[i].includes(newDetails.expectedAutoFill.streetAddress) &&
            dropdownOptions[i].includes(newDetails.expectedAutoFill.city) &&
            dropdownOptions[i].includes(newDetails.expectedAutoFill.state)) {
            
            await this.locators.dropdownOptions.nth(i).click();
            selected = true;
            break;
        }
    }
    if (!selected) {
        throw new Error(`Address not found in dropdown: ${JSON.stringify(newDetails.expectedAutoFill)}`);
    }

    await this.page.waitForTimeout(3000); // Wait for auto-fill fields to update
}