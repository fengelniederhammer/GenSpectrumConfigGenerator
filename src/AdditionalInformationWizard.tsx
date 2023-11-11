import { FC, useContext, useMemo } from 'react';
import { ConfigContext, MetadataType } from './configContext.tsx';
import { sentenceCase } from 'change-case';
import {
    Box,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Stack,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

export function AdditionalInformationWizard() {
    return (
        <>
            <h1>Additional Information</h1>
            <Stack direction='column' spacing={5} alignItems='center' py={3}>
                <MetadataDropDown filterByType={'string'} name={'primaryKey'} />
                <MetadataDropDown filterByType={'date'} name={'dateToSortBy'} />
                <MetadataDropDown filterByType={'pango_lineage'} name={'partitionBy'} />
            </Stack>

            <TableColumns />
        </>
    );
}

type MetadataDropDownProps = {
    name: 'primaryKey' | 'dateToSortBy' | 'partitionBy';
    filterByType?: MetadataType;
};
const MetadataDropDown: FC<MetadataDropDownProps> = ({ name, filterByType }) => {
    const { config, modifyConfigField } = useContext(ConfigContext);

    const options = useMemo(
        () =>
            config.metadata!.filter((metadata) => {
                if (filterByType === undefined) {
                    return true;
                }
                return metadata.type === filterByType;
            }),
        [config.metadata, filterByType],
    );

    const handleChange = (event: SelectChangeEvent) => {
        modifyConfigField(name, event.target.value);
    };

    return (
        <>
            <Box sx={{ minWidth: 300, display: 'flex', alignItems: 'center' }}>
                <div style={{ minWidth: 100 }}>{sentenceCase(name)}</div>
                <FormControl fullWidth>
                    <InputLabel>{name}</InputLabel>
                    <Select onChange={handleChange} label={sentenceCase(name)} defaultValue={config[name]}>
                        {options.map((option) => {
                            return (
                                <MenuItem key={option.name} value={option.name}>
                                    {option.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </Box>
        </>
    );
};

function TableColumns() {
    const { config, addNewTableColumn } = useContext(ConfigContext);

    const options = useMemo(() => {
        return config.metadata
            .filter((metadata) => !(config.tableColumns ?? []).includes(metadata.name))
            .map((metadata) => metadata.name);
    }, [config.tableColumns, config.metadata]);

    const handleAddNewTableColumn = () => {
        console.log(options[0]);
        addNewTableColumn(options[0]);
    };
    return (
        <>
            <h2>Table Columns</h2>
            <Stack direction='column'>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Stack direction='column' spacing={3}>
                        {(config.tableColumns ?? []).map((columnName, index) => {
                            return (
                                <Paper key={columnName}>
                                    <TableColumnDropDown columnName={columnName} index={index} />
                                </Paper>
                            );
                        })}
                    </Stack>
                </Box>
                <IconButton onClick={handleAddNewTableColumn} disabled={options.length === 0}>
                    <Add />
                </IconButton>
            </Stack>
        </>
    );
}

function TableColumnDropDown({ index, columnName }: { index: number; columnName: string }) {
    const { config, updateTableColumn, deleteTableColumn } = useContext(ConfigContext);

    const options = useMemo(
        () =>
            config
                .metadata!.filter((metadata) => !(config.tableColumns ?? []).includes(metadata.name))
                .map((metadata) => metadata.name),
        [config.tableColumns, config.metadata],
    );

    return (
        <Stack direction={'row'}>
            <Box sx={{ minWidth: 300 }}>
                <FormControl fullWidth>
                    <InputLabel>{columnName}</InputLabel>
                    <Select
                        onChange={(event) => {
                            updateTableColumn(event.target.value as string, index);
                        }}
                        placeholder={columnName}
                    >
                        {options.map((option) => {
                            return (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </Box>

            <IconButton
                onClick={() => {
                    deleteTableColumn(index);
                }}
            >
                <DeleteIcon />
            </IconButton>
        </Stack>
    );
}
