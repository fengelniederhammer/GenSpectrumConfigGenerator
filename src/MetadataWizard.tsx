import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Tooltip,
} from '@mui/material';
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
                <Stack direction='column' spacing={2}>
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
    const [autocomplete, setAutocomplete] = useState(false);
    const [required, setRequired] = useState(false);
    const [notSearchable, setNotSearchable] = useState(false);

    return (
        <>
            <Stack direction={'row'}>
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

                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id='select-metadata-type-select-label'>Type</InputLabel>
                        <Select
                            id='select-metadata-type-select-label'
                            value={metadataType}
                            onChange={(event: SelectChangeEvent) => {
                                const type = event.target.value as MetadataType;
                                setMetadataType(type);
                                updateMetadata({ ...metadata, type }, index);
                            }}
                        >
                            <MenuItem value={'string'}>String</MenuItem>
                            <MenuItem value={'date'}>Date</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
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
            </Stack>
            <Box sx={{ display: 'flex' }}>
                <FormControl sx={{ m: 3 }} component='fieldset' variant='standard'>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={autocomplete}
                                    onChange={(event) => {
                                        const useAutocomplete = event.target.checked;
                                        setAutocomplete(useAutocomplete);
                                        updateMetadata({ ...metadata, autocomplete: useAutocomplete }, index);
                                    }}
                                />
                            }
                            label='autocomplete'
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={required}
                                    onChange={(event) => {
                                        setRequired(event.target.checked);
                                        updateMetadata({ ...metadata, required: event.target.checked }, index);
                                    }}
                                />
                            }
                            label='required'
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={notSearchable}
                                    onChange={(event) => {
                                        setNotSearchable(event.target.checked);
                                        updateMetadata({ ...metadata, notSearchable: event.target.checked }, index);
                                    }}
                                />
                            }
                            label='not searchable'
                        />
                    </FormGroup>
                </FormControl>
            </Box>
        </>
    );
}
