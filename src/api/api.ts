import axios from "axios";

export const API_URL = "http://localhost:4000";

export let fetchPlans = async (name: any, dir: any) => {
  let res = await axios.get(API_URL + "/products", {
    params: {
      _sort: name,
      _order: dir,
    }
  });
  return res.data as ProductPlan[];
};

export interface ProductPlan {
  id: number;
  tariffName: string;
  downloadSpeed: number;
  uploadSpeed: number;
  benefits: string[];
  price: number;
}
