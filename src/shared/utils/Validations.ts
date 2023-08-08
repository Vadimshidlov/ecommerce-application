import * as yup from "yup";

export const userScheme = yup.object().shape({
    email: yup.string().email().required(),
    // firstName: yup.string().required(),
    // lastName: yup.string().required(),
    password: yup.string().min(4).max(25).required("Please Enter your password"),
    /* .matches(
            /^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
        ), */
});
