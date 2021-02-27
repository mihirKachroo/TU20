import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  makeStyles
} from '@material-ui/core';
import Web3 from 'web3';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));
async function readOnChainData(aAddress) {
  const web3 = new Web3(Web3.givenProvider);
  web3.eth.getBalance('0x3Ee4Ec52CfB109CB820c455657C294e0eCBdd003').then(console.log);
  const fromAddress = aAddress;
  const tokenAddress = '0x9717208d0bbffa0951a4651713402ae62914c606';
  // const fromAddress = '0x28458151eC48491e91022Db4EFe259358F45b30D';
  const minABI = [
    {
      constant: true,
      inputs: [{ name: '_owner', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ name: 'balance', type: 'uint256' }],
      type: 'function'
    },
    // transfer
    {
      constant: false,
      inputs: [
        {
          name: '_to',
          type: 'address'
        },
        {
          name: '_value',
          type: 'uint256'
        }
      ],
      name: 'transfer',
      outputs: [
        {
          name: '',
          type: 'bool'
        }
      ],
      type: 'function'
    }
  ];
  // Get ERC20 Token contract instance
  const contract = new web3.eth.Contract(minABI, tokenAddress);
  await contract.methods
    .balanceOf(fromAddress)
    .call()
    .then((result) => {
      const res = web3.utils.toBN(result);
      const res2 = res / 10 ** 2;
      console.log(res2);
    });
}

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();
  const [formData, updateFormData] = React.useState('');

  const handleChange = (e) => {
    updateFormData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    readOnChainData(formData);
    console.log(formData);
    // ... submit to API or something
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField fullWidth placeholder="Enter your wallet address" variant="outlined" onChange={handleChange} />
              <br />
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
