import React from 'react';
import { Typography } from '@material-ui/core';
import Web3 from 'web3';

async function readOnChainData() {
  /*   const tokenAddress = '0x5aD31601E31427d596FEE422c1D1cad3c6fF0274';
  const walconstAddress = '0x28458151eC48491e91022Db4EFe259358F45b30D';

  // The minimum ABI to get ERC20 Token balance
  const minABI = [
    {
      constant: false,
      inputs: [
        {
          name: 'from',
          type: 'address'
        },
        {
          name: 'tokens',
          type: 'uint256'
        },
        {
          name: 'token',
          type: 'address'
        },
        {
          name: 'data',
          type: 'bytes'
        }
      ],
      name: 'receiveApproval',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }
  ]; */

  const web3 = new Web3(Web3.givenProvider);
  // console.log('here');
  // web3.eth.getAccounts(console.log);
  // web3.eth.getBalance('0x28458151eC48491e91022Db4EFe259358F45b30D').then(console.log);
  console.log('herllo');
  const tokenAddress = '0x9717208d0bbffa0951a4651713402ae62914c606';
  const toAddress = '0x3Ee4Ec52CfB109CB820c455657C294e0eCBdd003';
  const fromAddress = '0x28458151eC48491e91022Db4EFe259358F45b30D';
  // Use BigNumber
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
  const contract = new web3.eth.Contract(minABI, tokenAddress);
  // calculate ERC20 token amount
  const value = amount.mul(web3.utils.toBN(10).pow(decimals));
  // call transfer function
  contract.methods
    .transfer(toAddress, value)
    .send({ from: fromAddress })
    .on('transactionHash', (hash) => {
      console.log(hash);
    });
}

const Erc = () => {
  return (
    <div>
      <Typography color="textSecondary" gutterBottom variant="h6">
        BUDGET
      </Typography>
      <button type="button" onClick={readOnChainData}>
        Click me!
      </button>
    </div>
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
