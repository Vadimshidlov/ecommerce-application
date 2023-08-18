import { ISignUpForm } from "shared/utils/getInitialFormData";

export const getChangeFormByAddressData = (
    isOneAddress: boolean,
    formData: ISignUpForm,
): ISignUpForm => {
    if (isOneAddress) {
        const defaultAddresses = {
            shippingCity: formData.billingCity,
            shippingCountry: formData.billingCountry,
            shippingStreet: formData.billingStreet,
            shippingPostalCode: formData.billingPostalCode,
        };

        const obj: ISignUpForm = { ...formData, ...defaultAddresses };

        // setFormData((prevState) => ({ ...prevState, ...defaultAddresses }));
        // TODO Remove
        // setFormData({ ...obj });
        return obj;
    }

    return formData;
    // setFormData((prevState) => ({ ...prevState }));
};
