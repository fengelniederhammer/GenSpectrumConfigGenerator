import {createContext, FC, PropsWithChildren, useState} from 'react';

export const LAPIS_OPENNESS_OPEN = 'OPEN';
export const LAPIS_OPENNESS_PROTECTED = 'PROTECTED';

export type Config = {
    metadata: Metadata[]
};

export type ConfigContextType = {
    config: Config,
    setConfig: (config: Config) => void
    addMetadata: (metadata: Metadata) => void
}

export type MetadataType = 'string' | 'date'

export type Metadata = {
    name: string,
    type: MetadataType,
    generateIndex: boolean
}

export const ConfigContext = createContext<ConfigContextType>({
    config: {metadata: []},
    setConfig: () => {
    },
    addMetadata: () => {
    }
})


export const ConfigProvider: FC<PropsWithChildren<{
    initialConfig: Config
}>> = ({children, initialConfig}) => {
    const [config, setConfig] = useState(initialConfig)
    
    const addMetadata = (metadata: Metadata) => {
        setConfig({
            ...config,
            metadata: [
                ...config.metadata,
                metadata
            ]
        })
    }

    return <ConfigContext.Provider value={{config, setConfig, addMetadata}}>{children}</ConfigContext.Provider>;
};
