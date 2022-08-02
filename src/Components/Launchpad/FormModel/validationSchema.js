import * as Yup from 'yup';
import moment from 'moment';
import checkoutFormModel from './checkoutFormModel';
const {
  formField: {
    tokenAddress,
    network,
    rate,
    hardCap,
    maxBuy,
    startDate,
    endDate,
    firstRelease,
    vestingPeriod,
    eachRelease,
    projectName,
    logoUrl
  }
} = checkoutFormModel;

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  Yup.object().shape({
    [tokenAddress.name]: Yup.string()
      .required(`${tokenAddress.requiredErrorMsg}`)
      .test('len', `${tokenAddress.validTokenErrorMsg}`, val => val && val.length === 42),
    [network.name]: Yup.string()
      .nullable()
      .required(`${network.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    [rate.name]: Yup.string().required(`${rate.requiredErrorMsg}`),
    [hardCap.name]: Yup.string().required(`${hardCap.requiredErrorMsg}`),
    [maxBuy.name]: Yup.string().required(`${maxBuy.requiredErrorMsg}`),
    [startDate.name]: Yup.string()
      .nullable()
      .required(`${startDate.requiredErrorMsg}`)
      .test('expDate', startDate.invalidErrorMsg, val => {
        if (val) {
          const startDate = new Date();
          const endDate = new Date(2050, 12, 31);
          if (moment(val, moment.ISO_8601).isValid()) {
            return moment(val).isBetween(startDate, endDate);
          }
          return false;
        }
        return false;
      }),
    [endDate.name]: Yup.string()
      .nullable()
      .required(`${endDate.requiredErrorMsg}`)
      .test('expDate', endDate.invalidErrorMsg, val => {
        if (val) {
          const startDate = new Date();
          const endDate = new Date(2050, 12, 31);
          if (moment(val, moment.ISO_8601).isValid()) {
            return moment(val).isBetween(startDate, endDate);
          }
          return false;
        }
        return false;
      }),
      // [firstRelease.name]: Yup.string().required(`${firstRelease.requiredErrorMsg}`),
      // [vestingPeriod.name]: Yup.string().required(`${vestingPeriod.requiredErrorMsg}`),
      // [eachRelease.name]: Yup.string().required(`${eachRelease.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    [projectName.name]: Yup.string().required(`${projectName.requiredErrorMsg}`),
    [logoUrl.name]: Yup.string().required(`${logoUrl.requiredErrorMsg}`)
  })
];
