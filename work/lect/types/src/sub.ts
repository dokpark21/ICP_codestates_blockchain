import { bool, Canister, query, text, update } from 'azle';

export default Canister({
    query1: query([], bool, () => {
        return true;
    }),
    
    update1: update([], text, () => {
        return 'SomeCanister update1';
    })
});

// be2us-64aaa-aaaaa-qaabq-cai