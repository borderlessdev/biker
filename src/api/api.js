import axios from "axios";
import { resultadoParcial, tratarIpfs, bytes2Char, nftInfo } from "../utils/utils.js";

const step = 100;
const step_ = 30;


async function getNftInfo(lote) {
    let lista_obj = [];
    for (let k of lote) {
        const response = await axios.get(k);

        const resp = response.data;

        const name = resp.name;
        const description = resp.description;
        const creators = resp.creators;
        const image = tratarIpfs(resp.image);
        const obj = resultadoParcial(name, description, image, creators);

        lista_obj.push(obj);
    }
    return lista_obj;
}

function procurarMint(lote) {
    let lista = [];
    for (let k of lote) {
        if (k.parameter) {
            const param = k.parameter;
            if (param.entrypoint === 'mint') {
                const metadata = param.value.metadata;
                const hex = metadata[''];
                const ipfs = bytes2Char(hex);
                const link = tratarIpfs(ipfs);

                lista.push(link);
            }
        }
    }

    return lista;
}

async function getAllMints(address) {
    let resultadoTotal = [];

    try {
        const response = await axios.get(`https://api.tzkt.io/v1/accounts/${address}/operations?entrypoint=mint&limit=1000`);

        for (let i = 0; i < response.data.length; i += step) {
            const lote = response.data.slice(i, i + step);
            const loteProcessado = procurarMint(lote);

            resultadoTotal.push(...loteProcessado);
        }
    } catch (e) {
        console.log(e);
    }

    let resultadoFinal = [];
    try {
        for (let i = 0; i < resultadoTotal.length; i += step_) {
            const lote = resultadoTotal.slice(i, i + step_);
            const resultado = await getNftInfo(lote);
            resultadoFinal.push(resultado);
        }
    } catch (e) {
        console.log(e);
    }
    return resultadoFinal;
}

async function getAllSells(address) {
    let lista = []
    try {
        const response = await axios.get(`https://api.tzkt.io/v1/tokens/transfers?from=${address}&limit=1000`)
    
        for (let i = 0; i < response.data.length; i += step) {
            const lote = response.data.slice(i, i + step);
            const info = nftInfo(lote);

            lista.push(...info)
        }
        return lista;
    } catch (e) {
        console.log(e)
    }
    
}  
export { getAllMints, getAllSells };