export type RegisterFormDataType = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
};

export function getRegisterFormData(): RegisterFormDataType {
    return {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    };
}
