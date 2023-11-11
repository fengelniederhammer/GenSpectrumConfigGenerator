import { FC, useContext, useMemo } from 'react';
import { ConfigContext } from './configContext';
import { dump } from 'js-yaml';
import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { pathoplexusConfigSchema } from './pathoplexusConfig.ts';
import { siloConfigSchema } from './siloConfig.ts';

export const Results: FC = () => {
    const { config, configType } = useContext(ConfigContext);

    let zodParseResult;
    let configToExport: object;
    if (configType === 'Pathoplexus') {
        configToExport = {
            instanceName: config.instanceName,
            opennessLevel: config.opennessLevel,
            metadata: config.metadata,
            website: {
                tableColumns: config.tableColumns,
            },
            silo: {
                dateToSortBy: config.dateToSortBy,
                partitionBy: config.partitionBy,
            },
        };
        zodParseResult = pathoplexusConfigSchema.safeParse(configToExport);
    } else {
        configToExport = config;
        zodParseResult = siloConfigSchema.safeParse(configToExport);
    }

    if (zodParseResult.success) {
        configToExport = zodParseResult.data;
    }

    const yaml = useMemo(() => dump({ schema: configToExport }), [configToExport]);

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
                value={yaml}
                sx={{ fontFamily: 'monospace' }}
                inputProps={{ readOnly: true }}
            />
            <Button variant='contained' onClick={handleDownload} disabled={!zodParseResult.success}>
                Download
            </Button>
            {!zodParseResult.success && (
                <Alert severity='error'>
                    <Typography>Errors: </Typography>
                    <TextField
                        multiline
                        fullWidth
                        value={JSON.stringify(zodParseResult.error, null, 2)}
                        sx={{ fontFamily: 'monospace' }}
                        inputProps={{ readOnly: true }}
                    />
                </Alert>
            )}
        </Box>
    );
};
