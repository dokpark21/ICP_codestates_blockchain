import { Canister, ic, Principal, query, Record, text, update, Vec, bool } from 'azle';
import SubCanister from './sub';

const Wrapper = Record({
    sub : SubCanister 
});

export default Canister({
    canisterParam: query([SubCanister ], SubCanister , (sub) => {
        return sub ;
    }),
    canisterReturnType: query([], SubCanister , () => {
        return SubCanister (
            Principal.fromText(
                process.env.SOME_CANISTER_PRINCIPAL ??
                    ic.trap('process.env.SOME_CANISTER_PRINCIPAL is undefined')
            )
        );
    }),

    canisterNestedReturnType: update([], Wrapper, () => {
        return {
            sub : SubCanister (
                Principal.fromText(
                    process.env.SOME_CANISTER_PRINCIPAL ??
                        ic.trap(
                            'process.env.SOME_CANISTER_PRINCIPAL is undefined'
                        )
                )
            )
        };
    }),
    canisterList: update([Vec(SubCanister )], Vec(SubCanister ), (sub ) => {
            return sub ;
        }
    ),

   crossUpdate: update([SubCanister ], text, async (sub ) => {
        return await ic.call(sub.update1);
    }),

		crossQuery: query( [SubCanister], bool, async (sub) => {
            return await ic.call(sub.query1);
        }
    ),

});