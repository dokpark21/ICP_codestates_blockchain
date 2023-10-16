import { Canister, blob, query, bool } from 'azle';

export default Canister({

    getBlob: query([], blob ,() => {
        return Uint8Array.from([54,6,42,43,56,1,433]);
    }),

    getBool: query([], bool, () => {
        return true;
    })
});

