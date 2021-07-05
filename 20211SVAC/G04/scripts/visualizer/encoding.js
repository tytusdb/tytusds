"use strict";
var encodingProps = {
    instance: null,
    feistelProps: {
        iterations: 0,
        key: '',
    },
};
var encodeInput = document.getElementById('encode-input');
var encodeOutput = document.getElementById('encode-output');
var globalEncodingTextInput = '';
var setEncodingData = function (props) { return (encodingProps = props); };
var encodingFileUploadCallback = function () {
    if (encodeInput)
        encodeInput.value = globalEncodingTextInput;
};
var onChangeUploadEncodingInput = function (ev) {
    var input = ev.target;
    var file = input.files ? input.files[0] : null;
    var reader = new FileReader();
    reader.onload = function () {
        var text = reader.result;
        globalEncodingTextInput = text;
        encodingFileUploadCallback();
    };
    if (file) {
        reader.readAsText(file);
        input.value = '';
    }
};
var startEncoding = function () {
    if (encodingProps.instance) {
        if (encodeOutput) {
            encodingProps.instance.codificar(globalEncodingTextInput);
            var encodedValue = encodingProps.instance.toString();
            console.log(encodedValue);
        }
    }
};
