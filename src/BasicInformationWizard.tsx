import {
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    FormLabel,
    MenuItem,
    Select,
    Stack,
    Switch,
    TextField,
    Typography,
} from '@mui/material';
import { LAPIS_OPENNESS_OPEN, LAPIS_OPENNESS_PROTECTED } from './configContext.tsx';

const sarsCoV2VariantQuery = 'sarsCoV2VariantQuery';

export function BasicInformationWizard() {
    return (
        <>
            <h1>Basic Information</h1>
            <TextField label='Instance Name' variant='outlined' />
            <Stack direction='row' spacing={1} alignItems='center'>
                <Typography>SILO/LAPIS</Typography>
                <Switch />
                <Typography>Pathoplexus</Typography>
            </Stack>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Typography>LAPIS Openness</Typography>
                <Select defaultValue={LAPIS_OPENNESS_OPEN}>
                    <MenuItem value={LAPIS_OPENNESS_OPEN}>Open</MenuItem>
                    <MenuItem value={LAPIS_OPENNESS_PROTECTED}>Protected</MenuItem>
                </Select>
            </Box>
            <FormGroup>
                <FormLabel>LAPIS Features</FormLabel>
                <FormControlLabel control={<Checkbox />} label='SARS CoV2 Variant Query' />
            </FormGroup>
        </>
    );
}
