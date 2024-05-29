import express from "express";
import { getOrderDetail, getOrders } from "./orders.service";
import { validate } from "../../middleware/validation.middleware";
import { idUUIDRequestSchema, pagingRequestSchema } from "../types";

export const ordersRouter = express.Router();

ordersRouter.get("/", validate(pagingRequestSchema), async (req, res) =>{
    const data = pagingRequestSchema.parse(req);
    const orders = await getOrders(data.query.skip, data.query.take);
    res.json(orders);
  });

ordersRouter.get("/:id", validate(idUUIDRequestSchema), async (req, res) =>{
    const data = idUUIDRequestSchema.parse(req);
    const order = await getOrderDetail(data.params.id);
    if (order != null) {
        res.json(order);
    } else {
        res.status(404).json({message: "Order not found."});
    }
})