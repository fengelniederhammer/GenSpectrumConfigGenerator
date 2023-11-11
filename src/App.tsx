import { Button } from '@mui/material';
import { ConfigProvider } from './configContext.tsx';
import { useState } from 'react';
import { ConfigWizard } from './ConfigWizard.tsx';

function App() {
    const [newConfig, setNewConfig] = useState(true);

    if (newConfig) {
        return (
            <>
                <h1>Hallo</h1>
                <Button>New</Button>
                <Button>Upload</Button>
            </>
        );
    }

    return (
        <ConfigProvider>
            <ConfigWizard />
        </ConfigProvider>
    );
}

export default App;
