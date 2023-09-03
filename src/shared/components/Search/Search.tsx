import React, { useState } from "react";
// import { LogoLink } from "view/app-components/Header/LogoLink/LogoLink";
import { ButtonIcon } from "shared/components/ButtonIcon/ButtonIcon";
// import close from "assets/svg/close.svg";
import search from "assets/svg/search.svg";
import { IQueryParams } from "view/app-components/ShopPage/Filter/Filter";

type SearchType = {
    onChangeFn: ({ param, type }: IQueryParams) => void;
};

export function Search({ onChangeFn }: SearchType) {
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
                        event.key === "Enter" && onChangeFn({ param: searchValue, type: "search" })
                    }
                    onInput={(event) =>
                        !(event.target as HTMLInputElement).value &&
                        onChangeFn({ param: "", type: "search" })
                    }
                />
                <ButtonIcon
                    url={search}
                    altText="close-btn"
                    classes="search__btn"
                    onClick={() =>
                        searchValue && onChangeFn({ param: searchValue, type: "search" })
                    }
                />
            </div>
        </div>
    );

    // return (
    //     <>
    //         <div className="search-overlay" />
    //         <div className="search">
    //             <div className="search__header container">
    //                 <LogoLink />
    //                 <ButtonIcon
    //                     url={close}
    //                     altText="close-btn"
    //                     classes="search__close-btn"
    //                     onClick={handleClose}
    //                 />
    //             </div>
    //             <div className="search__input-wrapper container">
    //                 <input
    //                     type="text"
    //                     className="inter-400-font font-size_m search__input"
    //                     placeholder="Search products"
    //                 />
    //                 <ButtonIcon url={search} altText="close-btn" classes="search__btn" />
    //             </div>
    //         </div>
    //     </>
    // );
}
