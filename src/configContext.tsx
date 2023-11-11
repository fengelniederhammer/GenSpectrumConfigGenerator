import {createContext, FC, PropsWithChildren} from 'react';

export const LAPIS_OPENNESS_OPEN = 'OPEN';
export const LAPIS_OPENNESS_PROTECTED = 'PROTECTED';

export type Config = {
    metadata: Metadata[]
};

export type MetadataType = 'string' | 'date'

export type Metadata = {
    name: string,
    type: MetadataType,
    generateIndex: boolean
}

export const ConfigContext = createContext<Config>({metadata: []});

export const ConfigProvider: FC<PropsWithChildren<{
    initialConfig: Config
}>> = ({children, initialConfig}) => {
    return <ConfigContext.Provider value={initialConfig}>{children}</ConfigContext.Provider>;
};
