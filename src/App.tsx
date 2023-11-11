import {Box, Button} from '@mui/material';
import {Config, ConfigProvider} from './configContext.tsx';
import {useState} from 'react';
import {ConfigWizard} from './ConfigWizard.tsx';
import {Results} from "./Results.tsx";

function App() {
    const [newConfig, setNewConfig] = useState(true);
    const [config, setConfig] = useState<Config>({metadata: []});

    if (newConfig) {
        return (
            <>
                <h1>Config Generator</h1>
                <Button onClick={() => {
                    setNewConfig(false);
                    setConfig({
                        metadata: [
                            {name: 'fromNew', type: 'string', generateIndex: true},
                        ]
                    });
                }}>
                    New
                </Button>
                <Button onClick={() => {
                    setNewConfig(false);
                    setConfig({
                        metadata: [
                            {name: 'fromUpload', type: 'string', generateIndex: true},
                        ]
                    });
                }}>
                    Upload
                </Button>
            </>
        );
    }

    return (
        <ConfigProvider initialConfig={config}>#
            <Box sx={{display: 'flex'}}>
                <ConfigWizard/>
                <Results/>
            </Box>
        </ConfigProvider>
    );
}

export default App;
