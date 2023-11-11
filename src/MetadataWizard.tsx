import { Box, IconButton, MenuItem, Paper, Select, Stack, TextField, Tooltip } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext, useState } from 'react';
import { ConfigContext, Metadata, MetadataType } from './configContext.tsx';
import { Add } from '@mui/icons-material';

export function MetadataWizard() {
    const { config, addNewMetadata } = useContext(ConfigContext);
    return (
        <>
            <Stack direction='column'>
                <h1>Metadata</h1>
                <Stack direction='column'>
                    {config.metadata.map((metadata, index) => {
                        return (
                            <Paper key={metadata.name}>
                                <MetadataField metadata={metadata} index={index} />
                            </Paper>
                        );
                    })}
                </Stack>
                <IconButton
                    onClick={() => {
                        addNewMetadata();
                    }}
                >
                    <Add />
                </IconButton>
            </Stack>
        </>
    );
}

export function MetadataField({ index, metadata }: { index: number; metadata: Metadata }) {
    const { config, updateMetadata, deleteMetadata } = useContext(ConfigContext);

    const [metadataType, setMetadataType] = useState<MetadataType>('string');
    const [metadataName, setMetadataName] = useState(metadata.name);
    const [error, setError] = useState(false);

    return (
        <Box>
            <TextField
                error={error}
                defaultValue={metadataName}
                onChange={(event) => {
                    if (config.metadata.filter((metadata) => metadata.name === event.target.value).length > 0) {
                        setError(true);
                        return;
                    }
                    setMetadataName(event.target.value);
                }}
                onBlur={() => {
                    updateMetadata({ ...metadata, name: metadataName }, index);
                }}
            />

            <Select
                sx={{ minWidth: '100px' }}
                value={metadataType}
                labelId='select-medatata-type-label'
                onChange={(event) => {
                    const type = event.target.value as MetadataType;
                    setMetadataType(type);
                    updateMetadata({ ...metadata, type: type }, index);
                }}
            >
                <MenuItem value='string'>String</MenuItem>
                <MenuItem value='date'>Date</MenuItem>
            </Select>

            <Tooltip title={'Stuff'}>
                <IconButton>
                    <HelpIcon />
                </IconButton>
            </Tooltip>

            <IconButton
                onClick={() => {
                    deleteMetadata(index);
                }}
            >
                <DeleteIcon />
            </IconButton>
        </Box>
    );
}
