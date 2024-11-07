export class Customer {
    name;
    email;
    phone;
    address;

    constructor(name, email, phone, address) {

        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;

    }

    DisplayCustom() {

        console.log(this.name, this.email, this.phone, this.address)

    }

}