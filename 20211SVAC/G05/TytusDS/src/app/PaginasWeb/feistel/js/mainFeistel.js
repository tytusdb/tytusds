let Feistel=require('./feistel');
let feistel= new Feistel('0100001101000110','00110001',4);
let cifrado=feistel.Cifrar();
console.log(cifrado);
x="00000111000001101111011100110111010001100101011100100110100101101111011100100010000001100001011011000110110101100001011000110110010101101110011000010110110101101001110000110100011011010110111101110011001000000111001101100101001000000111000001110101011001010110010001100101001000000110001101100001011100100110011101100001011100100010000001100101011011000010000001100011011011110110111001110100011001010110111001101001011001000110111100100000011011010110010101100100011010010110000101101110011101000110010100100000011101010110111000100000011000010111001001100011011010000110100101110110011011110010000001100100011001010010000001110100011001010111100001110100011011110010111000100000010000010110110000100000011000110110000101110010011001110110000101110010001000000110010101101100001000000110001101101111011011100111010001100101011011100110100101100100011011110010000001100100011001010110001001100101001000000110110101101111011100110111010001110010011000010111001001110011011001010010000001100101011011100010000001110101011011100010000001100011011000010110110101110000011011110010000001100100011001010010000001110100011001010111100001110100011011110010000001111001001000000111000001110101011001010110010001100101001000000111001101100101011100100010000001100101011001000110100101110100011000010110010001101111001000000111000001100001011100100110000100100000011100110111010100100101011101100111100001010101011001100110001000110100100111110010100110000101000100100110011110101010100110100101001101100101011100111010100000010111100110100100111010001111011011100111010001101111001011100010000001000101011011100010000001101111011101000111001001101111001000000110001101110101011000010110010001110010011011110010000001100100011001010010000001110100011001010111100001110100011011110010000001111001011000010010000001110011011001010110000100100000011000010010000001101100011000010010000001100100011001010111001001100101011000110110100001100001001000000110111100100000011000010110001001100001011010100110111100100000011100110110010100100000011001000110010101100010011001010010000001101101011011110111001101110100011100100110000101110010001000000110010101101100001000000111001001100101011100110111010101101100011101000110000101100100011011110010000001100100011001010110110000100000011000010110110001100111011011110111001001101001011101000110110101101111001000000110001101101111011011100010000001110000011011110111001101101001011000100110100101101100011010010110010001100001011001000010000001100100011001010010000001100111011101010110000101110010011001000110000101110010001000000110010101101110001000000111010101101110001000000110000101110010011000110110100001101001011101100110111100100000011001000110010100100000011101000110010101111000011101000110111100101110"
console.log(x.length);
let l=["F","C"];
l.unshift("jijo")
console.log(l);
console.log("xD");
console.log(l.map(function(char) {
  const binary = char.charCodeAt(0).toString(2)
  const pad = Math.max(8 - binary.length, 0);
  // Just to make sure it is 8 bits long.
  return '0'.repeat(pad) + binary;
}).join(''));