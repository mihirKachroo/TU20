/* eslint no-var: off */

import React, { useState } from 'react';
import {
  Typography,
  Card,
  TextField,
  Button,
  CardContent
} from '@material-ui/core';
import Web3 from 'web3';

const Erc = () => {
  const [formData, updateFormData] = React.useState('');
  const [count, setCount] = useState('');
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
        setCount(res2);
        console.log(res2);
      });
  }
  const handleChange = (e) => {
    updateFormData(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    readOnChainData(formData);
    console.log(formData);
  };

  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom variant="h6">
          CHECK ACCOUNT BALANCE
        </Typography>
        <TextField fullWidth placeholder="Enter your wallet address" onChange={handleChange} style={{ marginBottom: '10px' }} />
        <Typography color="textSecondary" gutterBottom variant="h6">
          Account Balance:
          {count}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </CardContent>
    </Card>
  );
};

export default Erc;
/*
  const tokenAddress = '0x9717208d0bbffa0951a4651713402ae62914c606';
  const toAddress = '0x3Ee4Ec52CfB109CB820c455657C294e0eCBdd003';
  const decimals = web3.utils.toBN(2);
  const amount = web3.utils.toBN(3);
  const minABI = [
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
  const contract = new web3.eth.Contract(minABI).at(tokenAddress);
  // calculate ERC20 token amount
  const value = amount.times(web3.toBigNumber(10).pow(decimals));
  // call transfer function
  contract.transfer(toAddress, value, (error, txHash) => {
    // it returns tx hash because sending tx
    console.log(txHash);
  }); */
