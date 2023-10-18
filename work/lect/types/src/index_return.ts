import { Canister, blob, query, bool, empty, float64, float32, text, Func, Principal, int, int64, reserved, ic, update } from 'azle';

const BasicFunc = Func([text], text, 'query');

const SomeCanister = Canister({
    query1: query([], bool),
    update1: update([], text)
})

export default Canister({

    getBlob: query([], blob ,() => {
        return Uint8Array.from([54,6,42,43,56,1,433]);
    }),

    printBlob: query([blob], blob, (blob) => {
        console.log(typeof blob);
        return blob;
    }),

    getBool: query([], bool, () => {
        return true;
    }),

 	getEmpty: query([], empty, () => {
		console.log('Empty');
        throw 'Anything you want';
    }),

    getFloat32: query([], float32, () => {
        return Math.PI;
    }),

    getFloat64: query([], float64, () => {
        return Math.E;
    }),

    getBasicFunc: query([], BasicFunc, () => {
        return [
            Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai'),
            'getBasicFunc'
        ];
    }),

    getInt: query([], int, () => {
        // 3자리마다 언더바를 넣지 않고 뒤에 n만 붙여도 상관 없다.
        return 170_141_183_460_469_231_731_687_303_715_884_105_727n;
    }),

	getInt64: query([], int64, () => {
        return 9_223_372_036_854_775_807n;
    }),

    getPrincipal: query([], Principal, () => {
        // ID뿐만 아니라 스마트 컨트랙트의 ID등 여러가지 정보를 가져올 수 있다.
        return Principal.fromText('bkyz2-fmaaa-aaaaa-qaaaq-cai')
    }),

    getReserved: query([], reserved, () => {
        return 'anything'
    }),

    getService: query([], SomeCanister, () => {
        return SomeCanister(Principal.fromText('aaaaa-aa'));
    }),

    callService: update([SomeCanister], text, (service) => {
        return ic.call(service.update1);
    })
});

