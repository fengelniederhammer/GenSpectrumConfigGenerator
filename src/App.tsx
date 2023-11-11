import { Box, Button } from '@mui/material';
import { Config, ConfigProvider, PartialConfig } from './configContext.tsx';
import { Dispatch, SetStateAction, useState } from 'react';
import { ConfigWizard } from './ConfigWizard.tsx';
import { Results } from './Results.tsx';
import { UploadConfig } from './UploadConfig.tsx';
import { load } from 'js-yaml';

export default function App() {
    const [config, setConfig] = useState<PartialConfig | undefined>(undefined);

    if (config === undefined) {
        return (
            <Box style={{ textAlign: 'center' }}>
                <h1>Config Generator</h1>
                <Button onClick={() => setConfig({ metadata: [] })} variant='contained'>
                    New
                </Button>
                <UploadConfig onUpload={(file) => readAndSetConfigFile(file, setConfig)} />
            </Box>
        );
    }

    return (
        <ConfigProvider initialConfig={config}>
            <Box sx={{ display: 'flex' }}>
                <ConfigWizard />
                <Results />
            </Box>
        </ConfigProvider>
    );
}

function readAndSetConfigFile(file: File, setConfig: Dispatch<SetStateAction<PartialConfig | undefined>>) {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
        if (!fileReader.result) {
            return;
        }
        const fileContent = fileReader.result.toString();
        const config = load(fileContent);
        setConfig((config as { schema: Config }).schema);
    };
    fileReader.readAsText(file);
}
