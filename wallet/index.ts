const bip39 = require('bip39');
const crypto = require('crypto');


export function CreateMnemonic() {
    // 生成随机熵 （长度必须是32的倍数，范围128-256位）
    const randomBytes = crypto.randomBytes(16)
    // 计算校验和，先将随机熵进行sha256取hash，并取四位字节
    const checkHash = crypto.createHash('sha256').update(randomBytes).digest();
    const checksumBits = randomBytes.length * 8 / 32;
    const checkSum = randomBytes[0] >>> (8 - checksumBits)

    // 将 随机熵+校验和 构成二进制序列
    let bits = '';
    for (let i = 0; i < randomBytes.length; i++) {
        bits += randomBytes[i].toString(2).padStart(8, '0')
    }
    bits += checkSum.toString(2).padStart(checksumBits, '0')

    // 将二进制序列分组，每组11个字节，并将字节转为数字
    let indexArr = [];
    for (let i = 0; i < bits.length; i += 11) {
        const number = parseInt(bits.substring(i, i + 11),2);
        indexArr.push(number);
    }

    const english = bip39.wordlists.chinese_simplified;
    const mnemonic = indexArr.map(index => english[index]).join(' ');
    console.log(mnemonic);
}



