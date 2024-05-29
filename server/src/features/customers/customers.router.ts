import express from "express";
import { getCustomerDetail, getCustomers, searchCustomers } from "./customers.service";
import { getOrdersForCustomer } from "../orders/orders.service";
import { validate } from "../../middleware/validation.middleware";
import { idUUIDRequestSchema } from "../types";

export const customersRouter = express.Router();

customersRouter.get("/", async (req, res) =>{
    const customers = await getCustomers();
    res.json(customers);
  });

  customersRouter.get("/:id", validate(idUUIDRequestSchema), async (req, res) =>{
    const data = idUUIDRequestSchema.parse(req);
    const customer = await getCustomerDetail(data.params.id);
    if (customer != null) {
      res.json(customer);
    } else {
      res.status(404).json({message:"Customer not found"})
    }
  });

  customersRouter.get("/:id/orders", validate(idUUIDRequestSchema), async (req, res) =>{
    const data = idUUIDRequestSchema.parse(req);
    const orders = await getOrdersForCustomer(data.params.id);

    res.json(orders);
  });
  
  customersRouter.get("/search/:query", async (req, res) =>{
    const query = req.params.query;
    const customers = await searchCustomers(query);
    
       res.json(customers);
  });