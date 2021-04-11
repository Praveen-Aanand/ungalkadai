import { Store } from "pullstate";
import { createPullstateCore } from "pullstate";
export const UserData = new Store({
data:null,
auth:null
});
export const ProductData = new Store({data:'load'})

export const PullstateCore = createPullstateCore({
    UserData,ProductData
});