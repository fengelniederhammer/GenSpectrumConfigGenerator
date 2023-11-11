import React, { FC, PropsWithChildren } from 'react';

export type Config = {};

export const ConfigContext = React.createContext<Config>({});

export const ConfigProvider: FC<PropsWithChildren> = ({ children }) => {
    const config = {};

    return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
};
