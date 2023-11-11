import { FC, useContext, useMemo } from 'react';
import { ConfigContext } from './configContext';
import { dump } from 'js-yaml';
import { Box, Button, TextField } from '@mui/material';

export const Results: FC = () => {
    const { config } = useContext(ConfigContext);

    const yaml = useMemo(() => dump({ schema: config }), [config]);

    function handleDownload() {
        const blob = new Blob([yaml], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `config.yaml`;
        a.click();

        URL.revokeObjectURL(url);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'column',
                p: 5,
                m: 2,
                gap: 5,
                bgcolor: 'background.paper',
                width: '40%',
            }}
        >
            <h2>Results</h2>
            <TextField
                multiline
                fullWidth
                rows={30}
                value={yaml}
                sx={{ fontFamily: 'monospace' }}
                inputProps={{ readOnly: true }}
            />
            <Button variant='contained' onClick={handleDownload}>
                Download
            </Button>
        </Box>
    );
};
