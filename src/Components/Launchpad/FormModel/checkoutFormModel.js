// eslint-disable-next-line import/no-anonymous-default-export
export default {
  formId: "IDOProjectForm",
  formField: {
    tokenAddress: {
      name: "tokenAddress",
      label: "Token address*",
      requiredErrorMsg: "Token address is required",
      validTokenErrorMsg: "Invalid Token Address"
    },
    tokenName: {
      name: "tokenName"
    },
    tokenSymbol: {
      name: "tokenSymbol"
    },
    tokenDecimals: {
      name: "tokenDecimals"
    },
    network: {
      name: 'network',
      label: 'Network*',
      requiredErrorMsg: "Network is required",
    },
    rate: {
      name: "rate",
      label: "Rate*",
      requiredErrorMsg: "Rate is required",
    },
    hardCap: {
      name: "hardCap",
      label: "Hardcap (SYS)*",
      requiredErrorMsg: "Hardcap is required",
    },
    maxBuy: {
      name: "maxBuy",
      label: "Maximum Buy (SYS)*",
      requiredErrorMsg: "Maximum Buy is required",
    },
    startDate: {
      name: "startDate",
      label: "Start date (UTC)*",
      requiredErrorMsg: "Start date is required",
      invalidErrorMsg: "Start date is not valid",
    },
    endDate: {
      name: "endDate",
      label: "End date (UTC)*",
      requiredErrorMsg: "End date is required",
      invalidErrorMsg: "End date is not valid",
    },
    // useVestingRule: {
    //   name: "useVestingRule",
    //   label: "Using Vesting Contributor?",
    // },
    // firstRelease: {
    //   name: 'firstRelease',
    //   label: 'First release for private sale (percent)*',
    //   requiredErrorMsg: "First release for private sale cannot be blank",
    // },
    // vestingPeriod: {
    //   name: 'vestingPeriod',
    //   label: 'Vesting period each cycle (days)*',
    //   requiredErrorMsg: "Vesting period each cycle cannot be blank",
    // },
    // eachRelease: {
    //   name: 'eachRelease',
    //   label: 'Private sale token release each cycle (percent)*',
    //   requiredErrorMsg: "Private sale token release each cycle cannot be blank",
    // },
    projectName: {
      name: 'projectName',
      label: 'Project Name*',
      requiredErrorMsg: "Project Name is required",
    },
    logoUrl: {
      name: 'logoUrl',
      label: 'Logo Url*',
      requiredErrorMsg: "Logo URL is required",
    },
    website: {
      name: 'website',
      label: 'Website'
    },
    facebook: {
      name: 'facebook',
      label: 'Facebook'
    },
    twitter: {
      name: 'twitter',
      label: 'Twitter'
    },
    github: {
      name: 'github',
      label: 'Github'
    },
    telegram: {
      name: 'telegram',
      label: 'Telegram'
    },
    instagram: {
      name: 'instagram',
      label: 'Instagram'
    },
    discord: {
      name: 'discord',
      label: 'Discord'
    },
    reddit: {
      name: 'reddit',
      label: 'Reddit'
    },
    description: {
      name: 'description',
      label: 'Description'
    },
  },
};
