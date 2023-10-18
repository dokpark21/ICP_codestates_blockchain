import {query, Principal, Opt, Some, text, Null, None, Canister, init, Record, Variant, nat, ic, update, Vec, blob, int8, bool } from 'azle'

import SubCanister from './sub';

const Wrapper = Record({
    sub : SubCanister 
});

const User = Record({
    id: text
});

const Reaction = Variant({
    Fire: Null,
    Wave: Null
});

let user: Opt<typeof User> = None;
let reaction: Opt<typeof Reaction> = None;
let owner: Opt<Principal> = None;

export default Canister({
    init: init( [User, Reaction, Principal], (initUser, initReaction, initOwner) => {
            user = Some(initUser);
            reaction = Some(initReaction);
            owner = Some(initOwner);
        }
    ),
    getUser: query([], Opt(User), () => {
        return user;
    }),
    getReaction: query([], Opt(Reaction), () => {
        return reaction;
    }),
    getOwner: query([], Opt(Principal), () => {
        return owner;
    }),

    argDataRaw: query(
        [blob, int8, bool, text],
        blob,
        (arg1, arg2, arg3, arg4) => {
            return ic.argDataRaw();
        }
    ), 
    // argDataRawSize: query(
    //     [blob, int8, bool, text],
    //     nat,
    //     (arg1, arg2, arg3, arg4) => {
    //         return ic.argDataRawSize();
    //     }
    // ),

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
    )

});