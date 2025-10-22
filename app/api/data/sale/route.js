import { GET as DynamicGET } from "../[collections]/route";

export async function GET(req) {
  return DynamicGET(req, { params: { collections: "sale" } });
}
