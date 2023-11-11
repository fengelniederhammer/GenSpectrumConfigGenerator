import { createContext, FC, PropsWithChildren } from 'react';

export const LAPIS_OPENNESS_OPEN = 'OPEN';
export const LAPIS_OPENNESS_PROTECTED = 'PROTECTED';

export type Config = {};

export const ConfigContext = createContext<Config>({});

export const ConfigProvider: FC<
    PropsWithChildren<{
        initialConfig: Config;
    }>
> = ({ children, initialConfig }) => {
    return <ConfigContext.Provider value={initialConfig}>{children}</ConfigContext.Provider>;
};
