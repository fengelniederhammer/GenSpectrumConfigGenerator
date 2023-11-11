// write a component that reads the results from the context and displays them in a list

import {FC, useContext} from 'react';
import {ConfigContext} from "./configContext";
import {dump} from "js-yaml";
import {Box} from "@mui/material";

export const Results : FC  = () => {
    const configContext = useContext(ConfigContext);


    function handleDownload() {

        const blob = new Blob([dump(configContext)], { type: 'text/plain' });
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
                width: '33%'
            }}
        >
            <h2>Results</h2>
            <div>
                {dump(configContext)}
            </div>
            <button onClick={handleDownload}>Download</button>
        </Box>

    );
}

