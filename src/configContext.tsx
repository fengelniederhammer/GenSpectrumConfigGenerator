import { createContext, FC, PropsWithChildren, useState } from 'react';

export const LAPIS_OPENNESS_OPEN = 'OPEN';
export const LAPIS_OPENNESS_PROTECTED = 'PROTECTED';

export type OpennessLevel = typeof LAPIS_OPENNESS_OPEN | typeof LAPIS_OPENNESS_PROTECTED;

export type Config = {
    instanceName: string;
    opennessLevel: OpennessLevel;
    metadata: Metadata[];
    primaryKey: string;
    features: Feature[];
};

export type PartialConfig = Partial<Config>;

export type ConfigContextType = {
    config: PartialConfig;
    addMetadata: (metadata: Metadata) => void;
    modifyConfigField: <T extends keyof Config>(field: T, value: Config[T]) => void;
    modifyFeatureFields: (featureName: string, action: 'add' | 'delete') => void;
};

export type MetadataType = 'string' | 'date';

export type Metadata = {
    name: string;
    type: MetadataType;
    generateIndex: boolean;
};

export type Feature = {
    name: string;
};

export const ConfigContext = createContext<ConfigContextType>({
    config: { metadata: [], primaryKey: '' },
    addMetadata: () => {},
    modifyConfigField: () => {},
    modifyFeatureFields: () => {},
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
                modifyFeatureFields: (featureName, action) => {
                    const features = config.features ?? [];

                    const index = features.findIndex((feature) => feature.name === featureName);
                    if (action === 'add' && index === -1) {
                        features.push({ name: featureName });
                    } else if (action === 'delete' && index >= 0) {
                        features.splice(index, 1);
                    }
                    setConfig({ ...config, features });
                },
            }}
        >
            {children}
        </ConfigContext.Provider>
    );
};
