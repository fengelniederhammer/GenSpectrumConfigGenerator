import { createContext, FC, PropsWithChildren, useState } from 'react';

export const LAPIS_OPENNESS_OPEN = 'OPEN';
export const LAPIS_OPENNESS_PROTECTED = 'PROTECTED';

export type Config = {
    metadata: Metadata[];
    primaryKey: string;
};

export type PartialConfig = Partial<Config>;

export type ConfigContextType = {
    config: PartialConfig;
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

export const ConfigProvider: FC<PropsWithChildren<{ initialConfig: PartialConfig }>> = ({
    children,
    initialConfig,
}) => {
    const [config, setConfig] = useState(initialConfig);

    return (
        <ConfigContext.Provider
            value={{
                config,
                addMetadata: (metadata) => setConfig({ ...config, metadata: [...(config.metadata ?? []), metadata] }),
                modifyConfigField: (field, value) => setConfig({ ...config, [field]: value }),
            }}
        >
            {children}
        </ConfigContext.Provider>
    );
};
