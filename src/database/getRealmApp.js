import { BookSchema } from "../schemas/BookSchema";
import Realm from "realm";

export const dbConnect= async ()=>{
     const realm =await Realm.open({
        schema:[BookSchema],
        path:'myRealm'
    })
    return realm
}
