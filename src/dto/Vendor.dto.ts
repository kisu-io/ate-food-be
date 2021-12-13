export interface CreateVendorInput {
  name: string;
  ownerName: String;
  foodType: [string];
  pincode: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

export interface VendorLoginInputs {
  email: string;
  password: string;
}
