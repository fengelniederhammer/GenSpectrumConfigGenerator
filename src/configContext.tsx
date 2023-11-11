import { createContext, FC, PropsWithChildren, useState } from 'react';

export const LAPIS_OPENNESS_OPEN = 'OPEN';
export const LAPIS_OPENNESS_PROTECTED = 'PROTECTED';

export type Config = {
    metadata: Metadata[];
    primaryKey: string;
};

export type ConfigContextType = {
    config: Config;
    addMetadata: (metadata: Metadata) => void;
    modifyConfigField: <T extends keyof Config>(field: T, value: Config[T]) => void;
};

export type MetadataType = 'string' | 'date';

export type Metadata = {
    name: string;
    type: MetadataType;
    generateIndex: boolean;
};

export const ConfigContext = createContext<ConfigContextType>({
    config: { metadata: [], primaryKey: '' },
    addMetadata: () => {},
    modifyConfigField: () => {},
});

export const ConfigProvider: FC<PropsWithChildren<{ initialConfig: Config; }>> = ({ children, initialConfig }) => {
    const [config, setConfig] = useState(initialConfig);

    const addMetadata = (metadata: Metadata) => {
        setConfig({
            ...config,
            metadata: [...config.metadata, metadata],
        });
    };

    const modifyConfigField = <T extends keyof Config>(field: T, value: Config[T]) => {
        setConfig({ ...config, [field]: value });
    };

    return (
        <ConfigContext.Provider value={{ config, addMetadata, modifyConfigField }}>{children}</ConfigContext.Provider>
    );
};
