function resultadoParcial(name, description, image, creators) {
    const obj = {
        name: name,
        description: description,
        image: image,
        creators: creators
    };
    return obj;
}

function nftInfo(lote) {
    let lista = [];
    for (let k of lote) {

        const data = k.token.metadata
        const name = data.name;
        const description = data.description;
        const image = data.image;
        const creators = data.creators;
        const obj = resultadoParcial(name, description, image, creators);
        lista.push(obj);
    }
    return lista;
}

const hex2buf = (hex) => {
    return new Uint8Array(
        hex.match(/[0-9a-f]{2}/gi).map((h) => parseInt(h, 16))
    );
};

function bytes2Char(hex) {
    return Buffer.from(hex2buf(hex)).toString("utf8");
}

function tratarIpfs(ipfs) {
    const link = 'https://ipfs.io/ipfs/' + ipfs.slice(7);
    return link;
}

export { resultadoParcial, hex2buf, bytes2Char, tratarIpfs, nftInfo };
