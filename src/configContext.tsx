import { createContext, FC, PropsWithChildren, useState } from 'react';

export type ConfigType = 'SILO' | 'Pathoplexus';

export const LAPIS_OPENNESS_OPEN = 'OPEN';
export const LAPIS_OPENNESS_PROTECTED = 'PROTECTED';

export type OpennessLevel = typeof LAPIS_OPENNESS_OPEN | typeof LAPIS_OPENNESS_PROTECTED;

export type Config = {
    instanceName: string;
    opennessLevel: OpennessLevel;
    metadata: Metadata[];
    primaryKey: string;
    dateToSortBy: string;
    partitionBy: string;
    tableColumns: string[];
    features: Feature[];
};

export type PartialConfig = Partial<Config> & { metadata: Metadata[] };

export type ConfigContextType = {
    configType: ConfigType;
    setConfigType: (configType: ConfigType) => void;
    config: PartialConfig;
    addNewMetadata: () => void;
    updateMetadata: (metadata: Metadata, index: number) => void;
    deleteMetadata: (index: number) => void;
    addNewTableColumn: (newColumnName: string) => void;
    updateTableColumn: (columnName: string, index: number) => void;
    deleteTableColumn: (index: number) => void;
    modifyConfigField: <T extends keyof Config>(field: T, value: Config[T]) => void;
    modifyFeatureFields: (featureName: string, action: 'add' | 'delete') => void;
};

export type MetadataType =
    | 'string'
    | 'date'
    | 'pango_lineage'
    | 'int'
    | 'float'
    | 'insertion'
    | 'aaInsertion'
    | 'boolean';

export type Metadata = {
    name: string;
    type: MetadataType;
    generateIndex: boolean;
    autocomplete?: boolean;
    required?: boolean;
    notSearchable?: boolean;
};

export type Feature = {
    name: string;
};

export const ConfigContext = createContext<ConfigContextType>({
    configType: 'SILO',
    setConfigType: () => {},
    config: { metadata: [], primaryKey: '', tableColumns: [] },
    addNewMetadata: () => {},
    updateMetadata: () => {},
    deleteMetadata: () => {},
    addNewTableColumn: () => {},
    updateTableColumn: () => {},
    deleteTableColumn: () => {},
    modifyConfigField: () => {},
    modifyFeatureFields: () => {},
});

export const ConfigProvider: FC<PropsWithChildren<{ initialConfig: PartialConfig }>> = ({
    children,
    initialConfig,
}) => {
    const [config, setConfig] = useState(initialConfig);
    const [configType, setConfigType] = useState<ConfigType>('SILO');

    const addNewMetadata = () => {
        const metadata: Metadata = {
            name: 'New Metadata',
            type: 'string',
            generateIndex: false,
        };

        const existingMetadata = config.metadata.filter((metadata) => metadata.name.startsWith('New Metadata'));

        if (existingMetadata.length > 0) {
            metadata.name = `${metadata.name} (${existingMetadata.length + 1})`;
        }

        setConfig({
            ...config,
            metadata: [...config.metadata, metadata],
        });
    };

    const updateMetadata = (metadata: Metadata, index: number) => {
        setConfig({
            ...config,
            metadata: [...config.metadata.slice(0, index), metadata, ...config.metadata.slice(index + 1)],
        });
    };

    const deleteMetadata = (index: number) => {
        setConfig({
            ...config,
            metadata: [...config.metadata.slice(0, index), ...config.metadata.slice(index + 1)],
        });
    };

    const addNewTableColumn = (newColumnName: string) => {
        setConfig({
            ...config,
            tableColumns: [...(config.tableColumns ?? []), newColumnName],
        });
    };

    const updateTableColumn = (newColumnName: string, index: number) => {
        setConfig({
            ...config,
            tableColumns: [
                ...(config.tableColumns ?? []).slice(0, index),
                newColumnName,
                ...(config.tableColumns ?? []).slice(index + 1),
            ],
        });
    };

    const deleteTableColumn = (index: number) => {
        setConfig({
            ...config,
            tableColumns: [
                ...(config.tableColumns ?? []).slice(0, index),
                ...(config.tableColumns ?? []).slice(index + 1),
            ],
        });
    };
    return (
        <ConfigContext.Provider
            value={{
                configType,
                setConfigType,
                config,
                updateMetadata,
                addNewMetadata,
                deleteMetadata,
                addNewTableColumn,
                updateTableColumn,
                deleteTableColumn,
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
