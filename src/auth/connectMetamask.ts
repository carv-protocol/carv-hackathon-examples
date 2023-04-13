import Web3 from 'web3';

export default async function connectMetamask() {
  if (!window.ethereum) {
    throw new Error('Please install the MetaMask chrome plugin.');
  } else {
    const web3 = new Web3(window.ethereum);

    await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    const originText = `Hello! Please sign this message to confirm your ownership of the address. This action will not cost any gas fee. Here is a unique text: ${Date.now()}`;

    const signature = await web3.eth.personal.sign(originText, address, '');

    return {
      address,
      originText: originText,
      signature,
    };
  }
}
