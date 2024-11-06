import React from "react";

const sizes = {
    textxs: "text-[63px] font-normal not-italic lg:text-[63px] md:text-[48px]",
    texts: "text-[70px] font-normal not-italic lg:text-[70px] md:text-[48px]",
};

const Text = ({ children, className = "", as, size="texts", ...restProps }) => {
    const Component = as || "p";

    return(
        <Component classname={'text-black-900 font-inter ${className} ${sizes[size]}'} {...restProps}>
            {children}
        </Component>
    );
};

export {Text};

