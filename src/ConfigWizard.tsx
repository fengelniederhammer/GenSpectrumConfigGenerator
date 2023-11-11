import { useContext, useState } from 'react';
import { ConfigContext } from './configContext.tsx';
import { Box, Button, Step, StepButton, Stepper, Typography } from '@mui/material';

const steps = ['Basic Information', 'Metadata', 'Additional Information'];
const totalSteps = steps.length;

export function ConfigWizard() {
    const configContext = useContext(ConfigContext);

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((activeStep) => activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepButton color='inherit' onClick={handleStep(index)}>
                            {label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
            <div>
                <Typography sx={{ mt: 2, mb: 1, py: 1 }}>Step {activeStep + 1}</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button color='inherit' onClick={handleBack} sx={{ mr: 1 }} disabled={activeStep <= 0}>
                        Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleNext} sx={{ mr: 1 }} disabled={activeStep >= totalSteps - 1}>
                        Next
                    </Button>
                </Box>
            </div>
        </Box>
    );
}
