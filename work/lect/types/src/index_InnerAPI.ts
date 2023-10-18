import { Canister, ic, nat64, query, Principal, blob, Void, Opt, update , bool, text} from 'azle';

export default Canister({
    // returns the amount of cycles available in the canister
    canisterBalance: query([], nat64, () => {
        return ic.canisterBalance();
    }),
		
    canisterBalance128: query([], nat64, () => {
        return ic.canisterBalance128();
    }),

    id: query([], Principal, () => {
        return ic.id();
    }),

    canisterVersion: query([], nat64, () => {
        return ic.canisterVersion();
    }),

      dataCertificate: query([], Opt(blob), () => {
        return ic.dataCertificate();
    }),

		dataCertificateNull: update([], Opt(blob), () => {
        return ic.dataCertificate();
    }),
		
		setCertifiedData: update([blob], Void, (data) => {
        ic.setCertifiedData(data);
    }),

    instructionCounter: query([], nat64, () => {
        return ic.instructionCounter();
    }),

	performanceCounter: query([], nat64, () => {
        return ic.performanceCounter(0);
    }),

    isController: query([], bool, () => {
        let res = ic.id()

        return ic.isController(res);
    }),
    
    print: query([text], bool, (message) => {
        ic.print(message);

        return true;
    }),

    time: query([], nat64, () => {
        return ic.time();
    })
});