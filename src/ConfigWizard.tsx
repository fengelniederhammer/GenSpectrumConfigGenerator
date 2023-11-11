import { useState } from 'react';
import { Box, Button, Step, StepButton, Stepper } from '@mui/material';
import { BasicInformationWizard } from './BasicInformationWizard.tsx';
import { MetadataWizard } from './MetadataWizard.tsx';
import { AdditionalInformationWizard } from './AdditionalInformationWizard.tsx';

const steps = ['Basic Information', 'Metadata', 'Additional Information'] as const;
const totalSteps = steps.length;

export function ConfigWizard() {
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
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <WizardForStep step={steps[activeStep]} />
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button variant='outlined' onClick={handleBack} sx={{ mr: 1 }} disabled={activeStep <= 0}>
                        Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button
                        variant='contained'
                        onClick={handleNext}
                        sx={{ mr: 1 }}
                        disabled={activeStep >= totalSteps - 1}
                    >
                        Next
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

function WizardForStep({ step }: { step: (typeof steps)[number] }) {
    switch (step) {
        case 'Basic Information':
            return <BasicInformationWizard />;
        case 'Metadata':
            return <MetadataWizard />;
        case 'Additional Information':
            return <AdditionalInformationWizard />;
    }
}
