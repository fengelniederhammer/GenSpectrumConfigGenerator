import {Box, Button, IconButton, MenuItem, Paper, Select, Stack, TextField, Tooltip} from "@mui/material";
import HelpIcon from '@mui/icons-material/Help';
import {useContext, useState} from "react";
import {ConfigContext} from "./configContext.tsx";


export function MetadataWizard() {
    const {metadata} = useContext(ConfigContext)
    return (
        <>
            <Stack direction="column">
                <h1>Metadata</h1>
                <Stack direction="column">
                    {
                        metadata.map((metadata) => {
                            return (
                                <Paper>
                                    <MetadataField key={metadata.name} name={metadata.name}/>
                                </Paper>
                            )
                        })
                    }
                </Stack>
                <Button>
                    Add
                </Button>
            </Stack>
        </>
    );
}


export function MetadataField({name}: { name: string }) {
    const [metadataName, setMetadataName] = useState("")

    return (
        <Box component="form" onSubmit={() => {
            console.log("submit")
        }}>
            <div>
                {name}
            </div>
            <TextField>
                {metadataName}
            </TextField>
            <Select label="Type" sx={{minWidth: "100px"}} value={"String"}>
                <MenuItem value="string">String</MenuItem>
                <MenuItem value="date">Date</MenuItem>
            </Select>
            <Tooltip title={"Stuff"}>
                <IconButton>
                    <HelpIcon/>
                </IconButton>
            </Tooltip>
            <Button>
                Delete
            </Button>

        </Box>
    );
}