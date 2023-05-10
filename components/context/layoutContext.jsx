import { useEffect, useState, createContext } from "react";
import { useRouter } from "next/router";

export const LayoutContext = createContext();

export const Layout = (props) => {
    return (
        <LayoutContext.Provider value={{}}>
            <div>hello</div>
            {props.children}
            <div>byeee</div>
        </LayoutContext.Provider>
    );
};
