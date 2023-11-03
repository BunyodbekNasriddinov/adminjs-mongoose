import uploadFileFeature, { BaseProvider } from "@adminjs/upload";
// import AdminJS from "adminjs";

// import componentLoader from "./component-loader.js";
// import { User } from "../modules/user/user.model.js";

// // const localProvider = {
// //   bucket: "public/files",
// //   opts: {
// //     baseUrl: "/files",
// //   },
// // };

//   export const options = {
//     resources: [{
//       resource: User,
//       features: [uploadFileFeature({
//         provider: { local: { bucket: 'public' } },
//       })]
//     }]

export class MyProvider extends BaseProvider {
  constructor() {
    super("public");
  }
}
