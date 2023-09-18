import React from "react";
import { IState } from "view/app-components/ShopPage/ShopPage";
import closeIcon from "assets/svg/close.svg";

type FilterLabelType = {
    params: IState;
    onRemoveFilter: (param: string) => void;
    resetAllFilters: () => void;
};

export function FilterLabel({ params, onRemoveFilter, resetAllFilters }: FilterLabelType) {
    const keys = Object.entries(params)
        .filter(([key, value]) => value.length > 0 && key)
        .map(([key]) => key);

    return keys.length > 0 ? (
        <div className="filter-label">
            {keys.map((type) => (
                <button
                    key={type}
                    className="filter-label__item inter-600-font font-size_m color_black"
                    onClick={() => {
                        onRemoveFilter(type);
                    }}
                >
                    <img src={closeIcon} alt="close-icon" className="filter-label__close-icon" />
                    {type}
                </button>
            ))}
            {keys.length > 1 && (
                <button
                    className="filter-label__item inter-400-font font-size_m color_grey-dark"
                    onClick={resetAllFilters}
                >
                    <img src={closeIcon} alt="close-icon" className="filter-label__close-icon" />
                    reset all
                </button>
            )}
        </div>
    ) : null;
}
