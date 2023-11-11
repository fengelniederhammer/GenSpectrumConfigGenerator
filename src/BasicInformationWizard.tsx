import {
    Box,
    Checkbox,
    FormGroup,
    FormLabel,
    MenuItem,
    Select,
    Stack,
    Switch,
    TextField,
    Typography,
} from '@mui/material';
import {
    ConfigContext,
    LAPIS_OPENNESS_OPEN,
    LAPIS_OPENNESS_PROTECTED,
    OpennessLevel,
    PartialConfig,
} from './configContext.tsx';
import { useContext, useEffect } from 'react';

const features = [
    {
        featureName: 'sarsCoV2VariantQuery',
        label: 'SARS CoV2 Variant Query',
    },
];

export function BasicInformationWizard() {
    const { config, modifyConfigField } = useContext(ConfigContext);

    useEffect(() => {
        if (config.opennessLevel === undefined) {
            modifyConfigField('opennessLevel', LAPIS_OPENNESS_OPEN);
        }
    }, [config.opennessLevel, modifyConfigField]);

    return (
        <>
            <h1>Basic Information</h1>
            <TextField
                label='Instance Name'
                variant='outlined'
                onChange={(event) => modifyConfigField('instanceName', event.target.value)}
                defaultValue={config.instanceName ?? ''}
            />
            <Stack direction='row' spacing={1} alignItems='center'>
                <Typography>SILO/LAPIS</Typography>
                <Switch />
                <Typography>Pathoplexus</Typography>
            </Stack>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Typography>LAPIS Openness</Typography>
                <Select
                    defaultValue={config.opennessLevel ?? LAPIS_OPENNESS_OPEN}
                    onChange={(event) => modifyConfigField('opennessLevel', event.target.value as OpennessLevel)}
                >
                    <MenuItem value={LAPIS_OPENNESS_OPEN}>Open</MenuItem>
                    <MenuItem value={LAPIS_OPENNESS_PROTECTED}>Protected</MenuItem>
                </Select>
            </Box>
            <FeaturesModifier />
        </>
    );
}

function FeaturesModifier() {
    const { config, modifyFeatureFields } = useContext(ConfigContext);

    return (
        <FormGroup>
            <FormLabel>LAPIS Features</FormLabel>
            {features.map(({ featureName, label }) => (
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <FormLabel>{label}</FormLabel>
                    <Checkbox
                        key={featureName}
                        onChange={(event) => modifyFeatureFields(featureName, event.target.checked ? 'add' : 'delete')}
                        defaultChecked={hasFeature(config, featureName)}
                    />
                </Box>
            ))}
        </FormGroup>
    );
}

function hasFeature(config: PartialConfig, featureName: string) {
    return config.features?.some((feature) => feature.name === featureName) ?? false;
}
