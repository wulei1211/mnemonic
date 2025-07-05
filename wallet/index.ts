const bip39 = require('bip39');
const crypto = require('crypto');


export function CreateMnemonic(wordCount: number = 12) {
    // 验证助记词数量是否为3的倍数
    if (wordCount % 3 !== 0) {
        throw new Error('助记词数量必须是3的倍数');
    }
    
    // 根据助记词数量确定熵长度
    // BIP39标准：助记词数量 = (熵位数 + 校验和位数) / 11
    // 校验和位数 = 熵位数 / 32
    // 所以：助记词数量 = (熵位数 + 熵位数/32) / 11 = 熵位数 * 33 / (32 * 11) = 熵位数 * 3 / 32
    // 因此：熵位数 = 助记词数量 * 32 / 3
    const entropyBits = wordCount * 32 / 3;
    const entropyBytes = entropyBits / 8;
    
    // 生成随机熵
    const randomBytes = crypto.randomBytes(entropyBytes);
    
    // 计算校验和，先将随机熵进行sha256取hash，并取第一个字节
    const checkHash = crypto.createHash('sha256').update(randomBytes).digest();
    const checksumBits = entropyBytes * 8 / 32; // 校验和位数 = 熵位数 / 32
    const checkSum = checkHash[0] >>> (8 - checksumBits);

    // 将随机熵转换为二进制序列
    let bits = '';
    for (let i = 0; i < randomBytes.length; i++) {
        bits += randomBytes[i].toString(2).padStart(8, '0');
    }
    
    // 添加校验和到二进制序列末尾
    bits += checkSum.toString(2).padStart(checksumBits, '0');

    // 将二进制序列分组，每组11位，并将二进制转为数字索引
    let indexArr = [];
    for (let i = 0; i < bits.length; i += 11) {
        const binaryChunk = bits.substring(i, i + 11);
        const number = parseInt(binaryChunk, 2);
        indexArr.push(number);
    }

    const english = bip39.wordlists.chinese_simplified;
    const mnemonic = indexArr.map(index => english[index]).join(' ');
    
    console.log(`生成${wordCount}位助记词:`, mnemonic);
    // console.log(`熵长度: ${entropyBytes * 8}位`);
    // console.log(`校验和位数: ${checksumBits}位`);
    // console.log(`总二进制长度: ${bits.length}位`);
    // console.log(`助记词索引数量: ${indexArr.length}`);
    
    return mnemonic;
}



