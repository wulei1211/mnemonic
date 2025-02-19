const { bip39 } = require('ethereum-cryptography/bip39');
const { generateMnemonic, mnemonicToEntropy, entropyToMnemonic } = require('ethereum-cryptography/bip39');
const { wordlist } = require('ethereum-cryptography/bip39/wordlists/english');
const crypto = require('crypto');

// 生成助记词（默认12个单词，128位熵）
export function generateMnemonicPhrase(strength = 128) {
    // 1. 生成随机熵（长度必须是32的倍数，范围128-256位）
    const entropy = crypto.randomBytes(strength / 8);

    // 2. 生成助记词
    const mnemonic = entropyToMnemonic(entropy, wordlist);
    console.log(mnemonic)
    return mnemonic;
}

// 验证助记词有效性
function validateMnemonic(mnemonic) {
    return bip39.validateMnemonic(mnemonic, wordlist);
}



const mnemonic = generateMnemonicPhrase();
console.log('Generated Mnemonic:', mnemonic);
console.log('Is Valid?', validateMnemonic(mnemonic));
