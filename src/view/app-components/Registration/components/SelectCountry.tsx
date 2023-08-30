import React from "react";
import { ISignUpForm } from "shared/utils/getInitialFormData";

export type SetFormDataType = React.Dispatch<React.SetStateAction<ISignUpForm>>;

export type CountriesListType = {
    value: string;
    text: string;
};

export type CountrySelectPropsType = {
    value: string;
    setFormData: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    name: string;
    id: string;
};

function CountrySelect({ value, setFormData, name, id }: CountrySelectPropsType) {
    const countriesList: CountriesListType[] = [
        { value: "US", text: "USA" },
        { value: "RU", text: "Russia" },
        { value: "BE", text: "Belarus" },
    ];

    return (
        <select
            value={value}
            className="block-address_select inter-400-font font-size_m color_grey-dark"
            name={name}
            id={id}
            onChange={setFormData}
        >
            {countriesList.map((el, index) => {
                const itemKey = `key-${index + 1}`;
                return (
                    <option value={el.value} key={itemKey}>
                        {el.text}
                    </option>
                );
            })}
        </select>
    );
}

export default CountrySelect;
