import React, { useState, useEffect } from "react";
import { addDoc } from 'firebase/firestore';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { Formik, Form } from "formik";

import TokenForm from "./Forms/TokenForm";
import LaunchpadForm from "./Forms/LaunchpadForm";
import AdditionalInfoForm from "./Forms/AdditionalInfoForm";
import Review from "./Review";
import SubmitSuccess from "./SubmitSuccess";

import validationSchema from "./FormModel/validationSchema";
import checkoutFormModel from "./FormModel/checkoutFormModel";
import formInitialValues from "./FormModel/formInitialValues";

import useStyles from "./styles";

import { ethers } from 'ethers';
import contract_abi from '../../contracts/IDO_abi.json';
import contract_meta from '../../contracts/IDO_metadata.json';
import token_abi from '../../contracts/Token_abi.json';

import { projectCollectionRef } from '../../lib/firebase.collections'

import "./index.scss";

const steps = ["Verify Token", "IDO Project Info", "Additional Info", "Finish"];
const { formId, formField } = checkoutFormModel;

function _renderStepContent(step) {
  switch (step) {
    case 0:
      return <TokenForm formField={formField} />;
    case 1:
      return <LaunchpadForm formField={formField} />;
    case 2:
      return <AdditionalInfoForm formField={formField} />;
    case 3:
      return <Review />;
    default:
      return <div>Not Found</div>;
  }
}

const Create = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [tokenName, setTokenName] = useState(null);
  const [tokenSymbol, setTokenSymbol] = useState(null);
  const [tokenDecimals, setTokenDecimals] = useState(null);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  const account = localStorage.getItem("setFullAddress");

  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);

    const contract_bytecode = '0x' + contract_meta.object;

    if (typeof window.ethereum !== undefined) {
      await window.ethereum.enable();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const factory = new ethers.ContractFactory(contract_abi, contract_bytecode, signer);
      const contract = await factory.deploy(values.rate, account, values.tokenAddress, "18");

      console.log("IDO created: " + new Date().toLocaleString());
      console.log("Tx hash: " + contract.deployTransaction.hash);

      await contract.deployed();
      localStorage.setItem('IDOProjectContractAddress', contract.address);

      console.log("Contract address: " + contract.address);

      const tokenContract = new ethers.Contract(values.tokenAddress, token_abi, signer);

      let tx = await tokenContract.transfer(contract.address, ethers.utils.parseEther((values.hardCap * values.rate).toString()));
      await tx.wait();

      const t_name = await tokenContract.name();
      setTokenName(t_name);

      const t_symbol = await tokenContract.symbol();
      setTokenSymbol(t_symbol);

      const t_decimals = await tokenContract.decimals();
      setTokenDecimals(t_decimals);

      const IDOContract = new ethers.Contract(contract.address, contract_abi, signer);
      const start = new Date(values.startDate);
      const startTimestamp = Math.floor(start.getTime() / 1000) - 4*60*60;

      const end = new Date(values.endDate);
      const endTimestamp = Math.floor(end.getTime() / 1000) - 4*60*60;
      let trx = await IDOContract.startIDO(startTimestamp, endTimestamp, values.maxBuy.toString(), values.hardCap.toString());
      await trx.wait();

      _saveIDOProject(values, contract.address);
    }
    actions.setSubmitting(false);

    setActiveStep(activeStep + 1);
  }

  function _handleSubmit(values, actions) {
    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  function _saveIDOProject(formValues, contract_address) {
    console.log(tokenName);
    addDoc(projectCollectionRef, {
      address: contract_address,
      token_address: formValues.tokenAddress,
      token_name: tokenName,
      token_symbol: tokenSymbol,
      token_decimals: tokenDecimals,
      rate: formValues.rate,
      hardcap: formValues.hardCap,
      max_buy: formValues.maxBuy,
      start: formValues.startDate,
      end: formValues.endDate,
      name: formValues.projectName,
      logo_url: formValues.logoUrl,
      website: formValues.website,
      facebook: formValues.facebook,
      twitter: formValues.twitter,
      github: formValues.github,
      telegram: formValues.telegram,
      instagram: formValues.instagram,
      discord: formValues.discord,
      reddit: formValues.reddit,
      description: formValues.description
    }).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error.message)
    })
  }

  return (
    <div className="main-area">
      <div className="container mt-50">
        <h3 className="text-white">Create Launchpad</h3>
        <React.Fragment>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel className="text-white">{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <SubmitSuccess />
            ) : (
              <Formik
                initialValues={formInitialValues}
                validationSchema={currentValidationSchema}
                onSubmit={_handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="main-form" id={formId}>
                    {_renderStepContent(activeStep)}

                    <div className={classes.buttons}>
                      {activeStep !== 0 && (
                        <Button
                          onClick={_handleBack}
                          className={classes.button}
                        >
                          Back
                        </Button>
                      )}
                      <div className={classes.wrapper}>
                        <Button
                          disabled={isSubmitting}
                          type="submit"
                          variant="contained"
                          color="primary"
                          className={classes.button}
                        >
                          {isLastStep ? "Submit" : "Next"}
                        </Button>

                        {isSubmitting && (
                          <CircularProgress
                            size={24}
                            className={classes.buttonProgress}
                          />
                        )}
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            )}
          </React.Fragment>
        </React.Fragment>
      </div>
    </div>
  );
};

export default Create;
