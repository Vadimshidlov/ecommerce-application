import React, { useState } from "react";
import { ButtonIcon } from "shared/components/ButtonIcon/ButtonIcon";
import search from "assets/svg/search.svg";
import { IQueryParams } from "view/app-components/ShopPage/Filter/Filter";

type SearchType = {
    onChangeSearch: ({ param, type }: IQueryParams) => void;
};

export function Search({ onChangeSearch }: SearchType) {
    const [searchValue, setSearchValue] = useState("");

    return (
        <div className="search">
            <div className="search__input-wrapper">
                <input
                    type="text"
                    className="inter-400-font font-size_m search__input"
                    placeholder="Search products"
                    onChange={(event) => setSearchValue(event.target.value)}
                    onKeyDown={(event) =>
                        event.key === "Enter" &&
                        onChangeSearch({ param: searchValue, type: "search" })
                    }
                    onInput={(event) =>
                        !(event.target as HTMLInputElement).value &&
                        onChangeSearch({ param: "", type: "search" })
                    }
                />
                <ButtonIcon
                    url={search}
                    altText="close-btn"
                    classes="search__btn"
                    onClick={() =>
                        searchValue && onChangeSearch({ param: searchValue, type: "search" })
                    }
                />
            </div>
        </div>
    );
}
